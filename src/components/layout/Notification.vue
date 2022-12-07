<template>
  <v-snackbar
    v-model="notification.showing"
    :color="notification.color"
    :timeout="notification.timeout"
    top
  >
    {{ notification.message }}
    <template v-slot:action="{ attrs }">
      <v-icon color="white" v-bind="attrs" @click="notification.showing = false"
        >mdi-close
      </v-icon>
    </template>
  </v-snackbar>
</template>
<script>
import { mapState } from "pinia";
import { useNotification } from "@/store/notification";
import { Vue, Component } from "vue-property-decorator";
@Component({
  computed: {
    ...mapState(useNotification, ["notification"]),
  },
})
export default class Notification extends Vue {}
</script>
