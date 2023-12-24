import { appWindow } from "@tauri-apps/api/window";

export const closeWindow = async () => {
	appWindow.close();
};

export const minWindow = async () => {
	appWindow.minimize();
};

export const maxWindow = async () => {
	if (await appWindow.isMaximized()) {
		appWindow.unmaximize();
	} else {
		appWindow.maximize();
	}
};
