import React, { useState, ChangeEvent, useEffect } from "react";
import IcoSearch from "../../assets/icons/ico_search.svg";

interface Props {
    onSearchChange: (value: string) => void;
	outSearchQuerry?: string;
}

function SearchComponent({ onSearchChange, outSearchQuerry }: Props): React.ReactElement<string, string> | null {
	const [search, setSearch] = useState<string>("");

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setSearch(value);
		// Pass the search value to the parent component
		onSearchChange(value);
	};

	useEffect(() => {
		if (outSearchQuerry) {
			setSearch(outSearchQuerry);
		}
	}, [outSearchQuerry]);

	return (
		<div className="relative select-none">
			<input
				value={search}
				onChange={handleSearchChange}
				type="text"
				placeholder="Search for Jobs, Comments, ..."
				className="w-[310px] h-[37px] text-[15px] bg-transparent font-medium border border-border rounded-md placeholder-comment-color text-comment-color pr-10 pl-9"
			/>
			<img
				src={IcoSearch}
				alt="Search"
				className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5 ml-1"
			/>
		</div>
	);
}

export default SearchComponent;
