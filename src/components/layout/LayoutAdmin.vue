<template>
  <div class="pa-0 w-100 h-100 d-flex flex-column layoutClient">
    <div class="mb-56 overflow-auto">
      <router-view />
    </div>
    <v-bottom-navigation color="primary" fixed>
      <v-btn
        value="home"
        @click="() => navigate('/admin')"
        :class="isMatch('/admin')"
        class="custom-btn"
      >
        <span>Home</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn
        value="home"
        @click="() => navigate('/admin/monitor')"
        :class="isMatch('/admin/monitor')"
        class="custom-btn"
      >
        <span>Monitoring</span>
        <v-icon>mdi-monitor-multiple</v-icon>
      </v-btn>
      <v-btn
        value="account"
        @click="() => navigate('/admin/cluster')"
        :class="isMatch('/admin/cluster')"
        class="custom-btn"
      >
        <span>Clustering</span>
        <v-icon>mdi-account-multiple</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
export default {
  name: "LayoutAdmin",
  data: () => ({}),
  methods: {
    navigate(url) {
      this.$router.push(url);
    },
    isMatch(url) {
      if (url === "/admin") {
        if (location.pathname === "/admin") return "v-btn--active";
        else return "v-btn--inactive";
      } else if (location.pathname.startsWith(url)) return "v-btn--active";
      else return "v-btn--inactive";
    },
  },
};
</script>
<style lang="scss">
.layoutClient {
  button.v-btn--inactive .v-btn__content.custom-btn,
  button.v-btn--active.v-btn--inactive.custom-btn .v-btn__content {
    color: rgba(0, 0, 0, 0.6) !important;
  }

  .mb-56 {
    height: calc(100vh - 56px);
    margin-bottom: 56px;
  }
}
</style>
