import React from "react";
import { closeWindow, maxWindow, minWindow } from "./tb_Utils";

const WinStyle: React.FC = () => (
	<div className="flex absolute top-0 right-[-8px] mr-2 z-50 select-none">
		<div onClick={minWindow} className="w-12 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-200 hover:bg-opacity-10 active:bg-gray-200 active:bg-opacity-20 transition duration-200 ml-2">
			<p>-</p>
		</div>
		<div onClick={maxWindow} className="w-12 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-200 hover:bg-opacity-10 active:bg-gray-200 active:bg-opacity-20 transition duration-200 ml-2">
			<p>o</p>
		</div>
		<div onClick={closeWindow} className="w-12 h-8 flex items-center justify-center cursor-pointer hover:bg-red-500 hover:bg-opacity-90 active:bg-red-500 active:bg-opacity-60 transition duration-200 ml-2">
			<p>x</p>
		</div>
	</div>
);

export default WinStyle;
