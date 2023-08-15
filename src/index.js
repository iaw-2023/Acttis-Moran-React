import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartProvider";
import { AuthProvider } from "./context/AuthProvider";
import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId="583252685261-2g7kun2i6l3t7503ru189p9pbvk7kb90.apps.googleusercontent.com">
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <Toaster position="bottom-center" reverseOrder={false}></Toaster>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
