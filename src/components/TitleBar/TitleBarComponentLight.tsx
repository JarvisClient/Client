import React from "react";
import icoBow from "../../assets/icons/ico_bow.svg";
import { appWindow } from "@tauri-apps/api/window";


const TitleBarComponentLight: React.FC = () => {
    const closeWindow = async () => {
        appWindow.close();
    };

    const minWindow = async () => {
        appWindow.minimize();
    };

    const maxWindow = async () => {
        if (await appWindow.isMaximized()) {
            appWindow.unmaximize();
        } else {
            appWindow.maximize();
        }
    };

    return (
        <table className="w-full absolute">
            <div className="h-[48px] select-none bg-transparent backdrop-blur" data-tauri-drag-region>
                <div className='absolute top-3 left-4 flex flex-row'>
                    <img src={icoBow} alt="Logo" className="w-7 h-6 mr-2 ml-1" />
                    <b>Jarvis</b>
                </div>
                <div className="absolute top-4 right-4">
                    <div className="flex ml-auto mr-2">
                        <div onClick={maxWindow} className="w-3 h-3 z-50 bg-green-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-600 active:bg-green-700 transition duration-200 ml-2" />
                        <div onClick={minWindow} className="w-3 h-3 z-50 bg-yellow-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-yellow-600 active:bg-yellow-700 transition duration-200 ml-2" />
                        <div onClick={closeWindow} className="w-3 h-3 z-50 bg-red-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-600 transition active:bg-red-700 duration-200 ml-2" />
                    </div>
                </div>
            </div>
        </table>
    );
};

export default TitleBarComponentLight;
