import { IConfirm, useNotification } from "@/store/notification";
import { REGEX } from "@/utils/constant";

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

export const loading = (value: boolean) => {
  const { turnOnLoading, turnOffLoading } = useNotification();
  if (value) turnOnLoading();
  else turnOffLoading();
};
export const rules = {
  email: (v?: string) => REGEX.EMAIL.test(`${v}`) || "Email không đúng",
  phone: (v?: string) => REGEX.PHONE.test(`${v}`) || "Số điện thoại không đúng",
  username: (v?: string) =>
    REGEX.USERNAME.test(`${v}`) ||
    "Tên đăng nhập không được chứa dấu cách và ký tự đặc biệt",
  required: (v: any) => !!v || "Đây là trường bắt buộc",
  rePassword: (v: string, v2: string) => v === v2 || "Mật khẩu không trùng",
};

export const toLatLng = ({ lat, lng }: { lat: number; lng: number }) =>
  // @ts-ignore
  new google.maps.LatLng(lat, lng);

function debounce(func: Function, timeout = 300) {
  let timer: any;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      //@ts-ignore
      func.apply(this, args);
    }, timeout);
  };
}
