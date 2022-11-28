import { defineStore } from "pinia";

export const defaultCenter = {
  lat: 21.028511,
  lng: 105.804817,
};
export const useLocation = defineStore("location", {
  state: () => ({
    location: {
      startLocation: null,
      endLocation: null,
    },
    center: defaultCenter,
  }),
});
