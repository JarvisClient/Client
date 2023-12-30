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
import {JenkinsDataJob } from "../../Interfaces/IJenkinsData";
import Logger from "../../helpers/Logger";
import { getAllProjects } from "../../components/ProjectSwitcher/ProjectSwitchUtils";

const OnboardingStep1: React.FC = () => {
	const [FavoriteProjects, setFavoriteProjects] = useState<JenkinsDataJob[]>([]);
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
			// Check if there are any jobs added to favorites
			if (FavoriteProjects.length === 0) throw new Error("No jobs added to favorites");

			// Set Top most project url as currentProject
			const baseUrl = StorageManager.get("baseurl");
			if (!baseUrl) throw new Error("Base URL not found");
			const currentProject = FavoriteProjects[0].url.replace(baseUrl + "job/", "");
			await StorageManager.save("projectName", currentProject);

			navigate("/onboarding/step_3");

		} catch (error) {
			Logger.error(error);
			notification.showNotification("error", String(error), "error", {
				soundOn: true,
				soundType: "error",
			});
		}
	};

	const addJobToStorage = async (job: JenkinsDataJob) => {
		// Add job to FavoriteProjects
		const newFavoriteProjects = [...FavoriteProjects, job];
		setFavoriteProjects(newFavoriteProjects);

		// Remove job from allJobs
		const newAllJobs = allJobs.filter((item) => item.name !== job.name);
		setAllJobs(newAllJobs);

		// Add job to storage
		const favoriteProjects = JSON.parse(await StorageManager.get("projects") || "[]");
		favoriteProjects.push(job);
		await StorageManager.save("projects", JSON.stringify(favoriteProjects));
	};

	const removeJobsFromStorage = async (job: JenkinsDataJob) => {
		// Remove job from FavoriteProjects
		const newFavoriteProjects = FavoriteProjects.filter((item) => item.name !== job.name);
		setFavoriteProjects(newFavoriteProjects);

		// Add job to allJobs
		const newAllJobs = [...allJobs, job];
		setAllJobs(newAllJobs);

		// Remove job from storage
		const favoriteProjects = JSON.parse(await StorageManager.get("projects") || "[]");
		const newFavoriteProjectsStorage = favoriteProjects.filter((item: JenkinsDataJob) => item.name !== job.name);
		await StorageManager.save("projects", JSON.stringify(newFavoriteProjectsStorage));
	};

	useEffect(() => {
		const getJobs = async () => {
			try {
				// Get all jobs from storage
				const allProjects = await getAllProjects();
				setAllJobs(allProjects);

				// Get favorite jobs from storage
				const favoriteProjects: JenkinsDataJob[] = JSON.parse(await StorageManager.get("projects") || "[]");
				setFavoriteProjects(favoriteProjects);

				// Remove favorite jobs from all jobs
				const newAllJobs = allProjects.filter((item) => !favoriteProjects.includes(item));
				setAllJobs(newAllJobs);
			} catch (error) {
				Logger.error("Error getting jobs:", error);
			}
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
								onClick={() => addJobToStorage(project)}
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
					{FavoriteProjects.map((project, index) => (
						<div className="flex space-x-5" key={index}>
							<p
								className="hover:bg-background-card-selected px-7 py-1 rounded-lg active:brightness-[0.9] cursor-pointer break-all"
								onClick={() => removeJobsFromStorage(project)}
							>
								{project.name}
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
