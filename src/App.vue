<template>
  <v-app>
    <router-view />
    <Notification />
    <ConfirmDialog />
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import ConfirmDialog from "@/components/layout/ConfirmDialog.vue";
import Notification from "@/components/layout/Notification.vue";

@Component({
  components: {
    Notification,
    ConfirmDialog,
  },
})
export default class App extends Vue {}
</script>
