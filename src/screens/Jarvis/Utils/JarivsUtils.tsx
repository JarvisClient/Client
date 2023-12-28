import React, { Dispatch, SetStateAction } from "react";
import { JSX } from "react/jsx-runtime";
import { LogicalSize, appWindow } from "@tauri-apps/api/window";
import StorageManager from "../../../helpers/StorageManager";
import { useNotification } from "../../../components/NotificationManager/NotificationContext";
import Logger, { onStartup } from "../../../helpers/Logger";
import { fetchUtils } from "./fetchUtils";
import JobCardComponent from "../../../components/JobCardComponent/JobCardComponent";
import { deepEqual, openLink } from "../../../helpers/utils";
import FeatureButtonComponent from "../../../components/FeatureButtonComponent/FeatureButtonComponent";
import { DEFAULT_WINDOW_HEIGHT, DEFAULT_WINDOW_WIDTH, JOBCARD_REFRESH_TIME } from "../../../config/constants";
import { IJenkinsBuild } from "../../../Interfaces/IBuildInterface";
import { IJenkinsProject, IJenkinsProjectBuild } from "../../../Interfaces/IProjectInterface";
import { FeatureButtonComponentProps, FeautreButton_S } from "../../../Interfaces/IFeatureButtonProps";
import { JobCardProps } from "../../../Interfaces/IJobCardProps";
import { IPinnedANDNotificatonJobs } from "../../../Interfaces/IPinnedANDNotificatonJobs";
import { miniUtils } from "./miniUtils";
import { sendNotification } from "../../../helpers/notification";

/**
 * Utility class for handling job card related functionality.
 */
export class JarvisUtils {
	storedProjectName: string | null;
	setActiveJobBuildNumber: React.Dispatch<React.SetStateAction<number | null>>;
	setSelectedBuildData: React.Dispatch<React.SetStateAction<IJenkinsBuild>>;
	setActiveFeature: React.Dispatch<React.SetStateAction<string | undefined>>;
	setJobCardProps: React.Dispatch<React.SetStateAction<JobCardProps[] | null>>;
	setProjectData: React.Dispatch<React.SetStateAction<IJenkinsProject | null>>;
	setJobCardsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	intervalId: NodeJS.Timeout | null = null;
	prevLatestBuildData: IJenkinsBuild | null | undefined = null;
	notification: ReturnType<typeof useNotification>;
	queuedBuild: number = -1;
	jobCardProps: JobCardProps[] = [];
	activeJobBuild: number | null = null;

	/**
	 * Constructor for JarvisUtils class.
	 * @param storedProjectName - The name of the stored project.
	 * @param setActiveJobBuildNumber - Function to set the active job build number.
	 * @param setSelectedBuildData - Function to set the selected build data.
	 * @param setActiveFeature - Function to set the active feature.
	 * @param setJobCardProps - Function to set job card properties.
	 */
	constructor(
		storedProjectName: string | null,
		setActiveJobBuildNumber: Dispatch<SetStateAction<number | null>>,
		setSelectedBuildData: Dispatch<SetStateAction<IJenkinsBuild>>,
		setActiveFeature: Dispatch<SetStateAction<string | undefined>>,
		setJobCardProps: Dispatch<SetStateAction<JobCardProps[]>>,
		setProjectData: Dispatch<SetStateAction<IJenkinsProject | null>>,
		setJobCardsLoading: Dispatch<SetStateAction<boolean>>,
		notification: ReturnType<typeof useNotification>
	) {
		this.storedProjectName = storedProjectName;
		this.setActiveJobBuildNumber = setActiveJobBuildNumber;
		this.setSelectedBuildData = setSelectedBuildData;
		this.setActiveFeature = setActiveFeature;
		this.setJobCardProps = setJobCardProps as Dispatch<React.SetStateAction<JobCardProps[] | null>>;
		this.setProjectData = setProjectData;
		this.setJobCardsLoading = setJobCardsLoading;
		this.notification = notification;
	}

	/**
	 * Create job card properties for a list of builds.
	 * @param builds - An array of build data.
	 * @returns An array of job card properties.
	 */
	createJobCardProps = async (builds: IJenkinsProjectBuild[]): Promise<JobCardProps[]> => {
		// Parse pinned jobs and notification set jobs from local storage
		try {
			const jobCardProps = await Promise.all(builds.map(async (build: IJenkinsProjectBuild) => {
				const details = await fetchUtils.fetchBuildData(build.number, this.storedProjectName);
				if (!details) throw new Error("No build details found for build number " + build.number);
				return this.createJobCardPropsForBuild(details);
			}));

			return jobCardProps;
		} catch (error) {
			this.notification.showNotification("Error", "Error creating job card props. Please check your internet connection and try again.", "jenkins");
			Logger.error("Error creating job card props:", error);
			return [];
		}
	};

	createJobCardPropsForBuild = (build: IJenkinsBuild): JobCardProps => {
		const pinnedJobs: IPinnedANDNotificatonJobs = JSON.parse(StorageManager.get("pinnedJobs") || "{}");
		const notificationSetJobs: IPinnedANDNotificatonJobs = JSON.parse(StorageManager.get("notificationSetJobs") || "{}");

		return {
			buildNumber: build.number,
			displayName: build.displayName,
			description: build.description || undefined,
			result: build.result,
			pinned: pinnedJobs[this.storedProjectName as string]?.includes(String(build.number)),
			notification_set: notificationSetJobs[this.storedProjectName as string]?.includes(String(build.number)),
			onClick: () => this.handleJobCardClick(build.number),
			active: build.number === this.activeJobBuild,
		};
	};

	/**
	 * Handle a click on a job card.
	 * @param buildNumber - The build number of the clicked job card.
	 */
	handleJobCardClick = async (buildNumber: number) => {
		try {
			this.setActiveJobBuildNumber(buildNumber);
			this.activeJobBuild = buildNumber;
			const buildData = await fetchUtils.fetchBuildData(buildNumber, this.storedProjectName);
			this.setSelectedBuildData(buildData);
			this.setActiveFeature("status");
		} catch (error) {
			Logger.error("Error fetching build data:", error);
			this.notification.showNotification("Error", "Error fetching build data. Please check your internet connection and try again.", "jenkins");
		}
	};

	handleJobCardFeautreButtonInteraction = (feature: "pinnedJobs" | "notificationSetJobs", jobCardProps: JobCardProps[], activeJobBuild: IJenkinsBuild) => {
		const interactedJobs = JSON.parse(StorageManager.get(feature) || "{}");
		const messages: string[] = miniUtils.decidehandleJobCardFeautreButtonInteractionMessage(feature);
		if (Array.isArray(interactedJobs)) return;
		if (!this.storedProjectName) return;

		if (interactedJobs[this.storedProjectName] && interactedJobs[this.storedProjectName]?.includes(activeJobBuild.id)) {
			interactedJobs[this.storedProjectName] = interactedJobs[this.storedProjectName].filter((element: string) => element !== activeJobBuild.id);
			this.notification.showNotification(messages[0], messages[1], messages[4]);
			Logger.info("Interaction undone:", activeJobBuild);
		} else {
			if (!interactedJobs[this.storedProjectName]) {
				interactedJobs[this.storedProjectName] = [];
			}
			interactedJobs[this.storedProjectName].push(activeJobBuild.id);
			this.notification.showNotification(messages[2], messages[3], messages[4]);
			Logger.info("Interaction noted:", activeJobBuild);
		}

		StorageManager.save(feature, JSON.stringify(interactedJobs));

		this.handleUpdatingJobCardPropsForFeatureButtonInteraction(jobCardProps);
	};

	handleUpdatingJobCardPropsForFeatureButtonInteraction = (jobCardProps: JobCardProps[]) => {
		try {
			const pinnedJobs = JSON.parse(StorageManager.get("pinnedJobs") || "{}");
			const notificationSetJobs = JSON.parse(StorageManager.get("notificationSetJobs") || "{}");

			const updatedJobCardProps = jobCardProps.map((element: JobCardProps) => ({
				...element,
				pinned: pinnedJobs[this.storedProjectName as string]?.includes(String(element.buildNumber)),
				notification_set: notificationSetJobs[this.storedProjectName as string]?.includes(String(element.buildNumber)),
			}));

			this.setJobCardProps(updatedJobCardProps);
		} catch (error) {
			Logger.error("Error updating job card props:", error);
		}
	};

	/**
	 * Handle a click on a feature button.
	 * @param feature
	 * @param jobCardProps
	 * @param activeJobBuild
	 * @param selectedBuildData
	 * @param projectData
	 */
	handleFeatureButtonClick = (feature: string, jobCardProps: JobCardProps[], activeJobBuild: IJenkinsBuild, selectedBuildData: IJenkinsProject | null) => {
		try {

			switch (feature) {
			case "settings":
				this.setActiveJobBuildNumber(null);
				this.activeJobBuild = null;
				break;
			case "status_for_project":
				if (!selectedBuildData) throw new Error("selectedBuildData is undefined");
				this.setActiveJobBuildNumber(null);
				this.activeJobBuild = null;
				this.setSelectedBuildData({} as IJenkinsBuild);
				break;
			case "jenkins":
				if (!selectedBuildData) throw new Error("selectedBuildData is undefined");
				openLink(selectedBuildData.url);
				return;
				break;
			case "pin": {
				if (!selectedBuildData) throw new Error("selectedBuildData is undefined");
				this.handleJobCardFeautreButtonInteraction("pinnedJobs", jobCardProps, activeJobBuild);
				return;
				break;
			}
			case "notification": {
				if (!selectedBuildData) throw new Error("selectedBuildData is undefined");
				this.handleJobCardFeautreButtonInteraction("notificationSetJobs", jobCardProps, activeJobBuild);
				return;
				break;
			}
			case "stop_build": {
				if (!selectedBuildData) throw new Error("selectedBuildData is undefined");
				this.stopBuild(activeJobBuild);
				return;
				break;
			}
			default:
				break;
			}
			this.setActiveFeature(feature);
		} catch (error) {
			Logger.error("Error handling feature button click:", error);
			this.notification.showNotification("Error", "This Function is currently not available.", "error");
		}
	};

	/**
	 * Render feature buttons.
	 * @param featureButtons
	 * @param activeJobBuild
	 * @param jobCardProps
	 * @param selectedBuildData
	 * @param projectData
	 * @param activeFeature
	 * @returns
	 */
	renderFeatureButtons = (
		featureButtons: FeautreButton_S[],
		activeJobBuild: number | null,
		jobCardProps: JobCardProps[],
		selectedBuildData: IJenkinsBuild,
		projectData: IJenkinsProject | null,
		activeFeature: string | undefined
	) => {
		const buttons: JSX.Element[] = [];
		featureButtons.map((element: FeautreButton_S, index: number) => {
			const featureButtonProps: FeatureButtonComponentProps = {
				buildNumber: activeJobBuild,
				feature: element.name,
				onClick: () => this.handleFeatureButtonClick(element.name, jobCardProps, selectedBuildData, projectData),
				active: activeFeature === element.name,
			};

			// Set useSecondaryIcon to true if the job is pinned
			if (element.name === "pin" && jobCardProps.find((item: JobCardProps) => item.buildNumber === activeJobBuild)?.pinned) {
				featureButtonProps.useSecondaryIcon = true;
			}

			// Set useSecondaryIcon to true if the job is notification set
			if (element.name === "notification" && jobCardProps.find((item: JobCardProps) => item.buildNumber === activeJobBuild)?.notification_set) {
				featureButtonProps.useSecondaryIcon = true;
			}

			// Skip rendering the stop_build button if the build is not running
			if ((element.name === "stop_build" || element.name === "notification") && selectedBuildData.result !== null) {
				return null;
			}

			buttons.push(
				<FeatureButtonComponent
					key={index}
					{...featureButtonProps}
				/>);
		});


		return buttons;
	};



	/**
	 * Render job cards.
	 * @param jobCardProps
	 * @param searchQuery
	 * @param setSearchQuery
	 * @returns
	 */
	renderJobCards = (jobCardProps: JobCardProps[], searchQuery: string | null, setSearchQuery: Dispatch<React.SetStateAction<string>>) => {
		const renderNoJobsFound = () => (
			<div className="text-comment-color mx-8 pt-4 select-none">
				<p className="text-center text-3xl mb-2">😭</p>
				<p className="text-center text-lg font-bold">No jobs found. Please try a different search term.</p>
				<br />
				<div className="text-center mx-auto pt-4">
					<p className="text-left">
						<span className="font-bold underline">Tipp:</span>
						{" "}
						You can also use the following search terms:
					</p>
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

		try {
			switch (searchQuery) {
			case "%failed%": {
				const failedJobCards = jobCardProps.filter((element) => element.result === "FAILURE");
				if (failedJobCards.length === 0) return renderNoJobsFound();

				return failedJobCards.map((props: JSX.IntrinsicAttributes & JobCardProps, index: React.Key | null | undefined) => (
					<JobCardComponent key={index} {...props} />
				));
			}
			case "%unstable%": {
				const unstableJobCards = jobCardProps.filter((element) => element.result === "UNSTABLE");
				if (unstableJobCards.length === 0) return renderNoJobsFound();

				return unstableJobCards.map((props: JSX.IntrinsicAttributes & JobCardProps, index: React.Key | null | undefined) => (
					<JobCardComponent key={index} {...props} />
				));
			}
			case "%success%": {
				const successJobCards = jobCardProps.filter((element) => element.result === "SUCCESS");
				if (successJobCards.length === 0) return renderNoJobsFound();

				return successJobCards.map((props: JSX.IntrinsicAttributes & JobCardProps, index: React.Key | null | undefined) => (
					<JobCardComponent key={index} {...props} />
				));
			}
			case "%aborted%": {

				const abortedJobCards = jobCardProps.filter((element) => element.result === "ABORTED");
				if (abortedJobCards.length === 0) return renderNoJobsFound();

				return abortedJobCards.map((props: JSX.IntrinsicAttributes & JobCardProps, index: React.Key | null | undefined) => (
					<JobCardComponent key={index} {...props} />
				));
			}
			case "%pinned%": {
				const pinnedJobCards = jobCardProps.filter((element) => element.pinned);
				if (pinnedJobCards.length === 0) return renderNoJobsFound();

				return pinnedJobCards.map((props: JSX.IntrinsicAttributes & JobCardProps, index: React.Key | null | undefined) => (
					<JobCardComponent key={index} {...props} />
				));
			}
			case "%notification_set%": {
				const notificationSetJobCards = jobCardProps.filter((element) => element.notification_set);
				if (notificationSetJobCards.length === 0) return renderNoJobsFound();

				return notificationSetJobCards.map((props: JSX.IntrinsicAttributes & JobCardProps, index: React.Key | null | undefined) => (
					<JobCardComponent key={index} {...props} />
				));
			}
			default: {
				const filteredJobCards = searchQuery && searchQuery.length > 0
					? jobCardProps.filter((element) =>
						(element.displayName?.includes(searchQuery) || element.description?.includes(searchQuery))
					)
					: jobCardProps;

				// Sort the filteredJobCards array so that pinned cards come first
				const sortedJobCards = [...filteredJobCards].sort((a, b) => (b.pinned ? 1 : -1) - (a.pinned ? 1 : -1));

				if (sortedJobCards.length === 0 && searchQuery) return renderNoJobsFound();

				if (sortedJobCards.length === 0) return (
					<p>No Jobs found</p>
				);

				return sortedJobCards.map((props, index) => (
					<JobCardComponent key={index} {...props} />
				));

			}
			}
		} catch (error) {
			this.notification.showNotification("Error", "Error rendering job cards. Please check your internet connection and try again.", "error");
			Logger.error("Error rendering job cards:", error);
		}
	};

	async stopBuild(activeJobBuild: IJenkinsBuild): Promise<boolean> {
		if (activeJobBuild.result == null) {
			// Build is running
			this.notification.showNotification("Stopping Build", "Stopping build " + activeJobBuild.number + "...", "jenkins");
			await fetchUtils.stopBuild(this.storedProjectName, String(activeJobBuild.number));
			// refresh jobcard data 
			this.startJarvis_interval();
			activeJobBuild.result = "ABORTED";

			return true;
		} else {
			// Build is not running
			this.notification.showNotification("Error", "Build " + activeJobBuild.number + " is not running.", "jenkins");
			return false;
		}

	}

	runStartupTasks = () => {
		// Set window size
		appWindow.setSize(new LogicalSize(DEFAULT_WINDOW_WIDTH, DEFAULT_WINDOW_HEIGHT));
		appWindow.center();

		// Logger startup tasks
		onStartup();
	};

	/**
	 * Start Jarvis.
	 * @returns The interval ID or null if an error occurred.
	 */
	startJarvis = async (): Promise<NodeJS.Timeout | null> => {
		try {
			if (this.intervalId === null) {
				// Fetch project data & set job card props
				const projectData = await fetchUtils.fetchProjectData(this.storedProjectName);
				if (!projectData) throw new Error("No project data found, please check your internet connection and try again.");
				this.setProjectData(projectData);

				// Create job card props
				this.jobCardProps = await this.createJobCardProps(projectData.builds);
				this.setJobCardProps(this.jobCardProps);
				this.setJobCardsLoading(false);

				// Start interval
				this.intervalId = setInterval(() => {
					try {
						this.startJarvis_interval();
					} catch (error) {
						this.notification.showNotification("Error", "An Error occurred while trying to start Jarvis. Please check your internet connection and try again.", "jenkins");
						Logger.error("An Error occurred while trying to start Jarvis:", error);
					}
				}, JOBCARD_REFRESH_TIME);
				Logger.info("Jarvis started with interval ID", this.intervalId);
			}
		} catch (error) {
			this.notification.showNotification("Error", "An Error occurred while trying to start Jarvis. Please check your internet connection and try again.", "jenkins");
			Logger.error("Error starting Jarvis:", error);
			this.setActiveFeature("settings");
			return null;
		}

		return this.intervalId;
	};

	/**
	 * Stop Jarvis.
	 */
	stopJarvis = () => {
		if (this.intervalId !== null) {
			clearInterval(this.intervalId);
			this.intervalId = null;
			Logger.info("Jarvis stopped");
		} else {
			Logger.info("Jarvis is not running");
		}
	};

	/**
	 * Start Jarvis interval.
	 * This function is called every 30 seconds. It fetches project data and updates the state if the latestBuildData has changed.
	 */
	private startJarvis_interval = async () => {
		try {
			//Logger
			Logger.info(`Fetching project data every ${JOBCARD_REFRESH_TIME / 1000} seconds for ${this.storedProjectName}`);

			// Fetch project data to check for new builds
			const newData = await fetchUtils.fetchProjectData(this.storedProjectName);
			const collectedBuildData: IJenkinsBuild[] = [];
			if (!newData) throw new Error("No project data found, please check your internet connection and try again.");
			const newBuilds = newData.builds;

			/**
			 * This Section is for adding new builds to the jobCardProps array.
			 * If a new build is found, it is added to the jobCardProps array.
			 */
			// check if the build numbers of the new builds are the same as the old ones
			const buildNumbersEqual = deepEqual(this.jobCardProps.map((element) => element.buildNumber), newBuilds.map((element) => element.number));

			// If the build numbers are not equal, add the new builds to the jobCardProps array
			if (!buildNumbersEqual) {
				// Add new builds to the jobCardProps array
				const newBuildsAdded: number[] = [];
				newBuilds.forEach((element) => {
					if (!this.jobCardProps.find((item) => item.buildNumber === element.number)) {
						newBuildsAdded.push(element.number);
					}
				});

				for (const [index, element] of newBuildsAdded.entries()) {
					const builData = await fetchUtils.fetchBuildData(element, this.storedProjectName);
					const newJobCardProps = this.createJobCardPropsForBuild(builData);
					// add the new build to the jobCardProps array if it is not already in there
					if (!this.jobCardProps.find((item) => item.buildNumber === newJobCardProps.buildNumber)) {
						this.jobCardProps.splice(index, 0, newJobCardProps);
					}
				}
			}

			/**
			 * This Section is for updating the jobCardProps array with the latest build data
			 * and Setting Notifications for finished builds.
			 * If a build is not finished, it is updated with the latest build data.
			 */
			// List of all builds not finished
			const buildsNotFinished: JobCardProps[] = this.jobCardProps.filter((element) => element.result === null);
			const NotificationSet = JSON.parse(StorageManager.get("notificationSetJobs") || "{}");
			const buildsinNotificationSet: string[] = NotificationSet[this.storedProjectName as string] || [];			


			if (buildsNotFinished.length !== 0) {
				// Check if the latest build has changed
				for (const [index, element] of buildsNotFinished.entries()) {
					if (!element.buildNumber) continue;
					// Gather the latest build data
					const buildData = await fetchUtils.fetchBuildData(element.buildNumber, this.storedProjectName);

					// Check if the build is finished and if it is in the notification set
					if (buildData.result !== null && buildsinNotificationSet.includes(String(buildData.number))) {
						// Send Notification
						sendNotification(`Build ${buildData.number} finished`, `Build ${buildData.number} finished with result ${buildData.result}`);
						this.notification.showNotification(`Build ${buildData.number} finished`, `Build ${buildData.number} finished with result ${buildData.result}`, "jenkins");
						
						// remove the build from the notification set
						NotificationSet[this.storedProjectName as string] = NotificationSet[this.storedProjectName as string].filter((item: string) => item !== String(buildData.number));
						StorageManager.save("notificationSetJobs", JSON.stringify(NotificationSet));
					}

					// Write the build data to the collectedBuildData array
					collectedBuildData.push(buildData);
					buildsNotFinished[index] = {
						...buildsNotFinished[index],
						displayName: buildData.displayName,
						description: buildData.description || undefined,
						result: buildData.result,
					};
				}

				// Insert the buildsNotFinished into jobCardProps array at the correct position
				const newJobCardProps = this.jobCardProps.map((element) => {
					const index = buildsNotFinished.findIndex((item) => item.buildNumber === element.buildNumber);
					if (index !== -1) {
						return buildsNotFinished[index];
					}
					return element;
				});

				// Set the new jobCardProps
				this.jobCardProps = newJobCardProps;
			}

			
			// Set Pinned and Notification Set Jobs.
			// Ideally this is temporary fix since the jobCardProps should already have the correct values.
			const pinnedJobs = JSON.parse(StorageManager.get("pinnedJobs") || "{}");
			const notificationSetJobs = JSON.parse(StorageManager.get("notificationSetJobs") || "{}");

			const updatedJobCardProps = this.jobCardProps.map((element: JobCardProps) => ({
				...element,
				pinned: pinnedJobs[this.storedProjectName as string]?.includes(String(element.buildNumber)),
				notification_set: notificationSetJobs[this.storedProjectName as string]?.includes(String(element.buildNumber)),
			}));

			// Set the new jobCardProps
			this.setJobCardProps(updatedJobCardProps);

			// Set the selected build data
			const selectedBuild = collectedBuildData.find((element) => element.number === this.activeJobBuild);
			if (selectedBuild) {
				this.setSelectedBuildData(selectedBuild);
			}

		} catch (error) {
			this.notification.showNotification("Error", "An Error occured while trying to fetch project data. Please check your internet connection and try again.", "jenkins");
			Logger.error("Error fetching project data:", error);
		}
	};
}
