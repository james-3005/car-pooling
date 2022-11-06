import {
  IConfirm,
  INotiNoValue,
  useNotification,
} from "@/store/module/notification";

export const confirm = (confirm: Omit<IConfirm, "value">): void => {
  const { setConfirm } = useNotification();
  setConfirm(confirm);
};
const initialAlert =
  (color: "success" | "warning" | "error" | "info") =>
  (message: string, timeout?: number): void => {
    const { setNotification } = useNotification();
    setNotification({ message, timeout, color });
  };
export const alert = {
  success: initialAlert("success"),
  warning: initialAlert("warning"),
  error: initialAlert("error"),
  info: initialAlert("info"),
};
