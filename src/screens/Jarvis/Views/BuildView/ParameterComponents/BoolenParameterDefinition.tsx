import React, { useEffect } from "react";

import { IJenkinsProjectParameterDefinition } from "../../../../../Interfaces/IProjectInterface";
import { IcoBool } from "@/Icons/pack_1";

interface Props {
  parameters: IJenkinsProjectParameterDefinition;
  value: string;
  onChange: (value: string) => void;
}

const BooleanParameterDefinition: React.FC<Props> = ({ parameters, value, onChange }): React.JSX.Element => {
	const toggleValue = () => {
		// Toggle the value between "true" and "false" strings
		const newValue = value === "true" ? "false" : "true";
		onChange(newValue);
	};

	useEffect(() => {
		// Ensure that the default value is always a string "true" or "false"
		const defaultValue = typeof parameters.defaultParameterValue.value === "boolean" ? String(parameters.defaultParameterValue.value) : "false";
		onChange(defaultValue);
	}, []);

	return (
		<div className="grid items-center">
			<div className="grid grid-cols-[30px_auto] mr-2">
				<IcoBool size={30} className="mt-3"/>
				<div className="ml-5">
					<h1 className="text-2xl font-bold text-text-color">{parameters.name}</h1>
					<p className="text-md text-comment-color">{parameters.description}</p>
				</div>
			</div>
			<div className="ml-[50px]">
				<div
					onClick={toggleValue}
					className="w-[30px] h-[30px] bg-property-background font-medium rounded-md text-comment-color pt-[3px] px-2 mt-2 active:bg-property-background-selected hover:brightness-[1.3]"
				>
					{value === "true" ? "✔" : " "}
				</div>
			</div>
		</div>
	);
};

export default BooleanParameterDefinition;
