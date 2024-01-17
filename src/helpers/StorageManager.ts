import { BaseDirectory, createDir, exists, readTextFile, writeTextFile } from "@tauri-apps/api/fs";
import Logger from "./Logger";
import { ConfigFile, allowedKeys } from "@/Interfaces/IConfigFile";
import { CONFIG_FILE } from "@/config/constants";

const saveToConfigFile = async (content: ConfigFile) => {
	await writeTextFile(CONFIG_FILE, JSON.stringify(content), {
		dir: BaseDirectory.AppData
	});
};

const getConfigFile = async (): Promise<ConfigFile> => {
	const appDataDirExists = await exists("", { dir: BaseDirectory.AppData });
	
	if (!appDataDirExists) {
		await createDir("", { dir: BaseDirectory.AppData });
	}
	
	if (await exists(CONFIG_FILE, { dir: BaseDirectory.AppData })) {
		let content = await readTextFile(CONFIG_FILE, { dir: BaseDirectory.AppData });

		// If the file is empty, return an empty object
		if (content === "") return {} as ConfigFile;

		// File exists, return it
		return await JSON.parse(content);
	} else {
		// File doesnt exist, return empty object
		return {} as ConfigFile;
	}
};

/**
 * @classdesc A class to manage the storage of data in the browser.
 * @note This is still a work in progress and will be adapated gradually.
 */
export const new_StorageManager = {
    get: async (key: allowedKeys): Promise<ConfigFile[typeof key] | boolean> => {
        try {
            let configFile = await getConfigFile();

			if (configFile[key] === undefined) return false;

            return configFile[key];
        } catch (error) {
            Logger.error("helpers/StorageManager.ts", error);
            return false;
        }
    },
    save: async <K extends allowedKeys>(key: K, value: ConfigFile[K]): Promise<Boolean> => {
		try {
			let configFile = await getConfigFile();
			configFile[key] = value;
			await saveToConfigFile(configFile);
			
			return true;
		} catch (error) {
			Logger.error("helpers/StorageManager.ts", error);
			return false;
		}
    },
	removeItem: async (key: allowedKeys): Promise<Boolean> => {
		try {
			let configFile = await getConfigFile();
			delete configFile[key];
			await saveToConfigFile(configFile);

			return true;
		} catch (error) {
			Logger.error("helpers/StorageManager.ts", error);
			return false;
		}
	},
	clearAll: async (): Promise<Boolean> => {
		try {
			await saveToConfigFile({} as ConfigFile);
			return true;
		} catch (error) {
			Logger.error("helpers/StorageManager.ts", error);
			return false;
		}
	},
	notes: {
        get: async (project: string, job: string): Promise<string | undefined> => {
			try {
				const configFile = await getConfigFile();
		
				if (configFile.notes) {
					const projectNotes = configFile.notes.find((note) => note[project]);
		
					if (projectNotes) {
						return projectNotes[project][job];
					}
				}
		
				return undefined;
			} catch (error) {
				Logger.error("helpers/StorageManager.ts", error);
				return undefined;
			}
		},
        save: async (project: string, job: string, note: string): Promise<boolean> => {
			try {
				const configFile = await getConfigFile();

				// Ensure that the notes object and its nested properties are defined
				if (!configFile.notes) {
					configFile.notes = [];
					Logger.debug("Empty notes array created")
				}
				
				const projectIndex = configFile.notes.findIndex((note) => Object.keys(note)[0] === project);
				if (!configFile.notes[projectIndex] || configFile.notes[projectIndex] === undefined || projectIndex === -1) {
					configFile.notes[projectIndex] = {};
					Logger.debug("Empty project index created")
				}

				if (projectIndex < 0) {
					configFile.notes.push({
						[project]: {
							[job]: note,
						},
					});
				} else {
					configFile.notes[projectIndex][project][job] = note;
				}

				Logger.debug("Saving note", configFile.notes);
		
				await saveToConfigFile(configFile);
		
				return true;
			} catch (error) {
				Logger.error("helpers/StorageManager.ts", error);
				return false;
			}
		},
		
		
    },
};



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
