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
