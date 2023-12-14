import React, { useEffect, useState, useRef } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { getAuthDetails } from "../../../config/auth";
import { IStylingDict } from "./styleDict";

import { FaAngleDown } from "react-icons/fa6";
import { RiSkipDownLine } from "react-icons/ri";
import { CONSOLE_RELOAD_TIME } from "../../../config/constants";
import { getConsoleViewStyleDict } from "./ConsoleViewStyleDict";
import Logger from "../../../helpers/Logger";
import { IBuildData } from "../../Jarvis/IBuildInterface";

import StorageManager from "../../../helpers/StorageManager";

interface ConsoleViewProps {
	buildData: IBuildData;
}
const ConsoleView: React.FC<ConsoleViewProps> = ({ buildData }) => {
	const consoleRef: any = useRef(null);
	const [consoleData, setConsoleData] = useState<any>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [bottomLock, setBottomLock] = useState<boolean>(true);

	const handleApplyStyledDataWebWorker = (data: string, stylingDict: IStylingDict) => {
		const worker = new Worker(new URL("./worker", import.meta.url), { type: "module" });
		worker.onmessage = (e) => {
			setConsoleData(e.data);
			worker.terminate();
		};

		worker.postMessage({ data, stylingDict });
	};


	const fetchConsoleData = async () => {
		try {
			const config = {
				projectName: StorageManager.get("projectName"),
				buildNumber: buildData["id"].toString(),
				...getAuthDetails()
			};

			const response: string = await invoke("get_console_text", config);

			const lines = response.split("\n");

			// Process each line to replace URLs with clickable links
			const formattedLines = lines.map((line) => {
				return line.replace(
					/https?:\/\/[^\s]+/g,
					(match) => `<a href="${match}" target="_blank">${match}</a>`
				);
			});

			// Join the formatted lines back together with newline characters
			const formattedData = formattedLines.join("\n");

			const stylingDict: any = await getConsoleViewStyleDict();

			// Apply styles based on the dictionary
			handleApplyStyledDataWebWorker(formattedData, stylingDict);

			setIsLoading(false);
			setConsoleData(formattedData);

			return response;
		} catch (error) {
			Logger.error("Error invoking get_build_data:", error);
		}
	};

	const fetchDataForBuild = async () => {
		try {
			const config = {
				projectName: StorageManager.get("projectName"),
				buildNumber: buildData["id"].toString(),
				...getAuthDetails()
			};
			const response: string = await invoke("get_build_data", config);
			const json = await JSON.parse(response);

			return json;
		} catch (error) {
			Logger.error("Error invoking get_build_data:", error);
		}
	};

	const intervalRef = useRef<any>(null);
	useEffect(() => {
		let isMounted = true;

		const fetchData = async () => {
			try {
				const response = await fetchDataForBuild();
				if (isMounted && response["result"] === null) {
					// Clear existing interval before setting up a new one
					clearInterval(intervalRef.current);

					// Use setTimeout instead of setInterval
					const timeoutId = setTimeout(() => {
						fetchConsoleData();
						fetchData();
					}, CONSOLE_RELOAD_TIME);

					// Store the timeout ID in a ref to clear it on unmount
					intervalRef.current = timeoutId;
				}
			} catch (error) {
				Logger.error(error);
				clearInterval(intervalRef.current);
			}
		};

		fetchConsoleData();
		fetchData();

		return () => {
			isMounted = false;
			// Clear the interval or timeout when the component is unmounted
			Logger.info("ConsoleView: Unmounting - Cleanup");
			clearInterval(intervalRef.current);
			clearTimeout(intervalRef.current);
		};
	}, [consoleRef]);

	const scrollToBottom = () => {
		if (consoleRef.current) {
			consoleRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
		}
	};

	const bottomLockHandler = () => {
		setBottomLock(!bottomLock);
		if (bottomLock) {
			scrollToBottom();
		}
	};

	/**
	 * Scroll to bottom when new data is added to the console
	 */
	useEffect(() => {
		if (bottomLock) {
			scrollToBottom();
		}
	}, [consoleData]);
	
	return (
		<div className="mx-10 my-10">
			{buildData && !isLoading ?
				<>
					<div className={`fixed w-14 h-14 rounded-full flex justify-center items-center bottom-10 right-10 bg-opacity-50 backdrop-blur-md transition-all invert select-none ${bottomLock ? "bg-green-500 scale-[1]" : "bg-red-500 scale-[0.85]"}`}
						onClick={bottomLockHandler}>
						{bottomLock ? <FaAngleDown className="text-white text-2xl" /> : <RiSkipDownLine className="text-white text-2xl transform" />}
					</div>

					{/* Console Data */}
					<div ref={consoleRef} className="bg-console-background border-2 border-border rounded-md shadow-lg px-6 py-5 overflow-auto">
						<pre
							ref={consoleRef}
							dangerouslySetInnerHTML={{ __html: consoleData }}>
						</pre>

					</div>
				</>
				: <>
					<div className="bg-console-background border-2 border-border rounded-md shadow-lg px-6 py-5 overflow-auto">
						<div className="animate-pulse">

							<div className="w-1/2 text-comment-color overflow-hidden h-3 mt-2 bg-comment-color rounded-full opacity-40" />
							<div className="w-1/3 text-comment-color overflow-hidden h-3 mt-2 bg-comment-color rounded-full opacity-40" />
							<div className="w-1/4 text-comment-color overflow-hidden h-3 mt-2 bg-comment-color rounded-full opacity-40" />
							<div className="w-1/4 text-comment-color overflow-hidden h-3 mt-2 bg-comment-color rounded-full opacity-40" />
							<div className="w-4/5 text-comment-color overflow-hidden h-3 mt-2 bg-comment-color rounded-full opacity-40" />
							<div className="w-4/5 text-comment-color overflow-hidden h-3 mt-2 rounded-full opacity-40" />
							<div className="w-4/5 text-comment-color overflow-hidden h-3 mt-2 bg-comment-color rounded-full opacity-40" />
							<div className="w-5/6 text-comment-color overflow-hidden h-3 mt-2 bg-comment-color rounded-full opacity-40" />
							<div className="w-3/5 text-comment-color overflow-hidden h-3 mt-2 bg-comment-color rounded-full opacity-40" />
							<div className="w-4/5 text-comment-color overflow-hidden h-3 mt-2 bg-comment-color rounded-full opacity-40" />
							<div className="w-2/5 text-comment-color overflow-hidden h-3 mt-2 bg-comment-color rounded-full opacity-40" />
							<div className="w-4/5 text-comment-color overflow-hidden h-3 mt-2 rounded-full opacity-40" />
							<div className="w-1/6 text-comment-color overflow-hidden h-3 mt-2 bg-comment-color rounded-full opacity-40" />
							<div className="w-1/6 text-comment-color overflow-hidden h-3 mt-2 bg-comment-color rounded-full opacity-40" />
						</div>
					</div>
				</>
			}
		</div>
	);
};

export default ConsoleView;