import StorageManager from "../helpers/StorageManager";
import { FeatureButtonProps } from "../Interfaces/IFeatureButtonProps";
import { IcoArrowTriangleRight, IcoBell, IcoBellFilled, IcoBook, IcoCodeBracket, IcoConsole, IcoCover, IcoError, IcoGlobe, IcoPin, IcoPinFilled, IcoSettings, IcoSliders, IcoStop, IcoSuccess, IcoTestTube, IcoWindow } from "@/Icons/pack_1";

const projectName = StorageManager.get("projectName");

const FeatureButtons: { [key: string]: FeatureButtonProps } = {
	status_for_project: {
		title: "Project",
		description: "View Project Status",
		titleBar: "Project Status",
		bg_color: "#292929",
		icon_color: "#ffffff",
		icon: IcoGlobe,
		hidden: !projectName,
		purpose: "BOTH",
	},
	switch_project: {
		title: "Switch Projects",
		description: "Open the Switch Project View",
		titleBar: "Switch Projects",
		bg_color: "#292929",
		icon_color: "#ffffff",
		icon: IcoCover,
		hidden: !projectName,
		purpose: "PROJECT",
	},
	status: {
		title: "Build Status",
		description: "View Build Status",
		titleBar: "Build Status",
		bg_color: "#353535",
		icon_color: "#ffffff",
		icon: IcoBook,
		purpose: "JOB",
	},
	build: {
		title: "Build",
		description: "Start a new Jenkins Build (with parameters if available)",
		titleBar: "Build",
		bg_color: "#2D483A",
		icon_color: "#84FFB3",
		icon: IcoArrowTriangleRight,
		hidden: !projectName,
		purpose: "BOTH",
	},
	stop_build: {
		title: "Stop Build",
		description: "Stop the current Jenkins Build",
		titleBar: "Stop Build",
		bg_color: "#421B1E",
		icon_color: "#F22C3D",
		icon: IcoStop,
		hidden: false,
		purpose: "JOB",
	},
	console: {
		title: "Console",
		description: "View Build Console",
		titleBar: "Console",
		bg_color: "#2C3F49",
		icon_color: "#84DBFF",
		icon: IcoConsole,
		purpose: "JOB",
	},
	parameters: {
		title: "Parameters",
		description: "View Build Parameters for this build",
		titleBar: "View Build Parameters",
		bg_color: "#2F2331",
		icon_color: "#B479AC",
		icon: IcoSliders,
		purpose: "JOB",
	},
	changes: {
		title: "Changes",
		description: "View Changes since last build",
		titleBar: "View Changes",
		bg_color: "#0F332A",
		icon_color: "#00B589",
		icon: IcoCodeBracket,
		purpose: "JOB",
	},
	testReport: {
		title: "Test Reports",
		description: "View Test Reports (if available)",
		titleBar: "View Test Reports",
		bg_color: "#403D2F",
		icon_color: "#E8D17D",
		icon: IcoTestTube,
		purpose: "JOB",
	},
	settings: {
		title: "Settings",
		description: "Open Jarvis Settings",
		titleBar: "Settings",
		bg_color: "#292929",
		icon_color: "#ffffff",
		icon: IcoSettings,
		purpose: "PROJECT",
		hidden: true,
	},
	pin: {
		title: "Pin",
		description: "Pin this build to the top of the list",
		secondaryDescription: "Unpin this build from the top of the list",
		titleBar: "Pin",
		bg_color: "#1D2038",
		icon_color: "#4657CE",
		icon: IcoPin,
		secondaryIcon: IcoPinFilled,
		purpose: "JOB",
		hidden: false,
	},
	notification: {
		title: "Notification",
		description: "Enable Notifications for this build",
		secondaryDescription: "Disable Notifications for this build",
		titleBar: "Notification",
		bg_color: "#3B2E42",
		icon_color: "#DB9DFF",
		icon: IcoBell,
		secondaryIcon: IcoBellFilled,
		purpose: "JOB",
		hidden: false,
	},
	jenkins: {
		title: "Jenkins",
		description: "Open this build in Jenkins",
		titleBar: "Jenkins",
		bg_color: "#44272B",
		icon_color: "#F45B69",
		icon: IcoWindow,
		purpose: "JOB",
	},
	// Just for Notifications
	success: {
		title: "Success",
		description: "No description available",
		titleBar: "Success",
		bg_color: "#2D483A",
		icon_color: "#84FFB3",
		icon: IcoSuccess,
		hidden: true,
		purpose: "BOTH",
	},
	error: {
		title: "Error",
		description: "No description available",
		titleBar: "Error",
		bg_color: "#44272B",
		icon_color: "#F45B69",
		icon: IcoError,
		hidden: true,
		purpose: "BOTH",
	}
};

export default FeatureButtons;
