import React, { useEffect } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { BiCube } from "react-icons/bi";
import { IJenkinsBuild, JenkinsBuildArtifact } from "../../../../Interfaces/IBuildInterface";
import StorageManager from "../../../../helpers/StorageManager";
import { openLink, renderHTML } from "../../../../helpers/utils";
import { IJenkinsProject } from "../../../../Interfaces/IProjectInterface";
import { fetchUtils } from "../../Utils/fetchUtils";

interface Props {
	buildData: IJenkinsProject | null;
}

const ProjectStatusView: React.FC<Props> = ({ buildData }) => {
	const [lastSuccessfulBuild, setLastSuccessfulBuild] = React.useState<IJenkinsBuild | null>(null);

	const openArtifact = async (artifact: string = "") => {
		const baseURL: string = StorageManager.get("baseurl") || "";
		const projectName: string = StorageManager.get("projectName") || "";
		const artifactURL = `${baseURL}job/${projectName}/${lastSuccessfulBuild?.id}/artifact/${artifact}`;

		await openLink(artifactURL, true);
	};

	useEffect(() => {
		const getLastSuccessfulBuild = async () => {
			const lastSuccessfulBuild: number | undefined = buildData?.lastSuccessfulBuild.number;
			if (!lastSuccessfulBuild) return null;
			const response = await fetchUtils.fetchBuildData(lastSuccessfulBuild, StorageManager.get("projectName"));
			return response;
		};
		if (buildData) {
			getLastSuccessfulBuild().then((data) => {
				setLastSuccessfulBuild(data);
			});
		}
	}, [buildData]);

	return (
		<div className="mx-10 my-10">
			{buildData ? (

				<div className="flex flex-col rounded-lg p-5 mb-10 transition select-none overflow-hidden">
					<div className="flex flex-row">
						<div className="flex-shrink-0 mr-3 ">
							<span className="relative flex h-[37px] w-[37px]">
								{buildData.color.includes("_anime") ? (
									<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-jenkins-job-blue opacity-75" />
								) : null}
								<span className={`relative inline-flex rounded-full h-full w-full bg-jenkins-job-${buildData.color}`} />
							</span>
						</div>
						<div className="flex flex-col justify-center">
							{/* Two rows for Title and Comment */}
							<div className="text-3xl text-text-color font-bold overflow-hidden">
								<p className="break-all">{buildData.displayName}</p>
							</div>
							<div className="text-md text-comment-color overflow-hidden" dangerouslySetInnerHTML={renderHTML(buildData.description || "")} />
						</div>
					</div>

					{/* Health Report */}
					{buildData.healthReport.length !== 0 ? (
						<div className="grid grid-cols-[100px,auto] mx-4 mt-10">
							<div className="w-16 flex justify-self-center">
								<IoMdHeartEmpty size={50} />
							</div>
							<div className="flex flex-col pt-2">
								<h1 className="text-2xl font-bold mb-1">Health Report</h1>
								<p>
									<b>Build stability: </b>
									{buildData.healthReport[0].description.split(": ")[1]}
								</p>
								<p>
									<b>Score: </b>
									{buildData.healthReport[0].score}
									%
								</p>
							</div>
						</div>
					) : null}

					{/* Last Artifact */}
					{lastSuccessfulBuild ? (
						<div className="grid grid-cols-[100px,auto] mx-4 mt-10">
							<div className="w-16 flex justify-self-center">
								<BiCube size={50} />
							</div>

							<div className="flex flex-col pt-2">
								<h1 className="text-2xl font-bold mb-1 cursor-pointer" onClick={() => openArtifact()}>Build Artifacts</h1>
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
						</div>
					) : null}
				</div>

			) : null}
		</div>
	);
};

export default ProjectStatusView;
