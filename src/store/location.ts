import { defineStore } from "pinia";
import { IConfirm } from "@/store/notification";

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
  actions: {
    setCenter(state: { lat: number; lng: number }) {
      this.center = {
        ...state,
      };
    },
  },
});
