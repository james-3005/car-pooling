<template>
  <v-app>
    <router-view />
    <Notification />
    <ConfirmDialog />
    <OverlayLoading />
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import ConfirmDialog from "@/components/layout/ConfirmDialog.vue";
import Notification from "@/components/layout/Notification.vue";
import OverlayLoading from "@/components/layout/OverlayLoading.vue";

@Component({
  components: {
    OverlayLoading,
    Notification,
    ConfirmDialog,
  },
})
export default class App extends Vue {}
</script>
