import React from "react";
import { openLink } from "../../../../../helpers/utils";

import StorageManager from "../../../../../helpers/StorageManager";
import { JenkinsBuildParameter } from "../../../../../Interfaces/IBuildInterface";
import { IcoFile } from "@/Icons/pack_1";

interface Props {
	parameter: JenkinsBuildParameter;
	buildNumber: number;
}

const FileParameterValue: React.FC<Props> = ({ parameter, buildNumber }): React.JSX.Element => {
	const openFile = (view: boolean = false) => {
		const baseurl = StorageManager.get("baseurl");
		const projectName = StorageManager.get("projectName");
		const buildnumber = buildNumber;
		let url = `${baseurl}job/${projectName}/${buildnumber}/parameters/parameter/${parameter.name}/${parameter.name}`;

		if (view) {
			url += "/*view*";
		}

		openLink(url);
	};

	return (
		<div className="grid items-center">
			<div className="flex items-center mr-2">
				<IcoFile size={30} />
				<div className="ml-5">
					<h1 className="text-2xl font-bold text-text-color">{parameter.name}</h1>
					<p className="text-md text-comment-color">{parameter.description}</p>
				</div>
			</div>
			<div className="ml-[50px]">
				<button
					onClick={() => openFile()}
					className="w-[80px] h-[37px] text-[15px] text-white bg-property-background font-medium rounded-md text-comment-color px-3 mt-5 mr-3 active:bg-property-background-selected hover:brightness-[1.3]"
				>
					Open
				</button>
				<button
					onClick={() => openFile(true)}
					className="w-[80px] h-[37px] text-[15px] text-white bg-property-background font-medium rounded-md text-comment-color px-3 mt-5 mr-3 active:bg-property-background-selected hover:brightness-[1.3]"
				>
					View
				</button>
			</div>
		</div>
	);
};

export default FileParameterValue;
