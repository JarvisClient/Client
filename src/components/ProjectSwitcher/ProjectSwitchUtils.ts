import { JenkinsDataJob } from "../../Interfaces/IJenkinsData";
import { IJenkinsProjectMultibranch } from "../../Interfaces/IProjectInterface";
import { fetchUtils } from "../../screens/Jarvis/Utils/fetchUtils";

export const getAllProjects = async (): Promise<JenkinsDataJob[]> => {
    try {
        const json = await fetchUtils.fetchJenkinsData();
        if (!json) {
            return [];
        }

        /**
         * Get Jobs from Multibranch Pipeline Projects and add them to the jobs array
         * aswell as remove the multibranch project itself from the array
         */
        for (const [index] of json.jobs.entries()) {
            // Check if the job is a multibranch project and get the data
            let job = json.jobs[index];
            if (!job._class.includes("multibranch")) continue;
            let data: IJenkinsProjectMultibranch | undefined = await fetchUtils.fetchProjectData(job.name);
            if (!data || !data.jobs) continue;

            for (const [index, multibranchJob] of data.jobs.entries()) {
                multibranchJob.name = job.name + "/" + multibranchJob.name;

                // Check if the job is already in the jobs array and add it if not
                if (!json.jobs.find((job: JenkinsDataJob) => job.name === multibranchJob.name)) {
                    json.jobs.push(multibranchJob);
                }
            }

            // Remove the multibranch project from the jobs array
            json.jobs.splice(index, 1);
        }

        return json.jobs;
    } catch (error) {
        return [];
    }
};