import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { initAnalytics } from "./lib/analytics";
import "./i18n";
import "./app.css";
import App from "./App.jsx";

initAnalytics();

createRoot(document.getElementById("root")).render(
  <StrictMode><App /></StrictMode>
);
