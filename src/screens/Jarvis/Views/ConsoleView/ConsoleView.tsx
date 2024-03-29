import React, { useEffect, useState, useRef } from "react";
import Logger from "../../../../helpers/Logger";
import { IJenkinsBuild } from "../../../../Interfaces/IBuildInterface";

import StorageManager from "../../../../helpers/StorageManager";
import ConsoleViewLoading from "./ConsoleViewLoading";
import { fetchUtils } from "../../Utils/fetchUtils";
import { CONSOLE_RELOAD_TIME } from "../../../../config/constants";

import { motion } from "framer-motion";
import { WebviewWindow } from "@tauri-apps/api/window";
import { generateRandomString } from "../../../../helpers/utils";
import { clearIntervalId, setIntervalId } from "./IntervalManager";
import { IcoArrowDown, IcoDownload, IcoFile, IcoLinear } from "@/Icons/pack_1";
import { formatConsoleData } from "./ConsoleViewUtils";
import ConsoleViewRenderHTML from "@/components/ConsoleViewRenderHTML/ConsoleViewRenderHTML";

interface Props {
	buildData: IJenkinsBuild;
}
const ConsoleView: React.FC<Props> = ({ buildData }) => {
	const consoleRef = useRef<HTMLDivElement | null>(null);
	const [consoleData, setConsoleData] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [autoScroll, setAutoScroll] = useState<boolean>(false);

	const fetchAndSetConsoleData = async () => {
		try {
			const projectName = StorageManager.get("projectName");
			const buildNumber = buildData.id.toString();

			const lines = await fetchUtils.consoleText(projectName, buildNumber);

			const formattedData = await formatConsoleData(lines);

			// add the new data to the console data
			setConsoleData(formattedData);
			setIsLoading(false);

			if (buildData.result !== null) {
				clearIntervalId();
				Logger.info(
					"ConsoleView/ConsoleView.tsx",
					"ConsoleView: Build is finished, clearing interval"
				);
				return true;
			}
		} catch (error) {
			Logger.error(
				"ConsoleView/ConsoleView.tsx",
				"ConsoleView: Error while fetching console data: " + error
			);
		}
	};

	const openFullConsole = () => {
		const projectName = StorageManager.get("projectName");

		const webview = new WebviewWindow(generateRandomString(10), {
			url: "/fullLog?buildNumber=" + buildData.id + "&projectName=" + projectName + "&buildUrl=" + buildData.url,
			title: "Read Full Console Log",
			width: 1400,
			height: 900,
			decorations: false,
		});

		webview.center();

		webview.once("tauri://created", () => {
			Logger.info("ConsoleView/ConsoleView.tsx", "Webview created");
		});

		webview.once("tauri://error", (e) => {
			Logger.error("ConsoleView/ConsoleView.tsx", `Error in webview: ${e}`);
		});
	};

	const scrollToBottom = () => {
		if (consoleRef.current) {
			consoleRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
		}
	};

	// Check if the build is finished
	useEffect(() => {
		if (buildData.result !== null) {
			clearIntervalId();
		}

		if (autoScroll) {
			scrollToBottom();
		}

	}, [consoleData]);

	// Start the interval to fetch console data
	useEffect(() => {
		// Start Interval to update console data
		const startConsole = async () => {
			if (await fetchAndSetConsoleData() == true) return;
			setIntervalId(setInterval(() => {
				fetchAndSetConsoleData();
			}, CONSOLE_RELOAD_TIME));
		};

		startConsole();


		// On unmount, clear the interval
		return () => {
			clearIntervalId();
			Logger.info("ConsoleView/ConsoleView.tsx", "Cleaning up ConsoleView Interval");
		};
	}, []);

	return (
		<div className="mx-10 my-10">
			{buildData && !isLoading
				? (
					<>
						{/* Console Data */}
						<div ref={consoleRef} className="bg-console-background border-2 border-border rounded-md shadow-lg overflow-auto">
							<div className="px-6 py-3 border-b-2 border-border flex justify-between items-center">
								<p className="font-medium text-sm select-none">Console Output</p>
								<div className="flex space-x-2">
									<div
										onClick={() => scrollToBottom()}
										className="w-8 h-8 flex justify-self-center items-center justify-center rounded-md bg-white/5 ring-1 ring-white/10 p-2 shadow-md transition hover:scale-[1.05] active:scale-[0.95]">
										<p><IcoDownload size={20} /></p>
									</div>
									{buildData.result !== null && (
										<div
											onClick={() => openFullConsole()}
											className="w-8 h-8 flex justify-self-center items-center justify-center rounded-md bg-white/5 ring-1 ring-white/10 p-2 shadow-md transition hover:scale-[1.05] active:scale-[0.95]">
											<p><IcoFile size={20} /></p>
										</div>
									)}
								</div>
								{/* <p className="font-medium text-sm cursor-pointer">Full Output</p> */}
							</div>
							<div>
								<ConsoleViewRenderHTML htmlString={consoleData} />
							</div>
						</div>
						{buildData.result === null && (
							<div
								onClick={() => setAutoScroll(!autoScroll)}
								className="absolute bottom-8 right-8 flex justify-center items-center select-none cursor-pointer">
								<motion.div
									className="flex justify-center items-center w-14 h-14 bg-background-sidebar rounded-xl"
									onClick={() => setAutoScroll(!autoScroll)}
									animate={{
										scale: autoScroll ? 0.9 : 1,

									}}
								>
									{autoScroll ? <IcoArrowDown size={28} /> : <IcoLinear size={28} />}
								</motion.div>
							</div>
						)}
					</>
				)
				:
				<ConsoleViewLoading />
			}
		</div>
	);
};

export default ConsoleView;
