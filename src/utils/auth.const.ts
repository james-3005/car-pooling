export const ROLE_ENUMS = {
  ADMIN: {
    ROLE_ID: 1,
    ROLE_NAME: "ADMIN",
    ROLE_CODE: "ADMIN",
  },

};

export const SCREEN = {
  LOGIN: {
    NAME: "Login",
    PATH: "/login",
  },
  RESET_PASS: {
    NAME: "ResetPassword",
    PATH: "/reset-password",
  },
  SEND_MAIL: {
    NAME: "SendMail",
    PATH: "/login/send-mail",
  },
  HOME: {
    NAME: "Home",
    PATH: "/",
  },
  ERR403: {
    NAME: "Error403",
    PATH: "/403",
  },
  ERR404: {
    NAME: "Error404",
    PATH: "*",
  },
};

export const MENU_HOME = [
  {
    icon: "mdi-content-paste",
    title: "Screen 1",
    path: '/screen1',
    authorities: [
      ROLE_ENUMS.ADMIN.ROLE_CODE,
    ],
  },
  {
    icon: "mdi-bullseye-arrow",
    title: "Screen 2",
    path: '/screen2',
    authorities: [
      ROLE_ENUMS.ADMIN.ROLE_CODE,
    ],
  },

];
