<template>
  <v-container class="gap-5 pa-5 d-flex flex-wrap" fluid>
    <router-link
      v-for="(item, index) in menus"
      :key="index + 'menu-option'"
      :to="item.path"
      class="home_btn col-12 col-sm-5"
    >
      <v-btn class="home_btn_container primary" block tile large>
        <v-icon class="home_btnIcon" color="white" large
          >{{ item.icon }}
        </v-icon>
        {{ item.title }}
      </v-btn>
    </router-link>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Home extends Vue {}
</script>
<style lang="scss" scoped>
.home {
  &_btn {
    &_container {
      height: 70px !important;
      outline: none !important;
    }
  }
}
</style>
