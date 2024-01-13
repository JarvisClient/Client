import { IJenkinsBuild } from "../Interfaces/IBuildInterface";
import { JobCardProps } from "../Interfaces/IJobCardProps";

/**
 * 
 * @param buildData Build data to get the color of
 * @returns The color of the build as TailwindCSS classes
 */
const circleColor = (color: "SUCCESS" | "FAILURE" | "UNSTABLE" | "ABORTED" | string | null | undefined) => {
	switch (color?.includes("anime") ? color.split("_anime")[0] : color) {
		case "SUCCESS":
		case "green":
		  return "bg-jenkins-job-green";
		case "FAILURE":
		case "red":
		  return "bg-jenkins-job-red";
		case "UNSTABLE":
		case "yellow":
		case "orange":
		  return "bg-jenkins-job-orange";
		case "ABORTED":
		case "aborted":
		  return "bg-jenkins-job-gray";
		case null:
		case undefined:
		case "blue":
		  return "bg-jenkins-job-blue";
		default:
		  return "bg-jenkins-job-blue";
	  }
};

export default circleColor;
