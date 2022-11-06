<template>
  <v-overlay :value="loading.status" z-index="9999">
    <v-progress-circular v-if="loading.circular" indeterminate size="64" />
  </v-overlay>
</template>

<script>
import { mapGetters } from "vuex";
import Vue from "vue";
import Component from "vue-class-component";
@Component({
  computed: {
    ...mapGetters(["loading"]),
  },
})
export default class OverlayLoading extends Vue {}
</script>
