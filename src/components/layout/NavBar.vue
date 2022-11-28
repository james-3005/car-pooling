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
          <v-list-item>
            <v-list-item-icon>
              <v-icon @click="minimize = !minimize" color="primary">
                mdi-menu
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content>Car Pooling</v-list-item-content>
          </v-list-item>
          <v-menu offset-y v-if="!minimize">
            <template v-slot:activator="{ on }">
              <v-btn icon elevation="0" class="mr-4" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list dense>
              <v-list-item @click="changePassword">
                <v-list-item-title>Thay đổi thông tin</v-list-item-title>
              </v-list-item>
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
import { MENU_HOME } from "@/utils/auth.const";

@Component
export default class NavBar extends Vue {
  drawer = true;
  minimize = false;
  items = MENU_HOME;
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

  changePassword(): void {}
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
