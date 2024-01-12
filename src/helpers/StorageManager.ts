import Logger from "./Logger";

type allowedKeys =
    "baseurl" |
    "username" |
    "apiToken" |
    "onboardState" |
    "openInBrowser" |
    "pinnedJobs" |
    "projectName" |
    "notificationSetJobs" |
    "projects" |
    "titlebarStyle" |
	"notificationPermission";

/*
const saveToConfigFile = async (content: ConfigFile, CONFIG_FILE: string) => {
	await writeTextFile(CONFIG_FILE, JSON.stringify(content), {
		dir: BaseDirectory.AppData
	});
};

const getConfigFile = async (CONFIG_FILE: string): Promise<ConfigFile> => {
	const appDataDirExists = await exists("", { dir: BaseDirectory.AppData });
	
	if (!appDataDirExists) {
		await createDir("", { dir: BaseDirectory.AppData });
	}
	
	if (await exists(CONFIG_FILE, { dir: BaseDirectory.AppData })) {
		// File exists, return it
		return await JSON.parse(await readTextFile(CONFIG_FILE, { dir: BaseDirectory.AppData }));
	} else {
		// File doesnt exist, return empty object
		return {} as ConfigFile;
	}
};
*/

/**
 * @classdesc A class to manage the storage of data in the browser.
 * @note This class is a wrapper around the localStorage API. It is used to store data in the browser. 
 * 
 */
const StorageManager = {
	/**
	 * 
	 * @param key They key to save the value under
	 * @param value The value to save
	 * @returns True if the save was successful, false otherwise
	 * @example
	 * StorageManager.save("username", "John Doe");
	 */
	save: (key: allowedKeys, value: string): boolean => {
		try {
			if (typeof value === "object") {
				value = JSON.stringify(value);
			}
			localStorage.setItem(key, value);
		} catch (error) {
			Logger.error("helpers/StorageManager.ts", error);
			return false;
		}
		return true;
	},

	/**
	 * 
	 * @param key The key to get the value of
	 * @returns The value of the key, or null if the key does not exist
	 * @example
	 * StorageManager.get("username");
	 */
	get: (key: string): string | null => {
		const value = localStorage.getItem(key);

		if (value) {
			return value;
		}
		return null;
	},

	/**
	 * @note This function clears all data stored in the browser
	 * @returns True if the clear was successful, false otherwise
	 */
	clearAll: (): boolean => {
		try {
			localStorage.clear();
		} catch (error) {
			Logger.error("helpers/StorageManager.ts", error);
			return false;
		}
		return true;
	},

	/**
     *
     * @param {AllowedKey} key The key to remove.
     * @returns {boolean} True if the removal was successful, false otherwise.
     */
	removeItem: (key: string): boolean => {
		try {
			localStorage.removeItem(key);
		} catch (error) {
			Logger.error("helpers/StorageManager.ts", error);
			return false;
		}
		return true;
	},
};

export default StorageManager;
