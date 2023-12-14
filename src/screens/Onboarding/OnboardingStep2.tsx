import React, { useEffect, useState } from "react";
import { appWindow, LogicalSize } from '@tauri-apps/api/window';
import icon from "../../assets/icons/ico_bow.svg";

import "./Onboarding.css";
import { useNavigate } from "react-router-dom";
import { checkProjectValidity } from "../Views/SettingsView/ButtonEvents";
import { useNotification } from "../../components/NotificationManager/NotificationContext";
import { motion } from "framer-motion";


const OnboardingStep1: React.FC = () => {
    const [projectURL, setProjectURL] = useState('');

    const navigate = useNavigate();
    const notification = useNotification();

    useEffect(() => {
        // Set screen size to 300px width and 400px height
        let size = new LogicalSize(600, 450);
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
            let baseUrl = localStorage.getItem("baseurl");
            let username = localStorage.getItem("username");
            let apiToken = localStorage.getItem("apiToken");
            let projects = localStorage.getItem("projects");
            let projectName;

            // validate input
            if (!checkValidUrl(projectURL)) {
                notification.showNotification("Invalid URL", "Please check again.", "jenkins");
                return;
            } else {
                projectName = projectURL.split("/")[4];
            }

            // Current Projects in Storage
            const currentProjectsInStorage: string[] = JSON.parse(localStorage.getItem("projects") || "[]");


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
            localStorage.setItem("projects", JSON.stringify(currentProjectsInStorage));
            localStorage.setItem("projectName", projectName);
            navigate("/onboarding/step_3");
        } catch (error) {
            notification.showNotification("Error", String(error), "jenkins");
        }
    }

    const skipToStep3 = () => {
        const currentProjectsInStorage: string[] = JSON.parse(localStorage.getItem("projects") || "[]");

        if (currentProjectsInStorage.length > 0) {
            navigate("/onboarding/step_3");
        } else {
            notification.showNotification("No Projects", "Please add a project first.", "jenkins");
        }
    }

    const checkIfSkipAvailable = () => {
        const currentProjectsInStorage: string[] = JSON.parse(localStorage.getItem("projects") || "[]");

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
                        placeholder="Base URL"
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
        </div>
    );
}

export default OnboardingStep1;
