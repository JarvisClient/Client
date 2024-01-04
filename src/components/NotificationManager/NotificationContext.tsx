import React, {
	createContext, useContext, ReactNode, useState,
} from "react";
import { motion } from "framer-motion";
import FeatureButtons from "../../config/FeatureButtons";
import { BannerNotificcation, Notification } from "../../Interfaces/INotification";

import { NOTIFICATION_CLOSE_TIME } from "../../config/constants";
import Logger from "../../helpers/Logger";

// Audio
import notification_info from "../../assets/sounds/notification_info.mp3";
import notification_pop from "../../assets/sounds/notification_pop.mp3";
import notification_success from "../../assets/sounds/notification_success.mp3";
import notification_error from "../../assets/sounds/notification_error.mp3";
import { IcoCross } from "@/Icons/pack_1";
import { Props_NotificationContext, SoundSettings } from "@/Interfaces/IProps_NotificationContext";


const notificationSounds = {
	info: new Audio(notification_info),
	pop: new Audio(notification_pop),
	success: new Audio(notification_success),
	error: new Audio(notification_error),
};




const NotificationContext = createContext<Props_NotificationContext | undefined>(undefined);

export function playAudio(soundType: "success" | "error" | "pop" | "info") {
	if (soundType === "success") notificationSounds.success.play();
	else if (soundType === "error") notificationSounds.error.play();
	else if (soundType === "info") notificationSounds.info.play();
	else if (soundType === "pop") notificationSounds.pop.play();
}

export function useNotification() {
	try {
		const context = useContext(NotificationContext);
		if (!context) {
			throw new Error("useNotification must be used within a NotificationProvider");
		}
		return context;
	} catch (error) {
		Logger.error("Error using notification:", error);
		return { showNotification: () => { }, showBannerNotification: () => { }, hideNotification: () => { } };
	}
}

let notificationIdCounter = 0;

interface Props_NotificationProvider {
	children: ReactNode;
}



export const NotificationProvider: React.FC<Props_NotificationProvider> = ({ children }) => {
	const [notifications, setNotifications] = useState<Notification[]>([]);
	const [bannerNotification, setBannerNotification] = useState<BannerNotificcation | null>(null);

	const showNotification = (title: string, message: string, icon: string, config: SoundSettings = {
		soundOn: true,
		soundType: "pop",
	}) => {
		if (!children) return showNotificationAsAlert(title, message);

		const id = notificationIdCounter++;
		const featureButtonData = FeatureButtons[icon];

		const newNotification: Notification = {
			id, title, message, featureButtonData, variant: "visible",
		}; // Initialize variant as 'visible'

		if (config.soundOn) playAudio(config.soundType || "pop");

		setNotifications((prevNotifications) => [...prevNotifications, newNotification]);

		// Automatically hide the notification after 5 seconds
		setTimeout(() => {
			hideNotification(id);
		}, NOTIFICATION_CLOSE_TIME);
	};

	const showNotificationAsAlert = (title: string, message: string) => {
		alert(`${title}\n\n${message}`);
	};

	const showBannerNotification = (title: string, message: string, permanent?: boolean) => {
		const newNotification: BannerNotificcation = {
			id: notificationIdCounter++,
			title,
			message,
			permanent: permanent || false,
		};

		setBannerNotification(newNotification);
	};

	const hideNotification = (id: number) => {
		setNotifications((prevNotifications) => prevNotifications.filter((n) => n.id !== id));
	};

	return (
		<NotificationContext.Provider value={{ showNotification, showBannerNotification, hideNotification }}>
			<div className="absolute bottom-[30px] right-[30px] space-y-2 w-[300px] z-50 select-none cursor-pointer">
				{notifications.map((notification) => (
					<motion.div
						id="toast-interactive"
						key={notification.id}
						className="w-full max-w-lg p-4 rounded-lg shadow bg-background-sidebar text-gray-400 opacity-0 transition-opacity duration-300"
						initial={{ opacity: 0, y: 50, scale: 0.3 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						onClick={hideNotification.bind(null, notification.id)}
					>
						<div className="flex">
							<div
								style={{ backgroundColor: notification.featureButtonData.bg_color }}
								className={"inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg"}>
								{React.createElement(notification.featureButtonData.icon, { className: "w-5 h-5", color: notification.featureButtonData.icon_color })}
							</div>
							<div className="ms-3 text-sm font-normal">
								<span className="mb-1 text-sm font-semibold text-white">{notification.title}</span>
								<div className="text-sm font-normal">
									{notification.message.split("\n").map((line, index) => (
										<React.Fragment key={index}>
											{line}
											{index !== notification.message.split("\n").length - 1 && <br />}
										</React.Fragment>
									))}
								</div>
							</div>
						</div>
					</motion.div>
				))}
			</div>
			{bannerNotification && (
				<motion.div 
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					className="bg-jenkins-job-red absolute bottom-0 left-0 w-screen min-h-[50px] z-50 flex flex-row items-center justify-between p-4 select-none">
					<p><b>{bannerNotification.title}</b> {bannerNotification.message}</p>
					{bannerNotification.permanent ?? 
					<span 
						className="mx-8"
						onClick={() => setBannerNotification(null)}>
						<IcoCross className="hover:scale-[1.1] active:scale-[0.95] transition cursor-pointer" />
					</span>
					}
				</motion.div>
			)}
			{children}
		</NotificationContext.Provider>
	);
};
