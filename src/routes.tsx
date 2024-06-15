/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Routes, TokenKey } from "./constant";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Layout from "./Layout/Layout";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import GetQuote from "./Pages/Quote/GetQuote";
import RequstQuote from "./Pages/Quote/FCLQuote";
import QuoteDashboard from "./Pages/Quote/Quotedashboard";
import ServiceLevel from "./Pages/Quote/AirQuote";
import Lcl from "./Pages/Quote/LCLQuote";

export interface Route {
  index?: boolean;
  path: string;
  element: React.ReactElement;
  name: string;
}
const isToken = () => !!localStorage.getItem(TokenKey);
const LoginElement = isToken() ? (
  <Navigate to="/app/dashboard" replace />
) : (
  <Login />
);
const SigUpElement = isToken() ? (
  <Navigate to="/app/dashboard" replace />
) : (
  <Register />
);

export const routes: Route[] = [
  {
    path: Routes.DASHBOARD,
    element: <Dashboard />,
    name: "Dashboard",
  },
  {
    path: Routes.GET_QUOTE,
    element: <GetQuote />,
    name: "Get Quore",
  },

  {
    path: Routes.QUOTE_DASHBOARD,
    element: <QuoteDashboard />,
    name: "Quote Dashboard",
  },
  {
    path: Routes.Servicelevel,
    element: <ServiceLevel />,
    name: "Service Level",
  },
];
const router = createBrowserRouter([
  {
    path: "/",
    element: LoginElement,
  },
  {
    path: Routes.LOGIN,
    element: LoginElement,
  },
  {
    path: Routes.REGISTER,
    element: SigUpElement,
  },
  isToken()
    ? {
        path: "app/" + Routes.Lcl,
        element: <Lcl />,
      }
    : {},
  isToken()
    ? {
        path: "app/" + Routes.REQ_QUOTE,
        element: <RequstQuote />,
      }
    : {},

  isToken()
    ? {
        path: "/app",
        element: <Layout />,
        children: routes,
      }
    : {},
]);

export default router;
