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
