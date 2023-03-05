<template>
  <v-menu
    v-model="isShow"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    class="timePicker"
    :content-class="
      $attrs['hide-details'] === '' || $attrs['hide-details'] === true
        ? 'timePicker'
        : 'timePicker mt-n6'
    "
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
        <v-icon>mdi-clock</v-icon>
        {{ selectedTime }}
      </v-btn>
    </template>
    <v-time-picker
      scrollable
      v-model="selectedTime"
      format="24hr"
      class="timePickerMenu"
      @click:minute="isShow = false"
    />
  </v-menu>
</template>

<script>
import moment from "moment";

export default {
  name: "TimeClock",
  data: () => ({
    isShow: false,
    isShowButton: false,
    selectedTime: "",
  }),
  mounted() {
    this.isShowButton = JSON.parse(localStorage.getItem("clock"));
    const getTime = moment(localStorage.getItem("time"), "HH:mm");
    this.selectedTime = getTime.isValid()
      ? getTime.format("HH:mm")
      : moment().format("HH:mm");
  },
  watch: {
    selectedTime(value) {
      console.log(value);
      localStorage.setItem("time", value);
    },
  },
};
</script>
<style lang="scss"></style>
