import React, { useEffect } from "react";

import { IJenkinsProjectParameterDefinition } from "../../../../../Interfaces/IProjectInterface";
import { IcoQuote } from "@/Icons/pack_1";

interface Props {
  parameters: IJenkinsProjectParameterDefinition;
  value: string | number | boolean;
  onChange: (value: string) => void;
}

const TextParameterDefinition: React.FC<Props> = ({ parameters, value, onChange }): React.JSX.Element => {
	useEffect(() => {
		onChange(parameters.defaultParameterValue.value as string);
	}, [parameters.defaultParameterValue.value]);

	return (
		<div className="grid items-center">
			<div className="grid grid-cols-[30px_auto] mr-2">
				<IcoQuote size={30} className="mt-3"/>
				<div className="ml-5">
					<h1 className="text-2xl font-bold text-text-color">{parameters.name}</h1>
					<p className="text-md text-comment-color">{parameters.description}</p>
				</div>
			</div>
			<div className="ml-[50px]">
				<textarea
					value={String(value)}
					onChange={(e) => onChange(e.target.value)}
					className="min-h-[100px] w-full bg-property-background font-medium rounded-md text-comment-color py-[6px] px-3 mt-2 active:bg-property-background-selected hover:brightness-[1.3]"
				/>
			</div>
		</div>
	);
};

export default TextParameterDefinition;
