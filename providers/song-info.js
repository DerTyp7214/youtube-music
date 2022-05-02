const {ipcMain, nativeImage} = require("electron");

const fetch = require("node-fetch");

const config = require("../config");

// Fill songInfo with empty values
/**
 * @typedef {songInfo} SongInfo
 */
const songInfo = {
	title: "",
	artist: "",
	views: 0,
	uploadDate: "",
	imageSrc: "",
	image: null,
	isPaused: undefined,
	songDuration: 0,
	elapsedSeconds: 0,
	url: "",
	album: undefined,
	videoId: "",
	playlistId: "",
	liked: false,
	disliked: false,
	repeatMode: "NONE",
	fields: [],
	volume: 0,
	isMuted: false
};

// Grab the native image using the src
const getImage = async (src) => {
	const result = await fetch(src);
	const buffer = await result.buffer();
	const output = nativeImage.createFromBuffer(buffer);
	if (output.isEmpty() && !src.endsWith(".jpg") && src.includes(".jpg")) { // fix hidden webp files (https://github.com/th-ch/youtube-music/issues/315)
		return getImage(src.slice(0, src.lastIndexOf(".jpg") + 4));
	} else {
		return output;
	}
};

const handleData = async (responseText, win) => {
	const data = JSON.parse(responseText);
	if (!data) return;

	const microformat = data.microformat?.microformatDataRenderer;
	if (microformat) {
		songInfo.uploadDate = microformat.uploadDate;
		songInfo.url = microformat.urlCanonical?.split("&")[0];
		songInfo.playlistId = new URL(microformat.urlCanonical).searchParams.get("list");
		// used for options.resumeOnStart
		config.set("url", microformat.urlCanonical);
	}

	const videoDetails = data.videoDetails;
	if (videoDetails) {
		songInfo.title = cleanupName(videoDetails.title);
		songInfo.artist = cleanupName(videoDetails.author);
		songInfo.views = videoDetails.viewCount;
		songInfo.songDuration = videoDetails.lengthSeconds;
		songInfo.elapsedSeconds = videoDetails.elapsedSeconds;
		songInfo.isPaused = videoDetails.isPaused;
		songInfo.videoId = videoDetails.videoId;
		songInfo.album = data?.videoDetails?.album; // Will be undefined if video exist
		songInfo.fields = videoDetails.fields

		const oldUrl = songInfo.imageSrc;
		songInfo.imageSrc = videoDetails.thumbnail?.thumbnails?.pop()?.url.split("?")[0];
		if (oldUrl !== songInfo.imageSrc) {
			songInfo.image = await getImage(songInfo.imageSrc);
		}

		win.webContents.send("update-song-info", JSON.stringify(songInfo));
	}
};

// This variable will be filled with the callbacks once they register
const callbacks = [];

// This function will allow plugins to register callback that will be triggered when data changes
/**
 * @callback songInfoCallback
 * @param {songInfo} songInfo
 * @returns {void}
 */
/**
 * @param {songInfoCallback} callback
 */
const registerCallback = (callback) => {
	callbacks.push(callback);
};

let handlingData = false;

const registerProvider = (win) => {
	// This will be called when the song-info-front finds a new request with song data
	ipcMain.on("video-src-changed", async (_, responseText) => {
		handlingData = true;
		await handleData(responseText, win);
		handlingData = false;
		callbacks.forEach((c) => {
			c(songInfo);
		});
	});
	ipcMain.on("playPaused", (_, {isPaused, elapsedSeconds, fields}) => {
		songInfo.isPaused = isPaused;
		songInfo.elapsedSeconds = elapsedSeconds;
		songInfo.fields = fields
		if (handlingData) return;
		callbacks.forEach((c) => {
			c(songInfo);
		});
	})
	ipcMain.on("playerStatus", (_, {isLiked, isDisliked, repeatMode}) => {
		songInfo.liked = isLiked
		songInfo.disliked = isDisliked
		songInfo.repeatMode = repeatMode
		callbacks.forEach((c) => {
			c(songInfo)
		})
	})
	ipcMain.on("elapsedSecondsChanged", (_, {elapsedSeconds, volume, fields, isPaused}) => {
		songInfo.elapsedSeconds = elapsedSeconds
		songInfo.volume = volume
		songInfo.fields = fields
		songInfo.isPaused = isPaused
		callbacks.forEach((c) => {
			c(songInfo)
		})

		if (win) {
			const progress = 1 / Number(songInfo.songDuration) * Number(songInfo.elapsedSeconds)
			if (process.platform === 'win32') {
				win.setProgressBar(progress, {
					mode: songInfo.isPaused ? 'paused' : 'normal'
				})
			} else win.setProgressBar(progress)
		}
	})
	ipcMain.on("frontVolumeChange", (_, {volume, isMuted}) => {
		songInfo.volume = volume
		songInfo.isMuted = isMuted
		callbacks.forEach((c) => {
			c(songInfo)
		})
	})
};

const suffixesToRemove = [
	" - topic",
	"vevo",
	" (performance video)",
	" (clip officiel)",
	" (epic trailer version)",
	" (trailer version",
	" [bonus track]",
	" [clean]"
];

function cleanupName(name) {
	if (!name) return name;
	const index = name.indexOf('(feat.')
	if (index > 0) name = name.slice(0, index)
	name = name.replace(/\((?:official)?[ ]?(?:music)?[ ]?(?:lyric[s]?)?[ ]?(?:video)?[ ]?(?:radio)?[ ]?(?:edit)?[ ]?(?:single)?(?:version)?[ ]?[ ]?(?:remastered [0-9]{0,})?[ ]?(?:offizielles)?[ ]?(?:musikvideo)?\)$/i, '')
	const lowCaseName = name.toLowerCase();
	for (const suffix of suffixesToRemove) {
		if (lowCaseName.endsWith(suffix)) {
			return name.slice(0, -suffix.length);
		}
	}
	return name;
}

module.exports = registerCallback;
module.exports.setupSongInfo = registerProvider;
module.exports.getImage = getImage;
module.exports.cleanupName = cleanupName;
