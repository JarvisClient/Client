import { FaCheck, FaGear } from "react-icons/fa6";

import {
	IoMdListBox, IoIosSwitch, IoIosNotificationsOutline, IoIosNotifications, IoIosList,
} from "react-icons/io";
import { BiSolidTerminal } from "react-icons/bi";
import { MdErrorOutline, MdOutlineOpenInBrowser } from "react-icons/md";
import { LuTestTube2 } from "react-icons/lu";

import { HiHome } from "react-icons/hi";
import { FaRegStopCircle } from "react-icons/fa";
import { BsPlayFill } from "react-icons/bs";
import { TbPin, TbPinnedFilled } from "react-icons/tb";

import StorageManager from "../helpers/StorageManager";
import { FeatureButtonProps } from "../Interfaces/IFeatureButtonProps";

const projectName = StorageManager.get("projectName");

const FeatureButtons: { [key: string]: FeatureButtonProps } = {
	status_for_project: {
		title: "Project",
		description: "View Project Status",
		titleBar: "Project Status",
		bg_color: "#292929",
		icon_color: "#ffffff",
		icon: HiHome,
		hidden: !projectName,
		purpose: "BOTH",
	},
	switch_project: {
		title: "Switch Projects",
		description: "Open the Switch Project View",
		titleBar: "Switch Projects",
		bg_color: "#292929",
		icon_color: "#ffffff",
		icon: IoIosList,
		hidden: !projectName,
		purpose: "PROJECT",
	},
	status: {
		title: "Build Status",
		description: "View Build Status",
		titleBar: "Build Status",
		bg_color: "#353535",
		icon_color: "#ffffff",
		icon: IoMdListBox,
		purpose: "JOB",
	},
	build: {
		title: "Build",
		description: "Start a new Jenkins Build (with parameters if available)",
		titleBar: "Build",
		bg_color: "#2D483A",
		icon_color: "#84FFB3",
		icon: BsPlayFill,
		hidden: !projectName,
		purpose: "BOTH",
	},
	stop_build: {
		title: "Stop Build",
		description: "Stop the current Jenkins Build",
		titleBar: "Stop Build",
		bg_color: "#421B1E",
		icon_color: "#F22C3D",
		icon: FaRegStopCircle,
		hidden: false,
		purpose: "JOB",
	},
	console: {
		title: "Console",
		description: "View Build Console",
		titleBar: "Console",
		bg_color: "#2C3F49",
		icon_color: "#84DBFF",
		icon: BiSolidTerminal,
		purpose: "JOB",
	},
	parameters: {
		title: "Parameters",
		description: "View Build Parameters (if available)",
		titleBar: "View Build Parameters",
		bg_color: "#2F2331",
		icon_color: "#B479AC",
		icon: IoIosSwitch,
		purpose: "JOB",
	},
	testReport: {
		title: "Test Reports",
		description: "View Test Reports (if available)",
		titleBar: "View Test Reports",
		bg_color: "#403D2F",
		icon_color: "#E8D17D",
		icon: LuTestTube2,
		purpose: "JOB",
	},
	settings: {
		title: "Settings",
		description: "Open Jarvis Settings",
		titleBar: "Settings",
		bg_color: "#292929",
		icon_color: "#ffffff",
		icon: FaGear,
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
		icon: TbPin,
		secondaryIcon: TbPinnedFilled,
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
		icon: IoIosNotificationsOutline,
		secondaryIcon: IoIosNotifications,
		purpose: "JOB",
		hidden: false,
	},
	jenkins: {
		title: "Jenkins",
		description: "Open this build in Jenkins",
		titleBar: "Jenkins",
		bg_color: "#44272B",
		icon_color: "#F45B69",
		icon: MdOutlineOpenInBrowser,
		purpose: "JOB",
	},
	// Just for Notifications
	success: {
		title: "Success",
		description: "No description available",
		titleBar: "Success",
		bg_color: "#2D483A",
		icon_color: "#84FFB3",
		icon: FaCheck,
		hidden: true,
		purpose: "BOTH",
	},
	error: {
		title: "Error",
		description: "No description available",
		titleBar: "Error",
		bg_color: "#44272B",
		icon_color: "#F45B69",
		icon: MdErrorOutline,
		hidden: true,
		purpose: "BOTH",
	}
};

export default FeatureButtons;
