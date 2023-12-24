import React, { useEffect } from "react";
import { TbSelect } from "react-icons/tb";
import { IJenkinsProjectParameterDefinition } from "../../../../../Interfaces/IProjectInterface";

interface Props {
    parameters: IJenkinsProjectParameterDefinition;
    value: string | boolean | number ;
    onChange: (choice: string) => void;
}

const ChoiceParameterDefinition: React.FC<Props> = ({ parameters, value, onChange }): React.JSX.Element => {
	useEffect(() => {
		if (!parameters.choices?.includes(String(value))) {
			onChange(parameters.choices?.[0] ?? "");
		}
	}, [parameters.choices, onChange, value]);

	return (
		<div className="grid items-center">
			<div className="flex items-center mr-2">
				<TbSelect size={30} />
				<div className="ml-5">
					<h1 className="text-2xl font-bold text-text-color">{parameters.name}</h1>
					<p className="text-md text-comment-color">{parameters.description}</p>
				</div>
			</div>
			<div className="ml-[50px]">
				{parameters.choices?.map((choice) => (
					<div
						key={choice}
						onClick={() => onChange(choice)}
						className={`h-[40px] bg-property-background font-medium rounded-md text-comment-color pt-[7px] px-3 mt-2 ${choice === value ? "bg-property-background-selected" : ""} hover:brightness-[1.3]`}
					>
						{choice}
					</div>
				))}
			</div>
		</div>
	);
};

export default ChoiceParameterDefinition;
