<template>
  <v-overlay :value="loading" z-index="9999">
    <v-progress-circular indeterminate size="64" />
  </v-overlay>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import { mapState } from "pinia";
import { useNotification } from "@/store/notification";

@Component({
  computed: {
    ...mapState(useNotification, ["loading"]),
  },
})
export default class OverlayLoading extends Vue {}
</script>
