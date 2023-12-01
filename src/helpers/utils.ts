import { open } from "@tauri-apps/api/shell";

export const formatBuildDate = (timestamp: number) => {
	const date = new Date(timestamp);

	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
	const year = date.getFullYear();
	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");
	const seconds = String(date.getSeconds()).padStart(2, "0");

	return `${day}.${month}.${year} - ${hours}:${minutes}:${seconds}`;
};

export const openLink = async (url: string, forceBrowser: boolean = false) => {
	const openInBrowser = localStorage.getItem("openInBrowser");

	if (openInBrowser === "true" || forceBrowser) {
		return await open(url);
	} else {
		return await window.open(url, "_blank");
	}

};

/**
 * Function to check if two arrays are equal.
 */
export function arraysAreEqual(array1: any, array2: any) {
	return JSON.stringify(array1) === JSON.stringify(array2);
}

export function deepEqual(obj1: any, obj2: any) {
	// Handle primitive types
	if (obj1 === obj2) {
		return true;
	}

	// Check if both values are objects or arrays
	if (typeof obj1 !== "object" || obj1 === null || typeof obj2 !== "object" || obj2 === null) {
		return false;
	}

	// Check if the number of keys or elements match
	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);
	if (keys1.length !== keys2.length) {
		return false;
	}

	// Recursively compare each key or element
	for (const key of keys1) {
		if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
			return false;
		}
	}

	return true;
}