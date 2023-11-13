import React, { useEffect, useState, useRef } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import authdetails from "../../../config/auth";

import { formatBuildDate } from "../../../helpers/utils";

import circleColor from "../../../config/getCircleColor";

interface ConsoleViewProps {
    buildData: any;
}
const ConsoleView: React.FC<ConsoleViewProps> = ({ buildData }) => {

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
        };
    
        fetchConsoleData();
        fetchData();
    
        return () => {
            isMounted = false;
            // Clear the interval or timeout when the component is unmounted
            clearInterval(intervalRef.current);
            clearTimeout(intervalRef.current);
        };
    }, [buildData]);

    return (
        <>
            {buildData ?
                <div className="mx-10 my-10">
                    {/* Console Data */}
                    <div className="bg-console-background border-2 border-border rounded-md shadow-lg px-6 py-5 overflow-auto">
                        <pre>{consoleData}</pre>
                    </div>
                </div>
                : null}
        </>
    );
}

export default ConsoleView