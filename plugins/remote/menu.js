const {BrowserWindow} = require("electron");
const path = require("path");

module.exports = () => {
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
	];
};
