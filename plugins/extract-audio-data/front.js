const {ipcRenderer} = require('electron')

const $ = s => document.querySelector(s)

const fftSize = 256
const sampleRate = 24000

const barCount = fftSize / 2

const pinkNoise = [
	1.0548608488838, 0.76054078751554, 0.61124787706261, 0.52188737442096,
	0.47582581340335, 0.442985940855, 0.39506604448116, 0.38179901474466,
	0.3791498265819, 0.35862620105656, 0.34117808276167, 0.31407858754586,
	0.32956896818321, 0.32649587026332, 0.32553041354753, 0.33023063745582,
	0.33723850113961, 0.32845876137105, 0.32345077632073, 0.33371703524763,
	0.33559351013352, 0.32755038614695, 0.33723270172874, 0.33152196761531,
	0.34253960054833, 0.33996676648346, 0.35007384375669, 0.34140414964718,
	0.35276302794926, 0.45428847576802, 0.57092841582994, 0.56249676873287,
	0.64297260455787, 0.64261475342015, 0.72339198663831, 0.73733259583513,
	0.83130048006773, 0.86110594108701, 0.93924222866694, 0.97183918188016,
	1.0510377466679, 1.1248085597157, 1.1805661781629, 1.2060520313183,
	1.2870901748538, 1.3467060487469, 1.419748566548, 1.4930113442739,
	1.5233661865195, 1.6291546697418, 1.6687760437528, 1.7517802578211,
	1.7828743148843, 1.8640559593836, 1.9024009352922, 1.9445452898741,
	2.0042892436186, 2.0429756359259, 2.0702872782946, 2.0901099761327,
	2.0997672257821, 2.1029779444138, 2.0654643664757, 2.0357843961318
]

const manipulators = _createCurve(pinkNoise, barCount)

function _createCurve(manipulator, count) {
	const times = count / manipulator.length
	if (times < 1) return manipulator
	const curve = []
	for (let i = 0; i < manipulator.length; i++) for (let j = 0; j < times; j++) curve.push(
		curve.length > 0 ? (curve[curve.length - 1] + manipulator[i]) / 2 : manipulator[i]
	)
	return curve
}

module.exports = () => {
	document.addEventListener('apiLoaded', () => {
		let isMuted = false

		const audioCtx = new (window.AudioContext || window.webkitAudioContext)({sampleRate})

		const analyser = audioCtx.createAnalyser()

		analyser.minDecibels = -80
		analyser.maxDecibels = -20
		analyser.smoothingTimeConstant = .6
		analyser.fftSize = fftSize

		const bufferLength = analyser.frequencyBinCount
		const dataArray = new Uint8Array(bufferLength)
		const dataArrayFull = new Uint8Array(bufferLength)

		const distortion = audioCtx.createWaveShaper()
		const gainNode = audioCtx.createGain()
		const biquadFilter = audioCtx.createBiquadFilter()
		const convolver = audioCtx.createConvolver()

		biquadFilter.type = 'highpass'
		biquadFilter.frequency.value = .0001

		convolver.normalize = true

		let currentTimeout
		let currentAnimationFrame

		const setupVisualizer = () => {
			clearTimeout(currentTimeout)
			cancelAnimationFrame(currentAnimationFrame)

			try {
				const video = document.querySelector('video')
				const source = audioCtx.createMediaStreamSource(video.captureStream())

				source.connect(analyser)
				distortion.connect(biquadFilter)
				biquadFilter.connect(gainNode)
				convolver.connect(gainNode)
				gainNode.connect(analyser)

				const player = document.querySelector('ytmusic-player')
				const canvas = document.createElement('canvas')

				canvas.id = 'audioVisualization' + Date.now()

				const ctx = canvas.getContext('2d')

				player.querySelectorAll('canvas').forEach(c => {
					if (c.id !== canvas.id) c.remove()
				})

				function fullData() {
					currentAnimationFrame = requestAnimationFrame(fullData)

					const color = window.getComputedStyle(document.body, null).getPropertyValue('--calculated-cover-color')

					if (!document.querySelector('ytmusic-player canvas')) {
						canvas.width = player.clientWidth
						canvas.height = player.clientHeight

						canvas.style.opacity = '1'
						canvas.style.position = 'absolute'
						canvas.style.top = '0px'
						canvas.style.left = '0px'

						document.querySelectorAll('ytmusic-player canvas').forEach(c => c.remove())
						player.append(canvas)
					}

					analyser.getByteFrequencyData(dataArrayFull)

					for (let i = 0; i < dataArrayFull.length; i++) {
						dataArrayFull[i] *= manipulators?.[i] ?? 1
					}

					const data = [...dataArrayFull, ...dataArrayFull.reverse()]

					ctx.clearRect(0, 0, canvas.width, canvas.height)

					const barWidth = (canvas.width / data.length) * .8
					const gapWidth = (canvas.width / data.length) * .2
					let x = 0

					ctx.fillStyle = color

					for (let i = 0; i < data.length; i++) {
						const barHeight = (canvas.height / 4) / 256 * data[i]

						ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2)

						x += barWidth + gapWidth
					}
				}

				fullData()

				function getData() {
					analyser.getByteFrequencyData(dataArray)
					const data = cleanData(Array.from(dataArray))
					if (data) {
						for (let i = 0; i < data.length; i++) {
							data[i] = Math.floor(data[i] * (manipulators?.[i] ?? 1))
						}
						ipcRenderer.send('audioData', data)
					}
					currentTimeout = setTimeout(getData, 1000 / 25)
				}

				getData()
			} catch (e) {
			}
		}

		$('video').addEventListener('loadeddata', setupVisualizer)

		const playPauseObserver = new MutationObserver(() => {
			setupVisualizer()
		})

		playPauseObserver.observe($('#play-pause-button'), {attributes: true, attributeFilter: ['aria-label']})

		function cleanData(data) {
			if (data.filter(d => d !== 0).length !== 0) {
				isMuted = false
				return data
			} else if (isMuted) return null
			else {
				isMuted = true
				return data
			}
		}
	})
}
