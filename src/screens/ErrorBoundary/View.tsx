import icon from "../../assets/icons/ico_bow.svg";
import { relaunch } from '@tauri-apps/api/process';
import "../Jarvis/App.css"

import "../../screens/Views/SettingsView/Settings.css"
import { ErrorInfo } from "react";

interface ErrorViewProps {
    error?: Error;
    errorInfo?: ErrorInfo;
    file_path?: string;
}

const ErrorView: React.FC<ErrorViewProps> = ({ error, errorInfo, file_path }) => {
    async function restartJarvis() {
        await relaunch();
    }

    return (
        <div className="flex flex-col bg-background-sidebar items-center justify-center h-screen select-none">
            <div className="flex flex-col items-center text-center mb-10">
                <img
                    src={icon}
                    alt="Welcome icon"
                    className="w-16 h-16 mb-4" />
                <h1 className="text-2xl font-medium mb-4">Uhm... What happend?</h1>

                <p className="mb-8 w-2/3">Well, that's embarrassing. <br/>It seems Jarvis encountered a Runtime Error, which has been logged to <b>{file_path}</b>.<br/> If this occurs again, please consider reporting it to the Team.</p>

                <div className="w-2/3">
                    <pre className="text-left text-sm text-gray-400 overflow-auto h-56 error-custom-scroll select-text mb-4">
                        {error?.name}: {error?.message}
                        <hr className="mt-4 mb-4 border-border"/>
                        Error:
                        {error?.stack}
                        <hr className="mt-4 mb-4 border-border"/>
                        Error Info:
                        {errorInfo?.componentStack}
                        </pre>
                <button onClick={restartJarvis} className="button"> Restart Jarvis </button>
                </div>

            </div>
        </div>
    );
}

export default ErrorView;
