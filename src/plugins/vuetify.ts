import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi",
  },
  theme: {
    themes: {
      light: {
        primary: "#2268af",
        secondary: "#C3C8CD",
        accent: "#82B1FF",
        error: "#EE4F42",
        info: "#2196F3",
        success: "#00983D",
        warning: "#FFC107",
        purple: "#E91E63",
      },
    },
  },
});
