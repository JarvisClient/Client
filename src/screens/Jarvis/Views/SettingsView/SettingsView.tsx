import React, { useEffect, useState } from "react";

import { invoke } from "@tauri-apps/api/tauri";
import { getVersion } from "@tauri-apps/api/app";
import { useNavigate } from "react-router-dom";
import Switch from "../../../../components/Switch/Switch";
import {
	clearAllData, editConsoleStyling, openLogs
} from "./ButtonEvents";
import Logger from "../../../../helpers/Logger";
import { useNotification } from "../../../../components/NotificationManager/NotificationContext";

import StorageManager from "../../../../helpers/StorageManager";

import "./Settings.css";
import LoadingScreenComponent from "../../../../components/LoadingScreenComponent/LoadingScreenComponent";
import SelectList from "../../../../components/SelectList/SelectList";
import { openLink } from "../../../../helpers/utils";

const SettingsView: React.FC = () => {
	const navigate = useNavigate();
	const [authenticated, setAuthenticated] = useState<boolean | null>(null);
	const [appVersion, setAppVersion] = useState<string>("");
	const [isBrowserChecked, setIsBrowserChcked] = useState(false);
	const [isLoadingPage, setIsLoadingPage] = useState(true);
	const [showDevZone, setShowDevZone] = useState(false);
	const [WindowIconStyle, setWindowIconStyle] = useState(StorageManager.get("titlebarStyle") || "macStyle");

	const notification = useNotification();

	useEffect(() => {
		checkIfAlreadyAuthenticated();
		setIsBrowserChcked(JSON.parse(StorageManager.get("openInBrowser") || "false"));
		setWindowIconStyle(StorageManager.get("titlebarStyle") || "macStyle");

		// Fetch Tauri app version and set it to the state
		const fetchAppVersion = async () => {
			try {
				const version = await getVersion();
				setAppVersion(version);
			} catch (error) {
				Logger.error("Error fetching app version:", error);
			}
		};

		fetchAppVersion();
		setIsLoadingPage(false);
	}, []);

	const checkIfAlreadyAuthenticated = async () => {
		const baseurl = StorageManager.get("baseurl");
		const username = StorageManager.get("username");
		const apiToken = StorageManager.get("apiToken");

		if (baseurl && username && apiToken) {
			const response: boolean = await invoke("authenticate_user", {
				baseurl,
				username,
				apitoken: apiToken,
			});

			setAuthenticated(response);
		}
	};

	return (
		<div className="mx-10 my-10 select-none">
			{isLoadingPage ? (
				<LoadingScreenComponent />

			) : (
				<>
					<h1 className="text-3xl font-bold">Settings</h1>
					<p>
						Jarvis v
						{appVersion}
					</p>

					<div className="space-y-16 mt-8">

						{/* Jarvis Project Setup */}
						<div className="flex flex-col mt-10 space-y-4">
							<div className="flex flex-row space-x-2">
								<h2 className="text-2xl font-bold">Jarvis Setup</h2>
								{authenticated
									? <span className="inline-flex items-center rounded-md bg-[#122a2d] px-2 py-1 text-xs font-medium text-green-300 ring-1 ring-inset ring-green-600/20">Authenticated</span>
									: <span className="inline-flex items-center rounded-md bg-[#28222f] px-2 py-1 text-xs font-medium text-red-300 ring-1 ring-inset ring-red-600/20">Not Authenticated</span>}
							</div>

							<div className="grid grid-cols-2 gap-4 space-y-4">
								{/* Redo Onboarding */}
								<div className="flex flex-col">
									<p className="mb-2 text-lg font-bold">Update Credentials and Projects</p>
									<p className="mb-2 leading-5 text-comment-color">Need to update your credentials? Click this button to reopen the Onboarding Process.</p>
								</div>
								<div>
									<button onClick={() => navigate("/onboarding/step_1")} className="button"> Restart Onboarding </button>
								</div>
								{/* Feedback */}
								<div className="flex flex-col">
									<p className="mb-2 text-lg font-bold">Give Feedback</p>
									<p className="mb-2 leading-5 text-comment-color">Help us Improve Jarvis by giving some Feedback. This will only take 1-2 Minutes.</p>
								</div>
								<div>
									<button onClick={() => openLink("https://jarvisci.com/feedback")} className="button"> Open Feedback Form </button>
								</div>
							</div>
						</div>

						<hr className="border-background-card-selected border-[1.5px]" />

						{/* Features */}
						<div className="flex flex-col mt-10 space-y-4">
							<h2 className="text-2xl font-bold">Features</h2>

							<div className="grid grid-cols-2 gap-4 space-y-4">
								{/* JSON */}
								<div className="flex flex-col">
									<p className="mb-2 text-lg font-bold">Edit Console Styling JSON</p>
									<p className="mb-2 leading-5 text-comment-color">Click to open and edit the Custom Console Styling JSON File</p>
								</div>
								<div>
									<button onClick={editConsoleStyling} className="button">Open JSON Editor</button>
								</div>

								{/* Log File */}
								<div className="flex flex-col">
									<p className="mb-2 text-lg font-bold">Open Logs</p>
									<p className="mb-2 leading-5 text-comment-color">Click to open the Log File for debugging purposes</p>
								</div>
								<div>
									<button onClick={openLogs} className="button">Open Log File</button>
								</div>

								{/* Browser */}
								<div className="flex flex-col">
									<p className="mb-2 text-lg font-bold">Open Links in Browser</p>
									<p className="mb-2 leading-5 text-comment-color">Toggle this switch to choose whether links open in Jarvis or your default browser</p>
								</div>
								<div>
									<Switch
										isChecked={isBrowserChecked} onCheckboxChange={() => {
											StorageManager.save("openInBrowser", (!isBrowserChecked).toString());
											setIsBrowserChcked(!isBrowserChecked);
										}}
									/>
								</div>

								{/* Set Titlebar Style */}
								<div className="flex flex-col">
									<p className="mb-2 text-lg font-bold">Title Bar System Icon Style</p>
									<p className="mb-2 leading-5 text-comment-color">Toggle between the classic Mac-style and Windows-style Title Bar Icons.</p>
								</div>
								<div>
									<SelectList
										list={
											[
												{ id: "winStyle", name: "Windows Style" },
												{ id: "macStyle", name: "Mac Style" },
											]
										}
										onItemSelected={(selectedId) => {
											StorageManager.save("titlebarStyle", selectedId);
											setWindowIconStyle(selectedId);
											notification.showNotification("Changed System Icon Style", "This will be applied on next Start", "success", {
												soundOn: true,
												soundType: "success",
											});
										}}
										setSelectedId={WindowIconStyle}
									/>
								</div>
							</div>

						</div>

						<hr className="border-background-card-selected border-[1.5px]" />

						{/* DANGER ZONE SECTION */}
						<div className="flex flex-col mt-10 space-y-4">
							<h2 className="text-2xl font-bold text-jenkins-job-red" onClick={() => setShowDevZone(!showDevZone)}>DANGER ZONE</h2>

							<div className="grid grid-cols-2 gap-4 space-y-4">
								{/* Clear Local Storage */}
								<div className="flex flex-col h-full">
									<p className="mb-2 text-lg font-bold">Clear Local Storage</p>
									<p className="mb-2 leading-5 text-comment-color">Warning: This action will permanently delete all stored data, including Pinned Jobs, Notification Jobs, Tokens, Projects, and more.</p>
								</div>
								<div className="h-full">
									<button onClick={() => clearAllData(notification)} className="button_danger_zone">Delete Data</button>
								</div>
							</div>
						</div>

						{/* DEV ZONE */}
						{showDevZone ? (
							<>
								<hr className="border-background-card-selected border-[1.5px]" />

								<div className="flex flex-col mt-10 space-y-4">
									<h2 className="text-2xl font-bold text-jenkins-job-blue">DEV ZONE</h2>

									<div className="grid grid-cols-2 gap-4 space-y-4">
										{/* Clear Local Storage */}
										<div className="flex flex-col h-full">
											<p className="mb-2 text-lg font-bold">Cause Runtime Error</p>
											<p className="mb-2 leading-5 text-comment-color">...</p>
										</div>
										<div className="h-full">
											<button
												onClick={() => navigate("/cause-error")}
												className="button_danger_zone"
											>
												Cause Error
											</button>
										</div>
										{/* Clear Local Storage */}
										<div className="flex flex-col h-full">
											<p className="mb-2 text-lg font-bold">Custom TitleBar Icons</p>
											<p className="mb-2 leading-5 text-comment-color">...</p>
										</div>
										<div className="h-full">
											<button
												onClick={() => {
													StorageManager.save("titlebarStyle", "eggStyle");
													setWindowIconStyle("eggStyle");
													notification.showNotification("Changed System Icon Style", "This will be applied on next Start", "success", {
														soundOn: true,
														soundType: "success",
													});
												}}
												className="button_danger_zone"
											>
												Set Icons
											</button>
										</div>
										{/* Show Banner */}
										<div className="flex flex-col h-full">
											<p className="mb-2 text-lg font-bold">Banner Test</p>
											<p className="mb-2 leading-5 text-comment-color">...</p>
										</div>
										<div className="h-full">
											<button
												onClick={() => {
													notification.showBannerNotification("Lorem ipsum dolor sit amet", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porttitor massa id neque aliquam vestibulum morbi blandit cursus. Turpis egestas maecenas pharetra convallis posuere morbi. ", false);
												}}
												className="button_danger_zone">
												Show Banner
											</button>
										</div>
									</div>
								</div>
							</>
						) : null}

					</div>
				</>
			)}
		</div>
	);
};

export default SettingsView;
