import React, { useEffect, useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import circleColor from "../../config/getCircleColor";
import FeatureButtons from "../../config/FeatureButtons";
import { JobCardProps } from "../../Interfaces/IJobCardProps";

const JobCardComponent: React.FC<JobCardProps> = ({
	active = false, buildNumber, displayName, description, result, pinned, notification_set, onClick,
}) => {
	const [buildData, setBuildData] = useState<JobCardProps>({} as JobCardProps);

	const handleClick = () => {
		if (onClick) {
			onClick();
		}
	};

	const { secondaryIcon: IconComponent } = FeatureButtons.pin;

	useEffect(() => {
		setBuildData({ displayName, description, result });
	}, [displayName, description, buildNumber, result]);

	// Conditionally render JSX based on whether buildData is available
	if (!buildData) {
		return null; // or you can return a placeholder, loading message, etc.
	}

	return (
		<div
			className={`flex items-center w-[310px] h-[80px] rounded-lg p-5 border-0 border-border transition hover:bg-background-card-selected active:scale-[0.99] select-none overflow-hidden ${active ? "bg-background-card-selected" : "bg-background-card "}`}
			onClick={handleClick}
		>
			<div className="flex-shrink-0 mr-3">
				{/* Small circle */}
				<span className="relative flex h-5 w-5">
					{!buildData.result
						? <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-jenkins-job-blue opacity-75" />
						: null}
					<span className={`relative inline-flex rounded-full h-5 w-5 ${circleColor(buildData)}`} />
				</span>
			</div>
			<div className="flex flex-col justify-center">
				{/* Two rows for Title and Comment */}
				<div className="text-lg text-text-color font-bold overflow-hidden flex items-center">
					{buildData.displayName}
					{pinned && IconComponent ? <IconComponent className="inline-block ml-1" color="ffffff" size={20} /> : null}
					{notification_set && <IoIosNotifications className="inline-block ml-1" color="ffffff" size={20} />}
				</div>
				<div className="text-sm text-comment-color overflow-hidden line-clamp-2">
					{buildData.description}
				</div>
			</div>
		</div>
	);
};

export default JobCardComponent;
