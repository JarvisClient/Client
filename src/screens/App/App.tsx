import React, { useEffect, useState, useCallback } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import authDetails from "../../config/auth";
import TitleBarComponent from "../../components/TitleBar/TitleBarComponent";
import JobCardComponent from "../../components/JobCardComponent/JobCardComponent";
import SearchComponent from "../../components/SearchComponent/SearchComponent";
import FeatureButtonComponent from "../../components/FeatureButtonComponent/FeatureButtonComponent";
import StatusView from "../Views/StatusView/StatusView";
import ConsoleView from "../Views/ConsoleView/ConsoleView";
import ProjectStatusView from "../Views/ProjectStatusView/ProjectStatusView";
import SettingsView from "../Views/SettingsView/SettingsView";
import FeatureViewHead from "../Views/FeatureViewHead";
import FeatureButtonsConfig from "../../config/FeatureButtons";
import ParametersView from "../Views/ParametersView/ParametersView";
import BuildView from "../Views/BuildView/BuildView";
import { deepEqual, openLink } from "../../helpers/utils";
import "./App.css";
import TestReport from "../Views/TestReport/TestReport";
import JobCardLoadingComponent from "../../components/JobCardComponent/JobCardLoadingComponent";
import { JOBCARD_REFRESH_TIME } from "../../config/constants";
import Logger, { onStartup } from "../../helpers/Logger";

interface FeatureButton {
	name: string;
	purpose: string;
	titleBar: string;
	hidden?: boolean;
}

interface jobCardProps {
	buildNumber: number;
	displayName: string;
	description: string;
	result: string;
	onClick: () => void;
	active: boolean;
}

/**
 * React functional component representing the main application.
 */
function App(): React.ReactElement {
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [featureButtons, setFeatureButtons] = useState<FeatureButton[]>([]);
	const [activeJobBuildNumber, setActiveJobBuildNumber] = useState<number | null>(null);
	const [selectedBuildData, setSelectedBuildData] = useState<any>(null);
	const [projectData, setProjectData] = useState<any>(null);
	const [jobCardProps, setJobCardProps] = useState<jobCardProps[]>([]);
	const [activeFeature, setActiveFeature] = useState<string | null>("status_for_project");
	const [parameterDefinition, setParameterDefinition] = useState<any>(null);
	const [jobCardsLoading, setJobCardsLoading] = useState<boolean>(true);
	const storedProjectName: string = localStorage.getItem("projectName") || "";



	/**
   * Memoized function to fetch project data.
   * It fetches project data, including builds and generates JobCardProps.
   */
	const fetchProjectData = useCallback(async () => {
		try {
			const config = {
				projectName: storedProjectName,
				...authDetails,
			};

			const response: string = await invoke("get_project_data", config);
			const jsonData = JSON.parse(response);

			setProjectData(jsonData);
			setJobCardsLoading(false);

			return jsonData;
		} catch (error) {
			alert("Error fetching project data. Please check your internet connection and try again. \n" + error);
			Logger.info("Error invoking get_project_data:", error);
		}
	}, [storedProjectName]);

	/**
   * Create a JSX Element containg the JobCardProps for each build.
   */
	const createJobCardProps = async (builds: any[]) => {
		try {
			const jobCardProps = await Promise.all(builds.map(async (build: any) => {
				const details = await fetchBuildData(build["number"]);
				return {
					buildNumber: build["number"],
					displayName: details["displayName"],
					description: details["description"],
					result: details["result"],
					onClick: () => handleJobCardClick(build["number"]),
					active: false,
				};
			}));
  
			// wait 2 seconds before setting the job card props to allow the loading animation to play
			setJobCardProps(jobCardProps);
			setJobCardsLoading(false);
  
		} catch (error) {
			// Handle errors if any
			alert("Error creating job card props. Please check your internet connection and try again. \n" + error);
			Logger.error("Error creating job card props:", error);
		}
	};

	/**
 * Memoized function to fetch build data for a specific build number.
 * @param {number} buildNumber - The build number for which to fetch data.
 * @returns {Promise<any>} - The JSON response for the specified build.
 */
	const fetchBuildData = useCallback(
		async (buildNumber: number): Promise<any> => {
			try {
				const config = {
					projectName: storedProjectName,
					buildNumber: buildNumber.toString(),
					...authDetails,
				};
				const response: string = await invoke("get_build_data", config);
				return JSON.parse(response);
			} catch (error) {
				Logger.error("Error invoking get_build_data:", error);
			}
		},
		[storedProjectName]
	);

	/**
 * Fetches the parameter definition for the active project.
 * This is called when the component is mounted.
 */
	const fetchParameterDefinition = useCallback(async () => {
		try {
			const config = {
				projectName: storedProjectName,
				...authDetails,
			};

			const response: string = await invoke("get_project_data", config);
			const jsonData = JSON.parse(response);

			const parameterDefinition = jsonData["property"].find(
				(element: any) => element["_class"] === "hudson.model.ParametersDefinitionProperty"
			);

			if (parameterDefinition) setParameterDefinition(parameterDefinition["parameterDefinitions"]);
		} catch (error) {
			Logger.error("Error invoking get_project_data:", error);
		}
	}, [storedProjectName]);



	/**
 * Updates the 'active' property in jobCardProps based on the activeJobBuildNumber.
 */
	const updateActiveJobInJobCardProps = () => {
		const updatedJobCardProps = jobCardProps.map((element: any) => ({
			...element,
			active: element.buildNumber === activeJobBuildNumber,
		}));

		setJobCardProps(updatedJobCardProps);
	};

	/**
 * Handles the click event on a JobCard, setting the activeJobBuildNumber and fetching data for the selected build.
 * Also sets the activeFeature to "status" if it is null or "settings".
 * @param {number} buildNumber - The build number of the selected JobCard.
 */
	const handleJobCardClick = async (buildNumber: number) => {
		setActiveJobBuildNumber(buildNumber);
		const buildData = await fetchBuildData(buildNumber);
		setSelectedBuildData(buildData);
		setActiveFeature("status");
	};

	/**
 * Handles the click event on a FeatureButton, setting the activeJobBuildNumber to null if the feature is "settings".
 * @param {string} feature - The feature to set as the active feature.
 */
	const handleFeatureButtonClick = (feature: string) => {
		switch (feature) {
		case "settings":
			setActiveJobBuildNumber(null);
			break;
		case "status_for_project":
			setActiveJobBuildNumber(null);
			setSelectedBuildData(null);
			break;
		case "jenkins":
			openLink(selectedBuildData["url"]);
			return;
			break;
		default:
			break;
		}

		setActiveFeature(feature);
	};

	/**
 * Handles the change event for the search input.
 * @param {string} value - The new value of the search input.
 */
	const handleSearchInputChange = (value: string) => {
		setSearchQuery(value);

	};

	/**
 * Creates the FeatureButtons based on the FeatureButtonsConfig.
 * This is called when the component is mounted and when the activeJobBuildNumber is updated.
 */
	const createFeatureButtons = () => {
		const featureButtons: any = [];

		for (const key in FeatureButtonsConfig) {
			const element = FeatureButtonsConfig[key];

			if (
				!element.hidden &&
        ((element.purpose === "BOTH") ||
          (activeJobBuildNumber && element.purpose === "JOB") ||
          (!activeJobBuildNumber && element.purpose === "PROJECT"))
			) {
				featureButtons.push({
					name: key,
				});
			}
		}

		setFeatureButtons(featureButtons);
	};

	/**
 * useEffect Hook
 * Runs once after the component is mounted to fetch data for the active project.
 */
	useEffect(() => {
		const randomNumber = Math.floor(Math.random() * 1000000);
		Logger.info(randomNumber + " - BASE: Fetching project data for", storedProjectName);
  
		let intervalId: NodeJS.Timeout; // Declare intervalId outside startJarvis
  
		const startJarvis = async () => {
			// Fetch project data and create JobCardProps
			const projectData = await fetchProjectData();
			await createJobCardProps(projectData["builds"]);
			onStartup();
  
			// Check if latest build data has changed every 10 seconds
			let prevLatestBuildData: any = null;
  
			intervalId = setInterval(async () => {
				try {
					Logger.info(randomNumber + " - Fetching project data every 30 seconds for", storedProjectName);
					const newData = await fetchProjectData();
					const fetchLatestBuild = newData["builds"][0]["number"];
					const latestBuildData = await fetchBuildData(fetchLatestBuild);
  
					if (!prevLatestBuildData || !deepEqual(prevLatestBuildData, latestBuildData)) {
						Logger.info(randomNumber + " - Latest build data has changed. Updating state...");
						setProjectData(newData);
						createJobCardProps(newData["builds"]);
						prevLatestBuildData = latestBuildData;
					}
				} catch (error) {
					Logger.error(randomNumber + " - Error fetching project data:", error);
				}
			}, JOBCARD_REFRESH_TIME);
		};
  
		startJarvis();
  
		// Clean up interval when the component is unmounted
		return () => {
			Logger.info(randomNumber + " - CLEANUP: Clearing interval for", storedProjectName);
			clearInterval(intervalId);
		};
	}, [storedProjectName, fetchProjectData, setProjectData]);  


	/**
  * useEffect Hook
  * Runs every time a JobCard is clicked to update the active state.
  */
	useEffect(() => {
		updateActiveJobInJobCardProps();
		createFeatureButtons();
		fetchParameterDefinition();
	}, [activeJobBuildNumber]);

	/**
 * Render
 */
	return (
		<div className="h-screen flex flex-col">
			<TitleBarComponent
				activeFeature={activeFeature}
				windowTitle={
					activeJobBuildNumber && activeFeature
						? FeatureButtonsConfig[activeFeature]["titleBar"]
						: activeFeature === "settings"
							? "Jarvis Settings"
							: `Project Information for ${storedProjectName}`
				}
			/>


			{/* Main Content Area */}
			<div className="flex flex-grow overflow-y-scroll custom-scroll ml-[1px]">
				{/* Job Cards & Search List */}
				<div className="overflow-y-scroll overflow-x-hidden big-sidebar custom-scroll grid content-start justify-items-center space-y-4 py-4 relative">
					<SearchComponent onSearchChange={handleSearchInputChange} />
					{!jobCardsLoading ? (
						<>
							{searchQuery.length > 0 ? (
								jobCardProps
									.filter((element: any) => element["displayName"].includes(searchQuery))
									.map((props, index) => (
										<JobCardComponent key={index} {...props} />
									))
							) : (
								jobCardProps.map((props, index) => (
									<JobCardComponent key={index} {...props} />
								))
							)}
						</>
					) : (
						<>
							{Array.from(Array(10).keys()).map((index) => (
								<JobCardLoadingComponent key={index} />
							))}
						</>
					)}
				</div>

				{/* Feature Buttons */}
				<div className="overflow-y-scroll small-sidebar custom-scroll grid justify-items-center  py-4">
					{/* Dynamically generates Featurebuttons */}
					<div className="space-y-4 mb-4">
						{featureButtons.map((button: any, key: number) => (
							<FeatureButtonComponent
								key={key}
								buildNumber={activeJobBuildNumber}
								onClick={() => handleFeatureButtonClick(button["name"])}
								feature={button["name"]}
								active={activeFeature === button["name"]} />
						))}
					</div>

					{/* Settings Button */}
					<div className="self-end">
						<FeatureButtonComponent
							buildNumber={activeJobBuildNumber}
							onClick={() => handleFeatureButtonClick("settings")}
							feature="settings"
							active={activeFeature === "settings"}
						/>
					</div>
				</div>
				{/* End of Feature Buttons */}

				{/* Feature View */}
				<div className="overflow-y-scroll general-view custom-scroll">
					{activeFeature !== "settings" && activeFeature !== "status_for_project" && activeFeature !== "build" && (
						<FeatureViewHead buildData={selectedBuildData} />
					)}
					{activeFeature === "status" && <StatusView buildData={selectedBuildData} />}
					{activeFeature === "console" && <ConsoleView buildData={selectedBuildData} />}
					{activeFeature === "parameters" && <ParametersView buildData={selectedBuildData} />}
					{activeFeature === "settings" && <SettingsView buildData={selectedBuildData} />}
					{activeFeature === "status_for_project" && <ProjectStatusView buildData={projectData} />}
					{activeFeature === "testReport" && <TestReport buildData={selectedBuildData} />}
					{activeFeature === "build" && <BuildView buildData={selectedBuildData} parameterDefinition={parameterDefinition} />}
				</div>
				{/* End of Feature View */}
			</div>
		</div>
	);
}

// Export the component for use in other parts of the application
export default App;
