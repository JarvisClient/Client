import React, { useEffect } from "react"
import { appWindow, LogicalSize } from '@tauri-apps/api/window';
import icon from "../../assets/icons/ico_bow.svg";
import { useNavigate } from "react-router-dom";
import loading_anim from "../../assets/icons/loading_anim.webm";
import Logger from "../../helpers/Logger";
import StorageManager from "../../helpers/StorageManager";

const App: React.FC = () => {
    const navigate = useNavigate();
    const [specificLoadingMessage, setSpecificLoadingMessage] = React.useState<string>("");

    useEffect(() => {
        Logger.info("App started");
        appWindow.setSize(new LogicalSize(270, 350));
        appWindow.center();

        // Check for Jarvis Home Connection
        setSpecificLoadingMessage("Checking for Updates...")
        
        setTimeout(() => {
            setSpecificLoadingMessage("Checking Setup...")
            navigate(decideOnboarding());
        }, 1500);

    }, [])

    const messages = [
        "Polishing the silverware",
        "Selecting the finest monocle",
        "Adjusting the bowtie to the perfect angle",
        "Summoning the ghost of Jeeves",
        "Brewing a spot of Earl Grey tea",
        "Inspecting the quality of crumpets",
        "Counting the silver spoons",
        "Measuring the top hat's height",
        "Warming up Jarvis' gloves",
        "Polishing the shoe shine machine",
        "Tuning Jarvis' impeccable accent",
        "Checking the mustache wax supply",
        "Choreographing a graceful entrance",
        "Practicing impeccable etiquette",
        "Preparing a tray of cucumber sandwiches",
        "Ironing the tails of Jarvis' coat",
        "Ensuring the pocket watch is on time",
        "Perfecting the art of discreet coughing",
        "Synchronizing Jarvis' impeccable timing",
        "Reviewing the etiquette rulebook",
      ];

    const decideOnboarding = () => {
        let onboardState = StorageManager.get("onboardState");

        if (onboardState !== "true") {
            Logger.info("Onboarding not completed, redirecting to onboarding");
            return "/onboarding";
        } else {
            Logger.info("Onboarding completed, redirecting to Jarvis");
            return "/jarvis";
        }
    }

    const selectRandomLoadingMessage =  (messages: string[]) => {
        return messages[Math.floor(Math.random() * messages.length)];
    }

    return (
        <div className="flex flex-col bg-background-sidebar items-center justify-center h-screen select-none">
            <video autoPlay loop muted className="w-20 h-20 mb-12">
                <source src={loading_anim} type="video/webm" />
            </video>
            <h1 className="text-xl mx-6 mb-2 font-medium text-center">{selectRandomLoadingMessage(messages)}</h1>
            <p className="text-sm text-center mx-2 text-comment-color">{specificLoadingMessage}</p>
        </div>
    )
}

export default App