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

		ipcRenderer.on('search', async (_, query) => {
			await search(query)
			ipcRenderer.send('searchMainResults', getSearchResults())
		})

		ipcRenderer.on('selectSearchTab', async (_, index) => {
			await selectSearchTab(index).catch(() => console.log('Error selecting tab'))
			ipcRenderer.send('searchMainResults', getSearchResults())
		})

		ipcRenderer.on('showShelf', async (_, index) => {
			ipcRenderer.send('showShelfResults', await showAll(index))
		})

		ipcRenderer.on('playSearchSong', async (_, {index, shelf}) => {
			playSearchSong(index, shelf)
		})

		ipcRenderer.on('searchContextMenu', async (_, {index, shelf, action}) => {
			switch (action) {
				case 'radio':
					startSearchItemRadio(index, shelf)
					break;
				case 'next':
					playSearchItemNext(index, shelf)
					break;
				case 'queue':
					addSearchItemToQueue(index, shelf)
					break;
			}
		})

		ipcRenderer.on('playlistContextMenu', async (_, {index, song, action}) => {
			switch (action) {
				case 'radio':
					startPlaylistItemRadio(song, index)
					break;
				case 'next':
					playPlaylistItemNext(song, index)
					break;
				case 'queue':
					addPlaylistItemToQueue(song, index)
					break;
			}
		})

		ipcRenderer.on('requestPlaylists', async () => {
			await openLibrary()
			await openPlaylists()
			ipcRenderer.send('playlists', {recentActivity: getRecentActivity(), playlists: getPlaylists()})
		})

		ipcRenderer.on('requestPlaylist', async (e, index) => {
			await openPlaylist(index)
			ipcRenderer.send('playlist', getPlaylistContent())
		})

		ipcRenderer.on('playPlaylist', async (_, {shuffle, index}) => {
			playPlaylist(shuffle, index)
		})

		ipcRenderer.on('playRecentItem', (_, index) => {
			playRecentItem(index)
		})

		ipcRenderer.on('contextRecentItem', (_, {index, action}) => {
			switch (action) {
				case 'radio':
					startRecentItemRadio(index)
					break;
				case 'next':
					playRecentItemNext(index)
					break;
				case 'queue':
					addRecentItemToQueue(index)
					break;
			}
		})

		ipcRenderer.on('openPlayer', (_) => {
			document.querySelector('ytmusic-player-bar')?.click()
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

async function observerContents(run) {
	return new Promise((resolve, reject) => {
		let connected = true
		let removedContent = false
		const observer = new MutationObserver(() => {
			if (removedContent) {
				connected = false
				observer.disconnect()
				setTimeout(resolve, 200)
			} else removedContent = true
		})
		observer.observe(document.querySelector('#contents'), {subtree: true, childList: true})
		setTimeout(() => {
			if (connected) reject()
		}, 2000)
		run(reject)
	})
}

async function observerSearchPage(run) {
	return new Promise((resolve, reject) => {
		let connected = true
		const observer = new MutationObserver(() => {
			connected = false
			setTimeout(resolve, 200)
		})
		observer.observe(document.querySelector('ytmusic-search-page'), {subtree: true, childList: true})
		setTimeout(() => {
			if (connected) reject()
		}, 2000)
		run(reject)
	})
}

async function search(query) {
	await observerSearchPage(() => {
		const input = $('input.ytmusic-search-box')
		input.value = query
		input.dispatchEvent(new KeyboardEvent('keypress', {
			bubbles: true, cancelable: true, keyCode: 13
		}))
	})
}

async function selectSearchTab(index) {
	await observerSearchPage(cancel => {
		const tab = [...document.querySelectorAll('ytmusic-search-page ytmusic-tabbed-search-results-renderer ytmusic-tabs #tabs yt-formatted-string')][index]
		if (!tab) return cancel()
		tab.click()
	})
}

function getSearchResults() {
	const content = document.querySelector('ytmusic-search-page ytmusic-section-list-renderer div#contents')
	if (!content) return []

	const shelfs = [...content.querySelectorAll('ytmusic-shelf-renderer')]

	const tabs = [...document.querySelectorAll('ytmusic-search-page ytmusic-tabbed-search-results-renderer ytmusic-tabs #tabs yt-formatted-string')]

	return [{
		index: -1,
		title: '',
		type: 'tabs',
		entries: tabs.map((tab, index) => {
			return {
				index,
				title: tab.innerText,
				type: tab.hasAttribute('selected') ? 'selected' : 'unselected',
				subTitle: [],
				thumbnails: []
			}
		}),
		showAll: false
	}, ...shelfs.map((shelf, index) => {
		const {
			title: {runs: title}
		} = shelf.data

		const entries = [...shelf.querySelectorAll('#contents ytmusic-responsive-list-item-renderer')]

		return {
			index,
			title: title.map(s => s.text).join(''),
			type: title.map(s => s.text).join('').toLowerCase(),
			entries: entries.map((entry, index) => {
				const {
					thumbnail: {musicThumbnailRenderer: {thumbnail: {thumbnails}}}
				} = entry.data

				const texts = entry.querySelector('.flex-columns')

				const spaceChar = ' • '

				const title = texts.querySelector('.title-column yt-formatted-string').title
				const subTitle = texts.querySelector('.secondary-flex-columns yt-formatted-string').title.split(spaceChar)

				return {
					index,
					title,
					type: subTitle[0].toLowerCase(),
					subTitle: subTitle.length > 1 ? subTitle.filter((_, index) => index > 0) : subTitle,
					thumbnails
				}
			}),
			showAll: !!shelf.querySelector('.more-button a')
		}
	})]
}

async function showAll(index) {
	const content = document.querySelector('ytmusic-search-page ytmusic-section-list-renderer div#contents')
	await observerSearchPage(cancel => {
		if (!content) return cancel()

		const shelfs = [...content.querySelectorAll('ytmusic-shelf-renderer')]
		const button = shelfs[index]?.querySelector('.more-button a')

		if (!button) return cancel()

		button.click()
	})

	const songs = [...content.querySelectorAll('ytmusic-shelf-renderer #contents ytmusic-responsive-list-item-renderer')]

	return songs.map((song, index) => {
		const {
			thumbnail: {musicThumbnailRenderer: {thumbnail: {thumbnails}}},
		} = song.data

		const texts = song.querySelector('.flex-columns')

		const spaceChar = ' • '

		const title = texts.querySelector('.title-column yt-formatted-string').title
		const subTitle = texts.querySelector('.secondary-flex-columns yt-formatted-string').title

		return {
			index,
			title,
			subTitle: subTitle.split(spaceChar),
			thumbnails
		}
	})
}

function playSearchSong(index, shelf) {
	if (shelf !== undefined) {
		const content = document.querySelector('ytmusic-search-page ytmusic-section-list-renderer div#contents')
		if (!content) return

		const shelfElement = [...content.querySelectorAll('ytmusic-shelf-renderer')][shelf]
		if (!shelfElement) return

		[...shelfElement.querySelectorAll('#contents ytmusic-responsive-list-item-renderer')][index]?.querySelector('ytmusic-play-button-renderer')?.click()
	} else {
		const content = document.querySelector('ytmusic-search-page ytmusic-section-list-renderer div#contents')
		if (!content) return
		const songs = [...content.querySelectorAll('ytmusic-shelf-renderer #contents ytmusic-responsive-list-item-renderer')]
		songs[index]?.querySelector('ytmusic-play-button-renderer')?.click()
	}
}

function getShelfElement(index, shelf) {
	let element
	if (shelf !== undefined) {
		const content = document.querySelector('ytmusic-search-page ytmusic-section-list-renderer div#contents')
		if (!content) return

		const shelfElement = [...content.querySelectorAll('ytmusic-shelf-renderer')][shelf]
		if (!shelfElement) return

		element = [...shelfElement.querySelectorAll('#contents ytmusic-responsive-list-item-renderer')][index]
	} else {
		const content = document.querySelector('ytmusic-search-page ytmusic-section-list-renderer div#contents')
		if (!content) return
		const songs = [...content.querySelectorAll('ytmusic-shelf-renderer #contents ytmusic-responsive-list-item-renderer')]
		element = songs[index]
	}
	return element
}

function startSearchItemRadio(index, shelf) {
	let element = getShelfElement(index, shelf)
	if (!element) return

	observeContextMenu('ytmusic-popup-container', contextMenu => {
		findContextNavigationItem(contextMenu, 'start radio', 5).then(item => item?.click())
	})
	rightClick(element)
	if (!$('tp-yt-iron-dropdown[aria-hidden="true"]')) rightClick(element)
}

function playSearchItemNext(index, shelf) {
	let element = getShelfElement(index, shelf)
	if (!element) return

	observeContextMenu('ytmusic-popup-container', contextMenu => {
		findContextServiceItem(contextMenu, 'play next', 5).then(item => item?.click())
	})
	rightClick(element)
	if (!$('tp-yt-iron-dropdown[aria-hidden="true"]')) rightClick(element)
}

function addSearchItemToQueue(index, shelf) {
	let element = getShelfElement(index, shelf)
	if (!element) return

	observeContextMenu('ytmusic-popup-container', contextMenu => {
		findContextServiceItem(contextMenu, 'add to queue', 5).then(item => item?.click())
	})
	rightClick(element)
	if (!$('tp-yt-iron-dropdown[aria-hidden="true"]')) rightClick(element)
}

async function openLibrary() {
	await observerContents(cancel => {
		const element = document.querySelector('[tab-id="FEmusic_liked"]')
		if (!element) return cancel()
		element.click()
	})
}

async function openPlaylists() {
	await observerContents(cancel => {
		const nodeElements = [...document.querySelectorAll('ytmusic-item-section-tab-renderer')]
		const element = nodeElements.find(element => element.innerText.toLowerCase() === 'playlists')
		if (!element) return cancel()
		element.click()
	})
}

function getPlaylistsWrapper() {
	return document.querySelector('ytmusic-grid-renderer[grid-type="library"]')
}

function getPlaylists() {
	const wrapper = getPlaylistsWrapper()
	if (!wrapper) return []

	const playlists = [...wrapper.querySelectorAll('ytmusic-two-row-item-renderer')]

	return playlists.filter((_, index) => index !== 0).map((playlist, index) => {
		const {
			subtitle: {runs: subtitle},
			thumbnailRenderer: {musicThumbnailRenderer: {thumbnail: {thumbnails}}},
			title: {runs: title}
		} = playlist.data

		return {
			index: index + 1,
			title: title.map(s => s.text).join(''),
			subtitle: subtitle.map(s => s.text).join(''),
			thumbnails,
			playable: true
		}
	})
}

function getRecentActivity() {
	const wrapper = document.querySelector('ytmusic-carousel-shelf-renderer #items-wrapper ul#items')
	if (!wrapper) return []

	const items = [...wrapper.querySelectorAll('ytmusic-two-row-item-renderer')]

	return items.map((item, index) => {
		const {
			title: {runs: title},
			subtitle: {runs: subtitle},
			thumbnailRenderer: {musicThumbnailRenderer: {thumbnail: {thumbnails}}}
		} = item.data

		return {
			index,
			title: title.map(s => s.text).join(''),
			subtitle: subtitle.map(s => s.text).join(''),
			thumbnails,
			playable: !!item.querySelector('ytmusic-play-button-renderer')
		}
	})
}

function playRecentItem(index) {
	const wrapper = document.querySelector('ytmusic-carousel-shelf-renderer #items-wrapper ul#items')
	if (!wrapper) return []

	const items = [...wrapper.querySelectorAll('ytmusic-two-row-item-renderer')]

	items[index]?.querySelector('ytmusic-play-button-renderer')?.click()
}

function getRecentContextItem(index) {
	const wrapper = document.querySelector('ytmusic-carousel-shelf-renderer #items-wrapper ul#items')
	if (!wrapper) return null

	return [...wrapper.querySelectorAll('ytmusic-two-row-item-renderer')][index]
}

function startRecentItemRadio(index) {
	let element = getRecentContextItem(index)
	if (!element) return

	observeContextMenu('ytmusic-popup-container', contextMenu => {
		findContextNavigationItem(contextMenu, 'start radio', 5).then(item => item?.click())
	})
	rightClick(element)
	if (!$('tp-yt-iron-dropdown[aria-hidden="true"]')) rightClick(element)
}

function playRecentItemNext(index) {
	let element = getRecentContextItem(index)
	if (!element) return

	observeContextMenu('ytmusic-popup-container', contextMenu => {
		findContextServiceItem(contextMenu, 'play next', 5).then(item => item?.click())
	})
	rightClick(element)
	if (!$('tp-yt-iron-dropdown[aria-hidden="true"]')) rightClick(element)
}

function addRecentItemToQueue(index) {
	let element = getRecentContextItem(index)
	if (!element) return

	observeContextMenu('ytmusic-popup-container', contextMenu => {
		findContextServiceItem(contextMenu, 'add to queue', 5).then(item => item?.click())
	})
	rightClick(element)
	if (!$('tp-yt-iron-dropdown[aria-hidden="true"]')) rightClick(element)
}

function getPlaylistContextItem(song, index) {
	if (song) {
		const wrapper = document.querySelector('[main-page-type="MUSIC_PAGE_TYPE_PLAYLIST"] #contents.ytmusic-section-list-renderer')
		if (!wrapper) return []

		return [...wrapper.querySelectorAll('ytmusic-responsive-list-item-renderer')][index]
	} else {
		const wrapper = getPlaylistsWrapper()
		if (!wrapper) return []

		return [...wrapper.querySelectorAll('ytmusic-two-row-item-renderer')][index]
	}
}

function startPlaylistItemRadio(song, index) {
	let element = getPlaylistContextItem(song, index)
	if (!element) return

	observeContextMenu('ytmusic-popup-container', contextMenu => {
		findContextNavigationItem(contextMenu, 'start radio', 5).then(item => item?.click())
	})
	rightClick(element)
	if (!$('tp-yt-iron-dropdown[aria-hidden="true"]')) rightClick(element)
}

function playPlaylistItemNext(song, index) {
	let element = getPlaylistContextItem(song, index)
	if (!element) return

	observeContextMenu('ytmusic-popup-container', contextMenu => {
		findContextServiceItem(contextMenu, 'play next', 5).then(item => item?.click())
	})
	rightClick(element)
	if (!$('tp-yt-iron-dropdown[aria-hidden="true"]')) rightClick(element)
}

function addPlaylistItemToQueue(song, index) {
	let element = getPlaylistContextItem(song, index)
	if (!element) return

	observeContextMenu('ytmusic-popup-container', contextMenu => {
		findContextServiceItem(contextMenu, 'add to queue', 5).then(item => item?.click())
	})
	rightClick(element)
	if (!$('tp-yt-iron-dropdown[aria-hidden="true"]')) rightClick(element)
}

async function openPlaylist(index) {
	await observerContents(cancel => {
		const wrapper = getPlaylistsWrapper()
		if (!wrapper) return cancel()

		const playlists = [...wrapper.querySelectorAll('ytmusic-two-row-item-renderer')]

		playlists[index]?.querySelector('.title-group .title a')?.click()
	})
}

function getPlaylistContent() {
	const wrapper = document.querySelector('[main-page-type="MUSIC_PAGE_TYPE_PLAYLIST"] #contents.ytmusic-section-list-renderer')
	if (!wrapper) return []

	const items = [...wrapper.querySelectorAll('ytmusic-responsive-list-item-renderer')]

	return items.map((item, index) => {
		if (item.__data.unplayable_) return {remove: true}
		const {
			playlistItemData: {videoId},
			thumbnail: {musicThumbnailRenderer: {thumbnail: {thumbnails}}}
		} = item.data

		return {
			index: index,
			videoId,
			thumbnails,
			title: cleanupName(item.querySelector('yt-formatted-string.title').innerText),
			artist: item.querySelector('.secondary-flex-columns yt-formatted-string').title
		}
	}).filter(item => !item.remove)
}

function playPlaylist(shuffle, index) {
	if (shuffle) document.querySelector('ytmusic-menu-renderer yt-button-renderer tp-yt-paper-button')?.click()
	else {
		const items = [...document.querySelectorAll('[main-page-type="MUSIC_PAGE_TYPE_PLAYLIST"] #contents.ytmusic-section-list-renderer ytmusic-responsive-list-item-renderer')]
		items[index ?? 0]?.querySelector('ytmusic-play-button-renderer yt-icon')?.click()
	}
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
