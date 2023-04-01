<template>
  <div class="pa-0 w-100 d-flex flex-column layoutClient">
    <div class="overflow-auto h-calc">
      <router-view />
    </div>
    <v-bottom-navigation color="primary" fixed>
      <v-btn
        value="home"
        @click="() => navigate('/')"
        :class="isMatch('/')"
        class="custom-btn"
      >
        <span>Home</span>
        <v-icon>mdi-taxi</v-icon>
      </v-btn>
      <v-btn
        value="home"
        @click="() => navigate('/cluster')"
        :class="isMatch('/cluster')"
        class="custom-btn"
      >
        <span>Group</span>
        <v-icon>mdi-account-multiple</v-icon>
      </v-btn>
      <v-btn
        value="account"
        @click="() => navigate('/info')"
        :class="isMatch('/info')"
        class="custom-btn"
      >
        <span>Account</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
export default {
  name: "LayoutClient",
  data: () => ({}),
  methods: {
    navigate(url) {
      this.$router.push(url);
    },
    isMatch(url) {
      if (url === "/") {
        if (location.pathname === "/") return "v-btn--active";
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

  .h-calc {
    height: calc(100vh - 56px);
    margin-bottom: 56px;
  }
}

.mb-56 {
  margin-bottom: 56px;
}
</style>
