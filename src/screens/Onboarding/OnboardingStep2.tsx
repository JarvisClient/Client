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

const OnboardingStep1: React.FC = () => {
    const [projectURL, setProjectURL] = useState('');
    const [showHelpModal, setShowHelpModal] = useState(false); 

    const navigate = useNavigate();
    const notification = useNotification();

    useEffect(() => {
        // Set screen size to 300px width and 400px height
        let size = new LogicalSize(700, 550);
        appWindow.setSize(size).then(() => appWindow.center());
    }, []);

    const checkValidUrl = (url: string) => {
        try {
            new URL(url);
            return true;
        } catch (_) {
            return false;
        }
    }

    const continueOnboarding = async () => {
        try {
            let baseUrl = StorageManager.get("baseurl");
            let username = StorageManager.get("username");
            let apiToken = StorageManager.get("apiToken");
            let projects = StorageManager.get("projects");
            let projectName;

            // validate input
            if (!checkValidUrl(projectURL)) {
                notification.showNotification("Invalid URL", "Please check again.", "jenkins");
                return;
            } else {
                projectName = projectURL.split("/")[4];
            }

            // Current Projects in Storage
            const currentProjectsInStorage: string[] = JSON.parse(StorageManager.get("projects") || "[]");


            // check if project already exists
            if (currentProjectsInStorage.includes(projectName)) {
                notification.showNotification("Project already exists in Storage", "Please use another one or click the Skip button.", "jenkins");
                return;
            }

            // check if project is valid
            let response = await checkProjectValidity(baseUrl, username, apiToken, projectName) || false;

            if (response === false) {
                notification.showNotification("Invalid Project", "Please check again.", "jenkins");
                return;
            }

            // add project to storage
            currentProjectsInStorage.push(projectName);
            StorageManager.save("projects", JSON.stringify(currentProjectsInStorage));
            StorageManager.save("projectName", projectName);
            navigate("/onboarding/step_3");
        } catch (error) {
            notification.showNotification("Error", String(error), "jenkins");
        }
    }

    const skipToStep3 = () => {
        const currentProjectsInStorage: string[] = JSON.parse(StorageManager.get("projects") || "[]");

        if (currentProjectsInStorage.length > 0) {
            navigate("/onboarding/step_3");
        } else {
            notification.showNotification("No Projects", "Please add a project first.", "jenkins");
        }
    }

    const checkIfSkipAvailable = () => {
        const currentProjectsInStorage: string[] = JSON.parse(StorageManager.get("projects") || "[]");

        if (currentProjectsInStorage.length > 0) {
            return true;
        } else {
            return false;
        }
    }



    return (
        <div className="flex flex-col bg-background-view items-center justify-center h-screen select-none">
            <img src={icon} alt="Welcome icon" className="absolute top-8 w-8 h-8" />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-4">
                {/* BASE URL */}
                <div>
                    <label htmlFor="projectURL" className="block text-sm font-medium text-comment-color">
                        Project URL
                    </label>
                    <input
                        type="url"
                        id="projectURL"
                        value={projectURL}
                        onChange={(e) => setProjectURL(e.target.value)}
                        placeholder="Project URL (e.g. https://jenkins.example.com/job/MyProject)"
                        autoComplete="off"
                        className="h-[37px] w-[340px] text-[15px] bg-background-card font-medium border border-border rounded-md placeholder-comment-color text-comment-color px-3 mr-3"/>
                </div>
            </motion.div>

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
                {checkIfSkipAvailable() && (
                    <button
                        className="button"
                        onClick={() => skipToStep3()}>
                        Skip
                    </button>
                )}
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
