import React from "react";
import {
	BiCheckCircle, BiErrorCircle, BiHash, BiSkipNextCircle,
} from "react-icons/bi";
// Make sure to include the appropriate icons from whichever icon library you are using

interface Props {
    failCount?: number;
    skipCount?: number;
    passCount?: number;
    }

const TestReportIndicators: React.FC<Props> = ({ failCount = 0, skipCount = 0, passCount = 0 }) => (
	<div className="flex items-center space-x-4 place-content-evenly select-none">
		{/* total tasks */}
		<div className="flex flex-row space-x-2">
			<BiHash className="mt-[2px] text-white" size={32} />
			<div className="flex flex-col">
				<span className="text-3xl font-bold text-white">{failCount + skipCount + passCount}</span>
				<span className="text-md font-semibold uppercase text-white">Total</span>
			</div>
		</div>
		{/* total tasks */}
		<div className="flex flex-row space-x-2">
			<BiErrorCircle className="mt-[2px] text-jenkins-job-red" size={32} />
			<div className="flex flex-col">
				<span className="text-3xl font-bold text-jenkins-job-red">{failCount}</span>
				<span className="text-md font-semibold uppercase text-jenkins-job-red">Failed</span>
			</div>
		</div>
		{/* total tasks */}
		<div className="flex flex-row space-x-2">
			<BiSkipNextCircle className="mt-[2px] text-jenkins-job-orange" size={32} />
			<div className="flex flex-col">
				<span className="text-3xl font-bold text-jenkins-job-orange">{skipCount}</span>
				<span className="text-md font-semibold uppercase text-jenkins-job-orange">Skipped</span>
			</div>
		</div>
		{/* total tasks */}
		<div className="flex flex-row space-x-2">
			<BiCheckCircle className="mt-[2px] text-jenkins-job-green" size={32} />
			<div className="flex flex-col">
				<span className="text-3xl font-bold text-jenkins-job-green">{passCount}</span>
				<span className="text-md font-semibold uppercase text-jenkins-job-green">Passed</span>
			</div>
		</div>
	</div>
);

export default TestReportIndicators;
