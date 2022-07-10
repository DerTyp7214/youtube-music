const Vibrant = require('node-vibrant/dist/vibrant')
const {getAverageRGB} = require("../utils")
const {rgbDiff, DELTAE94_DIFF_STATUS} = require("@vibrant/color/lib/converter")

const $ = (s, d) => (d ?? document).querySelector(s)

const CanvasImage = function (element, image) {
	this.image = image
	this.element = element
	this.element.width = this.image.width
	this.element.height = this.image.height
	this.context = this.element.getContext('2d')
	this.context.drawImage(this.image, 0, 0)
}
CanvasImage.prototype = {
	blur: function (strength) {
		this.context.globalAlpha = 0.5
		for (let y = -strength; y <= strength; y += 2) {
			for (let x = -strength; x <= strength; x += 2) {
				this.context.drawImage(this.element, x, y)
				if (x >= 0 && y >= 0) this.context.drawImage(this.element, -(x - 1), -(y - 1))
			}
		}
		this.context.globalAlpha = 1.0
	},
	darken: function (amount) {
		this.context.fillStyle = `rgba(0, 0, 0, ${amount})`
		this.context.fillRect(0, 0, this.element.width, this.element.height)
	},
	data: function () {
		return this.context.getImageData(0, 0, this.element.width, this.element.height).data
	}
}

module.exports = () => {
	document.addEventListener('apiLoaded', () => {
		const imageWrapper = $('#player')
		const image = $('img', imageWrapper)

		const style = document.createElement('style')
		document.head.append(style)

		const rgbToHex = (rgb) => '#' + ((1 << 24) + (Math.floor(rgb[0]) << 16) + (Math.floor(rgb[1]) << 8) + Math.floor(rgb[2])).toString(16).slice(1)
		const addStyle = (image, imageWrapper) => Vibrant.from(image).getPalette().then(palette => {
			try {
				const {r: aR, g: aG, b: aB} = getAverageRGB(image)
				const [vR, vG, vB] = palette.Vibrant.rgb
				const [dvR, dvG, dvB] = palette.DarkVibrant.rgb
				const [lvR, lvG, lvB] = palette.LightVibrant.rgb

				const color = rgbToHex([vR, vG, vB])
				const colorDark = rgbToHex(palette.DarkVibrant.rgb)
				const colorLight = rgbToHex(palette.LightVibrant.rgb)
				const averageColor = rgbToHex([aR, aG, aB])

				const colorDiffV = rgbDiff([aR, aG, aB], [vR, vG, vB])
				const colorDiffDV = rgbDiff([aR, aG, aB], [dvR, dvG, dvB])
				const colorDiffLV = rgbDiff([aR, aG, aB], [lvR, lvG, lvB])

				const similarV = colorDiffV < DELTAE94_DIFF_STATUS.GOOD
				const similarDV = colorDiffDV < DELTAE94_DIFF_STATUS.GOOD
				const similarLV = colorDiffLV < DELTAE94_DIFF_STATUS.GOOD

				const calculatedColor = similarV ?
					similarDV ?
						similarLV ?
							rgbToHex([0xff - aR, 0xff - aG, 0xff - aB]) :
							rgbToHex([lvR, lvG, lvB]) :
						rgbToHex([dvR, dvG, dvB]) :
					rgbToHex([vR, vG, vB])

				style.textContent = `#progress-bar.ytmusic-player-bar[focused], ytmusic-player-bar:hover #progress-bar.ytmusic-player-bar {
				--paper-slider-knob-color: var(--calculated-cover-color);
				--paper-slider-knob-start-color: var(--calculated-cover-color);
				--paper-slider-knob-start-border-color: var(--calculated-cover-color);
			}
			#progress-bar.ytmusic-player-bar {
				--paper-slider-active-color: var(--calculated-cover-color);
			}

			body {
				--vibrant-cover-color: ${color};
				--dark-vibrant-cover-color: ${colorDark};
				--light-vibrant-cover-color: ${colorLight};
				--average-cover-color: ${averageColor};
				--calculated-cover-color: ${calculatedColor};
			}`
				imageWrapper.style = 'display:block;border-radius:23px;border: 2px solid var(--calculated-cover-color);box-shadow: 0px 0px 8px 0px var(--calculated-cover-color);'
			} catch (_) {
			}
		}).catch(console.log)

		image.setAttribute('crossOrigin', 'Anonymous')
		if (image.complete) addStyle(image, imageWrapper)
		image.addEventListener('load', () => {
			addStyle(image, imageWrapper)
			parseCover(image)
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

function parseCover(cover) {
	const playerPage = document.querySelector('ytmusic-player-page')
	if (!cover || !playerPage) return

	const size = 200

	const image = new Image(size, size)
	image.onload = () => {
		let style = document.querySelector('#cover-style')
		if (!style) {
			style = document.createElement('style')
			style.id = 'cover-style'
			document.head.append(style)
		}

		const canvas = document.createElement('canvas')
		const canvasImage = new CanvasImage(canvas, image)
		canvasImage.blur(6)

		const data = canvasImage.data()
		let colorSum = 0
		for (let x = 0, len = data.length; x < len; x += 4) {
			colorSum += Math.floor((data[x] + data[x + 1] + data[x + 2]) / 3)
		}

		const luminance = Math.floor(colorSum / (size * size))

		canvasImage.darken(.7 * ((1 / 256) * luminance))

		const url = canvas.toDataURL()

		style.textContent = `body { --cover-blurred: url(${url}); }`

		playerPage.style.backgroundImage = `var(--cover-blurred)`
		playerPage.style.backgroundPosition = 'center'
		playerPage.style.backgroundSize = 'cover'

		canvas.remove()
		image.remove()
	}

	const oc = document.createElement('canvas'), octx = oc.getContext('2d')
	oc.width = cover.width
	oc.height = cover.height
	octx.drawImage(cover, 0, 0)
	while (oc.width * 0.5 > size) {
		oc.width *= 0.5
		oc.height *= 0.5
		octx.drawImage(oc, 0, 0, oc.width, oc.height)
	}
	oc.width = size
	oc.height = oc.width * cover.height / cover.width
	octx.drawImage(cover, 0, 0, oc.width, oc.height)
	image.src = oc.toDataURL()
}
