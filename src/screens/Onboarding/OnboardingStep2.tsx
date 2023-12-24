import React, { useEffect, useState } from "react";
import { appWindow, LogicalSize } from "@tauri-apps/api/window";
import { IoClose } from "react-icons/io5";
import icon from "../../assets/icons/ico_bow.svg";

import "./Onboarding.css";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../components/NotificationManager/NotificationContext";
import { motion } from "framer-motion";
import StorageManager from "../../helpers/StorageManager";

import projectURLIMG from "../../assets/faq/faq_projectURL.webp";
import { fetchUtils } from "../Jarvis/Utils/fetchUtils";
import { JenkinsData, JenkinsDataJob } from "../../Interfaces/IJenkinsData";

const OnboardingStep1: React.FC = () => {
	const [currentProjects, setCurrentProjects] = useState<string[]>([]);
	const [showHelpModal, setShowHelpModal] = useState(false);
	const [allJobs, setAllJobs] = useState<JenkinsDataJob[]>([] as JenkinsDataJob[]);

	const navigate = useNavigate();
	const notification = useNotification();

	useEffect(() => {
		// Set screen size to 300px width and 400px height
		const size = new LogicalSize(700, 550);
		appWindow.setSize(size).then(() => appWindow.center());
	}, []);

	const continueOnboarding = async () => {
		try {
			if (currentProjects.length === 0) {
				notification.showNotification("Error", "Please add at least one project.", "jenkins");
				return;
			}

			StorageManager.save("projectName", currentProjects[0]);

			navigate("/onboarding/step_3");
		} catch (error) {
			notification.showNotification("Error", String(error), "jenkins");
		}
	};

	const addJobToStorage = async (jobName: string) => {
		const currentProjectsInStorage: string[] = JSON.parse(StorageManager.get("projects") || "[]");

		if (currentProjectsInStorage.includes(jobName)) {
			notification.showNotification("Project already exists in Storage", "Please use another one or click the Skip button.", "jenkins");
			return;
		}

		currentProjectsInStorage.push(jobName);
		StorageManager.save("projects", JSON.stringify(currentProjectsInStorage));

		setCurrentProjects(currentProjectsInStorage);

		const newAllJobs = allJobs.filter((job: JenkinsDataJob) => job.name !== jobName);
		setAllJobs(newAllJobs);
	};

	const removeJobsFromStorage = async (jobName: string) => {
		let currentProjectsInStorage: string[] = JSON.parse(StorageManager.get("projects") || "[]");

		currentProjectsInStorage = currentProjectsInStorage.filter((job) => job !== jobName);
		StorageManager.save("projects", JSON.stringify(currentProjectsInStorage));

		setCurrentProjects(currentProjectsInStorage);

		// add job back to all jobs
		const newAllJobs: JenkinsDataJob[] = allJobs;
		newAllJobs.push({
			name: jobName,
			_class: "",
			url: "",
			color: ""
		});
		setAllJobs(newAllJobs);
	};

	useEffect(() => {
		const getJobs = async () => {
			const JenkinsData: JenkinsData | undefined = await fetchUtils.fetchJenkinsData();
			const jobs: JenkinsDataJob[] | undefined = JenkinsData?.jobs;

			const currentProjectsInStorage: string[] = JSON.parse(StorageManager.get("projects") || "[]");
			const newJobs = jobs?.filter((job) => !currentProjectsInStorage.includes(job.name));

			if (newJobs === undefined) {
				notification.showNotification("Error", "No jobs found on Jenkins.", "jenkins");
				return;
			}

			setAllJobs(newJobs);
			setCurrentProjects(currentProjectsInStorage);
		};

		getJobs();
	}, []);

	return (
		<div className="flex flex-col bg-background-view items-center justify-center h-screen select-none overflow-x-none">
			<img src={icon} alt="Welcome icon" className="absolute top-8 w-8 h-8" />

			<div className="flex flex-row w-[85%] space-x-4">
				{/* All Jobs */}
				<div className="bg-console-background px-5 py-5 w-2/3 rounded-md space-y-2 max-h-[350px] overflow-y-scroll onboarding-custom-scroll">
					<p className="font-[600] text-lg">All Jobs</p>
					<hr className="border-border border-2 rounded-full" />
					{allJobs.map((project, index) => (
						<div className="flex space-x-5" key={index}>
							<p
								className="hover:bg-background-card-selected px-7 py-1 rounded-lg active:brightness-[0.9] cursor-pointer break-all"
								onClick={() => addJobToStorage(project.name)}
							>
								{project.name}
							</p>
						</div>
					))}
				</div>
				{/* Added Jobs */}
				<div className="bg-console-background px-5 py-5 w-2/3 rounded-md space-y-2 max-h-[350px] overflow-y-scroll onboarding-custom-scroll">
					<p className="font-[600] text-lg">Added to Favorites</p>
					<hr className="border-border border-2 rounded-full" />
					{currentProjects.map((project, index) => (
						<div className="flex space-x-5" key={index}>
							<p
								className="hover:bg-background-card-selected px-7 py-1 rounded-lg active:brightness-[0.9] cursor-pointer break-all"
								onClick={() => removeJobsFromStorage(project)}
							>
								{project}
							</p>
						</div>
					))}
				</div>
			</div>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5, delay: 1 }}
				className="absolute bottom-[35px]"
			>
				<button
					className="button"
					onClick={() => continueOnboarding()}
				>
    Continue
				</button>
			</motion.div>

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
					<div className="bg-background-sidebar p-10 w-[90%] h-[90%] rounded-md relative overflow-y-scroll overflow-x-hidden custom-scroll scrollbar-hidden">
						<div
							onClick={() => setShowHelpModal(false)}
							className="absolute top-4 right-4 cursor-pointer"
						>
							<IoClose
								size={32}
								className="transition hover:brightness-75 hover:scale-105 active:brightness-105 active:scale-95"
							/>
						</div>
						<h1 className="text-2xl font-bold mb-4">Setup Guide</h1>
						<details open>
							<summary className="font-medium text-lg">Where do i find the Base URL?</summary>
							<div className="ml-4 text-comment-color">
								<p>The Base URL is the URL you use to access Jenkins.</p>
								<img className="hover:scale-[1.1] transition mt-4 mb-8" src={projectURLIMG} alt="Base URL" />
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
