import { Command } from "@tauri-apps/api/shell";
import { platform } from "@tauri-apps/api/os";
import { appDataDir } from "@tauri-apps/api/path";
import { CONSOLE_VIEW_STYLE_FILE, LOGS_FILE } from "../../../config/constants";
import { invoke } from "@tauri-apps/api/tauri";

import { getConsoleViewStyleDict } from "../ConsoleView/ConsoleViewStyleDict";
import Logger from "../../../helpers/Logger";

export const editConsoleStyling = async () => {
	try {
		await getConsoleViewStyleDict();
		const filePath = await appDataDir() + CONSOLE_VIEW_STYLE_FILE;
		const os: string = await platform();

		if (os === "win32") {
			await new Command("notepad", [filePath]).execute();
		} else if (os === "darwin") {
			await new Command("open", [filePath]).execute();
		} else if (os === "linux") {
			await new Command("xdg-open", [filePath]).execute();
		} else {
			alert("Error opening file! Please open the file manually: " + filePath);
		}

	} catch (error) {
		alert("Error opening file! \n" + error);
		Logger.error("Error opening the file:", error);
	}
};


export const openLogs = async () => {
	try {
		const filePath = await appDataDir() + LOGS_FILE;
		const os: string = await platform();

		if (os === "win32") {
			await new Command("notepad", [filePath]).execute();
		} else if (os === "darwin") {
			await new Command("open", [filePath]).execute();
		} else if (os === "linux") {
			await new Command("xdg-open", [filePath]).execute();
		} else {
			alert("Error opening file! Please open the file manually: " + filePath);
		}

	} catch (error) {
		alert("Error opening file! \n" + error);
		Logger.error("Error opening the file:", error);
	}
};

export const clearAllData = async () => {
	try {
		localStorage.clear();
		window.location.reload();
	}
	catch (error) {
		alert("Error clearing data! \n" + error);
		Logger.error("Error clearing data:", error);
	}	
}

export const checkAuthentication = async (baseurl: any, username: any, apiToken: any) => {
		if (!baseurl || !username || !apiToken) return alert("Please fill in all fields!");
		new URL(baseurl);

		const response: boolean = await invoke("authenticate_user", {
			baseurl: baseurl,
			username: username,
			apitoken: apiToken
		});

		localStorage.setItem("baseurl", baseurl);
		localStorage.setItem("username", username);
		localStorage.setItem("apiToken", apiToken);

		return response || false;
};

export const signOut = async () => {	
	localStorage.removeItem("baseurl");
	localStorage.removeItem("username");
	localStorage.removeItem("apiToken");
	window.location.reload();
}

export const selectProject = async (project: string) => {
	localStorage.setItem("projectName", project);
	window.location.reload();
};
