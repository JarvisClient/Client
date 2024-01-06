import { WebviewWindow } from "@tauri-apps/api/window";
import Logger, { getLogfileSize } from "../../helpers/Logger";
import { checkForUpdates } from "./updateChecker/updateChecker";
import { DEFAULT_WINDOW_HEIGHT, DEFAULT_WINDOW_WIDTH, LOGS_FILE, MAX_LOG_FILE_SIZE } from "../../config/constants";
import { checkJenkinsConnection } from "./JenkinsConnectionChecker/JenkinsConnectionChecker";
import { requestPermission } from "@tauri-apps/api/notification";
import StorageManager from "../../helpers/StorageManager";
import { BaseDirectory, createDir, exists, writeTextFile } from "@tauri-apps/api/fs";

export const initUpdateChecker = async () => {
	const updateState = await checkForUpdates();
	if (updateState) {
		Logger.info("Update available, opening update window");
		const webview = new WebviewWindow("checkUpdate", {
			url: "/updateAvailable",
			title: "Update Available",
			width: DEFAULT_WINDOW_WIDTH / 2,
			height: DEFAULT_WINDOW_HEIGHT,
			resizable: false,
			decorations: false,
		});

		webview.center();

		webview.once("tauri://created", () => {
			Logger.info("Webview created");
		});

		webview.once("tauri://error", (e) => {
			Logger.error(`Error in webview: ${e}`);
		});
	}
};

/**
 * 
 * @returns true if Jenkins is available
 */
export const initJenkinsConnectionCheck = async () => {
	const initJenkinsConnectionCheck = await checkJenkinsConnection();
	if (initJenkinsConnectionCheck) {
		Logger.info("Jenkins is available");
		return true;
	} else {
		Logger.info("Jenkins is not available. Opening Window.");
		const webview = new WebviewWindow("restartOnboardingMaybe", {
			url: "/jenkinsUnavailable",
			title: "Jenkins Unavailable",
			width: 800,
			height: DEFAULT_WINDOW_HEIGHT,
			resizable: false,
			decorations: false,
		});

		webview.center();

		webview.once("tauri://created", () => {
			Logger.info("Webview created");
		});

		webview.once("tauri://error", (e) => {
			Logger.error(`Error in webview: ${e}`);
		});
		return false;
	}
};

export const checkPermissions = async (): Promise<void> => {
	if (!StorageManager.get("notificationPermission")) {
		const permission = await requestPermission();
		if (permission === "granted") {
			StorageManager.save("notificationPermission", "granted");
			Logger.info("Notification permission granted");
		} else {
			StorageManager.save("notificationPermission", "denied");
			Logger.info("Notification permission denied");
		}
	}
};

/**
 * 
 * @returns true if log file was cleared
 */
export const checkLogFile = async (): Promise<boolean> => {
	const logFileSize = await getLogfileSize();

	// if log file is bigger than 5MB
	if (logFileSize > MAX_LOG_FILE_SIZE) {
		Logger.info("Log file is bigger than " + MAX_LOG_FILE_SIZE + " MB. Clearing log file.");
		// clear log file
		const cleared = await Logger.clearLogfile();
		return cleared;
	}
	return false;
};

export const createPathsIfNotExists = async () => {
	await createDir("", {
		dir: BaseDirectory.AppData,
		recursive: true,
	});

	// if jarvis_logs file does not exist, create it
	const logsFileExists = await exists(LOGS_FILE, { dir: BaseDirectory.AppData });

	if (!logsFileExists) {
		Logger.info("Logs file does not exist. Creating it.");
		await writeTextFile(LOGS_FILE, "", { dir: BaseDirectory.AppData });
	}
};