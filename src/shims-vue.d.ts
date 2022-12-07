import { IConfirmNoValue } from "@/store/notification";
import { alert } from "@/utils/utilities";

declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
declare module "vue/types/vue" {
  interface Vue {
    alert: typeof alert;
    confirm: (confirm: IConfirmNoValue) => void;
    loading: (value: boolean) => void;
  }
}
