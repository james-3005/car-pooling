export const API_END_POINT =
  "https://maps.googleapis.com/maps/api/geocode/json";
export const API_KEY = "AIzaSyCYULRyn6iCOxuol1nGWQQWyfgJ_SPsqJ4";
export const BASE_URL = "http://45.32.102.194:4000";
export const SOCKET_URL = "";
export const REGEX = {
  USERNAME: /^[a-zA-Z0-9]+$/,
  EMAIL: /^\w+([.-]?\w+)[+\d]*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  PHONE: /^[0-9-()]*$/,
  NUMBER: /^[0-9]*$/,
};

export const TYPE_USERS = [
  {
    label: "Khách hàng",
    value: false,
  },
  {
    label: "Taxi",
    value: true,
  },
];

export const BOOKING_TYPE = [
  {
    text: "Đặt ngay",
    value: 1,
  },
  {
    text: "Định kỳ",
    value: 2,
  },
];
export const REPEAT_DAY = [
  {
    text: "Thứ 2",
    value: 1,
  },
  {
    text: "Thứ 3",
    value: 2,
  },
  {
    text: "Thứ 4",
    value: 3,
  },
  {
    text: "Thứ 5",
    value: 4,
  },
  {
    text: "Thứ 6",
    value: 5,
  },
  {
    text: "Thứ 7",
    value: 6,
  },
  {
    text: "Chủ nhật",
    value: 7,
  },
];
export const GENDER_ITEMS = [
  {
    text: "Nam",
    value: 1,
  },
  {
    text: "Nữ",
    value: 2,
  },
];
