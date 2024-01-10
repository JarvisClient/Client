import React, { useEffect, useState } from "react";

import "./TestReport.css";
import Logger from "../../../../helpers/Logger";
import { IJenkinsBuild } from "../../../../Interfaces/IBuildInterface";

import TestReportIndicators from "./TestReportIndicators";
import { renderTestReportCard } from "./worker";

import StorageManager from "../../../../helpers/StorageManager";
import { fetchUtils } from "../../Utils/fetchUtils";
import { TestResult, TestSuite } from "../../../../Interfaces/ITestReport";

// import testJson from "./testJSON.json"; // For testing purposes

interface Props {
	buildData: IJenkinsBuild;
}

const TestReport: React.FC<Props> = ({ buildData }) => {
	const [testReport, setTestReport] = useState<TestResult>({} as TestResult);
	const [showBanner, setShowBanner] = useState(false);
	const [collapsedSuites, setCollapsedSuites] = useState<string[]>([]);

	// useState of an Object containing failCount, passCount, skipCount add types
	const [failWidth, setFailWidth] = useState<number | null>(null);
	const [passWidth, setPassWidth] = useState<number | null>(null);
	const [skipWidth, setSkipWidth] = useState<number | null>(null);

	const [selectAllChecked, setSelectAllChecked] = useState(true);

	useEffect(() => {
		if (testReport) {
			const totalCount = testReport.failCount + testReport.passCount + testReport.skipCount;
			setFailWidth((testReport.failCount / totalCount) * 100);
			setPassWidth((testReport.passCount / totalCount) * 100);
			setSkipWidth((testReport.skipCount / totalCount) * 100);
		}
	}, [testReport]);

	// Function to toggle the visibility of a test suite
	const toggleTestSuite = (suiteName: string) => {
		const suiteElement = document.getElementById(`suite-${suiteName}`);
		if (suiteElement) {
			suiteElement.classList.toggle("collapsed");
			// Update the collapsedSuites state based on the toggle action
			setCollapsedSuites((prevCollapsedSuites) => (suiteElement.classList.contains("collapsed")
				? [...prevCollapsedSuites, suiteName]
				: prevCollapsedSuites.filter((name) => name !== suiteName)));
		}

		// Update the selectAllChecked state based on the toggle action
		const allSuites = document.getElementsByClassName("test-suite");
		const isAllExpanded = Array.from(allSuites).every((suite) => !suite.classList.contains("collapsed"));
		setSelectAllChecked(isAllExpanded);
	};

	const hideAllTestSuites = () => {
		const suites = document.getElementsByClassName("test-suite");
		for (let i = 0; i < suites.length; i++) {
			suites[i].classList.add("collapsed");
		}
		setCollapsedSuites(testReport.suites.map((suite: TestSuite) => suite.name));
	};

	const showAllTestSuites = () => {
		const suites = document.getElementsByClassName("test-suite");
		for (let i = 0; i < suites.length; i++) {
			suites[i].classList.remove("collapsed");
		}
		setCollapsedSuites([]);
	};

	const toggleSelectAll = () => {
		const allSuites = document.getElementsByClassName("test-suite");
		const isAllExpanded = Array.from(allSuites).every((suite) => !suite.classList.contains("collapsed"));

		if (isAllExpanded) {
			hideAllTestSuites();
			setSelectAllChecked(false);
		} else {
			showAllTestSuites();
			setSelectAllChecked(true);
		}
	};

	useEffect(() => {
		const fetchTestReport = async () => {
			try {
				const storedProjectName: string = StorageManager.get("projectName") || "";

				const testReport = await fetchUtils.fetchTestData(storedProjectName, buildData.id);
				if (!testReport) throw new Error("No TestReport found!");

				setTestReport(testReport);
			} catch (error) {
				Logger.error("TestReport.tsx", error);
				setShowBanner(true);

				/*
					Uncomment the below code to use the testJson file for testing purposes
					Dont forget the import statement at the top
				*/
				// setTestReport(testJson);
				// setShowBanner(false);

			}
		};

		fetchTestReport();
	}, []);

	const isSuiteCollapsed = (suiteName: string) => collapsedSuites.includes(suiteName);

	// Show a message if there are no changes
	if (showBanner) {
		return (
			<div className="mx-10 my-10 select-none">
				<div className="flex mb-5 items-center w-full p-4 bg-[#403D2F] rounded-lg shadow">
					<div className="ms-3 text-md font-normal">
						<strong>No Test Results available!</strong>
					</div>
				</div>
			</div>
		);
	}

	return (
		<>
			<div className="mx-10 my-10">
				{buildData && testReport ? (
					<>
						<div className="mb-10 mx-10 space-y-8">
							<TestReportIndicators
								failCount={testReport.failCount}
								skipCount={testReport.skipCount}
								passCount={testReport.passCount}
							/>
							<div className="flex h-2 rounded-full">
								<div style={{ width: `${failWidth}%` }} className="bg-jenkins-job-red rounded-l-full" />
								<div style={{ width: `${skipWidth}%` }} className="bg-jenkins-job-orange" />
								<div style={{ width: `${passWidth}%` }} className="bg-jenkins-job-green rounded-r-full" />
							</div>

							<div>
								<p className="font-bold text-xl">Test Suites:</p>
								<div className="flex space-x-2 items-center">
									<input
										type="checkbox"
										id="jarvis_closeAll"
										checked={selectAllChecked}
										onChange={toggleSelectAll}
										className="w-4 h-4 rounded-full cursor-pointer accent-jenkins-job-blue"
									/>
									<label htmlFor="jarvis_closeAll" className="cursor-pointer">
										{selectAllChecked ? "Collapse All" : "Expand All"}
									</label>
								</div>
								<div className="ml-2">
									{testReport && testReport.suites && testReport.suites.map((suite: TestSuite) => (
										<div key={suite.name}>
											<div className="flex space-x-2 items-center">
												<input
													type="checkbox"
													id={suite.name}
													checked={!isSuiteCollapsed(suite.name)}
													onChange={() => toggleTestSuite(suite.name)}
													className="w-4 h-4 rounded-full cursor-pointer accent-jenkins-job-blue"
												/>
												<label htmlFor={suite.name} className="cursor-pointer">
															(
													{suite.cases.length}
															)
													{suite.name}
												</label>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</>
				) : (
					<div className="flex animate-pulse flex-col items-center justify-center">
						<div className="mt-[20px] w-full ml-4 flex flex-col">
							<div className="bg-console-background border-2 border-border rounded-md shadow-lg px-6 py-5 overflow-auto">
								<div className="flex flex-col space-y-4">
									<div className="h-2 w-1/4 bg-border rounded col-span-2" />
									<hr className="my-2 border-2 border-border" />
									<div className="flex items-center space-x-4 mb-2">
										<div className="h-2 w-1/4 bg-border rounded col-span-2" />
									</div>
									<div className="flex flex-row space-x-4">
										<div className="h-2 w-1/3 bg-border rounded col-span-2" />
									</div>
									<div className="flex flex-row space-x-4 space-y-2">
										<div className="h-2 w-full mt-3 bg-border rounded col-span-2" />
									</div>
								</div>
							</div>
						</div>
					</div>
				)}

				{testReport
							&& testReport.suites
							&& testReport.suites.map((suite: TestSuite) => (
								<div key={suite.name}>
									<div className="flex">
										<h1
											className="text-2xl font-bold mb-2 cursor-pointer"
											onClick={() => toggleTestSuite(suite.name)}
										>
											{suite.name}
											<span className="text-sm ml-1">
												(
												{suite.cases.length}
												)
											</span>
										</h1>
									</div>

									<div id={`suite-${suite.name}`} className="test-suite mb-8">
										{renderTestReportCard(suite)}
									</div>
								</div>
							))}
			</div>
			
		</>
	);
};

export default TestReport;
