import React, { useEffect, useState } from "react";
import { IJenkinsBuild, JenkinsBuildChangeLogChangeSet } from "@/Interfaces/IBuildInterface";
import { formatBuildDate, openLink } from "@/helpers/utils";
import { motion } from "framer-motion";

interface Props {
	buildData: IJenkinsBuild;
}

const ChangesView = ({ buildData }: Props) => {
	// type is JenkinsBuildChangeLogChangeSet
	const [changes, setChanges] = useState<JenkinsBuildChangeLogChangeSet>({} as JenkinsBuildChangeLogChangeSet);
	const [selectedChange, setSelectedChange] = useState<number>(-1);

	useEffect(() => {
		setChanges(buildData.changeSet);
		console.log(changes);
	}, []);

	// Show a message if there are no changes
	if (changes?.items?.length === 0) {
		return (
			<div className="mx-10 my-10 select-none">
				<div className="flex mb-5 items-center w-full p-4 bg-[#403D2F] rounded-lg shadow">
					<div className="ms-3 text-md font-normal">
						<strong>No Changes available!</strong>
					</div>
				</div>
			</div>
		);
	}

	const moveToAnchor = (index: number) => {
		document.getElementById(index.toString())?.scrollIntoView({ behavior: "smooth" });
		setSelectedChange(index);
	};

	return (
		<div className="mx-10 my-10">
			{/* Summary */}
			<details
				className="select-none">
				<summary className="text-2xl font-bold">Summary</summary>
				<ol className="ml-10">
					{changes?.items?.map((change, index) => (
						<li
							onClick={() => moveToAnchor(index)}
							className="list-decimal "
							key={index}><span className="cursor-pointer">{change.msg}</span> ({change.author.fullName})</li>
					))}
				</ol>
			</details>

			{/* Details */}
			{changes?.items?.map((change, index) => (
				<>
					<motion.div
						initial={{ border: "2px solid #313133" }}
						animate={{
							border: selectedChange === index ? ["2px solid #313133", "2px solid #4657CE", "2px solid #313133"] : "2px solid #313133",
						}}
						transition={{ duration: 1, delay: 0.5 }}
						onAnimationEnd={() => setSelectedChange(-1)}
						id={index.toString()}
						className="mt-[20px] ml-4 flex flex-col rounded-md bg-console-background shadow-lg px-6 py-4 overflow-auto" >
						<div className="flex flex-col">
							<div className="items-center mb-2">
								<p className="font-bold text-xl break-word">{change.msg} {change.date ? `(${formatBuildDate(change?.date)})` : ""}</p>
								<p className="text-comment-color ml-2">{change.comment}</p>
							</div>
							<hr className="my-2 border-[1.5px] border-border" />
							<div className="flex flex-col">
								<div>
									<b>Commit: </b>
									<span>{change.id} </span>
									<b>by{" "}
										<span
											onClick={() => openLink(change.author.absoluteUrl)}
											className="transition text-blue-500 hover:text-blue-600 active:text-blue-700 cursor-pointer">{change.author.fullName}</span>
									</b>
								</div>
								{change?.paths?.length > 0 && (
									<div>
										<b>Changes in: </b>
										<ul className="">
											{change.paths?.map((path, index) => (
												<li key={index} className="text-comment-color ml-2">{path.editType} {path.file}</li>
											))}
										</ul>
									</div>
								)}
							</div>
						</div>
					</motion.div>
				</>
			))
			}
		</div >
	);
};

export default ChangesView;