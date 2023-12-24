import React from "react";

import Logger from "../../helpers/Logger";
import StorageManager from "../../helpers/StorageManager";
import EggStyle from "./SysButtons/EggStyle";
import MacStyle from "./SysButtons/MacStyle";
import WinStyle from "./SysButtons/WinStyle";

export const renderSysButtons = (): React.JSX.Element => {
	try {
		const sysButtons = StorageManager.get("titlebarStyle");

		switch (sysButtons) {
		case "macStyle":
			return <MacStyle />;
		case "winStyle":
			return <WinStyle />;
		case "eggStyle":
			return <EggStyle />;
		default:
			return <MacStyle />;
		}
	} catch (error) {
		Logger.error("Error while rendering sysButtons", error);
		return <MacStyle />;
	}
};
