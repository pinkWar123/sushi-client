import { configureStore } from "@reduxjs/toolkit";
import { menu as menuReducer, sections as sectionsReducer } from "./menuSlice";
import { default as employeeReducer } from "./employeeSlice";
import { default as customersReducer } from "./customerSlice";
import { default as reservationsReducer } from "./reservationSlice";
import { MessageInstance } from "antd/es/message/interface";
import { NotificationInstance } from "antd/es/notification/interface";
import { ModalStaticFunctions } from "antd/es/modal/confirm";
import { App } from "antd";
export const store = configureStore({
  reducer: {
    menu: menuReducer,
    employee: employeeReducer,
    sections: sectionsReducer,
    customers: customersReducer,
    reservations: reservationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

let message: MessageInstance;
let notification: NotificationInstance;
let modal: Omit<ModalStaticFunctions, "warn">;

export default () => {
  const staticFunction = App.useApp();
  message = staticFunction.message;
  modal = staticFunction.modal;
  notification = staticFunction.notification;
  return null;
};

export { message, modal, notification };
