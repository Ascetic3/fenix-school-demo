import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";
import "./phoenix-global.scss";
import "./components/PhoenixHeroV2.scss";
import "./components/ParentExplore/ParentExplore.scss";
import "./components/StudentHub/StudentHub.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode><App /></StrictMode>,
);
