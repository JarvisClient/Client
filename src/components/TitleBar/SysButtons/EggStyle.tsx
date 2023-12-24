import React from "react";
import { closeWindow, maxWindow, minWindow } from "./tb_Utils";

const max = "https://cdn.discordapp.com/attachments/972519458285432862/1187827520159092796/8811_hideriblob.png?ex=65984d95&is=6585d895&hm=d94a5989e4fc34144aefd2cc915950d031736179aa76490134dd71ba4032fdd8&";
const min = "https://cdn.discordapp.com/attachments/972519458285432862/1187827520482050120/KyuHide.png?ex=65984d95&is=6585d895&hm=495ec4b5e33ca32037c55167a630a3dafce661f286db5c428498da04489a71bb";
const close = "https://cdn.discordapp.com/attachments/972519458285432862/1187827520754696212/9397-angry-miku-nakano.png?ex=65984d95&is=6585d895&hm=a7056b5ebeab7f738130098e87d96d86fe7ea7ef2f3eb3c1a724d476461133eb&";

const EggStyle: React.FC = () => (
	<div className="flex absolute top-0 right-[-8px] mr-2 z-50 select-none">
		<div onClick={minWindow} className="w-12 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-200 hover:bg-opacity-10 active:bg-gray-200 active:bg-opacity-20 transition duration-200 ml-2">
			<img src={min} className="w-12 h-12" />
		</div>
		<div onClick={maxWindow} className="w-12 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-200 hover:bg-opacity-10 active:bg-gray-200 active:bg-opacity-20 transition duration-200 ml-2">
			<img src={max} className="w-12 h-12" />
		</div>
		<div onClick={closeWindow} className="w-12 h-8 flex items-center justify-center cursor-pointer hover:bg-red-500 hover:bg-opacity-90 active:bg-red-500 active:bg-opacity-60 transition duration-200 ml-2">
			<img src={close} className="w-12 h-12" />
		</div>
	</div>
);

export default EggStyle;
