export interface IStylingDict {
    [key: string]: string[]; // The keys are strings, and the values are arrays of strings
  }

export const stylingDict: IStylingDict = {
	SUCCESS: ["font-bold", "text-jenkins-job-green"],
	FAILED: ["font-bold", "text-jenkins-job-red"],
	UNSTABLE: ["font-bold", "text-jenkins-job-orange"],
	ABORTED: ["font-bold", "text-jenkins-job-gray"],
};
