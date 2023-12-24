import React from "react";
import { closeWindow, maxWindow, minWindow } from "./tb_Utils";

const MacStyle: React.FC = () => (
	<div className="flex absolute top-[16px] right-[10px] mr-2 z-50">
		<div onClick={maxWindow} className="w-3 h-3 bg-green-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-600 active:bg-green-700 transition duration-200 ml-2" />
		<div onClick={minWindow} className="w-3 h-3 bg-yellow-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-yellow-600 active:bg-yellow-700 transition duration-200 ml-2" />
		<div onClick={closeWindow} className="w-3 h-3 bg-red-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-600 transition active:bg-red-700 duration-200 ml-2" />
	</div>
);

export default MacStyle;
