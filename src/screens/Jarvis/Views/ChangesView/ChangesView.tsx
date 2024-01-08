import React from "react";
import { IJenkinsBuild } from "@/Interfaces/IBuildInterface";

interface Props {
	buildData: IJenkinsBuild;
}

const ChangesView = ({ buildData }: Props) => {
    return (
		<div className="mx-10 my-10 select-none">
			<h1 className="text-3xl font-bold mb-[40px]">Changes</h1>
		</div>
	);
}

export default ChangesView;