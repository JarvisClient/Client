import React, { useEffect, useState, useRef } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import authdetails from "../../../config/auth";
import { IStylingDict, stylingDict as sDict } from "./styleDict";

import { FaChevronDown } from "react-icons/fa6";
import { CONSOLE_RELOAD_TIME } from "../../../config/constants";
import { getConsoleViewStyleDict } from "./ConsoleViewStyleDict";

interface ConsoleViewProps {
    buildData: any;
}
const ConsoleView: React.FC<ConsoleViewProps> = ({ buildData }) => {
    const consoleRef: any = useRef(null);
    const [consoleData, setConsoleData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const applyStyles = (text: string, styles: string[]) => {
        return styles.reduce((result, style) => {
            return `<span class="${style}">${result}</span>`;
        }, text);
    };

    // Modified function to apply styles
    const applyStyledText = (text: string, stylingDict: IStylingDict): string => {
        try {
            let styledText = text;

            for (const key in stylingDict) {
                if (stylingDict.hasOwnProperty(key)) {
                    const styles = stylingDict[key];
                    const regex = new RegExp(`(?<!<[^>]*)${key}(?![^<]*>)`, "g");
    
                    styledText = styledText.replace(regex, (match: string) => {
                        return applyStyles(match, styles);
                    });
                }
            }
            return styledText;
        } catch (error) {
            alert("Error applying styles to console data. Please check your StyleDict.json file.");
            return text;
        }
    };


    const fetchConsoleData = async () => {
        try {
            const config = {
                projectName: localStorage.getItem("projectName"),
                buildNumber: buildData["id"].toString(),
                ...authdetails,
            };

            const response: string = await invoke("get_console_text", config);

            const lines = response.split("\n");

            // Process each line to replace URLs with clickable links
            const formattedLines = lines.map((line) => {
                return line.replace(
                    /https?:\/\/[^\s]+/g,
                    (match) => `<a href="${match}" target="_blank">${match}</a>`
                );
            });

            // Join the formatted lines back together with newline characters
            let formattedData = formattedLines.join("\n");

            let stylingDict: any = await getConsoleViewStyleDict();

            // Apply styles based on the dictionary
            formattedData = applyStyledText(formattedData, stylingDict);

            setIsLoading(false);
            setConsoleData(formattedData);

            return response;
        } catch (error) {
            console.error("Error invoking get_build_data:", error);
        }
    };

    const fetchDataForBuild = async () => {
        try {
            const config = {
                projectName: localStorage.getItem("projectName"),
                buildNumber: buildData["id"].toString(),
                ...authdetails
            }
            const response: string = await invoke("get_build_data", config);
            const json = await JSON.parse(response);

            return json;
        } catch (error) {
            console.error("Error invoking get_build_data:", error);
        }
    };

    const intervalRef = useRef<any>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                let response = await fetchDataForBuild();
                if (isMounted && response["result"] === null) {
                    // Clear existing interval before setting up a new one
                    clearInterval(intervalRef.current);

                    // Use setTimeout instead of setInterval
                    const timeoutId = setTimeout(() => {
                        fetchConsoleData();
                        fetchData();
                    }, CONSOLE_RELOAD_TIME);

                    // Store the timeout ID in a ref to clear it on unmount
                    intervalRef.current = timeoutId;
                }
            } catch (error) {
                console.error(error);
                clearInterval(intervalRef.current);
            }
        };

        fetchConsoleData();
        fetchData();

        return () => {
            isMounted = false;
            // Clear the interval or timeout when the component is unmounted
            console.log("ConsoleView: Unmounting - Cleanup");
            clearInterval(intervalRef.current);
            clearTimeout(intervalRef.current);
        };
    }, [consoleRef]);

    useEffect(() => {
        scrollToBottom();
    }, [consoleData]);

    const scrollToBottom = () => {
        if (consoleRef.current) {
            consoleRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    };

    return (
        <div className="mx-10 my-10">
            {buildData && !isLoading ?
                <>
                    <div className="fixed w-14 h-14 rounded-full flex justify-center items-center bottom-10 right-10 bg-opacity-50 backdrop-blur-md transition-all invert hover:scale-[1.03] active:scale-[0.99] select-none" onClick={scrollToBottom}>
                        <FaChevronDown size={22} />
                    </div>

                    {/* Console Data */}
                    <div ref={consoleRef} className="bg-console-background border-2 border-border rounded-md shadow-lg px-6 py-5 overflow-auto">
                        <pre
                            ref={consoleRef}
                            dangerouslySetInnerHTML={{ __html: consoleData }}>
                        </pre>

                    </div>
                </>
                : <>
                    <div className="bg-console-background border-2 border-border rounded-md shadow-lg px-6 py-5 overflow-auto">
                        <div className="animate-pulse">

                            <div className="w-1/2 text-comment-color overflow-hidden h-3 mt-2 bg-comment-color rounded-full opacity-40" />
                            <div className="w-1/3 text-comment-color overflow-hidden h-3 mt-2 bg-comment-color rounded-full opacity-40" />
                            <div className="w-1/4 text-comment-color overflow-hidden h-3 mt-2 bg-comment-color rounded-full opacity-40" />
                            <div className="w-1/4 text-comment-color overflow-hidden h-3 mt-2 bg-comment-color rounded-full opacity-40" />
                            <div className="w-4/5 text-comment-color overflow-hidden h-3 mt-2 bg-comment-color rounded-full opacity-40" />
                            <div className="w-4/5 text-comment-color overflow-hidden h-3 mt-2 rounded-full opacity-40" />
                            <div className="w-4/5 text-comment-color overflow-hidden h-3 mt-2 bg-comment-color rounded-full opacity-40" />
                            <div className="w-5/6 text-comment-color overflow-hidden h-3 mt-2 bg-comment-color rounded-full opacity-40" />
                            <div className="w-3/5 text-comment-color overflow-hidden h-3 mt-2 bg-comment-color rounded-full opacity-40" />
                            <div className="w-4/5 text-comment-color overflow-hidden h-3 mt-2 bg-comment-color rounded-full opacity-40" />
                            <div className="w-2/5 text-comment-color overflow-hidden h-3 mt-2 bg-comment-color rounded-full opacity-40" />
                            <div className="w-4/5 text-comment-color overflow-hidden h-3 mt-2 rounded-full opacity-40" />
                            <div className="w-1/6 text-comment-color overflow-hidden h-3 mt-2 bg-comment-color rounded-full opacity-40" />
                            <div className="w-1/6 text-comment-color overflow-hidden h-3 mt-2 bg-comment-color rounded-full opacity-40" />
                        </div>
                    </div>
                </>
            }
        </div>
    );
}

export default ConsoleView