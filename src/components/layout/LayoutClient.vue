<template>
  <div class="pa-0 w-100 h-100 d-flex flex-column layoutClient">
    <div class="flex-grow-1 mb-56">
      <router-view />
    </div>
    <v-bottom-navigation color="primary" fixed>
      <v-btn
        value="home"
        @click="() => navigate('/')"
        :class="isMatch('/')"
        class="custom-btn"
      >
        <span>Trang chủ</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn value="favorites" class="custom-btn" :class="isMatch('/favorite')">
        <span>---</span>

        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn
        value="account"
        @click="() => navigate('/info')"
        :class="isMatch('/info')"
        class="custom-btn"
      >
        <span>Tài khoản</span>
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
}

.mb-56 {
  margin-bottom: 56px;
}
</style>
