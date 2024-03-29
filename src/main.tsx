import React from "react";
import ReactDOM from "react-dom/client";
import App from "./screens/App/App";
import JarvisMain from "./screens/Jarvis/JarvisMain";
import "./styles.css";

import "tailwindcss/tailwind.css";
import { NotificationProvider } from "./components/NotificationManager/NotificationContext";
import OnboardingMain from "./screens/Onboarding/OnboardingMain";

import {
	BrowserRouter, Route, Routes
} from "react-router-dom";
import OnboardingComplete from "./screens/Onboarding/OnboardingComplete";
import OnboardingStep1 from "./screens/Onboarding/OnboardingStep1";
import OnboardingStep2 from "./screens/Onboarding/OnboardingStep2";
import OnboardingStep3 from "./screens/Onboarding/OnboardingStep3";
import ErrorBoundary from "./screens/ErrorBoundary/ErrorBoundary"; // Import the ErrorBoundary component
import CauseError from "./screens/ErrorBoundary/CauseError";
import UpdateAvailable from "./screens/App/updateChecker/UpdateAvailable";
import JenkinsConnectionFailedView from "./screens/App/JenkinsConnectionChecker/JenkinsConnectionFailedView";
import FullConsoleLog from "./screens/Jarvis/Views/ConsoleView/FullConsoleLogView";
import OnboardingStep4 from "./screens/Onboarding/OnboardingStep4";

function AppContainer() {
	return (
		<React.StrictMode>
			<NotificationProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<App />} />
						<Route path="/jarvis" element={<JarvisMain />} />
						<Route path="/onboarding" element={<OnboardingMain />} />
						<Route path="/onboarding/step_1" element={<OnboardingStep1 />} />
						<Route path="/onboarding/step_2" element={<OnboardingStep2 />} />
						<Route path="/onboarding/step_3" element={<OnboardingStep3 />} />
						<Route path="/onboarding/step_4" element={<OnboardingStep4 />} />
						<Route path="/onboarding/complete" element={<OnboardingComplete />} />
						<Route path="/updateAvailable" element={<UpdateAvailable />} />
						<Route path="/jenkinsUnavailable" element={<JenkinsConnectionFailedView />} />
						<Route path="/cause-error" element={<CauseError />} />
						<Route path="/fullLog" element={<FullConsoleLog />} />
					</Routes>
				</BrowserRouter>
			</NotificationProvider>
		</React.StrictMode>
	);
}

// Wrap AppContainer with ErrorBoundary
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<ErrorBoundary>
		<AppContainer />
	</ErrorBoundary>,
);
