// Entry point for the build script in your package.json
import React from "react";
import "@hotwired/turbo-rails";
import App from "./components/App";
import { createRoot } from "react-dom/client";

document.addEventListener("turbo:load", () => {
    const root = createRoot(
        document.body.appendChild(document.createElement("div"))
    )
    root.render(<App />)
});
