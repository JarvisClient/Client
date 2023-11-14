import { open } from "@tauri-apps/api/shell";

export const formatBuildDate = (timestamp: number) => {
    const date = new Date(timestamp);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}.${month}.${year} - ${hours}:${minutes}:${seconds}`;
};

export const openLink = async (url: string, forceBrowser: Boolean = false) => {
    let openInBrowser = localStorage.getItem('openInBrowser');

    if (openInBrowser === "true" || forceBrowser) {
        return await open(url);
    } else {
        return await window.open(url, '_blank');
    }

}

/**
 * Function to check if two arrays are equal.
 */
export function arraysAreEqual(array1: any, array2: any) {
    return JSON.stringify(array1) === JSON.stringify(array2);
  }