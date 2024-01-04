import React, { useEffect } from "react";
import { IJenkinsProjectParameterDefinition } from "../../../../../Interfaces/IProjectInterface";
import { IcoText } from "@/Icons/pack_1";

interface Props {
  parameters: IJenkinsProjectParameterDefinition;
  value: string | number | boolean;
  onChange: (value: string) => void;
}

const StringParameterDefinition: React.FC<Props> = ({ parameters, value, onChange }): React.JSX.Element => {
	useEffect(() => {
		onChange(parameters.defaultParameterValue.value as string);
	}, [parameters.defaultParameterValue.value]);

	return (
		<div className="grid items-center">
			<div className="flex items-center mr-2">
				<IcoText size={30} />
				<div className="ml-5">
					<h1 className="text-2xl font-bold text-text-color">{parameters.name}</h1>
					<p className="text-md text-comment-color">{parameters.description}</p>
				</div>
			</div>
			<div className="ml-[50px]">
				<input
					value={String(value)}
					onChange={(e) => onChange(e.target.value)}
					type="input"
					className=" h-[35px] w-full bg-property-background font-medium rounded-md text-comment-color px-3 mt-2 active:bg-property-background-selected hover:brightness-[1.3]"
				/>
			</div>
		</div>
	);
};

export default StringParameterDefinition;
