import { IConfirm, useNotification } from "@/store/notification";
import { REGEX } from "@/utils/constant";
import moment from "moment";

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
  isGreaterThanPick(pick?: number[], drop?: number[]) {
    if (!pick || !drop) return true;
    if (Math.min(...drop) < Math.max(...pick))
      return "Thời gian trả phải lớn hơn thời gian đón";
    return true;
  },
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

export function reverse([params1, params2]: [number, number]) {
  return [params2, params1];
}

export function toUnix(time: string) {
  return moment(time, "HH:mm").unix();
}

export function unixToTime(time: number) {
  return moment.unix(time).format("HH:mm");
}

export function randomNumberLatLng() {
  const min = 0.0;
  const max = 0.0006;
  return Math.random() * (max - min) + min;
}

export function formattedTime(value: number) {
  const hours = Math.floor(value / 60);
  const minutes = value % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
}

export function removeElementAtIndex(arr: any[], index: number) {
  if (index > -1 && index < arr.length) {
    return [...arr.slice(0, index), ...arr.slice(index + 1)];
  }
  return null;
}
