import { lazy } from "react";
import { PATH } from "../constants/paths";

export const PUBLIC_ROUTES = [
  {
    path: PATH.DASHBOARD,
    component: lazy(() => import("../pages/DashboardPages/DashboardPage")),
  },
];

export const PRIVATE_ROUTES = [];
