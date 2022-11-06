<template>
  <v-container class="text-center" fluid>
<!--    <v-icon color="yellow darken-3 " size="50">mdi-alert</v-icon>-->
<!--    <h2 style="color: red; font-size: 2.5rem">-->
<!--      {{ $t("page403.subject") }}-->
<!--    </h2>-->
<!--    <div style="font-size: 1.5rem">-->
<!--      {{ $t("page403.description") }}-->
<!--    </div>-->
<!--    <v-btn @click="goHome" class="mt-5" color="primary">-->
<!--      <v-icon small class="mr-1">{{ $t("ic.arrowLeft") }} </v-icon>-->
<!--      Go to home-->
<!--    </v-btn>-->
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Error403 extends Vue {
  goHome(): void {
    this.$router.push("/");
  }
}
</script>

<style lang="scss" scoped>
.text-center {
  text-align: center;
  margin-top: 60px;
}
</style>
