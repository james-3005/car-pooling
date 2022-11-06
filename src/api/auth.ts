import { REQUEST_MAPPING } from "@/utils/constant";
import REQUEST from "@/utils/api.service";
export const LOGIN = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) =>
  REQUEST.post(REQUEST_MAPPING.AUTH_V1.concat("/login"), {
    username,
    password,
  });

export const LOGOUT = () =>
  REQUEST.get(REQUEST_MAPPING.AUTH_V1.concat("/logout"));

export const GET_ROLE = () =>
  REQUEST.get(REQUEST_MAPPING.AUTH_V1 + "/get-role");

export const RESET_PASS = (params: any) =>
  REQUEST.post(REQUEST_MAPPING.USER + "/change-password", params);

export const CHECK_TOKEN_RESET_PASS_FORGOT_IS_EXPIRED = (params: any) =>
  REQUEST.post(REQUEST_MAPPING.USER + "/check-token-forgot-pass", params);

export const RESET_PASSWORD_USER = (userId: string) =>
  REQUEST.query(REQUEST_MAPPING.COMPANY + "/user/reset-pass", {
    userId,
  });
export const SEND_MAIL_FORGOT_PASSWORD = (params: any) =>
  REQUEST.post(REQUEST_MAPPING.USER + "/send-mail-forgot-pass", params);

export const RESET_PASSWORD_FORGOT = (params: any) =>
  REQUEST.post(REQUEST_MAPPING.USER + "/change-password-forgot", params);
