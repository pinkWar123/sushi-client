export const PATH = {
  HOME: "/",
  DASHBOARD: {
    path: "/:branchId/dashboard",
    outlet: {
      index: "",
      menu: "menu",
      order: "orders",
      employee: "employee",
      customer: "customers",
    },
  },
  AUTH: {
    path: "auth",
    outlet: {
      login: "login",
    },
  },
};
