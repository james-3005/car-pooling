import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import "@/styles/index.scss";
import { confirm, alert } from "@/utils/utilities";
import { createPinia, PiniaVuePlugin } from "pinia";

Vue.use(PiniaVuePlugin);
const pinia = createPinia();
Vue.prototype.alert = alert;
Vue.prototype.confirm = confirm;

const _vue = new Vue({
  router,
  pinia,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

export default _vue;
