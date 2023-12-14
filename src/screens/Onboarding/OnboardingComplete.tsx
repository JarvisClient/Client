import React, { useEffect } from "react";
import { appWindow, LogicalSize } from '@tauri-apps/api/window';
import { motion } from 'framer-motion';
import icon from "../../assets/icons/ico_bow.svg";
import { relaunch } from '@tauri-apps/api/process';

import "./Onboarding.css";
import { DEFAULT_WINDOW_HEIGHT, DEFAULT_WINDOW_WIDTH } from "../../config/constants";

import StorageManager from "../../helpers/StorageManager";


const OnboardingComplete: React.FC = () => {
    useEffect(() => {
        StorageManager.save("onboardState", "true");
        appWindow.setSize(new LogicalSize(DEFAULT_WINDOW_WIDTH, DEFAULT_WINDOW_HEIGHT));
        appWindow.maximize();
    }, []);

    const navigateToMain = async () => {
        await relaunch();
    }

    const rectangleVariants = {
        initial: {
            width: 0,
        },
        animate: {
            width: "100%",
            transition: {
                duration: 5, // Duration of the animation in seconds
            },
        },
    };

    return (
        <div className="flex flex-col bg-background-sidebar items-center justify-center h-screen select-none">
            <div className="flex flex-col items-center text-center mb-10">
                <motion.img
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    drag
                    dragConstraints={{
                        top: -50,
                        left: -50,
                        right: 50,
                        bottom: 50,
                    }}
                    src={icon}
                    alt="Welcome icon"
                    className="w-16 h-16 mb-4" />
                <h1 className="text-2xl font-medium mb-4">Welcome to <br /><span className="font-bold">Jarvis</span></h1>

                <p className="mb-6">Great to have you here!</p>

                <div className="w-[200px]">
                    <div className="w-full h-1.5 bg-background-view rounded-full">
                        <motion.div
                            className="bg-gray-500 h-1.5 rounded-full"
                            variants={rectangleVariants}
                            initial="initial"
                            animate="animate"
                            onAnimationComplete={navigateToMain}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default OnboardingComplete;
