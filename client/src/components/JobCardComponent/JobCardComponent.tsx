import React, { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import circleColor from "../../config/getCircleColor";
import authdetails from "../../config/auth";

interface JobCardProps {
  displayName?: string;
  description?: string;
  result?: string;
  active?: boolean;
  buildNumber?: number;
  onClick?: () => void;
}

const JobCardComponent: React.FC<JobCardProps> = ({ active = false, buildNumber, displayName, description, result, onClick }) => {
  const [buildData, setBuildData] = useState<any>(null);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const fetchDataForBuild = async (buildNumber: any) => {
    const config = {
      projectName: localStorage.getItem("projectName"),
      buildNumber: buildNumber.toString(),
      ...authdetails
    }

    const response: string = await invoke("get_build_data", config);
    const json = await JSON.parse(response)

    setBuildData(json)

    return json
  }

  useEffect(() => {
    let interval: any;
    const fetchData = async () => {
      try {
        let response = await fetchDataForBuild(buildNumber);
        let result = response?.result;

        if (result === null) {
          interval = setInterval(fetchData, 10000);
        } else {
          clearInterval(interval);
        }
      } catch (error) {
        alert(error);
      }
    };
    
    if (result === null) fetchData();
    setBuildData({ displayName, description, result });

    return () => clearInterval(interval);
  }, [displayName, description, buildNumber]);

  // Conditionally render JSX based on whether buildData is available
  if (!buildData) {
    return null; // or you can return a placeholder, loading message, etc.
  }

  return (
    <div
      className={`flex items-center w-[310px] h-[80px] rounded-lg p-5 border-2 border-border transition hover:bg-background-card-selected active:scale-[0.99] select-none overflow-hidden ${active ? 'bg-background-card-selected' : 'bg-background-card '}`}
      onClick={handleClick}
    >
      <div className="flex-shrink-0 mr-3">
        {/* Small circle */}
        <span className="relative flex h-5 w-5">
          {!buildData["result"] ?
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-jenkins-job-blue opacity-75"></span>
            : null}
          <span className={"relative inline-flex rounded-full h-5 w-5 " + circleColor(buildData)}></span>
        </span>
      </div>
      <div className="flex flex-col justify-center">
        {/* Two rows for Title and Comment */}
        <div className="text-lg text-text-color font-bold overflow-hidden">
          {buildData["displayName"]}
        </div>
        <div className="text-sm text-comment-color overflow-hidden line-clamp-2">
          {buildData["description"]}
        </div>
      </div>
    </div>
  );
};

export default JobCardComponent;
