"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { ToastContainer } from "react-toastify";
import useRouteLoader from "@/hooks/useRouteLoader";
import "react-toastify/dist/ReactToastify.css";

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <RouteInitializer>{children}</RouteInitializer>
      <ToastContainer position="top-right" autoClose={3000} theme="light" />
    </Provider>
  );
}

function RouteInitializer({ children }) {
  useRouteLoader();
  return children;
}
