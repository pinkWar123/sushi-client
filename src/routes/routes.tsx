import { lazy } from "react";
import { PATH } from "../constants/paths";
import DashboardLayout from "../pages/layouts/DashboardLayout/DashboardLayout";

export const PUBLIC_ROUTES = [
  {
    layout: <DashboardLayout />,
    path: PATH.DASHBOARD,
    components: [
      {
        path: "",
        component: lazy(
          () => import("../pages/DashboardPages/Dashboard/DashboardPage")
        ),
      },
    ],
  },
];

export const PRIVATE_ROUTES = [];
