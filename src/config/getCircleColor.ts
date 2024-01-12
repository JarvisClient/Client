import { IJenkinsBuild } from "../Interfaces/IBuildInterface";
import { JobCardProps } from "../Interfaces/IJobCardProps";

/**
 * 
 * @param buildData Build data to get the color of
 * @returns The color of the build as TailwindCSS classes
 */
const circleColor = (buildData: IJenkinsBuild | JobCardProps) => {
	switch (buildData.result) {
	case "SUCCESS":
		return "bg-jenkins-job-green";
	case "FAILURE":
		return "bg-jenkins-job-red";
	case "UNSTABLE":
		return "bg-jenkins-job-orange";
	case "ABORTED":
		return "bg-jenkins-job-gray";
	default:
		return "bg-jenkins-job-blue";
	}
};

export default circleColor;
