import { WebviewWindow } from "@tauri-apps/api/window";
import Logger from "../../helpers/Logger";
import { checkForUpdates } from "./updateChecker/updateChecker";
import { DEFAULT_WINDOW_HEIGHT, DEFAULT_WINDOW_WIDTH } from "../../config/constants";
import { checkJenkinsConnection } from "./JenkinsConnectionChecker/JenkinsConnectionChecker";

export const initUpdateChecker = async () => {
	const updateState = await checkForUpdates();
	if (updateState) {
		Logger.info("Update available, opening update window");
		const webview = new WebviewWindow("checkUpdate", {
			url: "/updateAvailable",
			title: "Update Available",
			width: DEFAULT_WINDOW_WIDTH,
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
export const initJenkinsConnectionCheck = async ()  => {
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

export const checkConfigFiles = async () => {
	// To be implemented
};