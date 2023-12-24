import React from "react";

interface Props {
  list: { id: string; name: string }[];
  onItemSelected: (selectedId: string) => void; // Define a prop for the callback function
  setSelectedId: string
}

const SelectList: React.FC<Props> = ({ list, onItemSelected, setSelectedId }) => (
	<>
		<select
			className="select_list"
			name="list"
			id="list"
			value={setSelectedId}
			onChange={(event) => onItemSelected(event.target.value)} // Call the function on change
		>
			{list.map((item) => (
				<option key={item.id} value={item.id}>
					{item.name}
				</option>
			))}
		</select>
	</>
);

export default SelectList;
