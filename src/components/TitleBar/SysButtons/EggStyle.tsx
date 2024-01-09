import React from "react";
import { closeWindow, maxWindow, minWindow } from "./tb_Utils";
import close from "@assets/icons/anime_icons/close.png";
import max from "@assets/icons/anime_icons/max.png";
import min from "@assets/icons/anime_icons/min.png";
const EggStyle: React.FC = () => (
	<div className="flex absolute top-0 right-[-8px] mr-2 z-50 select-none">
		<div onClick={minWindow} className="w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-gray-200 hover:bg-opacity-10 active:bg-gray-200 active:bg-opacity-20 transition duration-200 ml-2">
			<img src={min} className="w-10 h-10" />
		</div>
		<div onClick={maxWindow} className="w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-gray-200 hover:bg-opacity-10 active:bg-gray-200 active:bg-opacity-20 transition duration-200 ml-2">
			<img src={max} className="w-11 h-11" />
		</div>
		<div onClick={closeWindow} className="w-12 h-12 flex items-center justify-center cursor-pointer hover:bg-red-500 hover:bg-opacity-90 active:bg-red-500 active:bg-opacity-60 transition duration-200 ml-2">
			<img src={close} className="w-10 h-10" />
		</div>
	</div>
);

export default EggStyle;
