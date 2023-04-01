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
  email: (v?: string) => REGEX.EMAIL.test(`${v}`) || "Email not correct",
  phone: (v?: string) => REGEX.PHONE.test(`${v}`) || "Phone number not correct",
  username: (v?: string) =>
    REGEX.USERNAME.test(`${v}`) || "Username cannot include special characters",
  required: (v: any) => !!v || "This is a required field",
  rePassword: (v: string, v2: string) => v === v2 || "Password doesn't match",
  isGreaterThanPick(pick?: number[], drop?: number[]) {
    if (!pick || !drop) return true;
    if (drop < pick) return "Drop off time must be larger than pick up time";
    return true;
  },
  plate(value: string) {
    return isValidLicensePlate(value) || "Invalid License plate";
  },
};

function isValidLicensePlate(plate: string): boolean {
  const pattern = /^[A-Z0-9-]{5,10}$/;
  const strippedPlate = plate.replace(/[\s.]/g, "").toUpperCase();
  return pattern.test(strippedPlate);
}
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

interface IResponse {
  time_point_id: number;
}

export function groupSequentialNumbers(input: IResponse[]): IResponse[][] {
  const sortedInput = input.sort((a, b) => a.time_point_id - b.time_point_id);
  const result: IResponse[][] = [];

  let currentSequence: IResponse[] = [];
  for (let i = 0; i < sortedInput.length; i++) {
    const currentNumber = sortedInput[i].time_point_id;
    const previousNumber = i > 0 ? sortedInput[i - 1].time_point_id : null;

    if (previousNumber === null || currentNumber === previousNumber + 1) {
      // The current number is part of the current sequence
      currentSequence.push(sortedInput[i]);
    } else {
      // The current number is not part of the current sequence
      result.push(currentSequence);
      currentSequence = [sortedInput[i]];
    }
  }

  if (currentSequence.length > 0) {
    // Add the last sequence to the result
    result.push(currentSequence);
  }

  return result;
}

export function timeToMinutes(timeStr: string) {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
}
export function unixToMinutes(unixTimestamp: number) {
  const time = unixToTime(unixTimestamp);
  return timeToMinutes(time);
}

export function formatCurrency(number: string | number) {
  if (!number) return 0;
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  // @ts-ignore
  return formatter.format(number);
}
