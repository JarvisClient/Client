import { isPermissionGranted, requestPermission, sendNotification as tauriSendNotification } from "@tauri-apps/api/notification";
import { invoke } from "@tauri-apps/api/tauri";
import { getAuthDetails } from "../config/auth";
import Logger from "./Logger";
import StorageManager from "./StorageManager";

export const sendNotification = async (title: string, body?: string) => {
	let permissionGranted = await isPermissionGranted();
	if (!permissionGranted) {
		const permission = await requestPermission();
		permissionGranted = permission === "granted";
	}
	if (permissionGranted) {
		tauriSendNotification({
			title, body, sound: "default", icon: "../assets/brand/icoFull256x.png",
		});
	}
};

const fetchDataForBuild = async (buildNumber: number) => {
	const config = {
		projectName: StorageManager.get("projectName"),
		buildNumber: buildNumber.toString(),
		...getAuthDetails(),
	};

	const response: string = await invoke("get_build_data", config);
	const json = await JSON.parse(response);

	return json;
};

export const registerNotification = async (buildNumber: number) => {
	const response = await fetchDataForBuild(buildNumber);

	Logger.info(response);
};
