<template>
  <div>
    <v-navigation-drawer
      app
      clipped
      v-model="drawer"
      :mini-variant.sync="minimize"
      permanent
      class="my-navigation-drawer"
      width="400"
    >
      <v-list class="py-0">
        <div class="d-flex justify-space-between align-center elevation-3">
          <v-list-item class="pa-0">
            <v-list-item-icon>
              <v-icon @click="minimize = !minimize" color="primary">
                mdi-menu
              </v-icon>
            </v-list-item-icon>
            <router-link to="/" class="text-decoration-none">
              <v-list-item-content class="black--text font-weight-medium"
                >Car Pooling
              </v-list-item-content>
            </router-link>
          </v-list-item>
          <v-menu offset-y v-if="!minimize">
            <template v-slot:activator="{ on }">
              <v-btn icon elevation="0" class="mr-4" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list dense>
              <router-link to="/info" class="text-decoration-none">
                <v-list-item>
                  <v-list-item-title>Ghép nhóm đi chung</v-list-item-title>
                </v-list-item>
              </router-link>
              <router-link to="/info" class="text-decoration-none">
                <v-list-item>
                  <v-list-item-title>Thay đổi thông tin</v-list-item-title>
                </v-list-item>
              </router-link>
              <v-divider />
              <v-list-item class="logout c-pointer" @click="logOut">
                <v-list-item-title>Đăng xuất</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-list>
      <div :class="!minimize ? 'd-block' : 'd-none'">
        <router-view />
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class NavBar extends Vue {
  drawer = true;
  minimize = false;
  option = {
    value: false,
    disabled: false,
    absolute: false,
    openOnHover: false,
    closeOnClick: true,
    closeOnContentClick: true,
    offsetX: false,
    offsetY: true,
    nudgeBottom: 7,
  };

  async logOut(): Promise<void> {}

  navigateInfo(): void {
    this.$router.push("/info");
  }
}
</script>
<style lang="scss">
$drawer-open: 400px;
.v-navigation-drawer.my-navigation-drawer {
  .my-divider {
    border-color: transparent;
    width: 95%;
  }
}
</style>
