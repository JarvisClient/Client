import React, { useEffect } from "react"
import { appWindow, LogicalSize } from '@tauri-apps/api/window';
import icon from "../../assets/icons/ico_bow.svg";
import { useNavigate } from "react-router-dom";

const App: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("App mounted")
        appWindow.setSize(new LogicalSize(270, 350));
        appWindow.center();

        navigate(decideOnboarding());

    }, [])

    const decideOnboarding = () => {
        let onboardState = localStorage.getItem("onboardState");
        if (onboardState === null) {
            return "/onboarding";
        } else {
            return "/jarvis";
        }
    }

    return (
        <div className="flex flex-col bg-background-sidebar items-center justify-center h-screen select-none">
            <img src={icon} alt="Welcome icon" className="w-16 h-16 mb-4" />
            <h1 className="text-2xl mb-4 text-center">Loading ...</h1>
        </div>
    )
}

export default App