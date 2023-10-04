

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// Monitora Caju React Context Provider
import { MaterialUIControllerProvider } from "context";

const container = document.getElementById("app");
const root = createRoot(container);
import { AuthProvider } from "./AuthContext";

root.render(
  <BrowserRouter>
  
    <MaterialUIControllerProvider>
      <AuthProvider>
      <App />
      </AuthProvider>
    </MaterialUIControllerProvider>
  </BrowserRouter>
);
