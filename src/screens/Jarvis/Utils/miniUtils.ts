import { JobCardProps } from "../../../Interfaces/IJobCardProps";
import FeatureButtonsConfig from "../../../config/FeatureButtons";

export const miniUtils = {
	decideWindowTitle: (activeFeature: string | undefined, storedProjectName: string | null) => {
		if (activeFeature && activeFeature !== "status_for_project") {
			return FeatureButtonsConfig[activeFeature].titleBar;
		} if (activeFeature === "settings") {
			return "Jarvis Settings";
		} if (activeFeature === "status_for_project") {
			return `Project Information for ${storedProjectName}`;
		}
		return "Jarvis";
	},

	createFeatureButtons: (activeJobBuildNumber: number | null) => {
		const featureButtons = [];

		for (const key in FeatureButtonsConfig) {
			const element = FeatureButtonsConfig[key];

			if (
				!element.hidden
				&& ((element.purpose === "BOTH")
					|| (activeJobBuildNumber && element.purpose === "JOB")
					|| (!activeJobBuildNumber && element.purpose === "PROJECT"))
			) {
				featureButtons.push({
					name: key,
				});
			}
		}

		return featureButtons;
	},

	updateActiveJobInJobCardProps: (jobCardProps: JobCardProps[], activeJobBuildNumber: number | null) => {
		const updatedJobCardProps = jobCardProps.map((element: JobCardProps) => ({
			...element,
			active: element.buildNumber === activeJobBuildNumber,
		}));

		return updatedJobCardProps;
	},
};
