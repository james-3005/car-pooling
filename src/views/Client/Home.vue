<template>
  <v-container class="gap-5 pa-5 d-flex flex-wrap" fluid>
    <v-form class="w-100">
      <v-row class="align-center">
        <v-col>
          <LocationAutoComplete
            pass-id="start"
            label="Điểm đón"
            @location="(v) => setLocation(v, 'start')"
          />
          <LocationAutoComplete
            pass-id="end"
            label="Điểm thả"
            @location="(v) => setLocation(v)"
          />
        </v-col>
        <v-btn icon color="primary" class="mt-n4">
          <v-icon>mdi-sync</v-icon>
        </v-btn>
      </v-row>

      <SelectField
        label="Loại đặt xe"
        :items="BOOKING_TYPE"
        v-model="form.type"
        messages="Chuyến xe ngay hiện tại"
      />
      <template v-if="form.type === 2">
        <DatePicker label="Giờ đón" />
        <DatePicker label="Giờ trả" />
        <SelectField multiple label="Ngày lặp lại" :items="REPEAT_DAY" />
      </template>
      <v-btn block color="primary">Tính toán</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import TextField from "@/components/TextField.vue";
import SelectField from "@/components/SelectField.vue";
import { BOOKING_TYPE, REPEAT_DAY } from "@/utils/constant";
import ButtonIcon from "@/components/ButtonIcon.vue";
import DatePicker from "@/components/DatePicker.vue";
import MultiSelectField from "@/components/MultiSelectField.vue";
import LocationAutoComplete from "@/components/LocationAutoComplete.vue";
import { mapState } from "pinia";
import { useLocation } from "@/store/module/location";

export default {
  name: "HomeClient",
  components: {
    LocationAutoComplete,
    MultiSelectField,
    DatePicker,
    ButtonIcon,
    SelectField,
    TextField,
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
