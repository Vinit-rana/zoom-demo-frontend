import React, { use } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Meeting from "./meeting";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

let payload = {
  meetingNumber: "79280063213",
  role: 1,
  sdkKey: "vLIhNTnzQN6XwWR6oSdlvA",
  sdkSecret: "N8VqW62RY5iK7DKAAsIJKY0RXXMZLLDL",
  passWord: "5xy5eX",
  leaveUrl: "http://localhost:3000",
  userName: "React",
  userEmail: "",
};

const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/meeting",
    element: <Meeting payload={payload} />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={BrowserRouter} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
