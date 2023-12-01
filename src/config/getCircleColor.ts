
// Determine the color based on build result
const circleColor = (buildData: any | null) => {
	switch (buildData["result"]) {
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