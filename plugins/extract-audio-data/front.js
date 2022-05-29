const {ipcRenderer} = require('electron')

const $ = s => document.querySelector(s)

const fftSize = 256
const sampleRate = 24000

const barCount = fftSize / 2

const manipulators = _createCurve([.7, .75, .8, .9, .95, 1, 1.1, 1.15], barCount)

function _createCurve(manipulator, count) {
	const times = count / manipulator.length
	if (times < 1) return manipulator
	const curve = []
	for (let i = 0; i < manipulator.length; i++) for (let j = 0; j < times; j++) curve.push(
		curve.length > 0 ? (curve[curve.length - 1] + manipulator[i] + .000001) / 2 : manipulator[i]
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

					const color = window.getComputedStyle(document.body, null).getPropertyValue('--light-vibrant-cover-color')

					if (!document.querySelector('ytmusic-player canvas')) {
						canvas.width = player.clientWidth
						canvas.height = player.clientHeight

						canvas.style.opacity = '.7'
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

					const barWidth = (canvas.width / data.length) - 1
					let x = 0

					ctx.fillStyle = color

					for (let i = 0; i < data.length; i++) {
						const barHeight = (canvas.height / 4) / 256 * data[i]

						ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2)

						x += barWidth + 1
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
