export const API_END_POINT = "https://maps.googleapis.com/maps/api/geocode/json";
export const API_KEY = "AIzaSyBkASaDd9yj5U4OR_fmS882IEmRSpjT6sQ";

export const REGEX = {
  EMAIL: /^\w+([.-]?\w+)[+\d]*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  PHONE: /^[0-9-()]*$/,
  NUMBER: /^[0-9]*$/,
  HTML: /<(\/?)\w+((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[\^'">\s]+))?)+\s*|\s*)\/?>/,
  SPECIAL_CHARACTERS: /^[a-zA-Z0-9_]+([._]?[a-zA-Z0-9_]+)*$/,
  KATAKANA: /^([a-zA-Z0-9ァ-ン 　$&+,:;=?@#\|'<>.\-_^*()%!~\\\/`]|ー)+$/,
  HIRAGANA: /^[a-zA-Z0-9ぁ-ん 　$&+,:;=?@#\|'<>.\-_^*()%!~\\\/`]+$/,
  DECIMAL_NUMBER_INS: /^\d{1,5}(\.\d{0,2})?$/,
  NEGATIVE_DECIMAL: /^[-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
  NOT_NEGETIVE_INTEGER: /^\d*[1-9]\d*$/,
};

export const TYPE_USERS = [
  {
    label: "Khách hàng",
    value: 1,
  },
  {
    label: "Taxi",
    value: 2,
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