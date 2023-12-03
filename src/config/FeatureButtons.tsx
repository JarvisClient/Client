import { FaGear } from "react-icons/fa6";

import { IoMdListBox, IoIosSwitch } from "react-icons/io";
import { BiSolidTerminal } from "react-icons/bi";
import { MdOutlineOpenInBrowser } from "react-icons/md";
import { LuTestTube2 } from "react-icons/lu";

import { HiHome } from "react-icons/hi";

import { BsPlayFill } from "react-icons/bs";
import { TbPin, TbPinnedFilled } from "react-icons/tb";

const projectName = localStorage.getItem("projectName");

export interface FeatureButtonProps {
  title: string;
  titleBar: string;
  bg_color: string;
  icon_color: string;
  icon: React.ElementType;
  secondaryIcon?: React.ElementType;
  purpose: "JOB" | "PROJECT" | "BOTH";
  hidden?: boolean;
}

const FeatureButtons: { [key: string]: FeatureButtonProps } = {
	"status_for_project": {
		title: "Project",
		titleBar: "Project Status",
		bg_color: "#292929",
		icon_color: "#ffffff",
		icon: HiHome,
		hidden: !projectName,
		purpose: "BOTH",
	},
	status: {
		title: "Build Status",
		titleBar: "Build Status",
		bg_color: "#353535",
		icon_color: "#ffffff",
		icon: IoMdListBox,
		purpose: "JOB",
	},
	build: {
		title: "Build",
		titleBar: "Build",
		bg_color: "#2D483A",
		icon_color: "#84FFB3",
		icon: BsPlayFill,
		hidden: !projectName,
		purpose: "BOTH",
	},
	console: {
		title: "Console",
		titleBar: "Console",
		bg_color: "#2C3F49",
		icon_color: "#84DBFF",
		icon: BiSolidTerminal,
		purpose: "JOB",
	},
	parameters: {
		title: "Parameters",
		titleBar: "View Build Parameters",
		bg_color: "#2F2331",
		icon_color: "#B479AC",
		icon: IoIosSwitch,
		purpose: "JOB",
	},
	testReport: {
		title: "Test Reports",
		titleBar: "View Test Reports",
		bg_color: "#403D2F",
		icon_color: "#E8D17D",
		icon: LuTestTube2,
		purpose: "JOB",
	},
	settings: {
		title: "Settings",
		titleBar: "Settings",
		bg_color: "#292929",
		icon_color: "#ffffff",
		icon: FaGear,
		purpose: "PROJECT",
		hidden: true,
	},
	pin: {
		title: "Pin",
		titleBar: "Pin",
		bg_color: "#1D2038",
		icon_color: "#4657CE",
		icon: TbPin,
		secondaryIcon: TbPinnedFilled,
		purpose: "JOB",
		hidden: false,
	},
	jenkins: {
		title: "Jenkins",
		titleBar: "Jenkins",
		bg_color: "#44272B",
		icon_color: "#F45B69",
		icon: MdOutlineOpenInBrowser,
		purpose: "JOB",
	},
};

export default FeatureButtons;