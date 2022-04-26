const {WebSocketServer} = require('ws')

const getSongControls = require('../../providers/song-controls');
const registerCallback = require("../../providers/song-info");
const {hasJsonStructure} = require("../utils");

let port = 8080

let controls
let currentSongInfo

module.exports = (win) => {
	controls = getSongControls(win);

	const wss = new WebSocketServer({port})

	registerCallback(songInfo => {
		currentSongInfo = songInfo
		wss.clients.forEach(client => client.send(JSON.stringify({action: 'songInfo', data: songInfo})))
	});

	wss.on('connection', (ws) => {
		connected(ws, win)
	})
}

function connected(ws, win) {
	if (currentSongInfo) ws.send(JSON.stringify({action: 'songInfo', data: currentSongInfo}))

	ws.on('message', data => {
		if (hasJsonStructure(data.toString())) {
			const json = JSON.parse(data)

			switch (json.action) {
				case 'status':
					ws.send(JSON.stringify({action: 'status', data: {name: 'ytmd'}}))
					break;
				case 'playPause':
					controls.playPause()
					break;
				case 'next':
					controls.next()
					break;
				case 'previous':
					controls.previous()
					break;
				case 'like':
					controls.like()
					break;
				case 'dislike':
					controls.dislike()
					break;
				case 'muteUnmute':
					controls.muteUnmute()
					break;
				case 'switchRepeat':
					controls.switchRepeat()
					break;
				case 'shuffle':
					controls.shuffle()
					break;

				case 'seek':
					if (json.data) {
						const {elapsedSeconds} = json.data

						win.webContents.send('seekTo', elapsedSeconds)
					}
					break;
				case 'volume':
					if (json.data) {
						const {volume} = json.data

						win.webContents.send('volumeChange', volume)
					}
					break;
				case 'videoId':
					if (json.data) {
						const {videoId} = json.data

						win.webContents.loadURL(`https://music.youtube.com/watch?v=${videoId}`)
					}
					break;
			}
		}
	})
}

module.exports.port = port
