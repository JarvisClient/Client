import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./screens/App/App";
import JarvisMain from "./screens/Jarvis/JarvisMain";
import "./styles.css";

import "tailwindcss/tailwind.css";
import { NotificationProvider } from "./components/NotificationManager/NotificationContext";
import OnboardingMain from "./screens/Onboarding/OnboardingMain";

import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import OnboardingComplete from "./screens/Onboarding/OnboardingComplete";

function AppContainer() {
  return (
    <React.StrictMode>
        <NotificationProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App/>} />
			<Route path="/jarvis" element={<JarvisMain />} />
            <Route path="/onboarding" element={<OnboardingMain />} />
            <Route path="/onboarding/complete" element={<OnboardingComplete />} />
          </Routes>
    </BrowserRouter>
        </NotificationProvider>
      </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<AppContainer />);
