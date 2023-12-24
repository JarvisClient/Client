import React from "react";

interface Props {
  isChecked: boolean;
  onCheckboxChange: () => void;
}

const Switch: React.FC<Props> = ({ isChecked, onCheckboxChange }) => (
	<>
		<label className="flex cursor-pointer select-none items-center">
			<div className="relative">
				<input
					type="checkbox"
					checked={isChecked}
					onChange={onCheckboxChange}
					className="sr-only"
				/>
				<div className="box block h-8 w-14 rounded-full bg-background-card" />
				<div className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full transition 
					${isChecked ? "translate-x-full bg-green-300" : "bg-red-300"}`}
				/>
			</div>
		</label>
	</>
);

export default Switch;
