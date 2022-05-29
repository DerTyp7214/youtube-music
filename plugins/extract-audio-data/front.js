const {ipcRenderer} = require("electron");
module.exports = () => {
	document.addEventListener('apiLoaded', () => {
		let isMuted = false

		const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
		const video = document.querySelector("video")

		const analyser = audioCtx.createAnalyser()
		analyser.minDecibels = -90
		analyser.maxDecibels = -10
		analyser.smoothingTimeConstant = .5
		analyser.fftSize = 64

		const bufferLength = analyser.frequencyBinCount
		const dataArray = new Uint8Array(bufferLength)

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

			function getData() {
				analyser.getByteFrequencyData(dataArray)
				const data = cleanData(Array.from(dataArray))
				if (data) ipcRenderer.send('audioData', data)
				setTimeout(getData, 1000 / 15)
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
