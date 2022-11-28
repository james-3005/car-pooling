import { defineStore } from "pinia";

export interface ILayout {
  minimize: boolean;
}

export const useLayout = defineStore("layout", {
  state: () =>
    ({
      minimize: true,
    } as ILayout),
  actions: {
    toggle(state: ILayout) {
      this.minimize = !state.minimize;
    },
  },
});
