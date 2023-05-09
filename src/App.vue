<template>
  <v-app>
    <router-view />
    <Notification />
    <ConfirmDialog />
    <OverlayLoading />
    <TimeClock />
    <HelperMenu />
  </v-app>
</template>

<script>
import ConfirmDialog from "@/components/layout/ConfirmDialog.vue";
import Notification from "@/components/layout/Notification.vue";
import OverlayLoading from "@/components/layout/OverlayLoading.vue";
import TimeClock from "@/components/layout/TimeClock.vue";
import HelperMenu from "@/components/layout/HelperMenu.vue";

export default {
  components: {
    HelperMenu,
    TimeClock,
    OverlayLoading,
    Notification,
    ConfirmDialog,
  },
};
</script>
