import React, { useEffect } from "react";
import { appWindow, LogicalSize } from '@tauri-apps/api/window';
import icon from "../../assets/icons/ico_bow.svg";

import "./Onboarding.css";
import { DEFAULT_WINDOW_HEIGHT, DEFAULT_WINDOW_WIDTH } from "../../config/constants";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


const OnboardingMain: React.FC = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        // Set screen size to 300px width and 400px height
        let size = new LogicalSize(300, 400);
        appWindow.setSize(size).then(() => appWindow.center());
    }, []);

    const continueOnboarding = () => {
        navigate("/onboarding/step_1");
    }

    return (
        <div className="flex flex-col bg-background-view items-center justify-center h-screen select-none">
            <div className="flex flex-col items-center text-center mb-10">
                <motion.img 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    src={icon} 
                    alt="Welcome icon" 
                    className="w-16 h-16 mb-4" />
                <motion.h1 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="text-2xl font-medium mb-4">
                        Welcome to <br/><span className="font-bold">Jarvis</span>
                </motion.h1>
            </div>
            <motion.button 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="button absolute bottom-[35px]"
                onClick={() => continueOnboarding()}>
                Continue
            </motion.button>
        </div>
    );
}

export default OnboardingMain;
