import React, { useEffect, useState } from "react";
import { appWindow, LogicalSize } from "@tauri-apps/api/window";
import icon from "../../assets/brand/ico_bow.svg";

import "./Onboarding.css";
import { useNavigate } from "react-router-dom";
import { checkAuthentication } from "../Jarvis/Views/SettingsView/ButtonEvents";
import { useNotification } from "../../components/NotificationManager/NotificationContext";
import { motion } from "framer-motion";

import StorageManager from "../../helpers/StorageManager";

import baseURLIMG from "../../assets/faq/faq_baseURL.webp";
import usernameIMG from "../../assets/faq/faq_username.webp";
import Logger from "../../helpers/Logger";
import { IcoCross } from "@/Icons/pack_1";

const OnboardingStep1: React.FC = () => {
	const [baseUrl, setBaseUrl] = useState(StorageManager.get("baseurl") || "");
	const [username, setUsername] = useState(StorageManager.get("username") || "");
	const [apiToken, setApiToken] = useState(StorageManager.get("apiToken") || "");
	const [showHelpModal, setShowHelpModal] = useState(false);

	const navigate = useNavigate();
	const notification = useNotification();

	useEffect(() => {
		// Set screen size to 300px width and 400px height
		const size = new LogicalSize(700, 550);
		appWindow.setSize(size).then(() => appWindow.center());
	}, []);

	const checkValidUrl = (url: string) => {
		try {
			new URL(url);
			return true;
		} catch (_) {
			return false;
		}
	};

	const continueOnboarding = async () => {
		try {
			if (!checkValidUrl(baseUrl)) {
				notification.showNotification("Invalid URL", "Please check again.", "error", {
					soundOn: true,
					soundType: "error",
				});
				return;
			}
	
			if (username === "") {
				notification.showNotification("Invalid Username", "Please check again.", "error", {
					soundOn: true,
					soundType: "error",
				});
				return;
			}
	
			if (apiToken === "") {
				notification.showNotification("Invalid API Token", "Please check again.", "error", {
					soundOn: true,
					soundType: "error",
				});
				return;
			}
	
			const response = await checkAuthentication(baseUrl, username, apiToken);
	
			if (response === false) {
				notification.showNotification("Authentication failed", "Please check your Credentials.", "error", {
					soundOn: true,
					soundType: "error",
				});
			} else {
				StorageManager.save("baseurl", baseUrl);
				StorageManager.save("username", username);
				StorageManager.save("apiToken", apiToken);
				navigate("/onboarding/step_2");
			}
		} catch (error) {
			// if error includes "error trying to connect" then show notification
			if ((error as Error).toString().includes("error trying to connect")) {
				notification.showNotification("Connection failed", "Could not connect to the Jenkins Server", "error", {
					soundOn: true,
					soundType: "error",
				});
			} else {
				notification.showNotification("An error occurred", "Please try again.", "error", {
					soundOn: true,
					soundType: "error",
				});
			}
			Logger.error("Onboarding/OnboardingStep1.tsx", "OnboardingStep1 Error", error);
		}
	};

	return (
		<div className="flex flex-col bg-background-view items-center justify-center h-screen select-none">
			<img src={icon} alt="Welcome icon" className="absolute top-8 w-8 h-8" />
			<div className="space-y-4">
				{/* BASE URL */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 0.5 }}
				>
					<label htmlFor="baseUrl" className="block text-sm font-medium text-comment-color">
    Base URL
					</label>
					<input
						type="url"
						id="baseUrl"
						value={baseUrl}
						onChange={(e) => setBaseUrl(e.target.value)}
						placeholder="Base URL (e.g. https://jenkins.example.com)"
						autoComplete="off"
						className="h-[37px] w-[340px] text-[15px] bg-background-card font-medium border border-border rounded-md placeholder-comment-color text-comment-color px-3 mr-3"
					/>
				</motion.div>
				{/* User */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 1 }}
				>
					<div className="flex flex-row">
						<label htmlFor="userName" className="block text-sm font-medium text-comment-color">
    User Name
						</label>
					</div>
					<input
						type="text"
						id="userName"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="User Name (e.g. jenkins-user)"
						autoComplete="off"
						className="h-[37px] w-[340px] text-[15px] bg-background-card font-medium border border-border rounded-md placeholder-comment-color text-comment-color px-3 mr-3"
					/>
				</motion.div>
				{/* API Token */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 1.5 }}
				>
					<label htmlFor="apitoken" className="block text-sm font-medium text-comment-color">
    API Token
					</label>
					<input
						type="password"
						id="apitoken"
						value={apiToken}
						onChange={(e) => setApiToken(e.target.value)}
						placeholder="API Token (e.g. 114cf80f6955b2668147…)"
						autoComplete="off"
						className="h-[37px] w-[340px] text-[15px] bg-background-card font-medium border border-border rounded-md placeholder-comment-color text-comment-color px-3 mr-3"
					/>
				</motion.div>
			</div>

			<motion.button
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5, delay: 2 }}
				className="button absolute bottom-[35px]"
				onClick={() => continueOnboarding()}
				onKeyPress={(e) => {
					if (e.key === "Enter") {
						continueOnboarding();
					}
				}}
			>
    Continue
			</motion.button>

			{/* Help Modal */}
			<p
				onClick={() => setShowHelpModal(true)}
				className="absolute bottom-4 right-8 text-sm text-comment-color transition hover:brightness-75 active:brightness-90"
			>
    Need help?
			</p>

			{showHelpModal && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.1 }}
					exit={{ opacity: 0 }}
					className="absolute w-full h-full backdrop-blur-sm bg-black/70 transition flex justify-center items-center"
				>
					<div className="bg-background-sidebar p-10 w-[90%] h-[90%] rounded-md relative overflow-y-scroll overflow-x-hidden custom-scroll">
						<div
							onClick={() => setShowHelpModal(false)}
							className="absolute top-4 right-4 cursor-pointer"
						>
							<IcoCross
								size={32}
								className="transition hover:brightness-75 hover:scale-105 active:brightness-105 active:scale-95"
							/>
						</div>
						<h1 className="text-2xl font-bold mb-4">Setup Guide</h1>
						<details open>
							<summary className="font-medium text-lg">Where do i find the Base URL?</summary>
							<div className="ml-4 text-comment-color">
								<p>The Base URL is the URL you use to access Jenkins.</p>
								<img className="hover:scale-[1.1] transition mt-4 mb-8" src={baseURLIMG} alt="Base URL" />
							</div>
						</details>
						<details>
							<summary className="font-medium text-lg">What is my Username?</summary>
							<div className="ml-4 text-comment-color">
								<p>The Username is the same Username you use to login to Jenkins.</p>
								<img className="hover:scale-[1.1] transition mt-4 mb-8" src={usernameIMG} alt="Username" />
							</div>
						</details>
						<details>
							<summary className="font-medium text-lg">How do i create the API Token?</summary>
							<div className="ml-4 text-comment-color">
								<p>You can create an API Token by goint to</p>
								<p>
    Profile
									{">"}
									{" "}
    Configure
									{">"}
									{" "}
    API Token
									{">"}
									{" "}
    Add new Token
								</p>
							</div>
						</details>
					</div>
				</motion.div>
			)}

			{/* End Help Modal */}
		</div>
	);
};

export default OnboardingStep1;
