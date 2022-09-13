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
			setupRepeatChangeListener();
			setupVolumeChangeListener(apiEvent.detail);
		}
		// name = "dataloaded" and abit later "dataupdated"
		apiEvent.detail.addEventListener('videodatachange', (name, _dataEvent) => {
			if (name !== 'dataloaded') return;
			$('video').dispatchEvent(srcChangedEvent);
			sendSongInfo();
		})

		const like = $('.like.ytmusic-like-button-renderer')
		const dislike = $('.dislike.ytmusic-like-button-renderer')
		const repeat = $('ytmusic-player-bar.ytmusic-app')
		const progress = $('#progress-bar')

		const playPauseObserver = new MutationObserver(() => {
			const args = {
				isPaused: $('video').paused,
				elapsedSeconds: progress.value,
				fields: parseClickableLinks()
			}
			if (window.debug) console.log('playPaused', args)
			ipcRenderer.send("playPaused", args);
		})

		playPauseObserver.observe($('#play-pause-button'), {attributes: true, attributeFilter: ['aria-label']})

		const observer = new MutationObserver(() => {
			const args = {
				isLiked: like.ariaPressed === 'true',
				isDisliked: dislike.ariaPressed === 'true',
				repeatMode: repeat.repeatMode_
			}
			if (window.debug) console.log('playerStatus', args)
			ipcRenderer.send("playerStatus", args)
		})

		observer.observe(like, {attributes: true, attributeFilter: ['aria-pressed']})
		observer.observe(dislike, {attributes: true, attributeFilter: ['aria-pressed']})
		observer.observe(repeat, {attributes: true, attributeFilter: ['repeat-mode_']})

		const progressObserver = new MutationObserver(mutations => {
			const args = {
				elapsedSeconds: mutations[0].target.value,
				volume: apiEvent.detail.getVolume(),
				fields: parseClickableLinks(),
				isPaused: $('video').paused
			}
			if (window.debug) console.log('elapsedSecondsChanged', args)
			ipcRenderer.send("elapsedSecondsChanged", args)
		});

		progressObserver.observe(progress, {attributeFilter: ["value"]})

		let interval = setInterval(() => {
			const volume = apiEvent.detail.getVolume()
			const isMuted = apiEvent.detail.isMuted()
			if (global.songInfo.volume !== volume || global.songInfo.isMuted !== isMuted) {
				const args = {volume, isMuted}
				if (window.debug) console.log('frontVolumeChange', args)
				ipcRenderer.send('frontVolumeChange', args)
			}
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

			const video = $('video')

			data.videoDetails.album = $$(
				".byline.ytmusic-player-bar > .yt-simple-endpoint"
			).find(e => e.href?.includes("browse"))?.textContent;

			data.videoDetails.elapsedSeconds = Math.floor(video.currentTime);
			data.videoDetails.isPaused = video.paused;
			data.videoDetails.fields = parseClickableLinks()
			if (window.debug) console.log('video-src-changed', data)
			ipcRenderer.send("video-src-changed", JSON.stringify(data));
		}
	}, {once: true, passive: true});
};

function setupTimeChangeListener() {
	const progressObserver = new MutationObserver(mutations => {
		const elapsedSeconds = mutations[0].target.value
		if (window.debug) console.log('timeChanged', elapsedSeconds)
		ipcRenderer.send('timeChanged', elapsedSeconds);
		global.songInfo.elapsedSeconds = elapsedSeconds;
	});
	progressObserver.observe($('#progress-bar'), {attributeFilter: ["value"]})
}

function setupRepeatChangeListener() {
	const repeatObserver = new MutationObserver(mutations => {
		ipcRenderer.send('repeatChanged', mutations[0].target.title);
	});
	const repeatElement = $('#right-controls .repeat')

	repeatObserver.observe(repeatElement, { attributeFilter: ["title"] });

	// Emit the initial value as well; as it's persistent between launches.
	ipcRenderer.send('repeatChanged', repeatElement.title);
}

function setupVolumeChangeListener(api) {
	$('video').addEventListener('volumechange', (_) => {
		ipcRenderer.send('volumeChanged', api.getVolume());
	});
	// Emit the initial value as well; as it's persistent between launches.
	ipcRenderer.send('volumeChanged', api.getVolume());
}
