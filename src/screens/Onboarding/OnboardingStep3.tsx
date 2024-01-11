import React, { useEffect } from "react";
import { appWindow, LogicalSize } from "@tauri-apps/api/window";
import icon from "../../assets/brand/ico_bow.svg";

import "./Onboarding.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import macStyle from "@assets/icons/macStyle.png"
import windowsStyle from "@assets/icons/winStyle.png"
import StorageManager from "@/helpers/StorageManager";

const OnboardingStep3: React.FC = () => {
	const navigate = useNavigate();
	const [titlebarStyle, setTitlebarStyle] = React.useState("");

	useEffect(() => {
		const init = async () => {
			// Set screen size to 300px width and 400px height
			const size = new LogicalSize(700, 550);
			appWindow.setSize(size).then(() => appWindow.center());

			const titlebarStyle = await StorageManager.get("titlebarStyle")
			setTitlebarStyle(titlebarStyle || "macStyle")
		}

		init()
	}, []);

	const setTitlebarStyleAndSave = async (style: string) => {
		await StorageManager.save("titlebarStyle", style)
		setTitlebarStyle(style)
	}

	const continueOnboarding = async () => {
		navigate("/onboarding/step_4");
	};

	return (
		<div className="flex flex-col bg-background-view items-center justify-center h-screen select-none">
			<img src={icon} alt="Welcome icon" className="absolute top-8 w-8 h-8" />
			<p className="absolute top-24 font-medium text-xl">Selected Titlebar Style</p>
			<div className="flex flex-row w-[85%] space-x-4">
				<div
					onClick={() => setTitlebarStyleAndSave("macStyle")}
					className={`w-2/3 rounded-xl space-y-2 onboarding-custom-scroll border-border border-2 min-h-[200px] transition hover:bg-background-card-selected ${titlebarStyle === "macStyle" ? "bg-background-card-selected" : ""}`}
					style={{
						backgroundImage: `url(${macStyle})`,
						backgroundSize: "cover",
					}}>
				</div>
				<div
					onClick={() => setTitlebarStyleAndSave("winStyle")}
					className={`w-2/3 rounded-xl space-y-2 onboarding-custom-scroll border-border border-2 min-h-[200px] transition hover:bg-background-card-selected ${titlebarStyle === "winStyle" ? "bg-background-card-selected" : ""}`}
					style={{
						backgroundImage: `url(${windowsStyle})`,
						backgroundSize: "cover",
					}}>
				</div>
			</div>


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
