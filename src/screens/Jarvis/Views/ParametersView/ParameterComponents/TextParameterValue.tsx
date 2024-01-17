import React from "react";
import { JenkinsBuildParameter } from "../../../../../Interfaces/IBuildInterface";
import { IcoQuote } from "@/Icons/pack_1";

interface Props {
    parameter: JenkinsBuildParameter;
}

const TextParameterValue: React.FC<Props> = ({ parameter }): JSX.Element => (
<div className="grid items-center">
			<div className="grid grid-cols-[30px_auto] mr-2">
			<IcoQuote size={30} className="mt-2"/>
			<div className="ml-5">
				<h1 className="text-2xl font-bold text-text-color">{parameter.name}</h1>
				<p className="text-md text-comment-color">{parameter.description}</p>
			</div>
		</div>
		<div className="ml-[50px]">
			<textarea
				value={String(parameter.value)}
				disabled
				readOnly
				className="min-h-[100px] w-full bg-property-background font-medium rounded-md text-comment-color py-[6px] px-3 mt-2 active:bg-property-background-selected hover:brightness-[1.3]"
			/>
		</div>
	</div>
);

export default TextParameterValue;
