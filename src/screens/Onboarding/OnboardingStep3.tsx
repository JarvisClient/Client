import React, { useEffect } from "react";
import { appWindow, LogicalSize } from "@tauri-apps/api/window";
import icon from "../../assets/brand/ico_bow.svg";

import "./Onboarding.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const OnboardingStep3: React.FC = () => {
	const navigate = useNavigate();

	useEffect(() => {
		// Set screen size to 300px width and 400px height
		const size = new LogicalSize(700, 550);
		appWindow.setSize(size).then(() => appWindow.center());
	}, []);

	const continueOnboarding = async () => {
		navigate("/onboarding/complete");
	};

	return (
		<div className="flex flex-col bg-background-view items-center justify-center h-screen select-none">
			<img src={icon} alt="Welcome icon" className="absolute top-8 w-8 h-8" />

			<motion.iframe
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5, delay: 0.5 }}
				width="560"
				height="315"
				src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=ecyt2CWMagU1EQDn"
				title="YouTube video player"
				allow="autoplay"
			/>

			<motion.button
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5, delay: 1 }}
				className="button absolute bottom-[35px]"
				onClick={() => continueOnboarding()}
				onKeyPress={(e) => {
					if (e.key === "Enter") {
						continueOnboarding();
					}
				}}
			>
    Continue
			</motion.button>
		</div>
	);
};

export default OnboardingStep3;
