import React from "react";
import FeatureButtons from "../../config/FeatureButtons";

interface FeatureButtonProps {
  active?: boolean;
  buildNumber: number | null;
  onClick?: () => void;
  feature: string;
}

/**
 * Functional component representing a feature button.
 * @param {FeatureButtonProps} props - The props for the component.
 * @returns {JSX.Element} - The rendered feature button.
 */
const FeatureButtonComponent: React.FC<FeatureButtonProps> = ({ onClick, feature, active }) => {
	// Retrieve feature details from configuration
	const featureDetails = FeatureButtons[feature];
  
	// Extract feature details for better readability
	const { icon: IconComponent, bg_color, icon_color } = featureDetails;

	return (
		<div
			className={`w-12 h-12 m-0 p-0 rounded-md flex justify-center items-center 
                  select transition hover:brightness-[1.3]
                  active:scale-[0.95] duration-300 select-none ${active ? "brightness-[1.3]" : "brightness-[1.0]"} `}
			style={{ backgroundColor: bg_color }}
			onClick={onClick}
		>
			<IconComponent className="text-white" color={icon_color} size={30} />
		</div>
	);
};

export default FeatureButtonComponent;