import React, { useEffect } from "react";
import { appWindow, LogicalSize } from '@tauri-apps/api/window';
import icon from "../../assets/icons/ico_bow.svg";

import "./Onboarding.css";
import { DEFAULT_WINDOW_HEIGHT, DEFAULT_WINDOW_WIDTH } from "../../config/constants";
import { useNavigate } from "react-router-dom";


const OnboardingMain: React.FC = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        // Set screen size to 300px width and 400px height
        let size = new LogicalSize(300, 400);
        appWindow.setSize(size).then(() => appWindow.center());
    }, []);

    const continueOnboarding = () => {
        navigate("/onboarding/complete");
    }

    return (
        <div className="flex flex-col bg-background-sidebar items-center justify-center h-screen select-none">
            <div className="flex flex-col items-center text-center mb-10">
                <img src={icon} alt="Welcome icon" className="w-16 h-16 mb-4" />
                <h1 className="text-2xl font-medium mb-4">Welcome to <br/><span className="font-bold">Jarvis</span></h1>
            </div>
            <button 
                className="button absolute bottom-[35px]"
                onClick={() => continueOnboarding()}>
                Continue
            </button>
        </div>
    );
}

export default OnboardingMain;
