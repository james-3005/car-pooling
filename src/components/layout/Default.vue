<template>
  <v-app id="inspire">
    <NavBar />
    <v-main>
      <v-container
        fluid
        class="my-container pa-0 flex-column"
        style="flex: 1; display: flex; height: 100%"
      >
        <div
          class="mx-3 my-2 d-flex align-center justify-space-between"
        >
<!--          <h1 class="screen-title">{{ pageTitle }}</h1>-->
<!--          <div class="text-right" v-if="backScreen && backScreen !== 'none'">-->
<!--            <ButtonIcon-->
<!--              class="secondary black&#45;&#45;text"-->
<!--              :icon="$t('ic.arrowLeft')"-->
<!--              :text="btnBackText"-->
<!--              @click="back"-->
<!--            />-->
<!--          </div>-->
        </div>
        <v-fade-transition mode="out-in">
          <router-view />
        </v-fade-transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import NavBar from "@/components/layout/NavBar.vue";
import ButtonIcon from "@/components/ButtonIcon.vue";
import Vue from "vue";

export default Vue.extend({
  data: () => ({
    fn: null,
    showProfile: false,
  }),
  name: "LayoutDefault",
  components: { NavBar, ButtonIcon },
  methods: {
    closeDialogProfile(): void {
      this.showProfile = false;
    },
    back(): void {
      // if (this.onClick) this.onClick();
      // else {
      //   if (this.$route.query.return_url) {
      //     this.$router.push(this.$route.query.return_url as string);
      //     return;
      //   }
      //
      //   // handel period back
      //   if (this.$route.params !== null && this.$route.params !== undefined) {
      //     if (
      //       this.$route.params.searchQueryPeriod !== null &&
      //       this.$route.params.searchQueryPeriod !== undefined
      //     ) {
      //       this.$router.push({
      //         name: this.backScreen,
      //         params: {
      //           searchQueryPeriod: this.$route.params.searchQueryPeriod,
      //         },
      //       });
      //       return;
      //     }
      //   }
      //   this.$router.push({
      //     name: this.backScreen,
      //     query: this.query,
      //   });
      // }
    },
  },

  // beforeMount() {
  //   this.fn = setInterval(() => {
  //     if (JwtService.getToken() == null || JwtService.getToken() === "") {
  //       window.location = SCREEN.LOGIN.PATH;
  //     }
  //   }, 1000);
  // }

  // beforeDestroy() {
  //   clearInterval(this.fn);
  // }
});
</script>

<style lang="scss" scoped>
.h-40 {
  height: 40px !important;
}

.screen-title {
  color: #333;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  letter-spacing: 5px;
}

#inspire {
  height: 100vh;
  overflow: auto;
}
</style>
