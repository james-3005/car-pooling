<template>
  <div class="pa-0 w-100 h-100 d-flex flex-column layoutClient">
    <div class="flex-grow-1 mb-56">
      <router-view />
    </div>
    <v-bottom-navigation color="primary" fixed> abc </v-bottom-navigation>
  </div>
</template>

<script>
export default {
  name: "LayoutAdmin",
  data: () => ({}),
  methods: {},
};
</script>
<style lang="scss">
.layoutClient {
  button.v-btn--inactive .v-btn__content.custom-btn,
  button.v-btn--active.v-btn--inactive.custom-btn .v-btn__content {
    color: rgba(0, 0, 0, 0.6) !important;
  }
}
</style>
