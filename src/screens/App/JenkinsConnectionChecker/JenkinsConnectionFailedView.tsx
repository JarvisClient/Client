import React, { useEffect } from "react";
import TitleBarComponentLight from "../../../components/TitleBar/TitleBarComponentLight";
import { motion } from "framer-motion";

import icon from "../../../assets/icons/ico_bow.svg";
import { useNavigate } from "react-router-dom";

const JenkinsConnectionFailedView: React.FC = () => {
	const navigate = useNavigate();

	useEffect(() => {
		// Add any necessary logic for useEffect here
	}, []);

	const restartOnboarding = () => {
		navigate("/onboarding");
	};

	return (
		<div>
			<TitleBarComponentLight />
			<div className="flex flex-col bg-background-sidebar items-center justify-center h-screen select-none">
				<div className="flex flex-col items-center w-2/3 text-center">
					<motion.img
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						src={icon}
						alt="Welcome icon"
						className="w-16 h-16 mb-4"
					/>
					<motion.h1
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.1 }}
						className="text-2xl font-medium mb-4"
					>
						Could not connect to Jenkins
					</motion.h1>
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.3 }}
						className="mb-8"
					>
						While trying to connect to Jenkins, an error occurred. Please check your Jenkins Server URL and try again. <br /><br />
						<div className="text-center flex justify-center">
							<ul className="">
								<li className="text-left font-bold">Here are some possible reasons why this error occurred:</li>
								<div className="ml-8">
									<li className="text-left list-disc">The URL of your Jenkins Server has changed.</li>
									<li className="text-left list-disc">You don't have an Internet connection.</li>
									<li className="text-left list-disc">The Jenkins Server is temporarily down for maintenance.</li>
									<li className="text-left list-disc">There is a firewall or network issue preventing the connection.</li>
									<li className="text-left list-disc">Your Jenkins credentials are incorrect or have changed.</li>
									<li className="text-left list-disc">There is a problem with your Jenkins plugin or integration.</li>
								</div>
							</ul>
						</div>

						<br />
						If this error persists, please contact the Jarvis Team. For now you can restart the onboarding process and setup a new Jenkins Server.
					</motion.p>
					<button onClick={restartOnboarding} className="button"> Setup new Jenkins </button>
				</div>
			</div>
		</div>
	);
};

export default JenkinsConnectionFailedView;
