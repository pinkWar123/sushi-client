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
      {
        path: PATH.DASHBOARD.outlet.employee,
        component: lazy(
          () => import("../pages/DashboardPages/EmployeePage/EmployeePage")
        ),
      },
      {
        path: PATH.DASHBOARD.outlet.customer,
        component: lazy(
          () => import("../pages/DashboardPages/CustomerPage/CustomerPage")
        ),
      },
      {
        path: PATH.DASHBOARD.outlet.invoice,
        component: lazy(
          () => import("../pages/DashboardPages/InvoicePage/InvoicesPage")
        ),
      },
    ],
  },
  {
    path: PATH.LOGIN.path,
    components: [
      {
        path: PATH.LOGIN.outlet.index,
        component: lazy(() => import("../pages/Login/Login")),
      },
    ],
  },
  {
    path: PATH.REGISTER.path,
    components: [
      {
        path: PATH.REGISTER.outlet.index,
        component: lazy(() => import("../pages/Register/Register")),
      },
    ],
  },
  {
    path: PATH.WELCOME.path,
    components: [
      {
        path: PATH.WELCOME.outlet.index,
        component: lazy(
          () => import("../pages/ClientPages/ClientDashboard/Dashboard")
        ),
      },
      {
        path: PATH.DASHBOARD.outlet.invoice,
        component: lazy(
          () => import("../pages/DashboardPages/InvoicePage/InvoicesPage")
        ),
      },
    ],
  },
  {
    path: PATH.PROFILE.path,
    components: [
      {
        path: PATH.PROFILE.outlet.index,
        component: lazy(
          () => import("../pages/ClientPages/ProfilePage/ProfilePage")
        ),
      },
    ],
  },
  {
    path: PATH.BOOKING.path,
    components: [
      {
        path: PATH.BOOKING.outlet.index,
        component: lazy(() => import("../pages/ClientPages/BookingPage")),
      },
    ],
  },
];

export const PRIVATE_ROUTES = [];
