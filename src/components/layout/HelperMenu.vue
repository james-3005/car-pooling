<template>
  <v-menu
    v-model="isShow"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    top
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        @click="isShow = true"
        color="primary"
        dark
        absolute
        right
        v-show="isShowButton"
        style="bottom: 72px; z-index: 100"
        v-on="on"
        v-bind="attrs"
      >
        <v-icon>mdi-setting</v-icon>
        Trợ giúp
      </v-btn>
    </template>
    <div>
      <v-btn color="primary" small @click="() => toggle()">Hiển thị lưới</v-btn>
    </div>
  </v-menu>
</template>

<script>
import { mapActions, mapState } from "pinia/dist/pinia";
import { useHelper } from "@/store/helper";

export default {
  name: "HelperMenu",
  data: () => ({
    isShow: false,
    isShowButton: JSON.parse(localStorage.getItem("helper")),
    selectedTime: "",
  }),
  methods: {
    ...mapActions(useHelper, ["toggle"]),
  },
};
</script>
<style lang="scss"></style>
