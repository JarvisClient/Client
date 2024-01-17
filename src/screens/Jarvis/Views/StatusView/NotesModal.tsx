import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { IcoCross, IcoNotes, IcoSave } from "@/Icons/pack_1";
import StorageManager, { new_StorageManager } from "@/helpers/StorageManager";
import showdown from "showdown";
import { IJenkinsBuild } from "@/Interfaces/IBuildInterface";
import Logger from "@/helpers/Logger";

interface Props {
    isOpen: boolean;
    closeModal: () => void;
    buildData: IJenkinsBuild;
}

const NotesModal: React.FC<Props> = ({ isOpen, closeModal, buildData }) => {
    const [notes, setNotes] = React.useState<string>("");
    const [projectName, setProjectName] = React.useState<string>("");
    const [inEditMode, setInEditMode] = React.useState<boolean>(false);
    const [notesData, setNotesData] = React.useState<string>("");

    const saveNotes = () => {
        new_StorageManager.notes.save(projectName, buildData.id, notes);
        return true;
    }

    const renderMarkdown = (str: string): { __html: string } => {
        const converter = new showdown.Converter();
        const html: string = converter.makeHtml(str);
        return { __html: html };
    };

    useEffect(() => {
        const init = async () => {
            const project = await StorageManager.get("projectName");
            if (!project) return;
            setProjectName(project);

            const data = await new_StorageManager.notes.get(project, buildData.id);

            if (data) {
                setNotesData(data);
                setNotes(data);
            }

            if (data === "" || data === undefined) {
                setInEditMode(true);
            }
        }

        init();

        Logger.info("NotesModal.tsx", "NotesModal mounted");

    }, [buildData]);

    return (isOpen ? (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
            exit={{ opacity: 0 }}
            className="absolute top-0 left-0 w-full h-full z-40 backdrop-blur-sm bg-black/70 transition flex justify-center items-center"
            onClick={() => closeModal()} >
            <div
                className="bg-background-sidebar p-14 w-[850px] h-[600px] rounded-xl relative overflow-y-scroll overflow-x-hidden error-custom-scroll"
                onClick={(e) => e.stopPropagation()} >
                <div
                    onClick={() => closeModal()}
                    className="absolute top-4 right-4 cursor-pointer">
                    <IcoCross
                        size={32}
                        className="transition hover:brightness-75 hover:scale-105 active:brightness-105 active:scale-95" />
                </div>
                <div className="mb-4">
                {inEditMode ? (
                    /* Edit Section */
                    <div className="flex flex-col mb-4">

                        <p className="text-2xl font-bold mb-4">Edit Notes for Build #{buildData.id}</p>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className="px-4 py-3 mb-12 bg-background-card rounded-md min-h-[350px] font-medium text-comment-color active:bg-property-background-selected hover:brightness-[1.1] custom-scroll" />
                    </div>
                ) : (
                    /* View Section */
                    <div className="h-full">
                        <p className="text-2xl font-bold mb-4">Notes for Build #{buildData.id}</p>
                        <div className="px-6 py-4 mb-12 bg-background-card rounded-md min-h-[350px]" dangerouslySetInnerHTML={renderMarkdown(notesData || "No Note")} />
                    </div>
                )}
                </div>


                {/* Button */}
                <div className=" absolute bottom-20 right-20 ">
                <div
                    onClick={() => {
                        setInEditMode(!inEditMode)
                        if (inEditMode) {
                            saveNotes()
                            setNotesData(notes)
                        }
                        
                    }}
                    className="fixed rounded-full w-12 h-12 bg-background-card hover:bg-background-card-selected transition flex justify-center items-center shadow-md hover:shadow-sm cursor-pointer">
                    <motion.button
                        initial={{ opacity: 1, y: 0 }}
                        animate={{ opacity: inEditMode ? 0 : 1, y: inEditMode ? -10 : 0 }}>
                        <IcoNotes size={24} />
                    </motion.button>
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: inEditMode ? 1 : 0, y: inEditMode ? 0 : 10 }}
                        className="absolute pointer-events-none">
                        <IcoSave size={24} />
                    </motion.span>
                </div>
                            </div>
            </div>
        </motion.div>
    ) : null);
}

export default NotesModal;
