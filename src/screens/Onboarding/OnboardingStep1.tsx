import React, { useEffect, useState } from "react";
import { appWindow, LogicalSize } from '@tauri-apps/api/window';
import icon from "../../assets/icons/ico_bow.svg";

import "./Onboarding.css";
import { DEFAULT_WINDOW_HEIGHT, DEFAULT_WINDOW_WIDTH } from "../../config/constants";
import { useNavigate } from "react-router-dom";
import { checkAuthentication } from "../Views/SettingsView/ButtonEvents";
import { useNotification } from "../../components/NotificationManager/NotificationContext";
import { motion } from "framer-motion";


const OnboardingStep1: React.FC = () => {
    const [baseUrl, setBaseUrl] = useState(localStorage.getItem("baseurl") || '');
    const [username, setUsername] = useState(localStorage.getItem("username") || '');
    const [apiToken, setApiToken] = useState(localStorage.getItem("apiToken") || '');


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
        // validate input

        if (!checkValidUrl(baseUrl)) {
            notification.showNotification("Invalid URL", "Please check again.", "jenkins");
            return;
        }

        if (username === "") {
            notification.showNotification("Invalid Username", "Please check again.", "jenkins");
            return;
        }

        if (apiToken === "") {
            notification.showNotification("Invalid API Token", "Please check again.", "jenkins");
            return;
        }

        let response = await checkAuthentication(baseUrl, username, apiToken)

        if (response === false) {
            notification.showNotification("Authentication failed", "Please check your Credentials.", "jenkins");
            return;
        } else {
            localStorage.setItem("baseurl", baseUrl);
            localStorage.setItem("username", username);
            localStorage.setItem("apiToken", apiToken);
            navigate("/onboarding/step_2");
        }
    }



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
                        className="h-[37px] w-[340px] text-[15px] bg-background-card font-medium border border-border rounded-md placeholder-comment-color text-comment-color px-3 mr-3" />
                </motion.div>
                {/* User */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                >
                    <label htmlFor="userName" className="block text-sm font-medium text-comment-color">
                        User Name
                    </label>
                    <input
                        type="text"
                        id="userName"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="User Name (e.g. jenkins-user)"
                        autoComplete="off"
                        className="h-[37px] w-[340px] text-[15px] bg-background-card font-medium border border-border rounded-md placeholder-comment-color text-comment-color px-3 mr-3" />
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
                        className="h-[37px] w-[340px] text-[15px] bg-background-card font-medium border border-border rounded-md placeholder-comment-color text-comment-color px-3 mr-3" />
                </motion.div>
            </div>

            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 2 }}
                className="button absolute bottom-[35px]"
                onClick={() => continueOnboarding()}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        continueOnboarding();
                    }
                }}>
                Continue
            </motion.button>
        </div>
    );
}

export default OnboardingStep1;
