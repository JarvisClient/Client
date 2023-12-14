import React, { useEffect, useState } from "react";
import { appWindow, LogicalSize } from '@tauri-apps/api/window';
import icon from "../../assets/icons/ico_bow.svg";

import "./Onboarding.css";
import { useNavigate } from "react-router-dom";
import { checkProjectValidity } from "../Views/SettingsView/ButtonEvents";
import { useNotification } from "../../components/NotificationManager/NotificationContext";
import { motion } from "framer-motion";
import StorageManager from "../../helpers/StorageManager";
import { IoClose } from "react-icons/io5";

import projectURLIMG from "../../assets/faq/faq_projectURL.webp";
import { invoke } from "@tauri-apps/api";
import { getAuthDetails } from "../../config/auth";

const OnboardingStep1: React.FC = () => {
    const [projectURL, setProjectURL] = useState('');
    const [currentProjects, setCurrentProjects] = useState<string[]>([]);
    const [showHelpModal, setShowHelpModal] = useState(false);
    const [allJobs, setAllJobs] = useState([]);

    const navigate = useNavigate();
    const notification = useNotification();

    useEffect(() => {
        // Set screen size to 300px width and 400px height
        let size = new LogicalSize(700, 550);
        appWindow.setSize(size).then(() => appWindow.center());
    }, []);

    const continueOnboarding = async () => {
        try {
            if (currentProjects.length === 0) {
                notification.showNotification("Error", "Please add at least one project.", "jenkins");
                return;
            }

            navigate("/onboarding/step_3");
        } catch (error) {
            notification.showNotification("Error", String(error), "jenkins");
        }
    }


    const getAllProjects = async () => {
        const config = {
            ...getAuthDetails(),
        };

        let response: any = await invoke("get_jenkins_data", config);

        if (!response) {
            notification.showNotification("Error", "Something went wrong.", "jenkins");
            return;
        }

        return JSON.parse(response)["jobs"]

    }

    const addJobToStorage = async (jobName: string) => {
        let currentProjectsInStorage: string[] = JSON.parse(StorageManager.get("projects") || "[]");

        if (currentProjectsInStorage.includes(jobName)) {
            notification.showNotification("Project already exists in Storage", "Please use another one or click the Skip button.", "jenkins");
            return;
        }

        currentProjectsInStorage.push(jobName);
        StorageManager.save("projects", JSON.stringify(currentProjectsInStorage));

        setCurrentProjects(currentProjectsInStorage);

        let newAllJobs = allJobs.filter((job: any) => job["name"] !== jobName);
        setAllJobs(newAllJobs);   
    }

    const removeJobsFromStorage = async (jobName: string) => {
        let currentProjectsInStorage: string[] = JSON.parse(StorageManager.get("projects") || "[]");

        currentProjectsInStorage = currentProjectsInStorage.filter((job: any) => job !== jobName);
        StorageManager.save("projects", JSON.stringify(currentProjectsInStorage));

        setCurrentProjects(currentProjectsInStorage);

        // add job back to all jobs
        let newAllJobs: any = allJobs;
        newAllJobs.push({"name": jobName});
        setAllJobs(newAllJobs);
    }

    useEffect(() => {
        const getJobs = async () => {
            let jobs = await getAllProjects();
            let currentProjectsInStorage: string[] = JSON.parse(StorageManager.get("projects") || "[]");

            let newJobs = jobs.filter((job: any) => !currentProjectsInStorage.includes(job["name"]));
            setAllJobs(newJobs);

            setCurrentProjects(currentProjectsInStorage);
        }

        getJobs();
    }, [])


    return (
        <div className="flex flex-col bg-background-view items-center justify-center h-screen select-none overflow-x-none">
            <img src={icon} alt="Welcome icon" className="absolute top-8 w-8 h-8" />


            <div className="flex flex-row w-[85%] space-x-4">
                {/* All Jobs */}
                <div className="bg-console-background px-5 py-5 w-2/3 rounded-md space-y-2 max-h-[350px] overflow-y-scroll onboarding-custom-scroll">
                    <p className="font-[600] text-lg">All Jobs</p>
                    <hr className="border-border border-2 rounded-full"/>
                    {allJobs.map((project, index) => (
                        <div className="flex space-x-5" key={index}>
                            <p className={`hover:bg-background-card-selected px-7 py-1 rounded-lg active:brightness-[0.9] cursor-pointer break-all`}
                            onClick={() => addJobToStorage(project["name"])}
                            >
                                {project["name"]}
                            </p>
                        </div>
                    ))}
                </div>
                {/* Added Jobs */}
                <div className="bg-console-background px-5 py-5 w-2/3 rounded-md space-y-2 max-h-[350px] overflow-y-scroll onboarding-custom-scroll">
                    <p className="font-[600] text-lg">Added to Favorites</p>
                    <hr className="border-border border-2 rounded-full"/>
                    {currentProjects.map((project, index) => (
                        <div className="flex space-x-5" key={index}>
                            <p className={`hover:bg-background-card-selected px-7 py-1 rounded-lg active:brightness-[0.9] cursor-pointer break-all`}
                            onClick={() => removeJobsFromStorage(project)}>
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
                className="absolute bottom-[35px]">
                <button
                    className="button"
                    onClick={() => continueOnboarding()}>
                    Continue
                </button>
            </motion.div>

            {/* Help Modal */}
            <p onClick={() => setShowHelpModal(true)}
                className="absolute bottom-4 right-8 text-sm text-comment-color transition hover:brightness-75 active:brightness-90">
                Need help?
            </p>

            {showHelpModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.1 }}
                    exit={{ opacity: 0 }}
                    className="absolute w-full h-full backdrop-blur-sm bg-black/70 transition flex justify-center items-center">
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
}

export default OnboardingStep1;
