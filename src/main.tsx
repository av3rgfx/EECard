import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource-variable/manrope";
import App from "./App";
import "./styles.css";
window.addEventListener("keydown", () => {
  document.documentElement.dataset.input = "keyboard";
});
window.addEventListener("pointerdown", () => {
  document.documentElement.dataset.input = "pointer";
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
