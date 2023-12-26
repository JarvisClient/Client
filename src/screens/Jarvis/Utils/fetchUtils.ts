import { invoke } from "@tauri-apps/api";
import { getAuthDetails } from "../../../config/auth";
import { useNotification } from "../../../components/NotificationManager/NotificationContext";
import { IJenkinsProject, IJenkinsProjectAction, IJenkinsProjectParameterDefinition } from "../../../Interfaces/IProjectInterface";
import { JenkinsData } from "../../../Interfaces/IJenkinsData";
import { IJenkinsBuild } from "../../../Interfaces/IBuildInterface";
import { TestResult } from "../../../Interfaces/ITestReport";

const notification = useNotification();

export const fetchUtils = {
	fetchProjectData: async (storedProjectName: string | null): Promise<IJenkinsProject | undefined> => {
		if (!storedProjectName) throw new Error("Project name not found in Storage Manager");

		const config = {
			projectName: storedProjectName,
			...getAuthDetails(),
		};

		
		const response: string = await invoke("get_project_data", config);

		return JSON.parse(response);
	},

	fetchBuildData: async (buildNumber: number, storedProjectName: string | null): Promise<IJenkinsBuild> => {
		if (!storedProjectName) return {} as IJenkinsBuild;

		const config = {
			projectName: storedProjectName.toString(),
			buildNumber: buildNumber.toString(),
			...getAuthDetails(),
		};
		const response: string = await invoke("get_build_data", config);

		return JSON.parse(response);
	},

	fetchParameterDefinition: async (storedProjectName: string | null): Promise<IJenkinsProjectParameterDefinition[] | undefined> => {
		if (!storedProjectName) return undefined;

		const jsonData: IJenkinsProject | undefined = await fetchUtils.fetchProjectData(storedProjectName);

		const parameterDefinition: IJenkinsProjectAction | undefined = jsonData?.property.find(
			(element) => element._class === "hudson.model.ParametersDefinitionProperty",
		);

		return parameterDefinition ? parameterDefinition.parameterDefinitions : [];

	},

	fetchJenkinsData: async (): Promise<JenkinsData | undefined> => {
		const config = {
			...getAuthDetails(),
		};

		const response: string = await invoke("get_jenkins_data", config);

		if (!response) {
			notification.showNotification("Error", "Something went wrong.", "jenkins");
			return;
		}

		return JSON.parse(response);
	},

	fetchTestData: async (storedProjectName: string | null, buildNumber: string): Promise<TestResult | undefined> => {
		const config = {
			storedProjectName,
			buildNumber: buildNumber,
			...getAuthDetails(),
		};
		const response: string = await invoke("get_test_result_data", config);
		return JSON.parse(response);

	},

	stopBuild: async (storedProjectName: string | null, buildNumber: string): Promise<boolean> => {
		const config = {
			projectName: storedProjectName,
			buildNumber: buildNumber,
			...getAuthDetails(),
		};
		
		const response: string = await invoke("stop_build", config);
		
		if (response.includes("aborted") || response.includes("stopped")) {
			return true;
		}
		
		return false;
	},
};
