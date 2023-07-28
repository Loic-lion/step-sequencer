import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App
      samples={[
        {
          url: "/Hit.wav",
          name: "Hit",
        },
        {
          url: "/Kick.wav",
          name: "Kick",
        },
        {
          url: "/Snare.wav",
          name: "Snare",
        },
        {
          url: "/Rim-click.wav",
          name: "Rim click",
        },
      ]}
      numOfSteps={16}
    />
  </React.StrictMode>
);
