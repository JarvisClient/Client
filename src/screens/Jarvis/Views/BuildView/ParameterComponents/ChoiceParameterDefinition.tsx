import React, { useEffect } from "react";
import { IJenkinsProjectParameterDefinition } from "../../../../../Interfaces/IProjectInterface";
import { IcoCheckbox, IcoSearch } from "@/Icons/pack_1";

interface Props {
	parameters: IJenkinsProjectParameterDefinition;
	onChange: (choice: string) => void;
}

const ChoiceParameterDefinition: React.FC<Props> = ({ parameters, onChange }): React.JSX.Element => {
	const [selected, setSelected] = React.useState<string>("");
	const [choices, setChoices] = React.useState<string[]>([]);

	useEffect(() => {
		setSelected(parameters.defaultParameterValue.value);
		setChoices(parameters.choices || []);
	}, []);

	const onSearchChange = (value: string) => {
		if (value === "") {
			setChoices(parameters.choices || []);
			return;
		}

		const filteredChoices = parameters.choices?.filter((choice) => choice.includes(value));
		setChoices(filteredChoices || []);
	}

	return (
		<div className="grid items-center">
			<div className="flex items-center mr-2">
				<IcoCheckbox size={30} />
				<div className="ml-5">
					<h1 className="text-2xl font-bold text-text-color">{parameters.name}</h1>
					<p className="text-md text-comment-color">{parameters.description}</p>
				</div>
			</div>
			<div className="ml-[50px] mt-2">
				{/* Search bar */}
					<span className="relative w-full">
					<input
					onChange={(e) => onSearchChange(e.target.value)}
					type="text"
					placeholder="Search..."
					className="w-[310px] h-[40px] text-[15px] w-full bg-transparent font-medium border-2 border-border rounded-md placeholder-comment-color text-comment-color pr-10 pl-9"
					/>
					<span className="absolute top-[11px] left-[10px] -mt-2.5">
						<IcoSearch size={22} />
					</span>
				</span>
				{/* Choices */}
				{choices.map((choice, index) => (
					<div
						key={index}
						onClick={() => {
							onChange(choice);
							setSelected(choice);
						}}
						className={`h-[40px] bg-property-background font-medium rounded-md text-comment-color pt-[7px] px-3 mt-2 ${choice === selected ? "bg-property-background-selected" : ""} hover:brightness-[1.3]`}>
						{choice}
					</div>
				))}
			</div>
		</div>
	);
};

export default ChoiceParameterDefinition;
