import React from "react";
import icoBow from "../../assets/icons/ico_bow.svg";
import FeatureButtons from "../../config/FeatureButtons";
import { renderSysButtons } from "./utils";

interface Props {
	activeFeature?: string;
	windowTitle: string;
}

const TitleBarComponent: React.FC<Props> = ({ activeFeature, windowTitle }) => {
	const featureList = activeFeature ? FeatureButtons[activeFeature] : undefined;
	const IconComponent = featureList?.icon;

	return (
		<div className="absolute w-full">
			<div className="h-[44px] w-[calc(100%_-_8px)] ml-[4px] mt-[4px] absolute top-0 left-0 z-20" data-tauri-drag-region />
			<div className="flex h-[48px] pl-[1px] select-none z-10 relative">
				{/* Big Sidebar */}
				<div className="big-sidebar flex items-center pl-4">
					<img src={icoBow} alt="Logo" className="w-7 h-6 mr-2 ml-1" />
					<b>Jarvis</b>
					<span className="bg-brand-mint text-black ml-2 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full">Beta</span>
				</div>
				{/* Small Sidebar */}
				<div className="small-sidebar" />
				{/* Main View */}
				<div className="general-view bg-gradient-to-t from-[#171717] to-[#121212] flex flex-row items-center px-4">
					{/* Icon & Text */}
					<div className="grid grid-cols-[40px,auto,160px] w-full">
						{IconComponent && <IconComponent size={22} className="ml-2" />}
						<b className="text-md ml-2 line-clamp-1 break-all">{windowTitle.endsWith("/") ? windowTitle.slice(0, -1) : windowTitle}</b>
						<div className="justify-self-end"></div>
					</div>

				</div>
			</div>
			{renderSysButtons()}
		</div>
	);
};

export default TitleBarComponent;
