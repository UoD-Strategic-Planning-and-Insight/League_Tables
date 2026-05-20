import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "../league-table-strategy.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
