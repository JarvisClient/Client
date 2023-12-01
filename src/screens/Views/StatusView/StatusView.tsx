import React, { useEffect, useState } from "react";

import { BiCube, BiCodeAlt, BiTimer, BiInfoCircle } from "react-icons/bi";
import { openLink } from "../../../helpers/utils";

interface StatusViewProps {
    buildData: any;
}

const StatusView: React.FC<StatusViewProps> = ({ buildData }) => {

	const openArtifact = async (artifact: string = "") => {
		const baseURL: string = localStorage.getItem("baseurl") || "";
		const projectName: string = localStorage.getItem("projectName") || "";
		const artifactURL = `${baseURL}job/${projectName}/${buildData["id"]}/artifact/${artifact}`;

		await openLink(artifactURL, true);
	};

	const openUser = async (user: string) => {
		const baseURL: string = localStorage.getItem("baseurl") || "";
		const userURL = `${baseURL}user/${user}`;

		await openLink(userURL);
	};

	const startedByUser = buildData.actions.find(
		(action: any) =>
			action._class === "hudson.model.CauseAction" &&
            action.causes &&
            action.causes[0]._class === "hudson.model.Cause$UserIdCause"
	);

	const openBuildTimeTrend = async () => {
		const baseURL: string = localStorage.getItem("baseurl") || "";
		const projectName: string = localStorage.getItem("projectName") || "";
		const buildTimeTrendURL = `${baseURL}job/${projectName}/buildTimeTrend`;

		await openLink(buildTimeTrendURL);
	};

	// Format to x days, x hours, x minutes, x seconds ago
	const startedAgo = () => {
		const started = new Date(buildData["timestamp"]);
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
		<div className="mx-10 my-10">
			{/* Information */}
			<div className="grid grid-cols-[100px,auto] mx-10 my-10">
				<div className="w-16 flex justify-self-center">
					<BiInfoCircle size={50} />
				</div>

				<div className="flex flex-col pt-2">
					<h1 className="text-2xl font-bold mb-1 cursor-pointer" onClick={() => openBuildTimeTrend()}>Information</h1>
					<p>Build ID: #{buildData?.id}</p>
					<p>Started {startedAgo()} ago.</p>
					{buildData?.duration > 0 ? <p>Duration: {formatMilliseconds(buildData?.duration)}</p> : null}
				</div>
			</div>

			{/* Artifacts */}
			<div className="grid grid-cols-[100px,auto] mx-10 my-10">
				<div className="w-16 flex justify-self-center">
					<BiCube size={50} />
				</div>

				<div className="flex flex-col pt-2">
					<h1 className="text-2xl font-bold mb-1 cursor-pointer" onClick={() => openArtifact()}>Build Artifacts</h1>
					{buildData?.artifacts?.map((artifact: any, key: number) => {
						return <p 
							className="transition text-blue-500 hover:text-blue-600 active:text-blue-700 cursor-pointer"
							key={key}
							onClick={() => openArtifact(artifact?.relativePath)}>
							{artifact?.fileName}
						</p>;
					})}

					{buildData?.artifacts?.length === 0 ? <p>No artifacts found</p> : null}
				</div>
			</div>

			{/* Changes */}
			<div className="grid grid-cols-[100px,auto] mx-10 my-10">
				<div className="w-16 flex justify-self-center">
					<BiCodeAlt size={50} />
				</div>

				<div className="flex flex-col pt-2">
					<h1 className="text-2xl font-bold mb-1">Changes</h1>
					{buildData?.changeSet?.items?.map((artifact: any) => {
						return <p className="transition text-blue-500 hover:text-blue-600 active:text-blue-700 cursor-pointer" onClick={() => openArtifact(artifact?.relativePath)}>{artifact?.fileName}</p>;
					})}

					{buildData?.changeSet?.items?.length === 0 ? <p>No changes.</p> : null}
				</div>
			</div>

			{/* Started by */}
			<div className="grid grid-cols-[100px,auto] mx-10 my-10">
				<div className="w-16 flex justify-self-center">
					<BiTimer size={50} />
				</div>

				<div className="flex flex-col pt-2">
					<h1 className="text-2xl font-bold mb-1">Started by</h1>
					<p>Started by <b className="transition text-blue-500 hover:text-blue-600 active:text-blue-700 cursor-pointer" onClick={() => openUser(startedByUser?.causes?.[0]?.userId)}>{startedByUser?.causes?.[0]?.userId}</b></p>
				</div>
			</div>

		</div>
	);
};

export default StatusView;