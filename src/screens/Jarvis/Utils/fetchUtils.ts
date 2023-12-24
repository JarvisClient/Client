import { invoke } from "@tauri-apps/api";
import { getAuthDetails } from "../../../config/auth";
import Logger from "../../../helpers/Logger";
import { useNotification } from "../../../components/NotificationManager/NotificationContext";
import { IJenkinsProject, IJenkinsProjectAction, IJenkinsProjectParameterDefinition } from "../../../Interfaces/IProjectInterface";
import { JenkinsData } from "../../../Interfaces/IJenkinsData";
import { IJenkinsBuild } from "../../../Interfaces/IBuildInterface";
import { TestSuite } from "../../../Interfaces/ITestReport";

const notification = useNotification();

export const fetchUtils = {
	fetchProjectData: async (storedProjectName: string | null): Promise<IJenkinsProject | undefined> => {
		try {
			if (!storedProjectName) throw new Error("Project name not found in Storage Manager");

			const config = {
				projectName: storedProjectName,
				...getAuthDetails(),
			};

			const response: string = await invoke("get_project_data", config);
			const jsonData: IJenkinsProject = JSON.parse(response);

			return jsonData;
		} catch (error) {
			notification.showNotification("Error", "Error fetching project data. Please check your internet connection and try again.", "jenkins");
			Logger.error("%JM02 Error invoking get_project_data:", error);
		}
	},

	fetchBuildData: async (buildNumber: number, storedProjectName: string | null): Promise<IJenkinsBuild> => {
		try {
			if (!storedProjectName) throw new Error("Project name not found in Storage Manager");

			const config = {
				projectName: storedProjectName.toString(),
				buildNumber: buildNumber.toString(),
				...getAuthDetails(),
			};
			const response: string = await invoke("get_build_data", config);
			
			return JSON.parse(response);
		} catch (error) {
			notification.showNotification("Error", "Error fetching build data. Please check your internet connection and try again.", "jenkins");
			Logger.error("Error invoking get_build_data:", error);
			return {} as IJenkinsBuild;
		}
	},

	fetchParameterDefinition: async (storedProjectName: string | null): Promise<IJenkinsProjectParameterDefinition[] | undefined> => {
		try {
			if (!storedProjectName) throw new Error("Project name not found in Storage Manager");

			const jsonData: IJenkinsProject | undefined = await fetchUtils.fetchProjectData(storedProjectName);

			const parameterDefinition: IJenkinsProjectAction | undefined = jsonData?.property.find(
				(element) => element._class === "hudson.model.ParametersDefinitionProperty",
			);

			return parameterDefinition ? parameterDefinition.parameterDefinitions : [];
		} catch (error) {
			notification.showNotification("Error", "Error fetching parameter definition. Please check your internet connection and try again.", "jenkins");
			Logger.error("%JM03 Error invoking get_project_data:", error);
		}
	},

	fetchJenkinsData: async (): Promise<JenkinsData | undefined> => {
		try {
			const config = {
				...getAuthDetails(),
			};
	
			const response: string = await invoke("get_jenkins_data", config);
	
			if (!response) {
				notification.showNotification("Error", "Something went wrong.", "jenkins");
				return;
			}
	
			return JSON.parse(response);
		} catch (error) {
			notification.showNotification("Error", "Error fetching Jenkins data. Please check your internet connection and try again.", "jenkins");
			Logger.error("Error invoking get_jenkins_data:", error);
		}
	},

	fetchTestData: async (storedProjectName: string | null, buildNumber: string): Promise<TestSuite | undefined> => {
		try {
			const config = {
				storedProjectName,
				buildNumber: buildNumber,
				...getAuthDetails(),
			};
			const response: string = await invoke("get_test_result_data", config);
			return JSON.parse(response);
		} catch (error) {
			notification.showNotification("Error", "Error fetching test data. Please check your internet connection and try again.", "jenkins");
			Logger.error("Error invoking get_test_result_data:", error);
		}
	}

};
