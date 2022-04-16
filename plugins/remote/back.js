const {WebSocketServer} = require('ws')
const {ipcMain} = require('electron')

const getSongControls = require('../../providers/song-controls');
const registerCallback = require("../../providers/song-info");
const {hasJsonStructure} = require("../utils");

let controls
let currentSongInfo

module.exports = (win, options) => {
	controls = getSongControls(win);

	const wss = new WebSocketServer({port: 8080})

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
			}
		}
	})
}
