const {join} = require("path")

const {ipcMain} = require("electron")
const is = require("electron-is")
const {convert} = require("html-to-text")
const fetch = require("node-fetch")

const {cleanupName} = require("../../providers/song-info")
const {injectCSS} = require("../utils")

let lastLyrics = {}

module.exports = async (win) => {
	injectCSS(win.webContents, join(__dirname, "style.css"))

	ipcMain.on("search-genius-lyrics", async (event, extractedSongInfo) => {
		const metadata = JSON.parse(extractedSongInfo);
		event.returnValue = await fetchFromGenius(metadata)
	});
};

const fetchFromGenius = async (metadata) => {
	const queryString = `${cleanupName(
		metadata.title
	)} by ${cleanupName(metadata.artist)}`

	if (lastLyrics.queryString === queryString && lastLyrics.lyrics) return lastLyrics.lyrics

	let response = await fetch(
		`https://genius.com/api/search/multi?per_page=5&q=${encodeURI(queryString)}`
	)
	if (!response.ok) return null

	const info = await response.json()
	let url = ''
	try {
		const title = metadata.title.toLowerCase()
		const artist = metadata.artist.toLowerCase()
		const sections = info.response.sections
		const songs = sections.find(section => section.type === 'song')
		const hit = songs.hits.find(song =>
			(song.result.artist_names.toLowerCase().includes(artist) &&
				song.result.full_title.toLowerCase().includes(title)) ||
			(song.result.full_title.toLowerCase().includes(artist) &&
				song.result.full_title.toLowerCase().includes(title))
		) ?? songs.hits[0]
		if (hit) url = hit.result.url
	} catch {
		return null
	}

	if (is.dev()) console.log("Fetching lyrics from Genius:", url)

	if (url === '') return null
	response = await fetch(url)
	if (!response.ok) return null

	const html = await response.text()
	const lyrics = convert(html, {
		baseElements: {
			selectors: ['[class^="Lyrics__Container"]', ".lyrics"],
		},
		selectors: [
			{
				selector: "a",
				format: "linkFormatter",
			},
		],
		formatters: {
			// Remove links by keeping only the content
			linkFormatter: (elem, walk, builder) => {
				walk(elem.children, builder);
			},
		},
	})

	lastLyrics.lyrics = lyrics
	lastLyrics.queryString = queryString

	return lyrics
};

module.exports.fetchFromGenius = fetchFromGenius
