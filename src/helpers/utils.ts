import { open } from "@tauri-apps/api/shell";
import DOMPurify from "dompurify";
import StorageManager from "./StorageManager";
import showdown from "showdown";

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
	const openInBrowser = StorageManager.get("openInBrowser");

	if (openInBrowser === "true" || forceBrowser) {
		return await open(url);
	}
	return await window.open(url, "_blank");
};

export function deepEqual(obj1: unknown, obj2: unknown): boolean {
	// Handle primitive types
	if (obj1 === obj2) {
		return true;
	}

	// Check if both values are objects or arrays
	if (typeof obj1 !== "object" || obj1 === null || typeof obj2 !== "object" || obj2 === null) {
		return false;
	}

	// Type assertion to treat obj1 and obj2 as objects
	const obj1AsObject = obj1 as Record<string, unknown>;
	const obj2AsObject = obj2 as Record<string, unknown>;

	// Check if the number of keys or elements match
	const keys1 = Object.keys(obj1AsObject);
	const keys2 = Object.keys(obj2AsObject);
	if (keys1.length !== keys2.length) {
		return false;
	}

	// Recursively compare each key or element
	for (const key of keys1) {
		if (!keys2.includes(key) || !deepEqual(obj1AsObject[key], obj2AsObject[key])) {
			return false;
		}
	}

	return true;
}


export const isValidJson = (str: string) => {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
};

export const renderHTML = (html: string) => {
	const sanitizedHTML = DOMPurify.sanitize(html);
	return { __html: sanitizedHTML };
};

export const generateRandomString = (length: number) => {
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let result = "";
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		result += characters[randomIndex];
	}
	return result;
};

export const MarkdownRenderer: React.FC<{ markdownText: string }> = ({ markdownText }) => {
	const converter = new showdown.Converter();

	return converter.makeHtml(markdownText)
};
  