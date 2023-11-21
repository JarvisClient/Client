import React, { useEffect, useState, useRef } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import authdetails from "../../../config/auth";

import { formatBuildDate } from "../../../helpers/utils";

import circleColor from "../../../config/getCircleColor";
import { FaChevronDown } from "react-icons/fa6";

interface ConsoleViewProps {
    buildData: any;
}
const ConsoleView: React.FC<ConsoleViewProps> = ({ buildData }) => {

    const consoleRef: any = useRef(null);
    const [consoleData, setConsoleData] = useState<any>(null);

    const RELOAD_INTERVAL = 1000;

    const fetchConsoleData = async () => {
        try {
            const config = {
                projectName: localStorage.getItem("projectName"),
                buildNumber: buildData["id"].toString(),
                ...authdetails
            }


            const response: string = await invoke("get_console_text", config);

            setConsoleData(response);

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
                    }, RELOAD_INTERVAL);

                    // Store the timeout ID in a ref to clear it on unmount
                    intervalRef.current = timeoutId;
                }
            } catch (error) {
                console.log(error);
                clearInterval(intervalRef.current);
            }
        };

        fetchConsoleData();
        fetchData();

        return () => {
            isMounted = false;
            // Clear the interval or timeout when the component is unmounted
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
        <>
            {buildData ?
                <div className="mx-10 my-10 select-none">
                    <div className="fixed w-14 h-14 rounded-full flex justify-center items-center bottom-10 right-10 bg-opacity-50 backdrop-blur-md transition-all invert hover:scale-[1.03] active:scale-[0.99]" onClick={scrollToBottom}>
                    <FaChevronDown size={22}/>
                    </div>

                    {/* Console Data */}
                    <div ref={consoleRef} className="bg-console-background border-2 border-border rounded-md shadow-lg px-6 py-5 overflow-auto">
                        <pre>{consoleData}</pre>
                    </div>
                </div>
                : null}
        </>
    );
}

export default ConsoleView