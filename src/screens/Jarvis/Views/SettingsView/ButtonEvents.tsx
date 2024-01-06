import { Command } from "@tauri-apps/api/shell";
import { platform } from "@tauri-apps/api/os";
import { appDataDir } from "@tauri-apps/api/path";
import { invoke } from "@tauri-apps/api/tauri";
import { CONSOLE_VIEW_STYLE_FILE, LOGS_FILE } from "../../../../config/constants";

import { getConsoleViewStyleDict } from "../ConsoleView/ConsoleViewStyleDict";
import Logger from "../../../../helpers/Logger";

import StorageManager from "../../../../helpers/StorageManager";
import { clearIntervalId } from "../../Utils/IntervalManager";
import { Props_NotificationContext } from "@/Interfaces/IProps_NotificationContext";

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
			alert(`Error opening file! Please open the file manually: ${filePath}`);
		}
	} catch (error) {
		alert(`Error opening file! \n${error}`);
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
			alert(`Error opening file! Please open the file manually: ${filePath}`);
		}
	} catch (error) {
		alert(`Error opening file! \n${error}`);
		Logger.error("Error opening the file:", error);
	}
};

export const clearAllData = async (notification: Props_NotificationContext) => {
	try {
		StorageManager.clearAll();
		clearIntervalId();
		notification.showBannerNotification("Successfully cleared all data!", "The Interval Manager has been stopped. Please restart Jarvis to continue.", true)
	} catch (error) {
		notification.showNotification("Error clearing data!", "error", "error", {
			soundOn: true,
			soundType: "error"
		});
		Logger.error("Error clearing data:", error);
	}
};

export const checkAuthentication = async (baseurl: string, username: string, apiToken: string) => {
	if (!baseurl || !username || !apiToken) return alert("Please fill in all fields!");
	new URL(baseurl);

	const response: boolean = await invoke("authenticate_user", {
		baseurl,
		username,
		apitoken: apiToken,
	});

	StorageManager.save("baseurl", baseurl);
	StorageManager.save("username", username);
	StorageManager.save("apiToken", apiToken);

	return response || false;
};

export const signOut = async () => {
	StorageManager.removeItem("baseurl");
	StorageManager.removeItem("username");
	StorageManager.removeItem("apiToken");
	window.location.reload();
};

export const selectProject = async (project: string) => {
	StorageManager.save("projectName", project);
	window.location.reload();
};

export const checkProjectValidity = async (baseurl: string, username: string, apiToken: string, project: string) => {
	if (!baseurl || !username || !apiToken || !project) throw new Error("Please fill in all fields!");
	if (!checkAuthentication(baseurl, username, apiToken)) throw new Error("Authentication failed!");

	const response: string = await invoke("get_project_data", {
		baseurl,
		username,
		apitoken: apiToken,
		projectName: project,
	});

	if (response == "Error getting job data: 404 Not Found") return false;

	return true;
};
