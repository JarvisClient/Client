import React, { useEffect, useState } from "react";
import { formatBuildDate } from "../../../helpers/utils";
import circleColor from "../../../config/getCircleColor";
import { IJenkinsBuild } from "../../../Interfaces/IBuildInterface";
import { motion } from "framer-motion";

interface Props {
    buildData: IJenkinsBuild;
}
const FeatureViewHead: React.FC<Props> = ({ buildData }) => {
	const [projectBuildStateLED, setProjectBuildStateLED] = useState<string>("");
	const [animationKey, setAnimationKey] = useState(0);
	const [originalBuildData, setOriginalBuildData] = useState<IJenkinsBuild | null>(null);

	useEffect(() => {
		setProjectBuildStateLED(circleColor(buildData));
    
		if (originalBuildData === null) {
			setOriginalBuildData(buildData);
		}
    
		if (originalBuildData !== buildData) {
			setAnimationKey((prevKey) => prevKey + 1);
		}


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