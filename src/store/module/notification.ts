// import {
//   SET_NOTIFICATION,
//   SET_LOADING,
//   SET_CONFIRM,
//   TURNOFF_CONFIRM,
// } from "../mutations.type";
//
// export const state = {
//   notification: {
//     showing: false,
//     color: "success",
//     message: "",
//     timeout: 5000,
//   },
//   loading: {
//     status: false,
//     circular: true,
//   },
//   confirm: {
//     value: false,
//     checkAction: () => {},
//     cancelAction: () => {},
//     title: null,
//     content: null,
//     width: null,
//   },
// };
//
// const mutations = {
//   [SET_NOTIFICATION](state: any, snackbar: any) {
//     state.notification.showing = true;
//     state.notification.color = snackbar.color;
//     state.notification.message = snackbar.message;
//     if (typeof snackbar.timeout == "undefined" || snackbar.timeout == null) {
//       state.notification.timeout = 5000;
//     } else {
//       state.notification.timeout = snackbar.timeout;
//     }
//   },
//   [SET_LOADING](state: any, [status, circular]: [boolean, boolean]) {
//     state.loading.status = status;
//     state.loading.circular = circular;
//   },
//   [SET_CONFIRM](state: any, value: any) {
//     state.confirm = { ...value, value: true };
//   },
//   [TURNOFF_CONFIRM](state: any) {
//     state.confirm = {
//       value: false,
//       checkAction: () => {},
//       cancelAction: () => {},
//       title: null,
//       content: null,
//     };
//   },
// };
//
// const getters = {
//   notification(state: any) {
//     return state.notification;
//   },
//   loading(state: any) {
//     return state.loading;
//   },
//   confirm(state: any) {
//     return state.confirm;
//   },
// };
//
// export default {
//   state,
//   mutations,
//   getters,
// };

import { defineStore } from "pinia";

export interface IConfirm {
  value: boolean;
  checkAction: () => void;
  cancelAction?: () => void;
  title?: string;
  content: string;
}

export interface INoti {
  showing: boolean;
  color: "success" | "error" | "info" | "warning";
  message: string;
  timeout?: number;
}

export type IConfirmNoValue = Omit<IConfirm, "value">;

const defaultConfirm: IConfirm = {
  value: false,
  checkAction: () => {},
  cancelAction: () => {},
  title: "",
  content: "",
};
const defaultNoti: INoti = {
  showing: false,
  color: "success",
  message: "",
  timeout: 5000,
};
export type INotiNoValue = Omit<INoti, "showing">;
export const useNotification = defineStore("notification", {
  state: () => ({
    confirm: defaultConfirm,
    notification: defaultNoti,
  }),
  actions: {
    setConfirm(state: Omit<IConfirm, "value">) {
      this.confirm = {
        ...state,
        value: true,
      };
    },
    turnOffConfirm() {
      this.confirm = {
        ...defaultConfirm,
      };
    },
    setNotification(state: INotiNoValue) {
      this.notification = {
        ...state,
        showing: true,
      };
    },
  },
});
