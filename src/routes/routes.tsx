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
          () => import("../pages/DashboardPages/DashboardPage/DashboardPage")
        ),
      },
      {
        path: PATH.DASHBOARD.outlet.menu,
        component: lazy(
          () => import("../pages/DashboardPages/MenuPage/MenuPage")
        ),
      },
      {
        path: PATH.DASHBOARD.outlet.order,
        component: lazy(
          () => import("../pages/DashboardPages/OrderPage/OrderPage")
        ),
      },
    ],
  },
];

export const PRIVATE_ROUTES = [];
