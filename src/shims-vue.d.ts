import { IConfirmNoValue } from "@/store/module/notification";
import { alert } from "@/utils/utilities";

declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
declare module "vue/types/vue" {
  interface Vue {
    alert: typeof alert;
    confirm: (confirm: IConfirmNoValue) => void;
  }
}
