import React from "react";
import FeatureButtons from "../../config/FeatureButtons";
import { motion } from "framer-motion";
import { TOOL_TIP_OPEN_TIME } from "../../config/constants";

interface Props {
	active?: boolean;
	buildNumber: number | null;
	onClick?: () => void;
	feature: string;
	useSecondaryIcon?: boolean;
}

/**
 * Functional component representing a feature button.
 * @param {Props} props - The props for the component.
 * @returns {JSX.Element} - The rendered feature button.
 */
const FeatureButtonComponent: React.FC<Props> = ({
	onClick, feature, active, useSecondaryIcon,
}) => {
	const [showTooltip, setShowTooltip] = React.useState<boolean>(false);

	// Retrieve feature details from configuration
	const featureDetails = FeatureButtons[feature];

	// Extract feature details for better readability
	let { icon: IconComponent } = featureDetails;
	const { bg_color, icon_color } = featureDetails;

	// Check if the feature is active
	if (useSecondaryIcon) {
		IconComponent = featureDetails.secondaryIcon as React.ElementType<string>;
		active = true;
	}

	// If User hovers for 2 seconds log the feature name
	let timeout: NodeJS.Timeout;
	const handleMouseEnter = () => {
		timeout = setTimeout(() => {
			setShowTooltip(true);
		}, TOOL_TIP_OPEN_TIME);
	};

	// Clear the timeout if user leaves the button (before 2 seconds)
	const handleMouseLeave = () => {
		clearTimeout(timeout);
		setShowTooltip(false);
	};

	return (
		<div className="flex flex-row items-center">
			<div
				className={`w-12 h-12 m-0 p-0 rounded-md flex justify-center items-center select transition hover:brightness-[1.3] active:scale-[0.95] duration-300 select-none ${active ? "brightness-[1.3]" : "brightness-[1.0]"} `}
				style={{ backgroundColor: bg_color }}
				onClick={() => {
					if (onClick) onClick();
					setShowTooltip(false);
					clearTimeout(timeout);
				}}
				onMouseEnter={(handleMouseEnter)}
				onMouseLeave={handleMouseLeave}
			>
				<IconComponent className="text-white" color={icon_color} size={30} />
			</div>
			<motion.div
			initial={{ opacity: 0, x: -30}}
			animate={{
				opacity: showTooltip ? 1 : 0,
				x: showTooltip ? 0 : -30,
				pointerEvents: showTooltip ? "auto" : "none", // Enable or disable pointer events
			  }}
			className="absolute bg-red-500 z-20 min-h-12 w-auto max-w-[350px] rounded-md ml-14 pl-4 pr-4 pt-3 pb-3 flex flex-col select-none"
			style={{ backgroundColor: bg_color }}>
				<p className="font-bold text-md">{featureDetails.title}</p>
				{useSecondaryIcon ? (
					<p className="text-sm text-white">{featureDetails.secondaryDescription}</p>
				) : (
					<p className="text-sm text-white">{featureDetails.description}</p>
				)}
			</motion.div>
		</div>
	);
};

export default FeatureButtonComponent;
