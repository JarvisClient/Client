import React, { useCallback, useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

import authDetails from "../../config/auth";
import FeatureButtonsConfig from "../../config/FeatureButtons";
import { JOBCARD_REFRESH_TIME } from "../../config/constants";

import FeatureButtonComponent from "../../components/FeatureButtonComponent/FeatureButtonComponent";
import JobCardComponent from "../../components/JobCardComponent/JobCardComponent";
import JobCardLoadingComponent from "../../components/JobCardComponent/JobCardLoadingComponent";
import SearchComponent from "../../components/SearchComponent/SearchComponent";
import TitleBarComponent from "../../components/TitleBar/TitleBarComponent";

import BuildView from "../Views/BuildView/BuildView";
import ConsoleView from "../Views/ConsoleView/ConsoleView";
import FeatureViewHead from "../Views/FeatureViewHead";
import ParametersView from "../Views/ParametersView/ParametersView";
import ProjectStatusView from "../Views/ProjectStatusView/ProjectStatusView";
import SettingsView from "../Views/SettingsView/SettingsView";
import StatusView from "../Views/StatusView/StatusView";
import TestReport from "../Views/TestReport/TestReport";

import { deepEqual, openLink } from "../../helpers/utils";
import Logger, { onStartup } from "../../helpers/Logger";
import { FeatureButton } from "./IBuildInterface";
import { JobCardProps } from "../../components/JobCardComponent/JobCardComponent";


import "./App.css";
import { useNotification } from "../../components/NotificationManager/NotificationContext";

/**
 * React functional component representing the main application.
 */
function App(): React.ReactElement {
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [featureButtons, setFeatureButtons] = useState<FeatureButton[]>([]);
	const [activeJobBuildNumber, setActiveJobBuildNumber] = useState<number | null>(null);
	const [selectedBuildData, setSelectedBuildData] = useState<any>(null);
	const [projectData, setProjectData] = useState<any>(null);
	const [jobCardProps, setJobCardProps] = useState<JobCardProps[]>([]);
	const [activeFeature, setActiveFeature] = useState<string | null>("status_for_project");
	const [parameterDefinition, setParameterDefinition] = useState<any>(null);
	const [jobCardsLoading, setJobCardsLoading] = useState<boolean>(true);
	const storedProjectName: string | null = localStorage.getItem("projectName");

	const notification = useNotification();

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
		const pinnedJobs: any[] = JSON.parse(localStorage.getItem("pinnedJobs") || "{}");
		const notificationSetJobs: any[] = JSON.parse(localStorage.getItem("notificationSetJobs") || "{}");
	
		console.log(pinnedJobs);
	
		try {
			if (!storedProjectName) throw new Error("No project name found in localStorage");
			const jobCardProps = await Promise.all(builds.map(async (build: any) => {
				const details = await fetchBuildData(build["number"]);
				const projectName = storedProjectName as any;
				return {
					buildNumber: build["number"],
					displayName: details["displayName"],
					description: details["description"],
					result: details["result"],
					pinned: (pinnedJobs[projectName] || []).includes(build["number"]),
					notification_set: (notificationSetJobs[projectName] || []).includes(build["number"]),
					onClick: () => handleJobCardClick(build["number"]),
					active: false,
				};
			}));
	
			await setJobCardProps(jobCardProps);
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
	 * Handles the click event on a JobCard, setting the activeJobBuildNumber and fetching data for the selected build.
	 * Also sets the activeFeature to "status" if it is null or "settings".
	 * @param {number} buildNumber - The build number of the selected JobCard.
	 * @returns {Promise<void>}
	 */
	const onJobCardPin = async () => {
		let pinnedJobs = JSON.parse(localStorage.getItem("pinnedJobs") || "{}");
		if (Array.isArray(pinnedJobs)) pinnedJobs = {};

		if (storedProjectName) {
			// if the job is already pinned, remove it from the pinnedJobs object else add it
			if (pinnedJobs[storedProjectName] && pinnedJobs[storedProjectName].includes(activeJobBuildNumber)) {
				pinnedJobs[storedProjectName] = pinnedJobs[storedProjectName].filter((element: any) => element !== activeJobBuildNumber);
				notification.showNotification("Job Unpinned", "The job has been unpinned.", "pin");
			} else {
				if (!pinnedJobs[storedProjectName]) {
					pinnedJobs[storedProjectName] = [];
				}
				pinnedJobs[storedProjectName].push(activeJobBuildNumber);
				notification.showNotification("Job Pinned", "The job has been pinned to the top of the list.", "pin");
			}
		} else {
			notification.showNotification("Error", "Please select a project first.", "jenkins");
		}

		console.log(localStorage.getItem("pinnedJobs"));
		localStorage.setItem("pinnedJobs", JSON.stringify(pinnedJobs));

		updatePinnedJobCards();
	};



	/**
	 * Handles the click event on a JobCard, setting the activeJobBuildNumber and fetching data for the selected build.
	 * Also sets the activeFeature to "status" if it is null or "settings".
	 * @param {number} buildNumber - The build number of the selected JobCard.
	 * @returns {Promise<void>}
	 */
	const onNotificationSetter = async () => {
		let notificationSetJobs = JSON.parse(localStorage.getItem("notificationSetJobs") || "{}");
		if (typeof notificationSetJobs !== "object") notificationSetJobs = {};

		if (storedProjectName) {
			// if the job is already pinned, remove it from the notificationSetJobs object else add it
			if (notificationSetJobs[storedProjectName] && notificationSetJobs[storedProjectName].includes(activeJobBuildNumber)) {
				notificationSetJobs[storedProjectName] = notificationSetJobs[storedProjectName].filter((element: any) => element !== activeJobBuildNumber);
				notification.showNotification("Notification Unset", "The job has been unset for notification.", "notification");
			} else {
				if (!notificationSetJobs[storedProjectName]) {
					notificationSetJobs[storedProjectName] = [];
				}
				notificationSetJobs[storedProjectName].push(activeJobBuildNumber);
				notification.showNotification("Notification Set", "The job has been set for notification.", "notification");
			}
		} else {
			notification.showNotification("Error", "Please select a project first.", "jenkins");
		}

		localStorage.setItem("notificationSetJobs", JSON.stringify(notificationSetJobs));

		updateNotificationSetJobCards();
	};



	/**
	 * Updates the 'pinned' property in jobCardProps based on the pinnedJobCards.
	 * @param {number} buildNumber - The build number of the selected JobCard.
	 * @returns {Promise<void>}
	 */
	const updatePinnedJobCards = () => {
		try {
			const pinnedJobs = JSON.parse(localStorage.getItem("pinnedJobs") || "{}");
			const updatedJobCardProps = jobCardProps.map((element: any) => ({
				...element,
				pinned: pinnedJobs[storedProjectName as any].includes(element.buildNumber),
			}));

			setJobCardProps(updatedJobCardProps);
		} catch (error) {
			Logger.error("Error updating pinned job cards:", error);
		}
	};

	const updateNotificationSetJobCards = () => {
		try {
			const notificationSetJobs = JSON.parse(localStorage.getItem("notificationSetJobs") || "{}");
			const updatedJobCardProps = jobCardProps.map((element: any) => ({
				...element,
				notification_set: notificationSetJobs[storedProjectName as any].includes(element.buildNumber),
			}));

			setJobCardProps(updatedJobCardProps);
		} catch (error) {
			Logger.error("Error updating notification set job cards:", error);
		}
	}

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
			case "pin": {
				const activeJobCard = jobCardProps.find((element: any) => element.buildNumber === activeJobBuildNumber);
				onJobCardPin();
				return;
				break;
			}
			case "notification": {
				const activeJobCard = jobCardProps.find((element: any) => element.buildNumber === activeJobBuildNumber);
				onNotificationSetter();
				return;
				break;
			}
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
			Logger.info("Initial JobCardProps created");
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


	function NotifyForFinishedBuilds (changedBuilds: any[]) {
		let notificationSetJobs = JSON.parse(localStorage.getItem("notificationSetJobs") || "{}");
		if (typeof notificationSetJobs !== "object") notificationSetJobs = {};

		// check if any of the notification set jobs are finished if so alert
		console.log(changedBuilds);
	}

	/**
	 * Dynamically generates JobCards
	 * @returns {JSX.Element[]} - An array of JobCardComponents.
	 */
	function renderJobCards() {

		const renderNoJobsFound = () => {
			return (
				<div className="text-comment-color mx-8 pt-4 select-none">
					<p className="text-center text-3xl mb-2">😭</p>
					<p className="text-center text-lg font-bold">No jobs found. Please try a different search term.</p>
					<br />
					<div className="text-center mx-auto pt-4">
						<p className="text-left"><span className="font-bold underline">Tipp:</span> You can also use the following search terms:</p>
						<ul className="list-disc list-inside text-left flex flex-col ml-4">
							<li className="cursor-pointer" onClick={() => setSearchQuery("%failed%")}>%failed%</li>
							<li className="cursor-pointer" onClick={() => setSearchQuery("%unstable%")}>%unstable%</li>
							<li className="cursor-pointer" onClick={() => setSearchQuery("%success%")}>%success%</li>
							<li className="cursor-pointer" onClick={() => setSearchQuery("%aborted%")}>%aborted%</li>
							<li className="cursor-pointer" onClick={() => setSearchQuery("%pinned%")}>%pinned%</li>
							<li className="cursor-pointer" onClick={() => setSearchQuery("%notification_set%")}>%notification_set%</li>
						</ul>
					</div>
				</div>
			);
		}

		try {
			switch (searchQuery) {
				case "%failed%":
					const failedJobCards = jobCardProps.filter((element: any) => element.result === "FAILURE");
					if (failedJobCards.length === 0) return renderNoJobsFound();

					return failedJobCards.map((props, index) => (
						<JobCardComponent key={index} {...props} />
					));
				case "%unstable%":
					const unstableJobCards = jobCardProps.filter((element: any) => element.result === "UNSTABLE");
					if (unstableJobCards.length === 0) return renderNoJobsFound();

					return unstableJobCards.map((props, index) => (
						<JobCardComponent key={index} {...props} />
					));
				case "%success%":
					const successJobCards = jobCardProps.filter((element: any) => element.result === "SUCCESS");
					if (successJobCards.length === 0) return renderNoJobsFound();

					return successJobCards.map((props, index) => (
						<JobCardComponent key={index} {...props} />
					));
				case "%aborted%":
					const abortedJobCards = jobCardProps.filter((element: any) => element.result === "ABORTED");
					if (abortedJobCards.length === 0) return renderNoJobsFound();

					return abortedJobCards.map((props, index) => (
						<JobCardComponent key={index} {...props} />
					));
				case "%pinned%":
					const pinnedJobCards = jobCardProps.filter((element: any) => element.pinned);
					if (pinnedJobCards.length === 0) return renderNoJobsFound();

					return pinnedJobCards.map((props, index) => (
						<JobCardComponent key={index} {...props} />
					));
				case "%notification_set%":
					const notificationSetJobCards = jobCardProps.filter((element: any) => element.notification_set);
					if (notificationSetJobCards.length === 0) return renderNoJobsFound();

					return notificationSetJobCards.map((props, index) => (
						<JobCardComponent key={index} {...props} />
					));
				default:
					const filteredJobCards = searchQuery.length > 0
						? jobCardProps.filter((element) => element.displayName?.includes(searchQuery))
						: jobCardProps;

					// Sort the filteredJobCards array so that pinned cards come first
					const sortedJobCards = [...filteredJobCards].sort((a, b) => (b.pinned ? 1 : -1) - (a.pinned ? 1 : -1));

					if (sortedJobCards.length === 0 && searchQuery) return renderNoJobsFound();

					return sortedJobCards.map((props, index) => (
						<JobCardComponent key={index} {...props} />
					));
			}
		} catch (error) {
			Logger.error("Error rendering job cards:", error);
		}
	}

	/**
	 *  Dynamically generates Featurebuttons
	 * @returns {JSX.Element[]} - An array of FeatureButtonComponents.
	 */
	function renderFeatureButtons() {
		return featureButtons.map((element: any, index: number) => (
			<>
				<FeatureButtonComponent
					key={index}
					buildNumber={activeJobBuildNumber}
					onClick={() => handleFeatureButtonClick(element.name)}
					feature={element.name}
					useSecondaryIcon={
						element.name === "pin" && jobCardProps.find((element: any) => element.buildNumber === activeJobBuildNumber)?.pinned ||
						element.name === "notification" && jobCardProps.find((element: any) => element.buildNumber === activeJobBuildNumber)?.notification_set}
					active={activeFeature === element.name}
				/>
			</>
		));
	}

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
					<SearchComponent onSearchChange={handleSearchInputChange} outSearchQuerry={searchQuery} />
					{!jobCardsLoading ? (
						<>
							{renderJobCards()}
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
						{renderFeatureButtons()}
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
					{activeFeature === "settings" && <SettingsView />}
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
