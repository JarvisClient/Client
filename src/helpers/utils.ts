import { open } from "@tauri-apps/api/shell";
import DOMPurify from "dompurify";
import StorageManager from "./StorageManager";
import showdown from "showdown";

/**
 * 
 * @param timestamp Timestamp to format
 * @returns Formatted timestamp in the format of "DD.MM.YYYY - HH:MM:SS"
 */
export const formatBuildDate = (timestamp: number | string) => {
	const date = new Date(timestamp);

	const day = String(date.getDate()).padStart(2, "0");
	const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
	const year = date.getFullYear();
	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");
	const seconds = String(date.getSeconds()).padStart(2, "0");

	return `${day}.${month}.${year} - ${hours}:${minutes}:${seconds}`;
};

/**
 * 
 * @param url URL to open
 * @param forceBrowser Whether to force the URL to open in the browser
 * @example
 * openLink("https://google.com"); // Opens in the browser if the user has set the setting to do so
 * openLink("https://google.com", true); // Opens in the browser regardless of the user's settings
 */
export const openLink = async (url: string, forceBrowser: boolean = false) => {
	const openInBrowser = StorageManager.get("openInBrowser");

	if (openInBrowser === "true" || forceBrowser) {
		return await open(url);
	}
	return await window.open(url, "_blank");
};

/**
 * 
 * @param obj1
 * @param obj2 
 * @returns True if the objects are equal, false otherwise
 * @note This function is recursive
 * @example 
 * const obj1 = { a: 1, b: 2, c: { d: 3, e: 4 } };
 * const obj2 = { a: 1, b: 2, c: { d: 3, e: 4 } };
 * deepEqual(obj1, obj2); // Returns true
 */
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

/**
 * 
 * @param str String to check
 * @returns True if the string is valid JSON, false otherwise
 */
export const isValidJson = (str: string) => {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
};

/**
 * 
 * @param html HTML to render
 * @returns Sanitized HTML
 */
export const renderHTML = (html: string) => {
	const sanitizedHTML = DOMPurify.sanitize(html);
	return { __html: sanitizedHTML };
};

/**
 * 
 * @param length Length of the string to generate
 * @returns Random string of the specified length
 */
export const generateRandomString = (length: number) => {
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let result = "";
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		result += characters[randomIndex];
	}
	return result;
};

/**
 * 
 * @param param0 Markdown text to render
 * @returns Rendered markdown
 * @note This function uses showdown to render the markdown
 */
export const MarkdownRenderer: React.FC<{ markdownText: string }> = ({ markdownText }) => {
	const converter = new showdown.Converter();

	return converter.makeHtml(markdownText);
};
  
/**
 * 
 * @param obj Object to check
 * @returns True if the object is empty, false otherwise
 */
export function isEmpty(obj: any  /* eslint-disable-line @typescript-eslint/no-explicit-any */): boolean {
	// Check if the object is null or undefined first
	if (obj === null || obj === undefined) {
		return true;
	}

	// Then check if it's an empty object
	return Object.keys(obj).length === 0 && obj.constructor === Object;
}