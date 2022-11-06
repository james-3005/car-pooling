export const REQUEST_MAPPING = {
  AUTH_V1: "/api/v1/auth",
  PRODUCT: "/api/v1/product",
  CATEGORY: "/api/v1/category",
  COMPANY: "/api/v1/company",
  OWN_PROP: "/api/v1/own-properties",
  PRODUCT_OWN_PROP: "/api/v1/product-own-properties",
  USER: "/api/v1/user",
  ORDER: "/api/v1/order",
};

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
