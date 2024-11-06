import { lazy } from "react";
import { PATH } from "../constants/paths";
import DashboardLayout from "../pages/layouts/DashboardLayout/DashboardLayout";

export const PUBLIC_ROUTES = [
  {
    layout: <DashboardLayout />,
    path: PATH.DASHBOARD.path,
    components: [
      {
        path: PATH.DASHBOARD.outlet.index,
        component: lazy(
          () => import("../pages/DashboardPages/Dashboard/DashboardPage")
        ),
      },
      {
        path: PATH.DASHBOARD.outlet.menu,
        component: lazy(
          () => import("../pages/DashboardPages/MenuPage/MenuPage")
        ),
      },
    ],
  },
];

export const PRIVATE_ROUTES = [];
