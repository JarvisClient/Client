import React, { useEffect } from "react";
import { getUpdateInfo } from "./updateChecker";
import icon from "../../../assets/brand/ico_bow.svg";
import { ReleaseInfo } from "../../../Interfaces/IReleaseInfo";
import { openLink } from "../../../helpers/utils";
import TitleBarComponentLight from "../../../components/TitleBar/TitleBarComponentLight";
import showdown from "showdown";

import "./UpdateAvailable.css";

const UpdateAvailable: React.FC = () => {
	const [updateInfo, setUpdateInfo] = React.useState<ReleaseInfo>();
	const [notes, setNotes] = React.useState<string>("");

	useEffect(() => {
		const initUpdateInfoGetter = async () => {
			const updateState: ReleaseInfo = await getUpdateInfo();
			setUpdateInfo(updateState);

			if (updateState.error) {
				return;
			}

			const notes: string[] = updateState.notes.slice(1, -1).split(", ");
			let notesString = "";

			notes.forEach((note) => notesString += removeFirstAndLastChar(note) + "\n");


			setNotes(notesString);
		};

		initUpdateInfoGetter();
	}, []);

	const openDownloadLink = (version?: string) => {
		if (version) {
			openLink(`https://cdn.jarvisci.com/releases/${version}`);
		}
	};

	const removeFirstAndLastChar = (str: string) => str.slice(1, -1);

	const renderChangelogs = (str: string): { __html: string } => {
		const converter = new showdown.Converter();
		const html: string = converter.makeHtml(str);
		return { __html: html };
	};

	return (
		<>
			{updateInfo?.error ? (
				<div className="bg-background-sidebar h-screen error-custom-scroll overflow-y-scroll">
					<TitleBarComponentLight />

					<div className="flex flex-col items-center justify-center select-none mt-24">
						<div className="flex flex-col items-center">
							<img src={icon} alt="Welcome icon" className="w-16 h-16 mb-4" />
							<p className="text-2xl font-medium">Error!</p>
							<p>{updateInfo.error}</p>
						</div>
					</div>
				</div>
			) : (
				<div className="bg-background-sidebar h-screen error-custom-scroll overflow-y-scroll">
					<TitleBarComponentLight />

					<div className="flex flex-col items-center justify-center select-none mt-24">
						<div className="flex flex-col items-center">
							<img src={icon} alt="Welcome icon" className="w-16 h-16 mb-4" />
							<p className="text-2xl font-medium">New Update available!</p>
							<p>Version <b>{updateInfo?.version}</b> ({updateInfo?.pub_date}) is now Available.</p>
							<button onClick={() => openDownloadLink(updateInfo?.version)} className="button my-8"> Download </button>
						</div>
					</div>

					<div className="mx-10 mb-12" dangerouslySetInnerHTML={renderChangelogs(notes)} />
				</div>
			)}
		</>
	);
};

export default UpdateAvailable;
