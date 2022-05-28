const Store = require("electron-store");

const defaults = require("./defaults");

const migrations = {
	">=1.17.3": (store) => {
		if (store.get("plugins.video-toggle.mode") === undefined) {
			store.set("plugins.video-toggle.mode", "custom");
		}
	},
	">=1.14.0": (store) => {
		if (
			typeof store.get("plugins.precise-volume.globalShortcuts") !== "object"
		) {
			store.set("plugins.precise-volume.globalShortcuts", {});
		}

		if (store.get("plugins.hide-video-player.enabled")) {
			store.delete("plugins.hide-video-player");
			store.set("plugins.video-toggle.enabled", true);
		}
	},
	">=1.13.0": (store) => {
		if (store.get("plugins.discord.listenAlong") === undefined) {
			store.set("plugins.discord.listenAlong", true);
		}
	},
	">=1.12.0": (store) => {
		const options = store.get("plugins.shortcuts");
		let updated = false;
		for (const optionType of ["global", "local"]) {
			if (Array.isArray(options[optionType])) {
				const updatedOptions = {};
				for (const optionObject of options[optionType]) {
					if (optionObject.action && optionObject.shortcut) {
						updatedOptions[optionObject.action] = optionObject.shortcut;
					}
				}

				options[optionType] = updatedOptions;
				updated = true;
			}
		}

		if (updated) {
			store.set("plugins.shortcuts", options);
		}
	},
	">=1.11.0": (store) => {
		if (store.get("options.resumeOnStart") === undefined) {
			store.set("options.resumeOnStart", true);
		}
	},
	">=1.7.0": (store) => {
		const enabledPlugins = store.get("plugins");
		if (!Array.isArray(enabledPlugins)) {
			console.warn("Plugins are not in array format, cannot migrate");
			return;
		}

		// Include custom options
		const plugins = {
			adblocker: {
				enabled: true,
				cache: true,
				additionalBlockLists: [],
			},
			downloader: {
				enabled: false,
				ffmpegArgs: [], // e.g. ["-b:a", "192k"] for an audio bitrate of 192kb/s
				downloadFolder: undefined, // Custom download folder (absolute path)
			},
		};
		enabledPlugins.forEach((enabledPlugin) => {
			plugins[enabledPlugin] = {
				...plugins[enabledPlugin],
				enabled: true,
			};
		});
		store.set("plugins", plugins);
	},
};

module.exports = new Store({
	defaults,
	clearInvalidConfig: false,
	migrations,
});
