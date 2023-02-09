<template>
  <v-dialog
    :value="value"
    persistent
    fullscreen
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-card-title class="primary white--text">
        Chi tiết chuyến đi
        <v-btn icon class="ml-auto primary white--text" @click="onClose">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text></v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({}),
  name: "DetailDialog",
  props: ["value", "onClose"],
};
</script>

<style lang="scss"></style>
