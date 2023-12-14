import React, { useEffect, useState } from "react";

import { invoke } from "@tauri-apps/api/tauri";
import { getVersion } from "@tauri-apps/api/app";
import Switch from "../../../components/Switch/Switch";
import { clearAllData, editConsoleStyling, openLogs, checkAuthentication as checkAuthenticationHelper, signOut, selectProject } from "./ButtonEvents";
import Logger from "../../../helpers/Logger";
import { useNotification } from "../../../components/NotificationManager/NotificationContext";
import { useNavigate } from "react-router-dom";

import StorageManager from "../../../helpers/StorageManager";

import "./Settings.css";
import LoadingScreenComponent from "../../../components/LoadingScreenComponent/LoadingScreenComponent";

const SettingsView: React.FC = () => {

	const navigate = useNavigate();
	const [authenticated, setAuthenticated] = useState<boolean | null>(null);

	const [baseurl, setBaseurl] = useState<string>("");
	const [username, setUsername] = useState<string>("");
	const [apiToken, setApiToken] = useState<string>("");

	const [draftNewProject, setDraftNewProject] = useState<string>("");
	const [currentProject, setCurrentProject] = useState<string>("");
	const [projects, setProjects] = useState<string[]>([]);

	const [appVersion, setAppVersion] = useState<string>("");

	const [isChecked, setIsChecked] = useState(false);

	const [isLoadingPage, setIsLoadingPage] = useState(true);

	const notification = useNotification();

	const handleCheckboxChange = () => {
		StorageManager.save("openInBrowser", (!isChecked).toString());
		setIsChecked(!isChecked);
	};

	useEffect(() => {
		checkIfAlreadyAuthenticated();
		setProjects(JSON.parse(StorageManager.get("projects") || "[]"));
		setCurrentProject(StorageManager.get("projectName") || "");
		setIsChecked(JSON.parse(StorageManager.get("openInBrowser") || "false"));

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


	useEffect(() => {
	}, [projects]);

	const checkIfAlreadyAuthenticated = async () => {
		const baseurl = StorageManager.get("baseurl");
		const username = StorageManager.get("username");
		const apiToken = StorageManager.get("apiToken");

		if (baseurl && username && apiToken) {
			setBaseurl(baseurl);
			setUsername(username);
			setApiToken(apiToken);

			const response: boolean = await invoke("authenticate_user", {
				baseurl: baseurl,
				username: username,
				apitoken: apiToken
			});

			setAuthenticated(response);
		}
	};

	const checkAuthentication = async () => {
		try {
			setIsLoadingPage(true);
			let response = await checkAuthenticationHelper(baseurl, username, apiToken);
			if (response) {
				setAuthenticated(response);
				notification.showNotification("Successfully authenticated!", "Reloading App in 3 seconds...", "settings");

				// reload page after 3 seconds
				setTimeout(() => {
					window.location.reload();
				}, 3000);

			}
		} catch (error) {
			Logger.error("Error checking authentication:", error);
			notification.showNotification("Authentication failed!", "Incorrect Username or API Token?", "settings");
		}
		setIsLoadingPage(false);
		
	};

	const addNewProject = async () => {
		const currentProjectsInStorage: string[] = JSON.parse(StorageManager.get("projects") || "[]");

		// check if project already exists
		if (currentProjectsInStorage.includes(draftNewProject)) return alert("Project already exists!");

		// add new project to storage
		currentProjectsInStorage.push(draftNewProject);

		// save new projects to storage
		StorageManager.save("projects", JSON.stringify(currentProjectsInStorage));

		// update state
		setProjects(JSON.parse(StorageManager.get("projects") || "[]"));
	};

	const deleteCurrentProject = async () => {

		const currentProject = StorageManager.get("projectName");
		let currentProjectsInStorage: string[] = JSON.parse(StorageManager.get("projects") || "[]");

		currentProjectsInStorage = currentProjectsInStorage.filter(project => project !== currentProject);

		// save new projects to storage
		StorageManager.save("projects", JSON.stringify(currentProjectsInStorage));

		// update state
		setProjects(JSON.parse(StorageManager.get("projects") || "[]"));

		// if there are still projects left, select the first one else set project to null
		if (currentProjectsInStorage.length > 0) {
			StorageManager.save("projectName", currentProjectsInStorage[0]);
		} else {
			StorageManager.save("projectName", "");
		}

		window.location.reload();
	};

	return (
		<div className="mx-10 my-10 select-none">
		{ isLoadingPage ? (
			<LoadingScreenComponent/>
		
		) : (
			<>
			<h1 className="text-3xl font-bold">Settings</h1>
			<p>Jarvis v{appVersion}</p>

			{/* Projects */}
			<div className="space-y-16">
			<div className="flex flex-col mt-10 space-y-8">

				<div className="flex flex-row space-x-2">
					<h2 className="text-2xl font-bold">Authentication</h2>
					{authenticated ?
						<span className="inline-flex items-center rounded-md bg-[#122a2d] px-2 py-1 text-xs font-medium text-green-300 ring-1 ring-inset ring-green-600/20">Authenticated</span>
						:
						<span className="inline-flex items-center rounded-md bg-[#28222f] px-2 py-1 text-xs font-medium text-red-300 ring-1 ring-inset ring-red-600/20">Not Authenticated</span>
					}
				</div>

				<div className="flex flex-col space-y-2 w-[400px]">
					<input
						type="url"
						value={baseurl}
						onChange={(e) => setBaseurl(e.target.value)}
						placeholder="Base URL"
						className="h-[37px] text-[15px] bg-background-card font-medium border border-border rounded-md placeholder-comment-color text-comment-color px-3 mr-3"
					/>

					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="Jenkins Username"
						className="h-[37px] text-[15px] bg-background-card font-medium border border-border rounded-md placeholder-comment-color text-comment-color px-3 mr-3"
					/>

					<input
						type="password"
						value={apiToken}
						onChange={(e) => setApiToken(e.target.value)}
						placeholder="Jenkins (Personal) API Token"
						className="h-[37px] text-[15px] bg-background-card font-medium border border-border rounded-md placeholder-comment-color text-comment-color px-3 mr-3"
					/>

					<div className="flex flex-row">
					<button
						onClick={checkAuthentication}
						className="button w-full">
						Save
					</button>
					<button
						onClick={signOut}
						className="button w-full">
						Sign Out
					</button>
					</div>
				</div>


			</div>

			<hr className="border-background-card-selected border-[1.5px]"/>

			{/* Projects */}
			<div className="flex flex-col mt-10 space-y-4">
				<h2 className="text-2xl font-bold">Projects / Jenkins Builds</h2>

				<div className=" gap-4 space-y-4">
					<div className="bg-console-background px-5 py-3 rounded-md space-y-2">
						{projects.map((project, index) => (
							<div className="flex space-x-5" key={index}>
								<p className={`hover:bg-background-card-selected px-7 py-1 rounded-lg active:brightness-[0.9] cursor-pointer  ${project === currentProject ? "bg-background-card-selected" : ""}`} onClick={() => selectProject(project)}>{project}</p>
							</div>
						))}
					</div>
					<input
						type="text"
						value={draftNewProject}
						onChange={(e) => setDraftNewProject(e.target.value)}
						placeholder="Add new project (e.g. 'CI-CD Pipeline')"
						className="w-[310px] h-[37px] text-[15px] bg-background-card font-medium border border-border rounded-md placeholder-comment-color text-comment-color px-3 mr-3"
					/>


					<button
						onClick={addNewProject}
						className="button button_default">
						Save
					</button>
					<button
						onClick={deleteCurrentProject}
						className={"w-[300px] h-[37px] text-[15px] button_danger_zone"}>
						Remove current Project from Jarvis
					</button>

				</div>
			</div>

			<hr className="border-background-card-selected border-[1.5px]"/>

			{/* Features */}
			<div className="flex flex-col mt-10 space-y-4">
				<h2 className="text-2xl font-bold">Features</h2>

				<div className="grid grid-cols-2 gap-4 space-y-4">
					{/* JSON */}
					<div className="flex flex-col">
						<p className="mb-2 text-lg font-bold">Open Console Styling JSON</p>
						<p className="mb-2 leading-5 text-comment-color">Open the Custom Console Styling JSON File</p>
					</div>
					<div>
						<button onClick={editConsoleStyling} className="button"> Open JSON </button>
					</div>

					{/* JSON */}
					<div className="flex flex-col">
						<p className="mb-2 text-lg font-bold">Open Logs</p>
						<p className="mb-2 leading-5 text-comment-color">Open the Log File for Debugging</p>
					</div>
					<div>
						<button onClick={openLogs} className="button"> Open Logs </button>
					</div>

					{/* Browser */}
					<div className="flex flex-col">
						<p className="mb-2 text-lg font-bold">Open all Links in Browser</p>
						<p className="mb-2 leading-5 text-comment-color">Choose Whether Links Open in Jarvis or Your Default Browser</p>
					</div>
					<div>
						<Switch isChecked={isChecked} onCheckboxChange={handleCheckboxChange} />
					</div>
				</div>
			</div>
			<div className="flex flex-col mt-10 space-y-4">
				<h2 className="text-2xl font-bold text-jenkins-job-red">DANGER ZONE</h2>

				<div className="grid grid-cols-2 gap-4 space-y-4">
					
					{/* Clear Local Storage */}
					<div className="flex flex-col">
						<p className="mb-2 text-lg font-bold">Clear Local Storage</p>
						<p className="mb-2 leading-5 text-comment-color">Clear all Data like: Pinned Jobs, Notification Jobs, Tokens, Projects...</p>
					</div>
					<div>
						<button onClick={clearAllData} className="button_danger_zone"> Delete </button>
					</div>

					{/* Redo Onboarding */}
					<div className="flex flex-col">
						<p className="mb-2 text-lg font-bold">[DEBUG] Onboarding Restart</p>
						<p className="mb-2 leading-5 text-comment-color">Return to the Onboarding.</p>
					</div>
					<div>
						<button onClick={() => {
							navigate("/onboarding");
						}} className="button_danger_zone"> Go back </button>
					</div>
				</div>
			</div>
		</div>
		</>
		)}
		</div>
	);
};

export default SettingsView;