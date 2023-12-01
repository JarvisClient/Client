import React, { useEffect } from "react";
import { VscSymbolString } from "react-icons/vsc";

import { JenkinsParameters } from "../BuildView";

interface Props {
  parameters: JenkinsParameters;
  value: string | boolean | number | null | any;
  onChange: (value: string) => void;
}

const StringParameterDefinition: React.FC<Props> = ({ parameters, value, onChange }): JSX.Element => {
	useEffect(() => {
		onChange(parameters.defaultParameterValue.value as string);
	}, [parameters.defaultParameterValue.value]);
      
	return (
		<div className="grid items-center">
			<div className="flex items-center mr-2">
				<VscSymbolString size={30} />
				<div className="ml-5">
					<h1 className="text-2xl font-bold text-text-color">{parameters.name}</h1>
					<p className="text-md text-comment-color">{parameters.description}</p>
				</div>
			</div>
			<div className="ml-[50px]">
				<input
					value={value}
					onChange={(e) => onChange(e.target.value)}
					type="input"
					className={" h-[35px] w-full bg-property-background font-medium rounded-md text-comment-color px-3 mt-2 active:bg-property-background-selected hover:brightness-[1.3]"}
				/>
			</div>
		</div>
	);
};

export default StringParameterDefinition;
