const {ipcMain} = require("electron");

const {WebSocketServer} = require('ws')
const getSongControls = require('../../providers/song-controls');
const registerCallback = require("../../providers/song-info");
const {hasJsonStructure} = require("../utils");
const {fetchFromGenius} = require("../lyrics-genius/back");

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
		ipcMain.on('returnQueue', (_, queue) => {
			ws.send(JSON.stringify({action: 'queue', data: queue}))
		})
		ipcMain.on('audioData', (_, audioData) => {
			ws.send(JSON.stringify({action: 'audioData', data: audioData}))
		})
	})

	ipcMain.on('close', () => {
		wss.close()
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
				case 'playlistId':
					if (json.data) {
						const {playlistId} = json.data

						win.webContents.loadURL(`https://music.youtube.com/watch?list=${playlistId}`)
					}
					break;
				case 'queueVideoId':
					if (json.data) {
						const {videoId} = json.data

						win.webContents.send('playQueueItemById', videoId)
					}
					break;
				case 'startQueueItemRadio':
					if (json.data) {
						const {videoId} = json.data

						win.webContents.send('startQueueItemRadio', videoId)
					}
					break;
				case 'playQueueItemNext':
					if (json.data) {
						const {videoId} = json.data

						win.webContents.send('playQueueItemNext', videoId)
					}
					break;
				case 'addQueueItemToQueue':
					if (json.data) {
						const {videoId} = json.data

						win.webContents.send('addQueueItemToQueue', videoId)
					}
					break;
				case 'removeQueueItemFromQueue':
					if (json.data) {
						const {videoId, position} = json.data

						win.webContents.send('removeQueueItemFromQueue', {videoId, position})
					}
					break;
				case 'requestQueue':
					win.webContents.send('requestQueue')
					break;
				case 'requestLyrics':
					fetchFromGenius({
						title: currentSongInfo.title,
						artist: currentSongInfo.artist,
					}).then(lyrics => {
						if (lyrics && lyrics.length) ws.send(JSON.stringify({action: 'lyrics', data: {lyrics}}))
					})
					break;
				case 'requestSongInfo':
					ws.send(JSON.stringify({action: 'songInfo', data: currentSongInfo}))
					break;
				case 'requestPlaylists':
					ipcMain.once('playlists', (_, data) => {
						ws.send(JSON.stringify({
							action: 'playlists',
							data
						}))
					})
					win.webContents.send('requestPlaylists')
					break;
				case 'requestPlaylist':
					if (json.data) {
						const {index} = json.data
						ipcMain.once('playlist', (_, data) => {
							ws.send(JSON.stringify({
								action: 'playlist',
								data
							}))
						})
						win.webContents.send('requestPlaylist', index)
					}
					break;
				case 'playPlaylist':
					if (json.data) {
						const {shuffle, index} = json.data

						win.webContents.send('playPlaylist', {shuffle, index})
					}
					break;
				case 'search':
					if (json.data) {
						const {query} = json.data

						ipcMain.once('searchMainResults', (_, data) => {
							ws.send(JSON.stringify({
								action: 'searchMainResults',
								data
							}))
						})

						controls.search()
						win.webContents.send('search', query)
					}
					break;
				case 'showShelf':
					if (json.data) {
						const {index} = json.data

						ipcMain.once('showShelfResults', (_, data) => {
							ws.send(JSON.stringify({
								action: 'showShelfResults',
								data
							}))
						})

						controls.search()
						win.webContents.send('showShelf', index)
					}
					break;
				case 'playSearchSong':
					if (json.data) {
						const {index, shelf} = json.data

						win.webContents.send('playSearchSong', {index, shelf})
					}
					break;
				case 'playRecentItem':
					if (json.data) {
						const {index} = json.data

						win.webContents.send('playRecentItem', index)
					}
					break;
				case 'searchContextMenu':
					if (json.data) {
						const {index, shelf, action} = json.data

						win.webContents.send('searchContextMenu', {index, shelf, action})
					}
					break;
				case 'playlistContextMenu':
					if (json.data) {
						const {index, song, action} = json.data

						win.webContents.send('playlistContextMenu', {index, song, action})
					}
					break;
				case 'recentContextMenu':
					if (json.data) {
						const {index, action} = json.data

						win.webContents.send('contextRecentItem', {index, action})
					}
					break;
				case 'selectSearchTab':
					if (json.data) {
						const {index} = json.data

						ipcMain.once('searchMainResults', (_, data) => {
							ws.send(JSON.stringify({
								action: 'searchMainResults',
								data
							}))
						})

						win.webContents.send('selectSearchTab', index)
					}
					break;
				case 'openPlayer':
					win.webContents.send('openPlayer')
					break;
				case 'searchOpened':
					if (json.data) {
						const {text} = json.data

						ipcMain.once('searchSuggestions', (_, data) => {
							ws.send(JSON.stringify({
								action: 'searchSuggestions',
								data
							}))
						})

						ipcMain.once('openSearch', (_) =>  {
							controls.search()
						})

						win.webContents.send('searchOpened', text)
					}
					break;
			}
		}
	})
}

module.exports.port = port
