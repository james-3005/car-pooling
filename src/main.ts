import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import "@/styles/index.scss";
import { confirm, alert, loading } from "@/utils/utilities";
import { createPinia, PiniaVuePlugin } from "pinia";
import * as VueGoogleMaps from "vue2-google-maps";
import { API_KEY } from "@/utils/constant";
Vue.use(PiniaVuePlugin);
const pinia = createPinia();
Vue.prototype.alert = alert;
Vue.prototype.confirm = confirm;
Vue.prototype.loading = loading;
// Vue.config.silent = true;
Vue.use(VueGoogleMaps, {
  load: {
    key: API_KEY,
    libraries: "places",
    region: "VI",
    language: "vi",
  },
});
const _vue = new Vue({
  router,
  pinia,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

export default _vue;
