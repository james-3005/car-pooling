import { API_KEY, AUTO_COMPLETE_URL, GEOCODE_URL } from "@/utils/constant";
import axios from "axios";

export const GET_ADDRESS_FROM_LATLNG = (lat: number, long: number) =>
  axios.get(GEOCODE_URL, {
    params: {
      latlng: lat + "," + long,
      key: API_KEY,
    },
  });
export const GET_LOCATION_LIST = (input: string) =>
  axios.get(AUTO_COMPLETE_URL, {
    params: {
      input,
      key: API_KEY,
      locationbias: "circle:16000@21.028511,105.804817",
    },
  });
export const GET_LATLNG_FROM_ADDRESS = (address: string) =>
  axios.get(GEOCODE_URL, {
    params: {
      address,
      key: API_KEY,
    },
  });
