import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { router } from "./routes";
import GlobalStyle from "./styles/globalStyles";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
		<GlobalStyle />
		<ToastContainer />
	</React.StrictMode>,
);
