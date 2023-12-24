import React from "react";
import icoBow from "../../assets/icons/ico_bow.svg";
import { renderSysButtons } from "./utils";

const TitleBarComponentLight: React.FC = () => (
	<div className="absolute w-full">
		<div className="h-[44px] w-[calc(100%_-_8px)] ml-[4px] mt-[4px] absolute top-0 left-0 z-20" data-tauri-drag-region />
		<div className="flex h-[48px] pl-[1px] select-none z-10 relative">
			{/* Big Sidebar */}
			<div className=" flex items-center pl-4">
				<img src={icoBow} alt="Logo" className="w-7 h-6 mr-2 ml-1" />
				<b>Jarvis</b>
			</div>
		</div>
		{renderSysButtons()}
	</div>
);

export default TitleBarComponentLight;
