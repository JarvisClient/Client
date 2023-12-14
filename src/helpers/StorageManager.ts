import Logger from "./Logger";

const StorageManager = {
    save: (key: string, value: any): boolean => {
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