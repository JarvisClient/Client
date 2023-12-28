import { allowedFeatureButtons } from "../../../Interfaces/handleJobCardFeautreButtonInteraction";
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

	createFeatureButtons: (activeJobBuild: number | null) => {
		const featureButtons = [];

		for (const key in FeatureButtonsConfig) {
			const element = FeatureButtonsConfig[key];

			if (
				!element.hidden
				&& ((element.purpose === "BOTH")
					|| (activeJobBuild && element.purpose === "JOB")
					|| (!activeJobBuild && element.purpose === "PROJECT"))
			) {
				featureButtons.push({
					name: key,
				});
			}
		}

		return featureButtons;
	},

	updateActiveJobInJobCardProps: (jobCardProps: JobCardProps[], activeJobBuild: number | null) => {
		const updatedJobCardProps = jobCardProps.map((element: JobCardProps) => ({
			...element,
			active: element.buildNumber === activeJobBuild,
		}));

		return updatedJobCardProps;
	},

	decidehandleJobCardFeautreButtonInteractionMessage: (feature: allowedFeatureButtons): string[] => {
		switch (feature) {
		case "pinnedJobs":
			return [
				"Job unpinned",
				"The job has been unpinned!",
				"Job pinned",
				"The job has been pinned!",
				"pin"
			];
		case "notificationSetJobs":
			return [
				"Notification removed",
				"You will no longer receive notifications for this job!",
				"Notification set",
				"You will receive notifications for this job once its finished!",
				"notification"
			];
		}
	}
};
