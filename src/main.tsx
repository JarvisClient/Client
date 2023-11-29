import React from "react";
import ReactDOM from "react-dom/client";
import App from './screens/App/App';
import "./styles.css";

import 'tailwindcss/tailwind.css';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);