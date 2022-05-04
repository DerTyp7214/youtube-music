const ColorThief = require('colorthief')

const $ = (s, d) => (d ?? document).querySelector(s)

function getColorFromImage(img) {
	const context = document.createElement('canvas').getContext('2d')
	if (typeof img == 'string') {
		const src = img
		img = new Image()
		img.setAttribute('crossOrigin', 'Anonymous')
		img.src = src
	} else img.setAttribute('crossOrigin', 'Anonymous')
	context.imageSmoothingEnabled = true
	context.drawImage(img, 0, 0, 1, 1)
	return context.getImageData(0, 0, 1, 1).data.slice(0, 3)
}

module.exports = () => {
	document.addEventListener('apiLoaded', apiEvent => {
		const imageWrapper = $('#player')
		const image = $('img', imageWrapper)

		const css = color => `display:block;border-radius:23px;border: 2px solid ${color};box-shadow: 0px 0px 8px 0px ${color};`
		const rgbToHex = (rgb) => '#' + ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1)
		const addStyle = (image, imageWrapper) => imageWrapper.style = css(rgbToHex(getColorFromImage(image)))

		if (image.complete) addStyle(image, imageWrapper)
		image.addEventListener('load', () => {
			addStyle(image, imageWrapper)
		})
	})

	const style = document.createElement('style')
	style.innerText = `ytmusic-app {
	--ytmusic-player-bar-background: #0f0f11
}

ytmusic-player-page.ytmusic-app {
	background: rgba(0, 0, 0, .8);
	backdrop-filter: blur(20px)
}

.content.ytmusic-player-page {
	visibility: visible;
	background: 0 0
}

.image.ytmusic-player-bar {
	border-radius: 8px;
	transform: translate3d(0, 0, 1px)
}

ytmusic-player-queue {
	padding: 10px 0
}

tp-yt-paper-icon-button.ytmusic-settings-button {
	width: 40px;
	height: 40px
}

#browse-page, #browse-page[hidden], #search-page, #search-page[hidden], ytmusic-browse-response[hidden], ytmusic-browse-response[hidden][hidden] {
	display: block !important;
	visibility: visible !important
}

ytmusic-tab-renderer.ytmusic-player-page {
	padding-right: 12px;
	margin-right: -10px
}

ytmusic-player-queue-item {
	--ytmusic-player-queue-item-thumbnail-size: 42px !important;
	--ytmusic-list-item-height: 58px;
	border-radius: 8px;
	transform: translate3d(0, 0, 1px);
	border: 0;
	opacity: .825
}

ytmusic-player-queue-item:not(:last-child) {
	margin-bottom: 8px
}

ytmusic-player-queue-item:hover:not([selected]) {
	background-color: rgba(249, 249, 255, .05);
	opacity: 1
}

.thumbnail-overlay, .thumbnail.ytmusic-player-queue-item, .ytmusic-play-button-renderer, ytmusic-two-row-item-renderer.ytmusic-carousel {
	border-radius: 8px;
	overflow: hidden;
	transform: translate3d(0, 0, 1px)
}

ytmusic-player-bar.ytmusic-app {
	background: 0 0
}

#player-bar-background.ytmusic-app-layout {
	background-color: rgba(0, 0, 0, .92);
	-webkit-backdrop-filter: blur(10px);
	backdrop-filter: blur(10px)
}

#song-image.ytmusic-player, .song-media-controls.ytmusic-player, ytmusic-player.ytmusic-player-page {
	border-radius: 8px;
	overflow: hidden;
	transform: translate3d(0, 0, 1px)
}

tp-yt-paper-dialog, tp-yt-paper-listbox.ytmusic-menu-popup-renderer {
	background-color: rgba(0, 0, 0, .6);
	backdrop-filter: blur(10px);
	border: 0;
	box-shadow: 0 4.1px 5.3px rgba(0, 0, 0, .028), 0 13.6px 17.9px rgba(0, 0, 0, .042), 0 61px 80px rgba(0, 0, 0, .07);
	border-radius: 8px
}`
	document.head.append(style)
}
