import { FaGear } from "react-icons/fa6";

import { IoMdListBox, IoIosSwitch } from "react-icons/io";
import { BiSolidTerminal } from "react-icons/bi";
import { MdOutlineOpenInBrowser } from "react-icons/md";

import { HiHome } from "react-icons/hi";

import { GrProjects } from "react-icons/gr";

interface FeatureButtonProps {
  title: string;
  titleBar: string;
  bg_color: string;
  icon_color: string;
  icon: React.ElementType;
  forJob: boolean;
  hidden?: boolean;
}

const FeatureButtons: { [key: string]: FeatureButtonProps } = {
  "status_for_project": {
    title: "Project",
    titleBar: "Project Status",
    bg_color: "#464849",
    icon_color: "#ffffff",
    icon: HiHome,
    "forJob": false,
  },
  "status": {
    "title": "Build Status",
    "titleBar": "Build Status",
    "bg_color": "#464849",
    "icon_color": "#ffffff",
    "icon": IoMdListBox,
    "forJob": true,
  },
  "console": {
    "title": "Console",
    "titleBar": "Console",
    "bg_color": "#2C3F49",
    "icon_color": "#84DBFF",
    "icon": BiSolidTerminal,
    "forJob": true,
  },
  "parameters": {
    "title": "Parameters",
    "titleBar": "View Build Parameters",
    "bg_color": "#2F2331",
    "icon_color": "#B479AC",
    "icon": IoIosSwitch,
    "forJob": true,
  },
  "settings": {
    "title": "Settings",
    "titleBar": "Settings",
    "bg_color": "#2F3134",
    "icon_color": "#ffffff",
    "icon": FaGear,
    "forJob": false,
    "hidden": true,
  },
  "jenkins": {
    "title": "Jenkins",
    "titleBar": "Jenkins",
    "bg_color": "#44272B",
    "icon_color": "#F45B69",
    "icon": MdOutlineOpenInBrowser,
    "forJob": true,
  },
};

export default FeatureButtons;
