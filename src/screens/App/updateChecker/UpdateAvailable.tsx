import React, { useEffect } from "react";
import { getUpdateInfo } from "./updateChecker";
import { motion } from "framer-motion";
import icon from "../../../assets/icons/ico_bow.svg";
import { ReleaseInfo } from "./IReleaseInfo";
import { openLink } from "../../../helpers/utils";
import TitleBarComponentLight from "../../../components/TitleBar/TitleBarComponentLight";

const UpdateAvailable: React.FC = () => {
    const [updateInfo, setUpdateInfo] = React.useState<ReleaseInfo>();
    const [notes, setNotes] = React.useState<string[]>([]);

    useEffect(() => {
        const initUpdateInfoGetter = async () => {

            let updateState: ReleaseInfo = await getUpdateInfo();
            setUpdateInfo(updateState);

            if (updateState.error) {
                return;
            }

            console.log(updateState.notes);
            let notes: string[] = updateState.notes.slice(1, -1).split(', ');
            
            setNotes(notes);

        };

        initUpdateInfoGetter();
    }, []);

    const openDownloadLink = (version?: string) => {
        if (version) {
            openLink("https://cdn.jarvisci.com/releases/" + version)
        }
    }

    const removeFirstAndLastChar = (str: string) => {
        if (str.length > 2) {
            return str.slice(1, -1);
        }
        return str;
    }

    return (
        <div>
            <TitleBarComponentLight windowTitle="Update Available" />
            {updateInfo?.error ? (
                <div className="flex flex-col bg-background-sidebar items-center justify-center h-screen select-none">
                    <div className="flex flex-col items-center text-center mb-10">
                        <img
                            src={icon}
                            alt="Welcome icon"
                            className="w-16 h-16 mb-4"
                        />
                        <h1 className="text-2xl font-medium mb-4">Error</h1>
                        <p className="mb-8 w-2/3">
                            {updateInfo.error}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col bg-background-sidebar items-center justify-center h-screen select-none">
                    <div className="flex flex-col items-center text-center w-2/3">
                        <motion.img
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            src={icon}
                            alt="Welcome icon"
                            className="w-16 h-16 mb-4"
                        />
                        <motion.h1 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.15 }}
                        className="text-2xl font-medium mb-4">
                            New Update available!
                            </motion.h1>

                        <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mb-8">Version <b>{updateInfo?.version}</b> ({updateInfo?.pub_date}) is now Available.
                        </motion.p>

                        <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.45 }}
                        className="w-full">
                            <h1 className="text-left font-bold text-xl">Changelog </h1>
                            <pre className="text-left text-sm text-gray-400 overflow-auto h-56 error-custom-scroll select-text mb-4">
                                {notes.map((note, index) => {
                                    return (
                                        <span>
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: index * 0.5 }}>
                                                {removeFirstAndLastChar(note)}
                                            </motion.div>
                                        </span>
                                    );
                                })}
                            </pre>
                            <button onClick={() => openDownloadLink(updateInfo?.version)} className="button"> Download </button>
                        </motion.div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdateAvailable;
