import React, { useEffect, useState, useRef } from "react";
import { getConsoleViewStyleDict } from "./ConsoleViewStyleDict";
import Logger from "../../../../helpers/Logger";
import { IJenkinsBuild } from "../../../../Interfaces/IBuildInterface";

import StorageManager from "../../../../helpers/StorageManager";
import { IStylingDict } from "../../../../Interfaces/StylingDict";
import ConsoleViewLoading from "./ConsoleViewLoading";
import { fetchUtils } from "../../Utils/fetchUtils";
import { CONSOLE_RELOAD_TIME } from "../../../../config/constants";

interface Props {
	buildData: IJenkinsBuild;
}
const ConsoleView: React.FC<Props> = ({ buildData }) => {
	const consoleRef = useRef<HTMLDivElement | null>(null);
	const preElementRef = useRef<HTMLPreElement | null>(null);
	const [consoleData, setConsoleData] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [consoleFetchInterval, setConsoleFetchInterval] = useState<NodeJS.Timeout>();

	const handleApplyStyledDataWebWorker = (data: string, stylingDict: IStylingDict) => {
		const worker = new Worker(new URL("./worker", import.meta.url), { type: "module" });
		worker.onmessage = (e) => {
			setConsoleData(e.data);
			worker.terminate();
		};

		worker.postMessage({ data, stylingDict });
	};

	const fetchAndSetConsoleData = async () => {
		try {
			let projectName = StorageManager.get("projectName");
			let buildNumber = buildData.id.toString();

			const lines = await fetchUtils.consoleText(projectName, buildNumber)

			// Process each line to replace URLs with clickable links
			const formattedLines = lines.map((line) => line.replace(
				/https?:\/\/[^\s]+/g,
				(match) => `<a href="${match}" target="_blank">${match}</a>`,
			));

			// Join the formatted lines back together with newline characters
			const formattedData = formattedLines.join("\n");

			const stylingDict: IStylingDict = await getConsoleViewStyleDict();

			// Apply styles based on the dictionary
			handleApplyStyledDataWebWorker(formattedData, stylingDict);

			setIsLoading(false);
			setConsoleData(formattedData);
		} catch (error) {
			Logger.error("Error invoking get_build_data:", error);
		}
	};

	// Check if the build is finished
	useEffect(() => {
		if (buildData.result !== null) {
			clearInterval(consoleFetchInterval);
		}
	}, [buildData]);

	// Start the interval to fetch console data
	useEffect(() => {
		if (!consoleFetchInterval) {
			// Start Interval to update console data
			const interval = setInterval(() => {
				fetchAndSetConsoleData();
			}, CONSOLE_RELOAD_TIME);

			setConsoleFetchInterval(interval);
		}

		// On unmount, clear the interval
		return () => {
			clearInterval(consoleFetchInterval);
			Logger.info("Clearing Console");
		};
	}, []);

	return (
		<div className="mx-10 my-10">
			{buildData && !isLoading
				? (
					<>
						{/* Console Data */}
						<div ref={consoleRef} className="bg-console-background border-2 border-border rounded-md shadow-lg px-6 py-5 overflow-auto">
							<pre
								ref={preElementRef} // Use preElementRef as the ref for the <pre> element
								dangerouslySetInnerHTML={{ __html: consoleData }}
							/>
						</div>
					</>
				)
				:
				<ConsoleViewLoading />
			}
		</div>
	);
};

export default ConsoleView;
