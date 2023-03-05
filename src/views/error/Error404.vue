<template>
  <v-container class="text-center" fluid>
    <v-icon color="red" size="50">mdi-package-variant</v-icon>
    <h2 class="red--text">404</h2>
    <div style="font-size: 1.5rem">Trang bạn tìm kiếm không có</div>
    <v-btn @click="goHome" class="mt-5" color="primary">
      <v-icon small class="mr-1">mdi-arrow-left</v-icon>
      Về trang chủ
    </v-btn>
  </v-container>
</template>

<script lang="ts">
import Component from "vue-class-component";
import Vue from "vue";

@Component
export default class Error403 extends Vue {
  goHome(): void {
    this.$router.push({ path: "/" });
  }
}
</script>

<style lang="scss" scoped>
.text-center {
  text-align: center;
  margin-top: 60px;
}
</style>
