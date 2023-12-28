import React from "react";
import ProjectSwitcher from "../../../../components/ProjectSwitcher/ProjectSwitcher";

// Define the SwitchProjectView component
const SwitchProjectView: React.FC = () => {
	return (
		<div className="mx-10 my-10 select-none">
			<h1 className="text-3xl font-bold mb-8">Select Jenkins Job</h1>
			<ProjectSwitcher />
		</div>
	);
};

export default SwitchProjectView;
