import React from "react";
import { openLink } from "../../../../helpers/utils";

import StorageManager from "../../../../helpers/StorageManager";
import { IJenkinsBuild, JenkinsBuildAction, JenkinsBuildArtifact } from "../../../../Interfaces/IBuildInterface";
import { motion } from "framer-motion";
import { IcoCodeBracket, IcoCube, IcotInformation, IcoPerson } from "@/Icons/pack_1";

interface Props {
	buildData: IJenkinsBuild;
}

const StatusView: React.FC<Props> = ({ buildData }) => {
	const openArtifact = async (artifact: string = "") => {
		const baseURL: string = StorageManager.get("baseurl") || "";
		const projectName: string = StorageManager.get("projectName") || "";
		const artifactURL = `${baseURL}job/${projectName}/${buildData.id}/artifact/${artifact}`;

		await openLink(artifactURL, true);
	};

	const openUser = async (user: string) => {
		const baseURL: string = StorageManager.get("baseurl") || "";
		const userURL = `${baseURL}user/${user}`;

		await openLink(userURL);
	};

	const startedByUser = buildData.actions.find(
		(action: JenkinsBuildAction) => action._class === "hudson.model.CauseAction"
			&& action.causes
			&& action.causes[0]._class === "hudson.model.Cause$UserIdCause",
	);

	const openBuildTimeTrend = async () => {
		const baseURL: string = StorageManager.get("baseurl") || "";
		const projectName: string = StorageManager.get("projectName") || "";
		const buildTimeTrendURL = `${baseURL}job/${projectName}/buildTimeTrend`;

		await openLink(buildTimeTrendURL);
	};

	// Format to x days, x hours, x minutes, x seconds ago
	const startedAgo = () => {
		const started = new Date(buildData.timestamp);
		const now = new Date();

		let difference = now.getTime() - started.getTime();

		const days = Math.floor(difference / (1000 * 60 * 60 * 24));
		difference -= days * (1000 * 60 * 60 * 24);

		const hours = Math.floor(difference / (1000 * 60 * 60));
		difference -= hours * (1000 * 60 * 60);

		const minutes = Math.floor(difference / (1000 * 60));
		difference -= minutes * (1000 * 60);

		const seconds = Math.floor(difference / 1000);

		let startedAgo = "";

		if (days > 0) startedAgo += `${days} days, `;
		if (hours > 0) startedAgo += `${hours} hr `;
		if (minutes > 0) startedAgo += `${minutes} min `;
		if (seconds > 0) startedAgo += `${seconds} sec `;

		return startedAgo;
	};

	const formatMilliseconds = (milliseconds: number) => {
		let seconds = Math.floor(milliseconds / 1000);
		milliseconds -= seconds * 1000;

		let minutes = Math.floor(seconds / 60);
		seconds -= minutes * 60;

		let hours = Math.floor(minutes / 60);
		minutes -= hours * 60;

		const days = Math.floor(hours / 24);
		hours -= days * 24;

		let formatted = "";

		if (days > 0) formatted += `${days} days, `;
		if (hours > 0) formatted += `${hours} hr `;
		if (minutes > 0) formatted += `${minutes} min `;
		if (seconds > 0) formatted += `${seconds} sec `;

		return formatted;
	};

	return (
		<div className="mx-4 my-10 select-none">
			{/* Information */}
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="grid grid-cols-[100px,auto] mx-10 my-10">
				<div className="w-16 h-16 flex justify-self-center items-center justify-center rounded-xl bg-background-sidebar p-2 shadow-md">
					<IcotInformation size={42} />
				</div>

				<div className="flex flex-col pt-2">
					<h1 className="text-2xl font-bold mb-1 cursor-pointer" onClick={() => openBuildTimeTrend()}>Information</h1>
					<p>Build ID: #{buildData?.id}</p>
					<p>Started {startedAgo()} ago.</p>
					{buildData?.duration >= 0 && <p>Duration: {formatMilliseconds(buildData?.duration)}</p>}
					{buildData?.estimatedDuration >= 0 && <p>Estimated Duration: {formatMilliseconds(buildData?.estimatedDuration)}</p>}
					
				</div>
			</motion.div>

			{/* Artifacts */}
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.1 }}
				className="grid grid-cols-[100px,auto] mx-10 my-10">
				<div className="w-16 h-16 flex justify-self-center items-center justify-center rounded-xl bg-background-sidebar p-2 shadow-md">
					<IcoCube size={42} />
				</div>

				<div className="flex flex-col pt-2">
					<h1 className="text-2xl font-bold mb-1 cursor-pointer" onClick={() => openArtifact()}>Build Artifacts</h1>
					{buildData?.artifacts?.map((artifact: JenkinsBuildArtifact, key: number) => (
						<p
							className="transition text-blue-500 hover:text-blue-600 active:text-blue-700 cursor-pointer"
							key={key}
							onClick={() => openArtifact(artifact?.relativePath)}
						>
							{artifact?.fileName}
						</p>
					))}

					{buildData?.artifacts?.length === 0 ? <p>No artifacts found</p> : null}
				</div>
			</motion.div>

			{/* Changes */}
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.2 }}
				className="grid grid-cols-[100px,auto] mx-10 my-10">
				<div className="w-16 h-16 flex justify-self-center items-center justify-center rounded-xl bg-background-sidebar p-2 shadow-md">
					<IcoCodeBracket size={42} />
				</div>

				<div className="flex flex-col pt-2">
					<h1 className="text-2xl font-bold mb-1">Changes</h1>
					<p>Needs to be Implemented...</p>
				</div>
			</motion.div>

			{/* Started by */}
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5, delay: 0.3 }}
				className="grid grid-cols-[100px,auto] mx-10 my-10">
				<div className="w-16 h-16 flex justify-self-center items-center justify-center rounded-xl bg-background-sidebar p-2 shadow-md">
					<IcoPerson size={42} />
				</div>

				<div className="flex flex-col pt-2">
					<h1 className="text-2xl font-bold mb-1">Started by</h1>
					<p>
						Started by
						<b className="transition text-blue-500 hover:text-blue-600 active:text-blue-700 cursor-pointer" onClick={() => openUser(startedByUser?.causes?.[0]?.userId ?? "")}> {startedByUser?.causes?.[0]?.userId ?? ""}</b>
					</p>
				</div>
			</motion.div>
		</div>
	);
};

export default StatusView;
