import React from "react";
import ReactDOM from "react-dom/client";
import App from "./screens/App/App";
import "./styles.css";

import "tailwindcss/tailwind.css";
import { NotificationProvider } from "./components/NotificationManager/NotificationContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<NotificationProvider>
			<App />
		</NotificationProvider>
	</React.StrictMode>,
);
