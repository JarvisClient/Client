import Logger from "@/helpers/Logger";
import { IStylingDict } from "../../../../Interfaces/StylingDict";
import { getConsoleViewStyleDict } from "./ConsoleViewStyleDict";
import { type } from "@tauri-apps/api/os";

let osType: string;

(async () => {
	osType = await type();
	Logger.info(`OS Type: ${osType}`);
})();


const handleApplyStyledDataWebWorker = (data: string, stylingDict: IStylingDict): Promise<string> => {
	return new Promise((resolve, reject) => {
		const worker = new Worker(new URL("./worker", import.meta.url), { type: "module" });

		worker.onmessage = (e) => {
			resolve(e.data);
			worker.terminate();
		};

		worker.onerror = (e) => {
			reject(e);
			worker.terminate();
		};

		worker.postMessage({ data, stylingDict });
	});
};

export const formatConsoleData = async (lines: string[]) => {
	// Process each line to replace URLs with clickable links
	const formattedLines = lines.map((line) => line.replace(
		/https?:\/\/[^\s]+/g,
		(match) => `<a href="${match}" target="_blank">${match}</a>`,
	));

	// Join the formatted lines back together with newline characters
	const formattedData = formattedLines.join("\n");

	// If Browser is Safari return the formatted data
	if (osType === "Darwin") {
		return formattedData;
	}

	const stylingDict: IStylingDict = await getConsoleViewStyleDict();
	// if stylingDict is empty return the formatted data
	if (!stylingDict || Object.keys(stylingDict).length === 0) {
		console.log("stylingDict is empty");
		
		return formattedData;
	}


	// Apply styles based on the dictionary and get the styled data
	const styledData = await handleApplyStyledDataWebWorker(formattedData, stylingDict);

	return styledData;
};
