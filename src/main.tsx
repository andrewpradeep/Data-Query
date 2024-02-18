import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ConfigProvider } from "antd";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ConfigProvider
            theme={{
                hashed: false,
                components: {
                    Button: {
                        colorPrimary: "#1DB954",
                        algorithm: true,
                    },
                    Input: {
                        colorPrimary: "#1DB954",
                        colorBorder: "#1DB954",
                        algorithm: true,
                    },
                },
            }}
        >
            <App />
        </ConfigProvider>
    </React.StrictMode>
);
