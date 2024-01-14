import React, { useEffect } from "react";
import { IJenkinsBuild, JenkinsBuildArtifact } from "../../../../Interfaces/IBuildInterface";
import StorageManager from "../../../../helpers/StorageManager";
import { openLink, renderHTML } from "../../../../helpers/utils";
import { IJenkinsProject } from "../../../../Interfaces/IProjectInterface";
import { fetchUtils } from "../../Utils/fetchUtils";
import ProjectHealthDisplay from "../../../../components/ProjectHealthDisplay/ProjectHealthDisplay";
import { motion } from "framer-motion";
import { IcoCube } from "@/Icons/pack_1";
import circleColor from "@/config/getCircleColor";

interface Props {
	projectData: IJenkinsProject | null;
}

const ProjectStatusView: React.FC<Props> = ({ projectData }) => {
	const [lastSuccessfulBuild, setLastSuccessfulBuild] = React.useState<IJenkinsBuild | null>(null);
	const [projectDataR, setprojectDataR] = React.useState<IJenkinsProject | null>(null);

	const openArtifact = async (artifact: string = "") => {
		const baseURL: string = StorageManager.get("baseurl") || "";
		const projectName: string = StorageManager.get("projectName") || "";
		const artifactURL = `${baseURL}job/${projectName}/${lastSuccessfulBuild?.id}/artifact/${artifact}`;

		await openLink(artifactURL, true);
	};
	
	const getLastSuccessfulBuild = async () => {
		const lastSuccessfulBuild: number | undefined = projectDataR?.lastSuccessfulBuild?.number;
		if (!lastSuccessfulBuild) return null;
		const response = await fetchUtils.fetchBuildData(lastSuccessfulBuild, StorageManager.get("projectName"), 5);

		return response;
	};

	useEffect(() => {
		if (projectData) {
			if (lastSuccessfulBuild === null || lastSuccessfulBuild.number !== projectData.lastSuccessfulBuild?.number) {
				getLastSuccessfulBuild().then((response) => {
					if (response) setLastSuccessfulBuild(response);
				});
			}
		}

		setprojectDataR(projectData);
	}, [projectData]);

	return (
		<div className="mx-10 my-10">
			{projectDataR ? (
				<div className="flex flex-col rounded-lg p-5 mb-10 transition select-none overflow-hidden space-y-4">
					{/* Title & Description */}
					<div className="flex flex-row">
						<div className="flex-shrink-0 mr-3 ">
							<span className="relative flex h-[37px] w-[37px]">
								{projectDataR.color.includes("_anime") ? (
									<span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${circleColor(projectDataR.color.includes("blue") ? projectDataR.color.replace("blue", "green") : projectDataR.color)} opacity-75`} />
								) : null}
								<span className={`relative inline-flex rounded-full h-full w-full ${circleColor(projectDataR.color.includes("blue") ? projectDataR.color.replace("blue", "green") : projectDataR.color)}`} />
							</span>
						</div>
						<div className="flex flex-col justify-center">
							{/* Two rows for Title and Comment */}
							<div className="text-3xl text-text-color font-bold overflow-hidden">
								<p className="break-all">{projectDataR.displayName}</p>
							</div>
							<div className="text-md text-comment-color overflow-hidden" dangerouslySetInnerHTML={renderHTML(projectDataR.description || "")} />
						</div>
					</div>


					{/* Health Report */}
					<div className="flex flex-row space-x-4 overflow-x-auto error-custom-scroll pb-4">
						{projectDataR.healthReport.length !== 0 ? (
							projectDataR.healthReport.map((healthReport, key) => (
								<ProjectHealthDisplay healthReport={healthReport} key={key} _key={key} />
							))
						) : null}
					</div>

					{/* Last Artifact */}
					{lastSuccessfulBuild ? (
						<motion.div
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
							className="grid grid-cols-[100px,auto]">
							<div className="w-16 h-16 flex justify-self-center items-center justify-center rounded-xl bg-background-sidebar p-2 shadow-md">
								<IcoCube size={42} />
							</div>

							<div className="flex flex-col pt-2">
								<h1 className="text-2xl font-bold mb-1 cursor-pointer" onClick={() => openArtifact()}>Build Artifacts</h1>
								{lastSuccessfulBuild.artifacts?.length === 0 ? <p>No artifacts found</p> : null}
								{lastSuccessfulBuild.artifacts?.map((artifact: JenkinsBuildArtifact, key: number) => (
									<p
										className="transition text-blue-500 hover:text-blue-600 active:text-blue-700 cursor-pointer"
										key={key}
										onClick={() => openArtifact(artifact.relativePath)}
									>
										{artifact.fileName}
									</p>
								))}
							</div>
						</motion.div>
					) : null}
				</div>

			) : null}
		</div>
	);
};

export default ProjectStatusView;
