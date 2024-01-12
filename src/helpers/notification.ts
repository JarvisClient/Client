import { isPermissionGranted, requestPermission, sendNotification as tauriSendNotification } from "@tauri-apps/api/notification";

/**
 * 
 * @param title Title of the notification
 * @param body Message of the notification
 * @note If Permitted, this function will send a notification to the user using the OS's native notification system
 * @example
 * sendNotification("Hello World", "This is a notification");
 */
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
