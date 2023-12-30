import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DOMPurify from "dompurify";
import TitleBarComponentLight from "../../../../components/TitleBar/TitleBarComponentLight";
import { fetchUtils } from "../../Utils/fetchUtils";
import { formatConsoleData } from "./ConsoleViewUtils";
import ConsoleViewLoading from "./ConsoleViewLoading";

const FullConsoleLog: React.FC = () => {
    const location = useLocation();
    const [consoleData, setConsoleData] = useState<string>("");
    const [buildNumber, setBuildNumber] = useState<string>("");
    const [projectName, setProjectName] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const buildNumber = queryParams.get("buildNumber");
        const projectName = queryParams.get("projectName");
        const buildUrl = queryParams.get("buildUrl");

        if (!buildNumber || !projectName || !buildUrl) return;

        setBuildNumber(buildNumber);
        setProjectName(projectName);

        const fetchAndSetConsoleData = async () => {
            if (!buildNumber || !projectName || !buildUrl) return;
            let data = await fetchUtils.consoleText(projectName, buildNumber);
            let formattedData = await formatConsoleData(data);
            setConsoleData(formattedData);
            setIsLoading(false);
        };

        fetchAndSetConsoleData();
    }, [location]);

    return (
        <>
        <TitleBarComponentLight />
            <div className="h-screen w-screen overflow-auto console-custom-scroll">
                <div className="m-12">
                    <h1 className="font-bold text-3xl mt-16 mb-8">Full Log for Build #{buildNumber} of {projectName}</h1>
                    {!isLoading ? (
                        <>
                            <pre dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(consoleData) }} />
                        </>) : (
                        <>
                            <ConsoleViewLoading />
                        </>
                    )}
                </div>
            </div>

        </>
    );

};

export default FullConsoleLog;
