import { defineStore } from "pinia";

export interface ILayout {
  showGrid: boolean;
}

export const useHelper = defineStore("helper", {
  state: () =>
    ({
      showGrid: false,
    } as ILayout),
  actions: {
    toggle(state: ILayout) {
      this.showGrid = !state.showGrid;
    },
  },
});
