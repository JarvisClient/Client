export interface SoundSettings {
    soundOn: boolean;
    soundType?: "success" | "error" | "pop" | "info";
}

export interface Props_NotificationContext {
	showNotification: (title: string, message: string, icon: string, config?: SoundSettings) => void;
	showBannerNotification: (title: string, message: string, permanent: boolean) => void; 
	showPopupNotification: (title: string, description: string, buttons: { text: string; onClick: () => void; type: "primary" | "secondary" | "danger" }[]) => void;
	hideNotification: (id: number) => void;
}