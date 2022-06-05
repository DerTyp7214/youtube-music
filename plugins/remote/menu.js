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
					webPreferences: {
						nodeIntegration: true,
						contextIsolation: false,
					}
				})

				require("@electron/remote/main").enable(window.webContents)

				window.loadFile(path.join(__dirname, 'index.html'))
			},
		},
	];
};
