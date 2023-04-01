//@ts-nocheck
import axios from "axios";
import qs from "qs";
import vm from "@/main";
import { BASE_URL } from "@/utils/constant";

const customAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    handlerException(err);
  },
);
customAxios.interceptors.request.use((config: any) => {
  config.headers = {
    ...config.headers,
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  return config;
});

export default {
  query(resource: string, params: any, setLoading = true) {
    return customAxios.get(resource, {
      params,
      setLoading,
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: "repeat" }),
    });
  },

  get(resource: string, slug = "", setLoading = true) {
    return customAxios.get(`${resource}/${slug}`, {
      setLoading,
    });
  },

  post(resource: string, params: object, setLoading = true) {
    return customAxios.post(`${resource}`, params, {
      setLoading,
    });
  },

  update(resource: string, params: object, setLoading = true) {
    return customAxios.put(`${resource}`, params, { setLoading });
  },

  put(resource: string, params: object, setLoading = true) {
    return customAxios.put(`${resource}`, params, {
      setLoading,
    });
  },

  delete(resource: string, setLoading = true) {
    return customAxios.delete(resource, {
      setLoading,
    });
  },

  getUsingConfig(resource: string, config = {}, setLoading = true) {
    return customAxios.get(`${resource}`, {
      ...config,
      setLoading,
    });
  },

  patch(resource: string, params: object, setLoading = true) {
    return customAxios.patch(`${resource}`, params, {
      setLoading,
    });
  },

  postUsingConfig(
    resource: string,
    params: object,
    config = {},
    setLoading = true,
  ) {
    return customAxios.post(`${resource}`, params, {
      ...config,
      setLoading,
    });
  },
};

function handlerException(error: any) {
  if (!error.response) {
    // ALERT.error(i18n.t("msg.errorSystem"), 10000);
    throw error;
  }
  if (error.response.status === 401) {
    // ALERT.error(i18n.t("msg.sessionExpired"));
    vm.$router.push("/login");
  }
  if (error.response.status === 403 || error.response.status === 409) {
    vm.$router.push("/403");
  }
  if (error.response.status === 500) {
    // ALERT.error(i18n.t("msg.errorSystem"));
  }
  throw error;
}
