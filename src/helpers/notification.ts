import { isPermissionGranted, requestPermission, sendNotification as tauriSendNotification } from "@tauri-apps/api/notification";

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
