const {BrowserWindow} = require("electron");
const path = require("path");
const {setMenuOptions, getOptions} = require("../../config/plugins");
const prompt = require("custom-electron-prompt");
const promptOptions = require("../../providers/prompt-options");

module.exports = (win, options) => {
	return [
		{
			label: "Open QR Code",
			click: () => {
				const window = new BrowserWindow({
					width: 1000,
					height: 600,
					autoHideMenuBar: true,
					nodeIntegrationInSubFrames: true,
					webPreferences: {
						nodeIntegration: true,
						contextIsolation: false,
					}
				})

				window.loadFile(path.join(__dirname, 'index.html'))
			},
		},
		{
			label: "Change port",
			click: () => {
				setPort(win, options)
			}
		}
	];
};

async function setPort(win, options) {
	const output = await prompt({
		title: 'Set Port',
		label: 'Enter Port',
		value: getOptions('remote')?.port ?? 8080,
		type: 'input',
		inputAttrs: {
			type: 'number',
			placeholder: "Example: 8080"
		},
		width: 450,
		...promptOptions()
	}, win);

	setOption(options, 'port', output)
}

function setOption(options, key = null, newValue = null) {
	if (key && newValue !== null) {
		options[key] = newValue;
	}

	setMenuOptions("remote", options);
}
