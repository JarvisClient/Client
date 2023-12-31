import React from "react";
import { IJenkinsProjectHealthReport } from "../../Interfaces/IProjectInterface";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { motion } from "framer-motion";


interface Props {
    healthReport: IJenkinsProjectHealthReport;
    _key: number;
}

const ProjectHealthDisplay: React.FC<Props> = ({ healthReport, _key }) => {
	ChartJS.register(ArcElement, Tooltip, Legend);
	return (
		<>
			<motion.div 
				initial={{ opacity: 0, x: 50 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.5, delay: _key * 0.1}}
				className='bg-background-sidebar h-24 min-w-96 rounded-lg flex flex-row items-center'>
				{/* Graph */}
				<Pie
					className='h-full w-full p-4 ml-2 mb-2'
					data={{
						labels: [],
						datasets: [
							{
								data: [healthReport.score, 100 - healthReport.score],
								backgroundColor: [
									"#00B589",
									"#f22c3d",
								],
								borderWidth: 0,
							},
						],
					}} />

				{/* Text */}
				<div>
					<p><b>Score:</b> {healthReport.score}%</p>
					<p>{healthReport.description.split(": ")[1]}</p>
				</div>
			</motion.div>
		</>
	);
};

export default ProjectHealthDisplay;