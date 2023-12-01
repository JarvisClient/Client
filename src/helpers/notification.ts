
import authdetails from "../config/auth";
import { isPermissionGranted, requestPermission, sendNotification as tauriSendNotification } from "@tauri-apps/api/notification";
import { invoke } from "@tauri-apps/api/tauri";
import Logger from "./Logger";

export const sendNotification = async (title: string, body?: string) => {
	let permissionGranted = await isPermissionGranted();
	if (!permissionGranted) {
		const permission = await requestPermission();
		permissionGranted = permission === "granted";
	}
	if (permissionGranted) {
		tauriSendNotification({ title: title, body: body, sound: "default", icon: "../assets/brand/icoFull256x.png"});
	}
};

const fetchDataForBuild = async (buildNumber: any) => {
	const config = {
		projectName: localStorage.getItem("projectName"),
		buildNumber: buildNumber.toString(),
		...authdetails
	};

	const response: string = await invoke("get_build_data", config);
	const json = await JSON.parse(response);

	return json;
};

export const registerNotification = async (buildNumber: any) => {
	const response = await fetchDataForBuild(buildNumber);

	Logger.info(response);
    
};