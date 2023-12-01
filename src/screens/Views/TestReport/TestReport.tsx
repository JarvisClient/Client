import React, { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import authdetails from "../../../config/auth";
import { IoMdArrowDropdown } from "react-icons/io";

import "./TestReport.css";
import Logger from "../../../helpers/Logger";
import { IBuildData } from "../../App/IBuildInterface";

interface ConsoleViewProps {
	buildData: IBuildData;
}

const TestReport: React.FC<ConsoleViewProps> = ({ buildData }) => {
	const [testReport, setTestReport] = useState<any>(null);
	const [showBanner, setShowBanner] = useState(false);
	const [collapsedSuites, setCollapsedSuites] = useState<string[]>([]);

	const fetchTestData = async (projectName: string, buildNumber: any) => {
		const config = {
			projectName: projectName,
			buildNumber: String(buildNumber),
			...authdetails,
		};
		const response: string = await invoke("get_test_result_data", config);

		const json = await JSON.parse(response);

		return json;
	};

	// Function to toggle the visibility of a test suite
	const toggleTestSuite = (suiteName: string) => {
		const suiteElement = document.getElementById(`suite-${suiteName}`);
		if (suiteElement) {
			suiteElement.classList.toggle("collapsed");

			// Update the collapsedSuites state based on the toggle action
			setCollapsedSuites((prevCollapsedSuites) =>
				suiteElement.classList.contains("collapsed")
					? [...prevCollapsedSuites, suiteName]
					: prevCollapsedSuites.filter((name) => name !== suiteName)
			);
		}
	};

	useEffect(() => {
		const fetchTestReport = async () => {
			try {
				const storedProjectName: string = localStorage.getItem("projectName") || "";

				const json = await fetchTestData(storedProjectName, buildData["id"]);

				setTestReport(json);
			} catch (error) {
				Logger.error(error);
				setShowBanner(true);
			}
		};

		fetchTestReport();
	}, []);

	const isSuiteCollapsed = (suiteName: string) => {
		return collapsedSuites.includes(suiteName);
	};

	return (
		<>
			<div className="mx-10 my-10">
				{showBanner ? (
					<div className="flex mb-5 items-center w-full p-4 bg-[#403D2F] rounded-lg shadow">
						<div className="ms-3 text-md font-normal">
							<strong>No TestCases available!</strong>
						</div>
					</div>
				) : (
					<>
						{buildData && testReport ? (
							<div className="mb-5">
								<p className="font-bold">Failed: {testReport["failCount"]}</p>
								<p className="font-bold">Passed: {testReport["passCount"]}</p>
								<p className="font-bold">Skipped: {testReport["skipCount"]}</p>
							</div>
						) : (
							<div className="flex animate-pulse flex-col items-center justify-center">
								<div className="mt-[20px] w-full ml-4 flex flex-col">
									<div className="bg-console-background border-2 border-border rounded-md shadow-lg px-6 py-5 overflow-auto">
										<div className="flex flex-col space-y-4">
											<div className="h-2 w-1/4 bg-border rounded col-span-2"></div>
											<hr className="my-2 border-2 border-border" />
											<div className="flex items-center space-x-4 mb-2">
												<div className="h-2 w-1/4 bg-border rounded col-span-2"></div>
											</div>
											<div className="flex flex-row space-x-4">
												<div className="h-2 w-1/3 bg-border rounded col-span-2"></div>
											</div>
											<div className="flex flex-row space-x-4 space-y-2">
												<div className="h-2 w-full mt-3 bg-border rounded col-span-2"></div>
											</div>
										</div>
									</div>
								</div>
							</div>
						)}

						{testReport &&
							testReport["suites"] &&
							testReport["suites"].map((suite: any) => (
								<div key={suite["name"]}>
									<div className="flex">

										<button
											className={`text-3xl font-bold mb-2 hover:scale-[1.1] transition-all active:scale-[0.95] ${isSuiteCollapsed(suite["name"]) ? "-rotate-90" : ""}`}
											onClick={() => toggleTestSuite(suite["name"])}
										>
											<IoMdArrowDropdown />
										</button>
										<h1 className="text-3xl font-bold mb-2">{suite["name"]}</h1>
									</div>

									<div id={`suite-${suite["name"]}`} className="test-suite">
										{suite["cases"] &&
											suite["cases"].map((testcase: any) => (
												<div key={testcase["name"]} className="mt-[20px] ml-4 flex flex-col">
													<div className="bg-console-background border-2 border-border rounded-t-md shadow-lg px-6 py-5 overflow-auto">
														<div className="flex flex-col">
															<p className="text-sm font-comment-color">Case Information:</p>
															<hr className="my-2 border-2 border-border" />
															<div className="flex items-center space-x-4 mb-2">
																<p className="font-bold">{testcase["name"]}</p>
																{testcase["status"] === "PASSED" && (
																	<span className="inline-flex items-center rounded-md bg-[#122a2d] px-2 py-1 text-xs font-medium text-green-300 ring-1 ring-inset ring-green-600/20">PASSED</span>
																)}
																{testcase["status"] === "FAILED" && (
																	<span className="inline-flex items-center rounded-md bg-[#28222f] px-2 py-1 text-xs font-medium text-red-300 ring-1 ring-inset ring-red-600/20">FAILED</span>
																)}
															</div>
															<div className="flex flex-row space-x-4">
																<p>
																	<b>Class Name: </b>
																	<span>{testcase["className"]}</span>
																</p>
															</div>
															<div className="flex flex-row space-x-4">
																<p>
																	<b>Failed since: </b>
																	<span>{testcase["failedSince"]}</span>
																</p>
																<p>
																	<b>Duration:</b> <span>{testcase["duration"]}</span>
																</p>
															</div>
														</div>
													</div>
													<div className="bg-console-background border-2 border-border border-t-1 rounded-b-md shadow-lg px-6 py-5 overflow-auto">
														<p className="text-sm font-comment-color">Standard Output:</p>
														<hr className="my-2 border-2 border-border" />
														<p>{testcase["stdout"] || testcase["errorDetails"] || testcase["stderr"]}</p>
													</div>
												</div>
											))}
										<p className="text-center text-gray-600 mt-2">/ end of Test Suite: {suite["name"]} /</p>
									</div>
								</div>
							))}
					</>
				)}
			</div>
		</>
	);
};

export default TestReport;
