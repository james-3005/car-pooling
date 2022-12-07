import request from "@/utils/api.service";
import { API_KEY, API_END_POINT } from "@/utils/constant";
import axios from "axios";

export const GET_ADDRESS_FROM_LOCATION = (lat: number, long: number) =>
  axios.get(API_END_POINT, {
    params: {
      latlng: lat + "," + long,
      key: API_KEY,
    },
  });
