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
    "projects";


const StorageManager = {

    /**
     * Save a value to local storage.
     * @param {AllowedKey} key - The key to save the value under.
     * @param {*} value - The value to save.
     * @returns {boolean} - True if the save was successful, false otherwise.
     */
    save: (key: allowedKeys, value: any): boolean => {
        try {
            if (typeof value === "object") {
                value = JSON.stringify(value);
            }
            localStorage.setItem(key, value);
        } catch (error) {
            Logger.error(error);
            return false;
        }
        return true;
    },

    /**
     * 
     * @param {AllowedKey} key - The key to get the value for.
     * @returns {*} - The value for the key.
     * @returns {null} - If the key does not exist.
     */
    get: (key: string): string | null => {
        const value = localStorage.getItem(key);

        if (value) {
            return value;
        }
        return null;
    },

    clearAll: (): boolean => {
        try {
            localStorage.clear();
        } catch (error) {
            Logger.error(error);
            return false;
        }
        return true;
    },

    /**
     * 
     * @param {AllowedKey} key - The key to remove.
     * @returns {boolean} - True if the removal was successful, false otherwise. 
     */
    removeItem: (key: string): boolean => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            Logger.error(error);
            return false;
        }
        return true;
    }
};

export default StorageManager;