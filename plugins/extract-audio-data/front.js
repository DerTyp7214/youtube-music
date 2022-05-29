const {ipcRenderer} = require("electron");
module.exports = () => {
	document.addEventListener('apiLoaded', () => {
		let isMuted = false

		const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
		const video = document.querySelector("video")

		const analyser = audioCtx.createAnalyser()
		analyser.minDecibels = -90
		analyser.maxDecibels = -10
		analyser.smoothingTimeConstant = .7
		analyser.fftSize = 64

		const bufferLength = analyser.frequencyBinCount
		const dataArray = new Uint8Array(bufferLength)
		const dataArrayFull = new Uint8Array(bufferLength)

		const distortion = audioCtx.createWaveShaper()
		const gainNode = audioCtx.createGain()
		const biquadFilter = audioCtx.createBiquadFilter()
		const convolver = audioCtx.createConvolver()

		video.addEventListener('loadeddata', () => {
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
				requestAnimationFrame(fullData)

				const color = window.getComputedStyle(document.body, null).getPropertyValue('--vibrant-cover-color')

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
				if (data) ipcRenderer.send('audioData', data)
				setTimeout(getData, 1000 / 25)
			}

			getData()
		})

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
