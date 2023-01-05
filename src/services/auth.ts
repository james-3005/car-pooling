import request from "@/utils/api.service";

export const login = (username: string, password: string) =>
  request.post("/auth/login", {
    username,
    password,
  });

export interface IRegister {
  username: string;
  password: string;
  name: string;
  is_driver: boolean;
}

export const register = (params: IRegister) =>
  request.post("/users", {
    ...params,
    rePassword: undefined,
  });

export interface IChangeInfo {
  username: string;
  password: string;
  name: string;
  is_driver: boolean;
}
export const changeInfo = (params: IChangeInfo) => request.patch("/users", {});
