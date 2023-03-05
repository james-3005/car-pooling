export const GEOCODE_URL = "https://maps.googleapis.com/maps/api/geocode/json";
export const AUTO_COMPLETE_URL = `https://maps.googleapis.com/maps/api/place/autocomplete/json`;
export const API_KEY = "AIzaSyCm4dKU1CA6ezOeoCGUuoj833RoRglEtZw";
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

export const mock_res = {
  taxi_id: 1,
  location: [105.7993666, 21.0231176],
  schedule: {
    nodes: [
      { p: [105.7993666, 21.0231176], eta: "1:30 AM" },
      { p: [105.8026392, 21.0318237], eta: "2:30 AM" },
    ],
  },
};

export const itemColor = [
  { cap: 1, color: "#F2CD5C" },
  { cap: 2, color: "#609EA2" },
  { cap: 3, color: "#C92C6D" },
  {
    cap: 4,
    color: "#62CD5C",
  },
];
export const HEADER_CLUSTER_SMALL = [
  {
    text: "STT",
    value: "index",
    sortable: false,
    width: 20,
  },
  {
    text: "Nguời dùng",
    value: "name",
    sortable: false,
  },
  { text: "Số điện thoại", value: "phone", sortable: false },
  { text: " ", value: "action" },
];
export const bookingTypeItems = [
  {
    text: "Đặt cá nhân",
    value: 1,
  },
  { text: "Đặt theo nhóm", value: 2 },
  { text: "Giao hàng", value: 3 },
];

export const capacityItems = [
  { text: "1 Chỗ", value: 1 },
  { text: "2 Chỗ", value: 2 },
  { text: "3 Chỗ", value: 3 },
  { text: "4 Chỗ", value: 4 },
];

export enum FilterEnum {
  ALL,
  Taxi,
  Schedule,
}

export const filterOptions = [
  { text: "Hiển thị tất cả", value: FilterEnum.ALL },
  { text: "Hiển thị chỉ taxi", value: FilterEnum.Taxi },
  { text: "Hiển thị chỉ lịch trinh", value: FilterEnum.Schedule },
];

export const POI = [
  { text: "Tòa nhà IDMC Mỹ Đình 2", value: "IDMC_TTT" },
  { text: "Trường Đại học Công nghệ, Đại học Quốc gia Hà Nội", value: "UET" },
  { text: "Trường Đại học Ngoại thương", value: "FTU" },
  { text: "Học viện Kỹ thuật Quân sự", value: "MTA" },
  {
    text: "Học viện Công nghệ Bưu chính Viễn thông",
    value: "PTIT",
  },
  {
    text: "Học viện Báo chí và Tuyên truyền",
    value: "AJC",
  },
  {
    text: "Trường Đại học Tài chính - Ngân hàng",
    value: "FBU",
  },
  {
    text: "Greenwich Việt Nam",
    value: "Greenwich",
  },
  {
    text: "Tòa nhà FPT Phạm Văn Bạch",
    value: "FPT_PVB",
  },
  {
    text: "Tòa nhà FPT Duy Tân",
    value: "FPT_DT",
  },
  {
    text: "Bamboo Airways",
    value: "BambooAirways",
  },
  {
    text: "Tòa nhà Sông Đà",
    value: "SongDaTower",
  },
  {
    text: "The Matrix One",
    value: "TheMatrixOne",
  },
];

export const formCreateRideRequest = {
  userId: null,
  wp: ["", ""],
  wd: ["", ""],
  start: "",
  destination: "",
};

export const formCreateTaxi = {
  position: null,
  name: "",
  positionName: "",
};

export const formCreateRequestUser = {
  wp: ["", ""],
  wd: ["", ""],
  start: "",
  startName: "",
  destination: "",
  destinationName: "",
};

export const COLOR_PALETTE = [
  "#EB455F",
  "#FFB84C",
  "#4E6C50",
  "#3A98B9",
  "#473C33",
];
