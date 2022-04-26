const {ipcRenderer} = require("electron");
const is = require('electron-is');
const {getImage} = require("./song-info");

const config = require("../config");

global.songInfo = {};

const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));

ipcRenderer.on("update-song-info", async (_, extractedSongInfo) => {
	global.songInfo = JSON.parse(extractedSongInfo);
	global.songInfo.image = await getImage(global.songInfo.imageSrc);
});

// used because 'loadeddata' or 'loadedmetadata' weren't firing on song start for some users (https://github.com/th-ch/youtube-music/issues/473)
const srcChangedEvent = new CustomEvent('srcChanged');

module.exports = () => {
	document.addEventListener('apiLoaded', apiEvent => {
		if (config.plugins.isEnabled('tuna-obs') ||
			(is.linux() && config.plugins.isEnabled('shortcuts'))) {
			setupTimeChangeListener();
		}
		const video = $('video');
		// name = "dataloaded" and abit later "dataupdated"
		apiEvent.detail.addEventListener('videodatachange', (name, _dataEvent) => {
			if (name !== 'dataloaded') return;
			video.dispatchEvent(srcChangedEvent);
			sendSongInfo();
		})

		const like = $('.like.ytmusic-like-button-renderer')
		const dislike = $('.dislike.ytmusic-like-button-renderer')
		const repeat = $('ytmusic-player-bar.ytmusic-app')
		const playPause = $('#play-pause-button')
		const progress = $('#progress-bar')

		for (const status of ['playing', 'pause']) {
			video.addEventListener(status, e => {
				if (Math.round(e.target.currentTime) > 0) {
					ipcRenderer.send("playPaused", {
						isPaused: status === 'pause',
						elapsedSeconds: progress.value,
						fields: parseClickableLinks()
					});
				}
			});
		}

		const observer = new MutationObserver(() => {
			ipcRenderer.send("playerStatus", {
				isLiked: like.ariaPressed === 'true',
				isDisliked: dislike.ariaPressed === 'true',
				repeatMode: repeat.repeatMode_
			})
		})

		observer.observe(like, {attributes: true, attributeFilter: ['aria-pressed']})
		observer.observe(dislike, {attributes: true, attributeFilter: ['aria-pressed']})
		observer.observe(repeat, {attributes: true, attributeFilter: ['repeat-mode_']})

		const progressObserver = new MutationObserver(mutations => {
			ipcRenderer.send("elapsedSecondsChanged", {
				elapsedSeconds: mutations[0].target.value,
				volume: apiEvent.detail.getVolume(),
				fields: parseClickableLinks(),
				isPaused: playPause.ariaLabel !== 'Pause'
			})
		});

		progressObserver.observe(progress, {attributeFilter: ["value"]})

		let interval = setInterval(() => {
			const volume = apiEvent.detail.getVolume()
			const isMuted = apiEvent.detail.isMuted()
			if (global.songInfo.volume !== volume || global.songInfo.isMuted !== isMuted) ipcRenderer.send('frontVolumeChange', {
				volume,
				isMuted
			})
			global.songInfo.volume = volume
			global.songInfo.isMuted = isMuted
		}, 100)

		function parseClickableLinks() {
			const fields = []

			const parent = $('.content-info-wrapper.ytmusic-player-bar .byline.ytmusic-player-bar')

			if (parent) for (let field of parent.getElementsByTagName('a'))
				fields.push({link: field.href, text: field.innerText})

			return fields
		}

		function sendSongInfo() {
			const data = apiEvent.detail.getPlayerResponse();

			data.videoDetails.album = $$(
				".byline.ytmusic-player-bar > .yt-simple-endpoint"
			).find(e => e.href?.includes("browse"))?.textContent;

			data.videoDetails.elapsedSeconds = Math.floor(video.currentTime);
			data.videoDetails.isPaused = false;
			data.videoDetails.fields = parseClickableLinks()
			ipcRenderer.send("video-src-changed", JSON.stringify(data));
		}
	}, {once: true, passive: true});
};

function setupTimeChangeListener() {
	const progressObserver = new MutationObserver(mutations => {
		ipcRenderer.send('timeChanged', mutations[0].target.value);
		global.songInfo.elapsedSeconds = mutations[0].target.value;
	});
	progressObserver.observe($('#progress-bar'), {attributeFilter: ["value"]})
}
