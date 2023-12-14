import React, { createContext, useContext, ReactNode, useState } from "react";
import FeatureButtons, { FeatureButtonProps } from "../../config/FeatureButtons";

import notifcationSoundAsset from "../../assets/sounds/notification.ogg";
import { motion } from "framer-motion";
import { NOTIFICATION_CLOSE_TIME } from "../../config/constants";
import Logger from "../../helpers/Logger";
const notificationSound = new Audio(notifcationSoundAsset);

interface Notification {
  id: number;
  title: string;
  message: string;
  featureButtonData: FeatureButtonProps;
  variant: string; // Add the "variant" property
}

interface NotificationContextType {
  showNotification: (title: string, message: string, icon: string) => void;
  hideNotification: (id: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function useNotification() {
	try {
		const context = useContext(NotificationContext);
		if (!context) {
			throw new Error("useNotification must be used within a NotificationProvider");
		}
		return context;
	} catch (error) {
		Logger.error("Error using notification:", error);
		return { showNotification: () => {}, hideNotification: () => {}};
	}
}

let notificationIdCounter = 0;

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
	const [notifications, setNotifications] = useState<Notification[]>([]);

	const showNotification = (title: string, message: string, icon: string) => {

		if (!children) return showNotificationAsAlert(title, message, icon);

		const id = notificationIdCounter++;
		const featureButtonData = FeatureButtons[icon];

		const newNotification: Notification = { id, title, message, featureButtonData, variant: "visible" }; // Initialize variant as 'visible'
		notificationSound.play();

		setNotifications((prevNotifications) => [...prevNotifications, newNotification]);

		// Automatically hide the notification after 5 seconds
		setTimeout(() => {
			hideNotification(id);
		}, NOTIFICATION_CLOSE_TIME);
	};

	const showNotificationAsAlert = (title: string, message: string, icon: string) => {
		const featureButtonData = FeatureButtons[icon];
		alert(title + "\n\n" + message);
	};

	const hideNotification = (id: number) => {
		setNotifications((prevNotifications) => prevNotifications.filter((n) => n.id !== id));
	};

	return (
		<NotificationContext.Provider value={{ showNotification, hideNotification }}>
			<div className='absolute bottom-[30px] right-[30px] space-y-2 w-[300px] z-50'>
				{notifications.map((notification) => (
					<motion.div
						id="toast-interactive"
						className={"w-full max-w-lg p-4 rounded-lg shadow bg-background-sidebar text-gray-400 opacity-0 transition-opacity duration-300"}
						initial={{ opacity: 0, y: 50, scale: 0.3 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						onClick={hideNotification.bind(null, notification.id)}
					>
						<div className="flex">
							<div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg bg-[${notification.featureButtonData.bg_color}]`}>
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
			{children}
		</NotificationContext.Provider>
	);
};
