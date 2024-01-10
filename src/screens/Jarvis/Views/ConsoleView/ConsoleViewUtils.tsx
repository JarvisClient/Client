import { CONSOLE_VIEW_CHUNK_SIZE } from "@/config/constants";
import { invoke } from "@tauri-apps/api";
import {
	exists, BaseDirectory, createDir, writeTextFile, readTextFile,
} from "@tauri-apps/api/fs";
import { stylingDict as defaultStylingDict } from "./styleDict";
import { CONSOLE_VIEW_STYLE_FILE } from "../../../../config/constants";
import Logger from "../../../../helpers/Logger";
import { IStylingDict } from "../../../../Interfaces/StylingDict";


export const formatConsoleData = async (lines: string[]): Promise<string> => {
	const formattedData: string = await invoke("format_console_text", {
		consoleText: lines,
		chunkSize: CONSOLE_VIEW_CHUNK_SIZE,
		styleDict: await getConsoleViewStyleDict()
	});

	return formattedData;
};

export async function getConsoleViewStyleDict(): Promise<IStylingDict> {
	try {
		const appDataDirExists = await exists("", { dir: BaseDirectory.AppData });

		if (!appDataDirExists) {
			await createDir("", { dir: BaseDirectory.AppData });
		}

		if (await exists(CONSOLE_VIEW_STYLE_FILE, { dir: BaseDirectory.AppData })) {
			return await JSON.parse(await readTextFile(CONSOLE_VIEW_STYLE_FILE, { dir: BaseDirectory.AppData }));
		}
		await writeTextFile(CONSOLE_VIEW_STYLE_FILE, await JSON.stringify(defaultStylingDict), { dir: BaseDirectory.AppData });
		return defaultStylingDict;
	} catch (error) {
		Logger.error("ConsoleView/ConsoleViewStyleDict.tsx", `Error getting ${CONSOLE_VIEW_STYLE_FILE}. The File might be empty.  \n${error}`);
		return defaultStylingDict;
	}
}