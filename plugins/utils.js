const fs = require("fs")
const path = require("path")

const {ipcMain, ipcRenderer} = require("electron")
const {rgbToCIELab} = require('@vibrant/color/lib/converter')

// Creates a DOM element from a HTML string
module.exports.ElementFromHtml = (html) => {
	var template = document.createElement("template");
	html = html.trim(); // Never return a text node of whitespace as the result
	template.innerHTML = html;
	return template.content.firstChild;
};

// Creates a DOM element from a HTML file
module.exports.ElementFromFile = (filepath) => {
	return module.exports.ElementFromHtml(fs.readFileSync(filepath, "utf8"));
};

module.exports.templatePath = (pluginPath, name) => {
	return path.join(pluginPath, "templates", name);
};

module.exports.triggerAction = (channel, action, ...args) => {
	return ipcRenderer.send(channel, action, ...args);
};

module.exports.triggerActionSync = (channel, action, ...args) => {
	return ipcRenderer.sendSync(channel, action, ...args);
};

module.exports.listenAction = (channel, callback) => {
	return ipcMain.on(channel, callback);
};

module.exports.fileExists = (path, callbackIfExists) => {
	fs.access(path, fs.F_OK, (err) => {
		if (err) {
			return;
		}

		callbackIfExists();
	});
};

const cssToInject = new Map();
module.exports.injectCSS = (webContents, filepath, cb = undefined) => {
	if (!cssToInject.size) setupCssInjection(webContents);

	cssToInject.set(filepath, cb);
};

const setupCssInjection = (webContents) => {
	webContents.on("did-finish-load", () => {
		cssToInject.forEach(async (cb, filepath) => {
			await webContents.insertCSS(fs.readFileSync(filepath, "utf8"));
			cb?.();
		})
	});
}

module.exports.getAllPlugins = () => {
	const isDirectory = (source) => fs.lstatSync(source).isDirectory();
	return fs
		.readdirSync(__dirname)
		.map((name) => path.join(__dirname, name))
		.filter(isDirectory)
		.map((name) => path.basename(name));
};

module.exports.hasJsonStructure = (str) => {
	if (typeof str !== 'string') return false;
	try {
		const result = JSON.parse(str);
		const type = Object.prototype.toString.call(result);
		return type === '[object Object]'
			|| type === '[object Array]';
	} catch (err) {
		return false;
	}
}

module.exports.getAverageRGB = (imgEl) => {
	let blockSize = 5,
		defaultRGB = {r: 0, g: 0, b: 0},
		canvas = document.createElement('canvas'),
		context = canvas.getContext && canvas.getContext('2d'),
		data, width, height,
		i = -4,
		length,
		rgb = {r: 0, g: 0, b: 0},
		count = 0

	if (!context) return defaultRGB

	height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height
	width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width

	context.drawImage(imgEl, 0, 0)

	data = context.getImageData(0, 0, width, height)

	length = data.data.length;

	while ((i += blockSize * 4) < length) {
		++count
		rgb.r += data.data[i]
		rgb.g += data.data[i + 1]
		rgb.b += data.data[i + 2]
	}

	rgb.r = ~~(rgb.r / count)
	rgb.g = ~~(rgb.g / count)
	rgb.b = ~~(rgb.b / count)

	return rgb
}
