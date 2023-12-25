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
import { FeautreButton_S } from "../../../Interfaces/IFeatureButtonProps";
import { JobCardProps } from "../../../Interfaces/IJobCardProps";
import { IPinnedANDNotificatonJobs } from "../../../Interfaces/IPinnedANDNotificatonJobs";

const notification = useNotification();

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
	) {
		this.storedProjectName = storedProjectName;
		this.setActiveJobBuildNumber = setActiveJobBuildNumber;
		this.setSelectedBuildData = setSelectedBuildData;
		this.setActiveFeature = setActiveFeature;
		this.setJobCardProps = setJobCardProps as Dispatch<React.SetStateAction<JobCardProps[] | null>>;
		this.setProjectData = setProjectData;
		this.setJobCardsLoading = setJobCardsLoading;
	}

	/**
	 * Create job card properties for a list of builds.
	 * @param builds - An array of build data.
	 * @returns An array of job card properties.
	 */
	createJobCardProps = async (builds: IJenkinsProjectBuild[]) => {
		// Parse pinned jobs and notification set jobs from local storage
		const pinnedJobs: IPinnedANDNotificatonJobs = JSON.parse(StorageManager.get("pinnedJobs") || "{}");
		const notificationSetJobs: IPinnedANDNotificatonJobs = JSON.parse(StorageManager.get("notificationSetJobs") || "{}");

		try {
			const jobCardProps = await Promise.all(builds.map(async (build: IJenkinsProjectBuild) => {
				const details = await fetchUtils.fetchBuildData(build.number, this.storedProjectName);
				if (!details) throw new Error("No build details found for build number " + build.number);
				return {
					buildNumber: build.number,
					displayName: details.displayName,
					description: details.description,
					result: details.result,
					pinned: (pinnedJobs[this.storedProjectName as string] || []).includes(String(build.number)),
					notification_set: (notificationSetJobs[this.storedProjectName as string] || []).includes(String(build.number)),
					onClick: () => this.handleJobCardClick(build.number),
					active: false,
				};
			}));

			return jobCardProps;
		} catch (error) {
			notification.showNotification("Error", "Error creating job card props. Please check your internet connection and try again.", "jenkins");
			Logger.error("Error creating job card props:", error);
			return [];
		}
	};

	/**
	 * Handle a click on a job card.
	 * @param buildNumber - The build number of the clicked job card.
	 */
	handleJobCardClick = async (buildNumber: number) => {
		try {
			this.setActiveJobBuildNumber(buildNumber);
			const buildData = await fetchUtils.fetchBuildData(buildNumber, this.storedProjectName);
			this.setSelectedBuildData(buildData);
			this.setActiveFeature("status");
		} catch (error) {
			Logger.error("Error fetching build data:", error);
			notification.showNotification("Error", "Error fetching build data. Please check your internet connection and try again.", "jenkins");
		}
	};

	/**
	 * Handle a click on the pin button of a job card.
	 * @param jobCardProps
	 * @param activeJobBuild
	 */
	onJobCardPin = (jobCardProps: JobCardProps[], activeJobBuild: IJenkinsBuild) => {
		let pinnedJobs = JSON.parse(StorageManager.get("pinnedJobs") || "{}");
		if (Array.isArray(pinnedJobs)) pinnedJobs = {};

		if (this.storedProjectName) {
			// if the job is already pinned, remove it from the pinnedJobs object else add it
			if (pinnedJobs[this.storedProjectName] && pinnedJobs[this.storedProjectName].includes(activeJobBuild.id)) {
				pinnedJobs[this.storedProjectName] = pinnedJobs[this.storedProjectName].filter((element: string) => element !== activeJobBuild.id);
				notification.showNotification("Job Unpinned", "The job has been unpinned.", "pin");
				Logger.info("Job unpinned:", activeJobBuild);

			} else {
				if (!pinnedJobs[this.storedProjectName]) {
					pinnedJobs[this.storedProjectName] = [];
				}
				pinnedJobs[this.storedProjectName].push(activeJobBuild.id);
				notification.showNotification("Job Pinned", "The job has been pinned to the top of the list.", "pin");
				Logger.info("Job pinned:", activeJobBuild);

			}
		} else {
			notification.showNotification("Error", "Please select a project first.", "jenkins");
		}

		StorageManager.save("pinnedJobs", JSON.stringify(pinnedJobs));

		this.updatePinnedJobCards(jobCardProps);
	};

	/**
	 * Update the pinned job cards.
	 * @param jobCardProps
	 */
	updatePinnedJobCards = (jobCardProps: JobCardProps[]) => {
		try {
			const pinnedJobs = JSON.parse(StorageManager.get("pinnedJobs") || "{}");
			const updatedJobCardProps = jobCardProps.map((element: JobCardProps) => ({
				...element,
				pinned: pinnedJobs[this.storedProjectName as string].includes(String(element.buildNumber)),
			}));

			this.setJobCardProps(updatedJobCardProps);
		} catch (error) {
			Logger.error("Error updating pinned job cards:", error);
		}
	};

	/**
	 * Handle a click on the notification button of a job card.
	 * @param jobCardProps
	 * @param activeJobBuild
	 */
	onNotificationSetter = (jobCardProps: JobCardProps[], activeJobBuild: IJenkinsBuild) => {
		let notificationSetJobs = JSON.parse(StorageManager.get("notificationSetJobs") || "{}");
		if (Array.isArray(notificationSetJobs)) notificationSetJobs = {};

		if (this.storedProjectName) {
			// if the job is already pinned, remove it from the pinnedJobs object else add it
			if (notificationSetJobs[this.storedProjectName] && notificationSetJobs[this.storedProjectName].includes(activeJobBuild.id)) {
				notificationSetJobs[this.storedProjectName] = notificationSetJobs[this.storedProjectName].filter((element: string) => element !== activeJobBuild.id);
				notification.showNotification("Job Unpinned", "The job has been unpinned.", "pin");
				Logger.info("Job unpinned:", activeJobBuild);

			} else {
				if (!notificationSetJobs[this.storedProjectName]) {
					notificationSetJobs[this.storedProjectName] = [];
				}
				notificationSetJobs[this.storedProjectName].push(activeJobBuild.id);
				notification.showNotification("Job Pinned", "The job has been pinned to the top of the list.", "pin");
				Logger.info("Job pinned:", activeJobBuild);

			}
		} else {
			notification.showNotification("Error", "Please select a project first.", "jenkins");
		}

		StorageManager.save("notificationSetJobs", JSON.stringify(notificationSetJobs));

		this.updatePinnedJobCards(jobCardProps);
	};

	/**
	 * Update the notification set job cards.
	 * @param jobCardProps
	 */
	updateNotificationSetJobCards = (jobCardProps: JobCardProps[]) => {
		try {
			const notificationSetJobs = JSON.parse(StorageManager.get("notificationSetJobs") || "{}");
			const updatedJobCardProps = jobCardProps.map((element: JobCardProps) => ({
				...element,
				pinned: notificationSetJobs[this.storedProjectName as string].includes(String(element.buildNumber)),
			}));

			this.setJobCardProps(updatedJobCardProps);
		} catch (error) {
			Logger.error("Error updating pinned job cards:", error);
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
		if (!selectedBuildData) return;

		switch (feature) {
		case "settings":
			this.setActiveJobBuildNumber(null);
			break;
		case "status_for_project":
			this.setActiveJobBuildNumber(null);
			this.setSelectedBuildData({} as IJenkinsBuild);
			break;
		case "jenkins":
			openLink(selectedBuildData.url);
			return;
			break;
		case "pin": {
			this.onJobCardPin(jobCardProps, activeJobBuild);
			return;
			break;
		}
		case "notification": {
			this.onNotificationSetter(jobCardProps, activeJobBuild);
			return;
			break;
		}
		case "stop_build": {
			return
			break;
		}
		default:
			break;
		}
		this.setActiveFeature(feature);
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
		return featureButtons.map((element: FeautreButton_S, index: number) => (
			<FeatureButtonComponent
				key={index}
				buildNumber={activeJobBuild}
				onClick={() => this.handleFeatureButtonClick(element.name, jobCardProps, selectedBuildData, projectData)}
				feature={element.name}
				useSecondaryIcon={
					(element.name === "pin" && jobCardProps.find((item: JobCardProps) => item.buildNumber === activeJobBuild)?.pinned) ||
					(element.name === "notification" && jobCardProps.find((item: JobCardProps) => item.buildNumber === activeJobBuild)?.notification_set)
				}
				active={activeFeature === element.name}
			/>
		));
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
					? jobCardProps.filter((element) => element.displayName?.includes(searchQuery))
					: jobCardProps;

				// Sort the filteredJobCards array so that pinned cards come first
				const sortedJobCards = [...filteredJobCards].sort((a, b) => (b.pinned ? 1 : -1) - (a.pinned ? 1 : -1));

				if (sortedJobCards.length === 0 && searchQuery) return renderNoJobsFound();

				return sortedJobCards.map((props, index) => (
					<JobCardComponent key={index} {...props} />
				));
			}
			}
		} catch (error) {
			Logger.error("Error rendering job cards:", error);
		}
	};

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
	
				// Check if projectData is undefined
				if (!projectData) {
					notification.showNotification("Error", "Failed to fetch project data. Please check your internet connection or project name and try again.", "jenkins");
					Logger.error("Failed to fetch project data.");
					return null;
				}
	
				const jobCardProps = await this.createJobCardProps(projectData.builds);
				this.setProjectData(projectData);
				this.setJobCardProps(jobCardProps.map((props) => ({
					...props,
					description: props.description || undefined,
				})));
				this.setJobCardsLoading(false);
	
				// Set previous latest build data
				this.prevLatestBuildData = await fetchUtils.fetchBuildData(projectData.builds[0].number, this.storedProjectName);
	
				// Run startup tasks
				this.runStartupTasks();
	
				// Start interval
				this.intervalId = setInterval(() => {
					try {
						this.startJarvis_interval();
					} catch (error) {
						clearInterval(this.intervalId as NodeJS.Timeout);
						notification.showNotification("Error", "An Error occurred while trying to start Jarvis. Please check your internet connection and try again.", "jenkins");
						Logger.error("An Error occurred while trying to start Jarvis:", error);
					}
				}, JOBCARD_REFRESH_TIME);
				Logger.info("Jarvis started with interval ID", this.intervalId);
			}
		} catch (error) {
			Logger.error("Error starting Jarvis:", error);
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
			// Fetch project data
			const newData = await fetchUtils.fetchProjectData(this.storedProjectName);
			if (!newData) throw new Error("No project data found, please check your internet connection and try again.");
			const latestBuildData = await fetchUtils.fetchBuildData(newData.builds[0].number, this.storedProjectName);
			if (!latestBuildData) throw new Error("No latest build data found, please check your internet connection and try again.");
			const latestBuildDataData = await fetchUtils.fetchBuildData(latestBuildData.number, this.storedProjectName);

			// Logger
			Logger.info("Fetching project data every 30 seconds for", this.storedProjectName);

			// Update state if latestBuildData has changed
			if (!deepEqual(this.prevLatestBuildData, latestBuildDataData)) {
				// Update state
				const jobCardProps = await this.createJobCardProps(newData.builds);
				this.prevLatestBuildData = latestBuildDataData;

				// Set state
				this.setJobCardProps(jobCardProps.map((props) => ({
					...props,
					description: props.description || undefined,
				})));
				this.setProjectData(newData);
				// Logger
				Logger.info("Latest build data has changed. Updating state...");
			}
		} catch (error) {
			notification.showNotification("Error", "An Error occured while trying to fetch project data. Please check your internet connection and try again.", "jenkins");
			Logger.error("Error fetching project data:", error);
		}
	};
}
