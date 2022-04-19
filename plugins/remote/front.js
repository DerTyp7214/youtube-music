const {ipcRenderer} = require("electron");
const {setOptions} = require("../../config/plugins");

function $(selector) { return document.querySelector(selector); }

let api
let lastVolume

module.exports = (options) => {
	document.addEventListener('apiLoaded', e => {
		api = e.detail;

		ipcRenderer.on('volumeChange', (_, volume) => {
			changeVolume(volume, options)
		})
	})
}

function changeVolume(volume, options) {

	api.setVolume(volume);

	// Save the new volume
	saveVolume(api.getVolume(), options);
}

function saveVolume(volume, options) {
	options.savedVolume = volume;
	writeOptions(options);

	updateVolumeSlider(options);
}

function updateVolumeSlider(options) {
	// Slider value automatically rounds to multiples of 5
	for (const slider of ["#volume-slider", "#expand-volume-slider"]) {
		$(slider).value =
			options.savedVolume > 0 && options.savedVolume < 5
				? 5
				: options.savedVolume;
	}
}

//without this function it would rewrite config 20 time when volume change by 20
let writeTimeout;

function writeOptions(options) {
	if (writeTimeout) clearTimeout(writeTimeout);

	writeTimeout = setTimeout(() => {
		setOptions("remote", options);
		writeTimeout = null;
	}, 1000)
}
