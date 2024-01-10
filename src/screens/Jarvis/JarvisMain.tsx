import React, { useEffect, useState } from "react";
import "./App.css";

// Core React components
import TitleBarComponent from "../../components/TitleBar/TitleBarComponent";
import FeatureButtonComponent from "../../components/FeatureButtonComponent/FeatureButtonComponent";
import SearchComponent from "../../components/SearchComponent/SearchComponent";
import JobCardLoadingComponent from "../../components/JobCardComponent/JobCardLoadingComponent";

// Views
import BuildView from "./Views/BuildView/BuildView";
import ConsoleView from "./Views/ConsoleView/ConsoleView";
import FeatureViewHead from "./Views/FeatureViewHead";
import ParametersView from "./Views/ParametersView/ParametersView";
import ProjectStatusView from "./Views/ProjectStatusView/ProjectStatusView";
import SettingsView from "./Views/SettingsView/SettingsView";
import StatusView from "./Views/StatusView/StatusView";
import TestReport from "./Views/TestReport/TestReport";
import SwitchProjectView from "./Views/SwitchProjectView/SwitchProjectView";

// Utils
import Logger from "../../helpers/Logger";
import StorageManager from "../../helpers/StorageManager";
import { JarvisUtils } from "./Utils/JarivsUtils";
import { fetchUtils } from "./Utils/fetchUtils";
import { miniUtils } from "./Utils/miniUtils";

// Types and interfaces
import { IJenkinsBuild } from "../../Interfaces/IBuildInterface";
import { IJenkinsProject, IJenkinsProjectParameterDefinition } from "../../Interfaces/IProjectInterface";
import { FeautreButton_S } from "../../Interfaces/IFeatureButtonProps";
import { JobCardProps } from "../../Interfaces/IJobCardProps";
import { useNotification } from "../../components/NotificationManager/NotificationContext";
import CustomAnimatePresence from "../../components/CustomAnimatePresence/CustomAnimatePresence ";
import ChangesView from "./Views/ChangesView/ChangesView";

/**
 * Main component for the Jarvis application.
 * @returns {React.ReactElement} The rendered JarvisMain component.
 */
function JarvisMain(): React.ReactElement {
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [featureButtons, setFeatureButtons] = useState<FeautreButton_S[]>([]);
	const [activeJobBuild, setActiveJobBuildNumber] = useState<number | null>(null);
	const [selectedBuildData, setSelectedBuildData] = useState<IJenkinsBuild>({} as IJenkinsBuild);
	const [projectData, setProjectData] = useState<IJenkinsProject | null>(null);
	const [jobCardProps, setJobCardProps] = useState<JobCardProps[]>([]);
	const [activeFeature, setActiveFeature] = useState<string | undefined>("status_for_project");
	const [parameterDefinition, setParameterDefinition] = useState<IJenkinsProjectParameterDefinition[] | undefined>(undefined);
	const [jobCardsLoading, setJobCardsLoading] = useState<boolean>(true);

	const storedProjectName: string | null = StorageManager.get("projectName");

	const notification = useNotification();

	/**
	 * Create a ne Instance of JarvisUtils.
	 */
	const jarvisUtils = new JarvisUtils(
		storedProjectName,
		setActiveJobBuildNumber,
		setSelectedBuildData,
		setActiveFeature,
		setJobCardProps,
		setProjectData,
		setJobCardsLoading,
		notification
	);

	/**
	 * Runs when a storedProjectName is set.
	 * aka. Jarvis is started.
	 */
	useEffect(() => {
		Logger.info("JarvisMain.tsx", "STARTUP: Running startup tasks for", storedProjectName);
		jarvisUtils.startJarvis();
		return () => {
			Logger.info("JarvisMain.tsx", "CLEANUP: Clearing interval for", storedProjectName);
			jarvisUtils.stopJarvis();
		};
	}, [storedProjectName, setProjectData]);

	/**
	 * Runs when the user clicks on a job card.
	 */
	useEffect(() => {
		const onJobCardClick = async () => {
			try {
				setJobCardProps(await miniUtils.updateActiveJobInJobCardProps(jobCardProps, activeJobBuild));
				setFeatureButtons(await miniUtils.createFeatureButtons(activeJobBuild));
				setParameterDefinition(await fetchUtils.fetchParameterDefinition(storedProjectName));
			} catch (error) {
				Logger.error("JarvisMain.tsx", "Error while updating job card props", error);
			}
		};

		onJobCardClick();
	}, [activeJobBuild]);

	/**
	 * Stops the interval when the component unmounts.
	 */
	useEffect(() => {
		// Run startup tasks
		jarvisUtils.runStartupTasks();

		return () => {
			jarvisUtils.stopJarvis();
		};
	}, []);

	return (
		<div>
			<TitleBarComponent
				activeFeature={activeFeature}
				windowTitle={miniUtils.decideWindowTitle(activeFeature, storedProjectName)}
			/>
			<div className="h-screen flex flex-col pt-[48px]">
				{/* Main Content Area */}
				<div className="flex flex-grow overflow-y-scroll hide-scrollbar ml-[1px]">
					{/* Job Cards & Search List */}
					<div className="overflow-y-scroll overflow-x-hidden big-sidebar error-custom-scroll grid content-start justify-items-center space-y-4 py-4 relative">
						<SearchComponent onSearchChange={(value) => setSearchQuery(value)} outSearchQuerry={searchQuery} />
						{!jobCardsLoading ? (
							<>
								{jarvisUtils.renderJobCards(jobCardProps, searchQuery, setSearchQuery)}
							</>
						) : (
							<>
								{Array.from(Array(7).keys()).map((index) => <JobCardLoadingComponent key={index} />)}
							</>
						)}
					</div>

					{/* Feature Buttons */}
					<div className="overflow-y-scroll small-sidebar hide-scrollbar grid justify-items-center  py-4">
						{/* Dynamically generates Featurebuttons */}
						<div className="space-y-4 mb-4">
							{jarvisUtils.renderFeatureButtons(featureButtons, activeJobBuild, jobCardProps, selectedBuildData, projectData, activeFeature)}
						</div>

						{/* Settings Button */}
						<div className="self-end">
							<FeatureButtonComponent
								buildNumber={activeJobBuild}
								onClick={() => jarvisUtils.handleFeatureButtonClick("settings", jobCardProps, selectedBuildData, projectData)}
								feature="settings"
								active={activeFeature === "settings"}
							/>
						</div>
					</div>
					{/* End of Feature Buttons */}

					{/* Feature View */}
					<div className="overflow-y-scroll general-view custom-scroll">
						{activeFeature !== "settings" && activeFeature !== "status_for_project" && activeFeature !== "build" && activeFeature != "switch_project" && (
							<FeatureViewHead buildData={selectedBuildData} />
						)}
						<CustomAnimatePresence currentFeature={activeFeature} activeJobBuild={activeJobBuild}>
							{activeFeature === "switch_project" && <SwitchProjectView />}
							{activeFeature === "status" && <StatusView buildData={selectedBuildData} />}
							{activeFeature === "console" && <ConsoleView buildData={selectedBuildData} />}
							{activeFeature === "parameters" && <ParametersView buildData={selectedBuildData} />}
							{activeFeature === "settings" && <SettingsView />}
							{activeFeature === "changes" && <ChangesView buildData={selectedBuildData} />}
							{activeFeature === "status_for_project" && <ProjectStatusView buildData={projectData} />}
							{activeFeature === "testReport" && <TestReport buildData={selectedBuildData} />}
							{activeFeature === "build" && <BuildView buildData={selectedBuildData} parameterDefinition={parameterDefinition} />}
						</CustomAnimatePresence>
					</div>
					{/* End of Feature View */}
				</div>
			</div>
		</div>
	);
}

export default JarvisMain;
