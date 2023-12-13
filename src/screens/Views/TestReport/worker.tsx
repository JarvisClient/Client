import React from "react";

export function renderTestReportCard(suite: any): JSX.Element[] {
	return suite["cases"].map((testcase: any) => (
		<div key={testcase["name"]} className="mt-[20px] ml-4 flex flex-col border-2 border-border border-t-1 rounded-md">
			<div className="bg-console-background border-b-2 border-border shadow-lg px-6 py-5 overflow-auto rounded-t-md">
				<div className="flex flex-col">
					<div className="flex flex-row space-x-2">
						{testcase["status"] === "PASSED" && (
							<span className="inline-flex items-center rounded-md bg-[#122a2d] px-2 py-1 text-xs font-medium text-green-300 ring-2 ring-inset ring-green-600/20">PASSED</span>
						)}
						{testcase["status"] === "FAILED" && (
							<span className="inline-flex items-center rounded-md bg-[#28222f] px-2 py-1 text-xs font-medium text-red-300 ring-2 ring-inset ring-red-600/20">FAILED</span>
						)}
						{testcase["skipped"] === true && (
							<span className="inline-flex items-center rounded-md bg-[#1F2735] px-2 py-1 text-xs font-medium text-gray-300 ring-2 ring-inset ring-gray-600/20">SKIPPED</span>
						)}
						<p className="text-sm font-comment-color">Case Information:</p>
					</div>
					<hr className={"my-2 border-2 border-border"} />
					<div className="flex items-center space-x-4 mb-2">
						<p className="font-bold text-xl break-all">{testcase["name"]}</p>
					</div>
					<div className="flex flex-row space-x-4">
						<p>
							<b>Class Name: </b>
							<span>{testcase["className"]}</span>
						</p>
					</div>
					<div className="flex flex-row space-x-4">
						<div className="flex flex-col">
							{testcase["failedSince"] ? (
								<p className="font-bold">
                                    Failed Since: <span className="font-normal">{testcase["failedSince"]}</span>
								</p>
							) : null}
							{testcase["duration"] ? (
								<p className="font-bold">
                                    Duration: <span className="font-normal">{testcase["duration"]}s</span>
								</p>
							) : null}
						</div>
					</div>
				</div>
			</div>
			{testcase["stdout"] && (
				<div className="bg-console-background shadow-lg px-6 py-5 overflow-auto">
					<p className="text-sm font-comment-color">Standard Error:</p>
					<hr className="my-2 border-2 border-border" />
					<p>{testcase["stdout"]}</p>
					</div>
			)}
			{testcase["errorDetails"] && (
				<div className="bg-console-background shadow-lg px-6 py-5 overflow-auto">
					<p className="text-sm font-comment-color">Error Details:</p>
					<hr className="my-2 border-2 border-border" />
					<p>{testcase["errorDetails"]}</p>
					</div>
			)}
			{testcase["skippedMessage"] && (
				<div className="bg-console-background shadow-lg px-6 py-5 overflow-auto">
					<p className="text-sm font-comment-color">Skipped Message:</p>
					<hr className="my-2 border-2 border-border" />
					<p>{testcase["skippedMessage"]}</p>
					</div>
			)}
			{testcase["errorStackTrace"] && (
				<div className="bg-console-background shadow-lg px-6 py-5 overflow-auto">
					<p className="text-sm font-comment-color">Error Stack Trace:</p>
					<hr className="my-2 border-2 border-border" />
					<p>{testcase["errorStackTrace"]}</p>
					</div>	
			)}
			{}
		</div>
	));
}