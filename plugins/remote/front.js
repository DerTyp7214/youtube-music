const {ipcRenderer} = require("electron");
const {setOptions} = require("../../config/plugins");
const {cleanupName} = require("../../providers/song-info");

function $(selector) {
	return document.querySelector(selector);
}

function $$(parent, selector) {
	return parent.querySelectorAll(selector);
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

		ipcRenderer.on('startQueueItemRadio', (_, videoId) => {
			startQueueItemRadio(videoId)
		})

		ipcRenderer.on('playQueueItemNext', (_, videoId) => {
			playQueueItemNext(videoId)
		})

		ipcRenderer.on('addQueueItemToQueue', (_, videoId) => {
			addQueueItemToQueue(videoId)
		})

		ipcRenderer.on('removeQueueItemFromQueue', (_, {videoId, position}) => {
			removeQueueItemFromQueue(videoId, position)
		})

		ipcRenderer.on('search', (_, query) => {
			const input = $('input.ytmusic-search-box')
			input.value = query
			input.dispatchEvent(new KeyboardEvent('keypress', {
				bubbles: true, cancelable: true, keyCode: 13
			}))
		})

		const observer = new MutationObserver(() => {
			ipcRenderer.send('returnQueue', getQueue())
		})


		observer.observe(getQueueWrapper(), {attributes: true, childList: true})
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

function rightClick(element) {
	const event = new MouseEvent('contextmenu', {
		bubbles: true,
		cancelable: true,
		view: element.ownerDocument.defaultView,
		detail: 1
	})

	return !element.dispatchEvent(event)
}

function observeContextMenu(target, callback) {
	const element = $(target)
	const observer = new MutationObserver(() => {
		callback(element)
		observer.disconnect()
	})
	observer.observe(element, {subtree: true, childList: true})
}

async function findContextItem(itemType, contextMenu, titleInLower, trys, wait) {
	if (wait) await new Promise(res => setTimeout(res, 100))
	const items = $$(contextMenu, 'tp-yt-paper-listbox ' + itemType)
	const filtered = [...items].find(item => item.querySelector('yt-formatted-string').innerText.toLowerCase().trim() === titleInLower)
	return filtered || trys === 0 ? filtered : await findContextItem(itemType, contextMenu, titleInLower, trys - 1, true)
}

async function findContextServiceItem(contextMenu, titleInLower, trys) {
	return await findContextItem('ytmusic-menu-service-item-renderer', contextMenu, titleInLower, trys)
}

async function findContextNavigationItem(contextMenu, titleInLower, trys) {
	return await findContextItem('ytmusic-menu-navigation-item-renderer a', contextMenu, titleInLower, trys)
}

function startQueueItemRadio(videoId) {
	const element = $(`[videoid="${videoId}"]`)
	observeContextMenu('ytmusic-popup-container', contextMenu => {
		findContextNavigationItem(contextMenu, 'start radio', 5).then(item => item?.click())
	})
	rightClick(element)
	if (!$('tp-yt-iron-dropdown[aria-hidden="true"]')) rightClick(element)
}

function playQueueItemNext(videoId) {
	const element = $(`[videoid="${videoId}"]`)
	observeContextMenu('ytmusic-popup-container', contextMenu => {
		findContextServiceItem(contextMenu, 'play next', 5).then(item => item?.click())
	})
	rightClick(element)
	if (!$('tp-yt-iron-dropdown[aria-hidden="true"]')) rightClick(element)
}

function addQueueItemToQueue(videoId) {
	const element = $(`[videoid="${videoId}"]`)
	observeContextMenu('ytmusic-popup-container', contextMenu => {
		findContextServiceItem(contextMenu, 'add to queue', 5).then(item => item?.click())
	})
	rightClick(element)
	if (!$('tp-yt-iron-dropdown[aria-hidden="true"]')) rightClick(element)
}

function removeQueueItemFromQueue(videoId, position) {
	const element = $$(document, `[videoid="${videoId}"]`)[position]
	observeContextMenu('ytmusic-popup-container', contextMenu => {
		findContextServiceItem(contextMenu, 'remove from queue', 5).then(item => item?.click())
	})
	rightClick(element)
	if (!$('tp-yt-iron-dropdown[aria-hidden="true"]')) rightClick(element)
}

function getQueueWrapper() {
	const queueWrapper = $('ytmusic-tab-renderer #contents.ytmusic-player-queue')
	const queueWrapper2 = $('#contents.ytmusic-player-queue')

	return queueWrapper ?? queueWrapper2
}

function getQueueElements() {
	const queueWrapper = getQueueWrapper()
	if (!queueWrapper) return []

	return [...queueWrapper.querySelectorAll(':scope > ytmusic-player-queue-item, #primary-renderer>ytmusic-player-queue-item')]
}

function getQueue() {
	const items = getQueueElements()
	const currentPlayIndex = items.findIndex(item => item.hasAttribute('selected'))

	const mapped = items.splice(currentPlayIndex, items.length - currentPlayIndex).map(item => {
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
			artist: shortBylineText.runs.map(item => item.text).join(''),
			image: thumbnail.thumbnails[thumbnail.thumbnails.length - 1].url,
			duration: lengthText.runs[0].text,
			videoId,
			position: 0
		}
	})
	mapped.forEach(item => {
		const tmp = mapped.filter(i => i.videoId === item.videoId)[item.position + 1]
		if (tmp) tmp.position = item.position + 1
	})
	return mapped
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
