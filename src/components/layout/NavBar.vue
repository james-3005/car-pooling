<template>
  <div>
    <v-navigation-drawer
      app
      clipped
      v-model="drawer"
      :mini-variant.sync="minimize"
      color="#35495e"
      permanent
      class="my-navigation-drawer"
    >
      <v-list>
        <div style="height: 56px">
          <v-list-item>
            <v-list-item-icon>
              <v-icon @click="minimize = !minimize" color="white">
                mdi-menu
              </v-icon>
            </v-list-item-icon>
          </v-list-item>
        </div>
        <v-divider class="my-divider mb-2" />
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.path"
          link
          @click.stop="onClickStop"
        >
          <v-list-item-icon class="mr-5">
            <v-icon color="white" :title="item.title">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              class="white--text font-weight-bold text-uppercase pt-1"
              style="font-size: 13px !important"
            >
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      clipped-left
      color="white darken-3"
      dark
      class="my-app-bar"
      :class="minimize ? 'l-56' : 'l-256'"
    >
      <router-link to="/" @click.stop="onClickStop">
        <v-toolbar-title class="d-flex align-center">
          <img class="logo" src="../../assets/logo.png" alt="logo" />
          <span class="title text-subtitle-1 text-md-h5 ml-2 system-title">
            Car pooling
          </span>
        </v-toolbar-title>
      </router-link>
      <v-spacer />
      <v-menu
        :value="option.value"
        :disabled="option.disabled"
        :absolute="option.absolute"
        :open-on-hover="option.openOnHover"
        :close-on-click="option.closeOnClick"
        :close-on-content-click="option.closeOnContentClick"
        :offset-x="option.offsetX"
        :offset-y="option.offsetY"
        :nudge-bottom="option.nudgeBottom"
      >
        <template v-slot:activator="{ on }">
          <v-btn tile outlined v-on="on" class="d-flex primary--text">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <div class="d-flex align-center">
                  <v-icon color="primary" dark v-bind="attrs" v-on="on"
                    >mdi-account
                  </v-icon>
                  <v-divider class="mx-4 primary" vertical />
                  <div class="mr-2 text-display" v-bind="attrs" v-on="on">
                    Huy
                  </div>
                </div>
              </template>
              <span> Huy </span>
            </v-tooltip>
          </v-btn>
        </template>
        <v-list dense>
          <v-list-item @click="changePassword()">
            <v-list-item-title>Thay đổi thông tin</v-list-item-title>
          </v-list-item>
          <v-divider />
          <v-list-item class="logout c-pointer" @click="logOut">
            <v-list-item-title>Đăng xuất</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import { LOGOUT } from "@/api/auth";
import Vue from "vue";
import Component from "vue-class-component";
import { MENU_HOME } from "@/utils/auth.const";

@Component
export default class NavBar extends Vue {
  drawer = true;
  minimize = true;
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
  // jwt = JwtService;
  // rolesEnum = ROLE_ENUMS;
  // role = jwtService.getRole() != "ADMIN" && jwtService.getRole() != "USER";
  async logOut(): Promise<void> {}

  changePassword(): void {
    // this.$router.push({ name: SCREEN.RESET_PASS.NAME });
  }

  onClickStop(): void {
    this.drawer = false;
    this.minimize = true;
  }
}
</script>
<style lang="scss">
.v-navigation-drawer.my-navigation-drawer {
  top: 0 !important;
  max-height: calc(100%) !important;

  .logo {
    height: 35px !important;
  }

  .my-divider {
    background-color: #ffffff;
    border-color: transparent;
    margin: 0 auto;
    width: 95%;
  }

  .v-navigation-drawer__image {
    opacity: 20% !important;
  }

  .collapse-expand {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
}

.v-toolbar.my-app-bar {
  box-shadow: none !important;
  border-bottom: solid 1px #e5e5e5 !important;

  .logo {
    height: 40px !important;
  }

  a {
    text-decoration: none !important;
  }

  .system-title {
    font-weight: 800;
    font-size: 40px;
    letter-spacing: 5px !important;
    color: #000;
  }
}

.v-toolbar.my-app-bar.l-256 {
  left: 256px !important;
}

.v-toolbar.my-app-bar.l-56 {
  left: 56px !important;
}

@media only screen and (max-width: 1000px) {
  .toolBarTitle {
    display: none;
  }
}
</style>
