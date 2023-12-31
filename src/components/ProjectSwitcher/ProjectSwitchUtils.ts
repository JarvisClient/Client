import { JenkinsDataJob } from "../../Interfaces/IJenkinsData";
import { IJenkinsProjectMultibranch } from "../../Interfaces/IProjectInterface";
import { fetchUtils } from "../../screens/Jarvis/Utils/fetchUtils";

export const getAllProjects = async (): Promise<JenkinsDataJob[]> => {
	try {
		const json = await fetchUtils.fetchJenkinsData();
		if (!json) {
			return [];
		}

		let newJobsList = json.jobs;

		/**
		 * Get Jobs from Multibranch Pipeline Projects and add them to the jobs array
		 * aswell as remove the multibranch project itself from the array
		 */
		for (const [index] of json.jobs.entries()) {
			// Check if the job is a multibranch project and get the data
			const job = json.jobs[index];
			if (!job._class.includes("multibranch")) continue;
			const multibranchJobs = await splitMultibranchProject(job);
			if (multibranchJobs.length === 0) continue;
			// Remove the multibranch project from the array
			newJobsList = newJobsList.filter((item) => item.name !== job.name);
			// Add the multibranch jobs to the array
			newJobsList = newJobsList.concat(multibranchJobs);
		}


		return newJobsList;
	} catch (error) {
		return [];
	}
};

const splitMultibranchProject = async (job: JenkinsDataJob): Promise<JenkinsDataJob[]> => {
	const data: IJenkinsProjectMultibranch | undefined = await fetchUtils.fetchProjectData(job.name);
	if (!data || !data.jobs) return [];
	const jobs = data.jobs;
	const newJobs: JenkinsDataJob[] = [];
	for (const [index] of jobs.entries()) {
		const job = jobs[index];
		job.name = `${data.displayName}/${job.name}`;
		newJobs.push(job);
	}
	return newJobs;

};