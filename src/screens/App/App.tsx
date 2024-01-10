import React, { useEffect } from "react";
import { appWindow, LogicalSize } from "@tauri-apps/api/window";

import { useNavigate } from "react-router-dom";
import loading_anim from "../../assets/animations/loading_anim.webm";
import Logger from "../../helpers/Logger";
import StorageManager from "../../helpers/StorageManager";
import { JARVIS_LOADING_MESSAGES } from "../../config/constants";
import { checkLogFile, checkPermissions, createPathsIfNotExists, initJenkinsConnectionCheck, initUpdateChecker } from "./AppUtils";
import { invoke } from "@tauri-apps/api";

const App: React.FC = () => {
	const navigate = useNavigate();
	const [specificLoadingMessage, setSpecificLoadingMessage] = React.useState<string>("");

	useEffect(() => {
		const startApp = async () => {
			// Set default window size
			let abortStartup = false;
			Logger.info("App.tsx", "App started");
			appWindow.setSize(new LogicalSize(270, 350));
			appWindow.center();

			try {
				// Check for updates
				setSpecificLoadingMessage("Checking for Updates...");
				await initUpdateChecker();
			} catch (error) {
				setSpecificLoadingMessage("An error occured while checking for updates");
				Logger.error("App.tsx", "An error occured while checking for updates", error);
			}

			try {
				// Check Paths
				setSpecificLoadingMessage("Checking Paths...");
				await createPathsIfNotExists();
			} catch (error) {
				setSpecificLoadingMessage("An error occured while creating paths");
				Logger.error("App.tsx", "An error occured while creating paths", error);
			}

			try {
				// Check Logfile Size
				setSpecificLoadingMessage("Checking Logfile Size...");
				await checkLogFile();
			} catch (error) {
				setSpecificLoadingMessage("An error occured while checking logfile size");
				Logger.error("App.tsx", "An error occured while checking logfile size", error);
			}

			try {
				// Onboarding Specific Checks:
				if (decideOnboarding() === "/jarvis") {
					// Check Jenkins Connection
					setSpecificLoadingMessage("Checking Jenkins Connection...");
					abortStartup = await !initJenkinsConnectionCheck();

					// Check Config Files
					setSpecificLoadingMessage("Checking for Permissions...");
					checkPermissions();
				}
			} catch (error) {
				Logger.error("App.tsx", "An error occured while checking jenkins connection", error);
			}

			// Navigate to onboarding or jarvis
			setTimeout(() => {
				setSpecificLoadingMessage("Checking Setup...");
				if (abortStartup) {
					invoke("closeApp");
				}
				navigate(decideOnboarding());
			}, 700);
		};

		startApp();
	}, []);


	const decideOnboarding = () => {
		const onboardState = StorageManager.get("onboardState");

		if (onboardState !== "true") {
			Logger.info("App.tsx", "Onboarding not completed, redirecting to onboarding");
			return "/onboarding";
		}
		Logger.info("App.tsx", "Onboarding completed, redirecting to Jarvis");
		return "/jarvis";
	};

	const selectRandomLoadingMessage = (messages: string[]) => messages[Math.floor(Math.random() * messages.length)];

	return (
		<div className="flex flex-col bg-background-sidebar items-center justify-center h-screen select-none" data-tauri-drag-region>
			<video autoPlay loop muted className="w-20 h-20 mb-12">
				<source src={loading_anim} type="video/webm" />
			</video>
			<h1 className="text-xl mx-6 mb-2 font-medium text-center">{selectRandomLoadingMessage(JARVIS_LOADING_MESSAGES)}</h1>
			<p className="text-sm text-center mx-2 text-comment-color">{specificLoadingMessage}</p>
		</div>
	);
};

export default App;
