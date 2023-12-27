import React, { useEffect, useState, useRef } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { getAuthDetails } from "../../../config/auth";

import { formatBuildDate } from "../../../helpers/utils";

import circleColor from "../../../config/getCircleColor";
import { FEATURE_VIEW_HEAD_REFRESH_TIME } from "../../../config/constants";
import Logger from "../../../helpers/Logger";
import { IJenkinsBuild } from "../../../Interfaces/IBuildInterface";

import StorageManager from "../../../helpers/StorageManager";
import { fetchUtils } from "../Utils/fetchUtils";
import { motion } from "framer-motion";

interface Props {
    buildData: IJenkinsBuild;
}
const FeatureViewHead: React.FC<Props> = ({ buildData }) => {
	const [projectBuildStateLED, setProjectBuildStateLED] = useState<string>("");
  const [animationKey, setAnimationKey] = useState(0);

	const intervalRef = useRef<NodeJS.Timeout>();

	useEffect(() => {
		let isMounted = true;

		const fetchData = async () => {
			try {
        let storedProjectName: string | null = StorageManager.get("projectName");
				const response = await fetchUtils.fetchBuildData(buildData.number, storedProjectName);
				if (isMounted && response.result === null) {
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
				Logger.error(error);
				clearInterval(intervalRef.current);
			}
		};

		fetchData();
    setAnimationKey((prevKey) => prevKey + 1); // Change the key to trigger unmount/remount

		return () => {
			isMounted = false;
			// Clear the interval or timeout when the component is unmounted
			Logger.info("FeatureViewHead: Unmounting - Cleanup");
			clearInterval(intervalRef.current);
			clearTimeout(intervalRef.current);
		};
	}, [buildData]);

	return (
    <div className="mx-10 my-10">
      <div className="flex items-center rounded-lg p-5 mb-10 transition select-none overflow-hidden">
        <div className="flex-shrink-0 mr-3 self-start">
          <span className="relative flex h-[37px] w-[37px]">
            {projectBuildStateLED === "bg-jenkins-job-blue" ? (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-jenkins-job-blue opacity-75" />
            ) : null}
            <span className={`relative inline-flex rounded-full h-full w-full ${projectBuildStateLED}`} />
          </span>
        </div>
        <div className="flex flex-col justify-center">
          {/* Two rows for Title and Comment */}
          <div className="text-3xl text-text-color font-bold overflow-hidden">
            <motion.p
              key={animationKey}
              initial={{ opacity: 0.9, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}>
              {buildData.displayName === `#${buildData.id}`
                ? `Build #${buildData.id}`
                : `Build ${buildData.displayName}`} ({" "}
              {formatBuildDate(buildData.timestamp)} )
            </motion.p>
          </div>
          <div className="text-xl text-comment-color overflow-hidden line-clamp-2">
            <motion.div
              key={animationKey}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {buildData.description}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureViewHead;