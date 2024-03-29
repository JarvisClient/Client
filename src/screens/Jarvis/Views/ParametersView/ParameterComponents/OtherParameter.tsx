import React from "react";
import { JenkinsBuildParameter } from "../../../../../Interfaces/IBuildInterface";
import { IcoQuestionmark } from "@/Icons/pack_1";

interface Props {
    parameter: JenkinsBuildParameter;
}

const OtherParameterValue: React.FC<Props> = ({ parameter }): React.JSX.Element => (
<div className="grid items-center">
			<div className="grid grid-cols-[30px_auto] mr-2">
			<IcoQuestionmark size={30} className="mt-2"/>
			<div className="ml-5">
				<h1 className="text-2xl font-bold text-text-color">{parameter.name}</h1>
				<p className="text-md text-comment-color">{parameter.description}</p>
			</div>
		</div>
		<div className="ml-[50px]">
			<p className="mt-2">Jarvis isn&apos;t familiar with this Parameter Class and will display the pure API Data instead.</p>
			<div className="bg-console-background border-2 border-border rounded-md shadow-lg px-6 py-5 overflow-auto">
				<pre>{JSON.stringify(parameter, null, 2)}</pre>
			</div>
		</div>
	</div>
);

export default OtherParameterValue;
