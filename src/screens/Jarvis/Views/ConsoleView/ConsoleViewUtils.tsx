import { CONSOLE_VIEW_CHUNK_SIZE } from "@/config/constants";
import { invoke } from "@tauri-apps/api";
import { getConsoleViewStyleDict } from "./ConsoleViewStyleDict";

export const formatConsoleData = async (lines: string[]): Promise<string> => {
	const formattedData: string = await invoke("format_console_text", {
		consoleText: lines,
		chunkSize: CONSOLE_VIEW_CHUNK_SIZE,
		styleDict: await getConsoleViewStyleDict()
	});

	return formattedData;
};
