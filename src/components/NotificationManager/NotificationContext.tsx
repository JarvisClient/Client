import React, {
	createContext, useContext, ReactNode, useState,
} from "react";
import { motion } from "framer-motion";
import FeatureButtons from "../../config/FeatureButtons";
import { BannerNotificcation, Notification } from "../../Interfaces/INotification";

import { NOTIFICATION_CLOSE_TIME } from "../../config/constants";
import Logger from "../../helpers/Logger";

import "./Buttons.css";

// Audio
import notification_info from "../../assets/sounds/notification_info.mp3";
import notification_pop from "../../assets/sounds/notification_pop.mp3";
import notification_success from "../../assets/sounds/notification_success.mp3";
import notification_error from "../../assets/sounds/notification_error.mp3";
import { IcoCross, IcoError, IcoQuestionmark } from "@/Icons/pack_1";
import { Props_NotificationContext, SoundSettings } from "@/Interfaces/IProps_NotificationContext";

/**
 * NotificationContext
 */
const notificationSounds = {
	info: new Audio(notification_info),
	pop: new Audio(notification_pop),
	success: new Audio(notification_success),
	error: new Audio(notification_error),
};

const NotificationContext = createContext<Props_NotificationContext | undefined>(undefined);

/**
 * 
 * @param soundType The type of sound to play
 */
export function playAudio(soundType: "success" | "error" | "pop" | "info") {
	if (soundType === "success") notificationSounds.success.play();
	else if (soundType === "error") notificationSounds.error.play();
	else if (soundType === "info") notificationSounds.info.play();
	else if (soundType === "pop") notificationSounds.pop.play();
}

/**
 * 
 * @returns The NotificationContext
 * @example 
 * const notification = useNotification();
 * 
 * notification.showNotification("Title", "Message", "success", { soundOn: true, soundType: "pop" });
 * notification.showBannerNotification("Title", "Message", true);
 * notification.showPopupNotification("Title", "Description", [{ text: "Button", onClick: () => { }, type: "primary" }]);
 */
export function useNotification() {
	try {
		const context = useContext(NotificationContext);
		if (!context) {
			throw new Error("useNotification must be used within a NotificationProvider");
		}
		return context;
	} catch (error) {
		Logger.error("NotificationContext.tsx", "Error using notification:", error);
		return { showNotification: () => { }, showBannerNotification: () => { }, showPopupNotification: () => { }, hideNotification: () => { } };
	}
}

let notificationIdCounter = 0;

interface Props_NotificationProvider {
	children: ReactNode;
}

interface PopupNotification {
	title: string;
	description: string;
	buttons: {
		text: string;
		onClick: () => void;
		type: "primary" | "secondary" | "danger";
	}[];
}

/**
 * 
 * @param param0 The children of the NotificationProvider
 * @returns The NotificationProvider
 * @example <NotificationProvider>...</NotificationProvider>
 * @example <NotificationProvider><App /></NotificationProvider>
 */
export const NotificationProvider: React.FC<Props_NotificationProvider> = ({ children }) => {
	const [notifications, setNotifications] = useState<Notification[]>([]);
	const [bannerNotification, setBannerNotification] = useState<BannerNotificcation | null>(null);
	const [popupNotification, setPopupNotification] = useState<PopupNotification | null>(null);

	/**
	 * 
	 * @param title The title of the notification
	 * @param message The message of the notification
	 * @param icon The icon of the notification
	 * @param config The config of the notification sound
	 * @example showNotification("Title", "Message", "success", { soundOn: true, soundType: "pop" });
	 */
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

	/**
	 * 
	 * @param title The title of the notification
	 * @param message The message of the notification
	 * @note This function is used when the NotificationProvider is not rendered
	 * @example showNotificationAsAlert("Title", "Message");
	 */
	const showNotificationAsAlert = (title: string, message: string) => {
		alert(`${title}\n\n${message}`);
	};

	/**
	 * 
	 * @param title The title of the notification
	 * @param message The message of the notification
	 * @param permanent If the notification should have a close button. 
	 * @example showBannerNotification("Title", "Message", true);
	 */
	const showBannerNotification = (title: string, message: string, permanent: boolean = false) => {
		const newNotification: BannerNotificcation = {
			id: notificationIdCounter++,
			title,
			message,
			permanent: permanent,
		};

		setBannerNotification(newNotification);
	};

	/**
	 * 
	 * @param title The title of the notification
	 * @param description The description of the notification
	 * @param buttons Array of Objects containing the text, onClick function and type of the button
	 */
	const showPopupNotification = (title: string, description: string, buttons: { text: string; onClick: () => void; type: "primary" | "secondary" | "danger" }[]) => {
		const newNotification: PopupNotification = {
			title,
			description,
			buttons,
		};

		setPopupNotification(newNotification);
	};

	/**
	 * 
	 * @param id The id of the notification to hide
	 */
	const hideNotification = (id: number) => {
		setNotifications((prevNotifications) => prevNotifications.filter((n) => n.id !== id));
	};

	return (
		<NotificationContext.Provider value={{ showNotification, showBannerNotification, showPopupNotification, hideNotification }}>
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
					<p><b>{bannerNotification.title}</b> {String(bannerNotification.message)}</p>
					{!bannerNotification.permanent && (
						<span
							className="mx-8"
							onClick={() => setBannerNotification(null)}>
							<IcoCross className="hover:scale-[1.1] active:scale-[0.95] transition cursor-pointer" />
						</span>
					)}
				</motion.div>
			)}

			{popupNotification && (
				<>
					<motion.div
						className="fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-80 flex items-center justify-center"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setPopupNotification(null)}
					>
						<motion.div
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							className="bg-background-sidebar p-4 rounded-md w-[500px] min-h-[200px] flex flex-col justify-between"
						>
							{/* Text Section */}
							<div className="pt-4 px-4 grid grid-cols-[48px_auto] gap-4">
								{/* if buttons contain danger type, show danger icon if not show icosuccess */}
								{popupNotification.buttons.some((button) => button.type === "danger") ? (
									<div className="h-[48px] w-[48px] flex justify-center items-center bg-red-500 bg-opacity-30 rounded-full">
										<IcoError size={30} color="#f22c3d"/>
									</div>
								) : (
									<div className="h-[48px] w-[48px] flex justify-center items-center bg-gray-500 bg-opacity-30 rounded-full">
										<IcoQuestionmark size={30}/>
									</div>
								)}
								<div className="w-auto">
									<p className="font-bold text-xl word-break">{popupNotification.title}</p>
									<p className="text-md word-break">{popupNotification.description}</p>
								</div>
							</div>
							{/* Button Section */}
							<div className="flex justify-end space-x-4">
								{popupNotification.buttons.map((button, index) => (
									<button
										key={index}
										className={button.type === "primary" ? "popup-btn-primary" : button.type === "secondary" ? "popup-btn-secondary" : "popup-btn-danger"}
										onClick={() => {
											button.onClick();
											setPopupNotification(null);
										}}
									>
										{button.text}
									</button>
								))}
							</div>
						</motion.div>
					</motion.div>

				</>
			)}
			{children}
		</NotificationContext.Provider>
	);
};
