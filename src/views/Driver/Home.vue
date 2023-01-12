<template>
  <v-container class="gap-5 pa-5 d-flex flex-wrap" fluid>
    <v-form class="w-100">
      <TextField label="Bán kính" />
      <v-btn block color="primary">Tính toán</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { BOOKING_TYPE, REPEAT_DAY } from "@/utils/constant";
import DatePicker from "@/components/DatePicker.vue";
import MultiSelectField from "@/components/MultiSelectField.vue";
import { mapState } from "pinia";
import { useLocation } from "@/store/location";

export default {
  name: "HomeDriver",
  components: {
    MultiSelectField,
    DatePicker,
  },
  data: () => ({
    BOOKING_TYPE,
    REPEAT_DAY,
    form: {
      startLocation: null,
      endLocation: null,
      type: 1,
    },
  }),
  methods: {
    setLocation(v, type) {
      try {
        if (type === "start") this.location.startLocation = v;
        else this.location.endLocation = v;
        this.center.lat = v.geometry.location.lat();
        this.center.lng = v.geometry.location.lng();
      } catch (e) {}
    },
  },
  computed: {
    ...mapState(useLocation, ["location", "center"]),
  },
};
</script>
<style lang="scss" scoped></style>
