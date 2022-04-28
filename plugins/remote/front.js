const {ipcRenderer} = require("electron");
const {setOptions} = require("../../config/plugins");

function $(selector) {
	return document.querySelector(selector);
}

let api

module.exports = (options) => {
	document.addEventListener('apiLoaded', e => {
		api = e.detail;

		ipcRenderer.on('volumeChange', (_, volume) => {
			changeVolume(volume, options)
		})

		ipcRenderer.on('requestQueue', (_) => {
			ipcRenderer.send('returnQueue', getQueue())
		})

		ipcRenderer.on('playQueueItemById', (_, videoId) => {
			playQueueItemById(videoId)
		})
	})
}

function changeVolume(volume, options) {

	api.setVolume(volume);

	// Save the new volume
	saveVolume(api.getVolume(), options);
}

function playQueueItemById(videoId) {
	$(`[videoid="${videoId}"] ytmusic-play-button-renderer`)?.click()
}

function getQueueElements() {
	const queueWrapper = $('ytmusic-tab-renderer #contents.ytmusic-player-queue')
	const queueWrapper2 = $('#contents.ytmusic-player-queue')

	if (!queueWrapper && !queueWrapper2) return []

	return [...(queueWrapper ?? queueWrapper2).querySelectorAll(':scope > ytmusic-player-queue-item, #primary-renderer>ytmusic-player-queue-item')]
}

function getQueue() {
	const items = getQueueElements()
	const currentPlayIndex = items.findIndex(item => item.hasAttribute('selected'))

	return items.splice(currentPlayIndex, items.length - currentPlayIndex).map(item => {
		const {
			lengthText,
			shortBylineText,
			thumbnail,
			title,
			videoId
		} = item.__data.data

		item.setAttribute('videoId', videoId)

		return {
			title: cleanupName(title.runs[0].text),
			artist: shortBylineText.runs[0].text,
			image: thumbnail.thumbnails[thumbnail.thumbnails.length - 1].url,
			duration: lengthText.runs[0].text,
			videoId
		}
	})
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

const suffixesToRemove = [
	" - topic",
	"vevo",
	" (performance video)",
	" (clip officiel)",
	" (epic trailer version)",
	" (trailer version"
];

function cleanupName(name) {
	if (!name) return name;
	name = name.replace(/\((?:official)?[ ]?(?:music)?[ ]?(?:lyric[s]?)?[ ]?(?:video)?\)$/i, '')
	const lowCaseName = name.toLowerCase();
	for (const suffix of suffixesToRemove) {
		if (lowCaseName.endsWith(suffix)) {
			return name.slice(0, -suffix.length);
		}
	}
	return name;
}
