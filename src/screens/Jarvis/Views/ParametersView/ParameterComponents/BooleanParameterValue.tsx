import React from "react";
import { JenkinsBuildParameter } from "../../../../../Interfaces/IBuildInterface";
import { IcoBool } from "@/Icons/pack_1";

interface Props {
    parameter: JenkinsBuildParameter;
}

const BooleanParameterValue: React.FC<Props> = ({ parameter }): React.JSX.Element => (
	<div className="grid items-center">
			<div className="grid grid-cols-[30px_auto] mr-2">
			<IcoBool size={30} className="mt-2"/>
			<div className="ml-5">
				<h1 className="text-2xl font-bold text-text-color">{parameter.name}</h1>
				<p className="text-md text-comment-color">{parameter.description}</p>
			</div>
		</div>
		<div className="ml-[50px]">
			<input
				type="text"
				disabled
				readOnly
				value={parameter.value ? "✔" : ""}
				className="w-[30px] h-[30px] bg-property-background font-medium rounded-md text-comment-color px-2 mt-2 active:bg-property-background-selected hover:brightness-[1.3]"
			/>
		</div>
	</div>
);

export default BooleanParameterValue;
