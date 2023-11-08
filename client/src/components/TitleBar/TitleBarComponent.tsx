import icoBow from "../../assets/icons/ico_bow.svg";
import { IoInformationSharp } from "react-icons/io5";
import { appWindow } from "@tauri-apps/api/window";
import FeatureButtons from "../../config/FeatureButtons";

interface TitleBarProps {
    activeFeature?: any;
    windowTitle: any;
}


const TitleBarComponent: React.FC<TitleBarProps> = ({ activeFeature, windowTitle }) => {
    const featureList = FeatureButtons[activeFeature];
    const IconComponent: React.ComponentType<any> | undefined = featureList?.icon;

    const closeWindow = async () => {
        appWindow.close();
    }

    const minWindow = async () => {
        appWindow.minimize();
    }

    const maxWindow = async () => {
        if (await appWindow.isMaximized()) {
            appWindow.unmaximize();
        } else {
            appWindow.maximize();
        }
    }

    return (
        <table className="w-full">
            <tbody>
                <tr className='h-[48px] select-none'>
                    <td className="big-sidebar px-4 relative">
                        <div className="z-20 w-full h-full fixed absolute top-1 left-1" data-tauri-drag-region></div>
                        <div className='flex items-center'>
                        <img src={icoBow} alt="Logo" className="w-7 h-6 mr-2 ml-1" />
                            <b>Jarvis</b>
                        </div>
                    </td>
                    <td className="px-4 py-2 small-sidebar relative" data-tauri-drag-region>
                        <div className="z-20 w-full h-full fixed absolute top-1 left-0" data-tauri-drag-region></div>
                    </td>
                    <td className="general-view bg-gradient-to-b from-[rgba(42,43,47,0.9)] to-[rgba(28,30,33,0)] px-3 relative" >
                        <div className="z-20 w-full h-full fixed absolute top-1 right-1" data-tauri-drag-region></div>
                        <div className='flex items-center'>
                        {IconComponent ? (
                                <IconComponent size={22} className="ml-2" />
                            ) : (
                                <p></p>
                            )}
                            <b className='text-md ml-2'>{windowTitle}</b>
                            <div className="flex ml-auto mr-2">
                                <div onClick={maxWindow} className="w-3 h-3 z-50 bg-green-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-600 active:bg-green-700 transition duration-200 ml-2" />
                                <div onClick={minWindow} className="w-3 h-3 z-50 bg-yellow-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-yellow-600 active:bg-yellow-700 transition duration-200 ml-2" />
                                <div onClick={closeWindow} className="w-3 h-3 z-50 bg-red-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-red-600 transition active:bg-red-700 duration-200 ml-2" />
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    );
}

export default TitleBarComponent;
