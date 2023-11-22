import React, { useEffect, useState, useRef } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import authdetails from "../../config/auth";

import { formatBuildDate } from "../../helpers/utils";

import circleColor from "../../config/getCircleColor";
import { FEATURE_VIEW_HEAD_REFRESH_TIME } from "../../config/constants";

interface ConsoleViewProps {
    buildData: any;
}
const FeatureViewHead: React.FC<ConsoleViewProps> = ({ buildData }) => {

    const [projectBuildStateLED, setProjectBuildStateLED] = useState<any>(null);

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
                        fetchData();
                    }, FEATURE_VIEW_HEAD_REFRESH_TIME);
    
                    // Store the timeout ID in a ref to clear it on unmount
                    intervalRef.current = timeoutId;
    
                    setProjectBuildStateLED(circleColor(response));
                } else {
                    setProjectBuildStateLED(circleColor(response));
                }
            } catch (error) {
                console.log(error);
                clearInterval(intervalRef.current);
                
            }
        };

        fetchData();

        return () => {
            isMounted = false;
            // Clear the interval or timeout when the component is unmounted
            console.log("FeatureViewHead: Unmounting - Cleanup");
            clearInterval(intervalRef.current);
            clearTimeout(intervalRef.current);
        };
    }, [buildData]);

    return (

        <div className="mx-10 my-10">
            {/* Job Card */}
            <div className={`flex items-center rounded-lg p-5 mb-10 transition select-none overflow-hidden`}>
                <div className="flex-shrink-0 mr-3">
                    <span className="relative flex h-[37px] w-[37px]">
                        {projectBuildStateLED === "bg-jenkins-job-blue" ?
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-jenkins-job-blue opacity-75"></span>
                            : null}
                        <span className={"relative inline-flex rounded-full h-full w-full " + projectBuildStateLED}></span>
                    </span>
                </div>
                <div className="flex flex-col justify-center">
                    {/* Two rows for Title and Comment */}
                    <div className="text-3xl text-text-color font-bold overflow-hidden">
                        {buildData["displayName"] == "#" + buildData["id"] ? (
                            <p>Build #{buildData["id"]} ({formatBuildDate(buildData["timestamp"])})</p>
                        ) : (
                            <p>Build {buildData["displayName"]} ({formatBuildDate(buildData["timestamp"])})</p>
                        )}
                    </div>
                    <div className="text-xl text-comment-color overflow-hidden line-clamp-2">
                        {buildData["description"]}
                    </div>
                </div>
            </div>
        </div>

    );
}

export default FeatureViewHead
