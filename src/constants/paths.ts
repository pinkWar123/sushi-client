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
      invoice: "invoices",
    },
  },
  LOGIN: {
    path: "login",
    outlet: {
      index: "",
    },
  },
  REGISTER: {
    path: "register",
    outlet: {
      index: "",
    },
  },
  PROFILE: {
    path: "profile",
    outlet: {
      index: "",
    },
  },
  WELCOME: {
    path: "welcome",
    outlet: {
      index: "",
    },
  },
  BOOKING: {
    path: "booking",
    outlet: {
      index: "",
    },
  },
};
