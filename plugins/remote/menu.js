const {BrowserWindow} = require("electron");
const path = require("path");

module.exports = (win, options, refreshMenu) => {

	return [
		{
			label: "Open QR Code",
			click: () => {
				const window = new BrowserWindow({
					width: 500,
					height: 500,
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
