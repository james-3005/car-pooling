import { defineStore } from "pinia";

export const defaultCenter = {
  lat: 21.028511,
  lng: 105.804817,
};

interface ILatLng {
  lat: number;
  lng: number;
}

interface IUseLocation {
  center?: ILatLng;
  location: {
    start?: ILatLng;
    end?: ILatLng;
  };
}

type locationType = "start" | "end";
export const useLocation = defineStore("location", {
  state: (): IUseLocation => ({
    location: {
      start: undefined,
      end: undefined,
    },
    center: defaultCenter,
  }),
  actions: {
    setCenter(state: ILatLng) {
      this.center = {
        ...state,
      };
    },
    setLocation(type: locationType, state: ILatLng) {
      if (type === "start") {
        this.location.start = state;
      } else this.location.end = state;
    },
    clearLocation() {
      this.location.start = undefined;
      this.location.end = undefined;
    },
  },
});
