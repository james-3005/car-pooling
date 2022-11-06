<template>
  <v-menu
    v-model="isShow"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    :content-class="
      $attrs['hide-details'] === '' || $attrs['hide-details'] === true
        ? 'datePicker'
        : 'datePicker mt-n6'
    "
    :style="width && `width: ${width}`"
  >
    <template v-slot:activator="{ on, attrs }">
      <div :style="width && `width: ${width}`">
        <v-text-field
          :value="convertDate()"
          :append-icon="$t('ic.calendars')"
          @click:append="if (!$attrs.readonly) isShow = true;"
          outlined
          readonly
          :label="label"
          :dense="dense"
          v-bind="{ ...$attrs, ...attrs }"
          v-on="$attrs.readonly ? null : on"
          :hide-details="hideDetails"
          @focus="focus"
          @blur="blur"
          @click:clear="reset"
        />
      </div>
    </template>
    <v-date-picker
      scrollable
      locale="ja"
      no-title
      :value="
        endDate
          ? startDate
            ? [startDate, endDate]
            : []
          : startDate
          ? [startDate]
          : []
      "
      @input="setDate"
      :min="$attrs.min"
      :max="$attrs.max"
      header-color="primary"
      range
    />
  </v-menu>
</template>

<script>
import moment from "moment";
export default {
  components: {},
  props: {
    width: {
      type: String,
    },
    dense: {
      type: Boolean,
      default: true,
    },
    label: {
      type: String,
    },
    hideDetails: {
      type: Boolean,
    },
    focus: {
      type: Function,
      default: () => {},
    },
    blur: {
      type: Function,
      default: () => {},
    },
    startDate: {
      type: String,
      default: "",
      required: true,
    },
    endDate: {
      type: String,
      default: "",
      required: true,
    },
  },
  name: "DateRangePicker",
  inheritAttrs: true,
  data: () => ({
    isShow: false,
    moment,
    isChooseFirstDate: true,
  }),
  methods: {
    setFirstDate(value) {
      this.$emit("update:startDate", value);
    },
    setEndDate(value) {
      this.$emit("update:endDate", value);
    },
    setDate(value) {
      if (this.isChooseFirstDate) {
        this.setFirstDate(value[0]);
        this.setEndDate("");
        this.isChooseFirstDate = false;
        return;
      }
      if (!this.isChooseFirstDate) {
        const firstDate = this.startDate;
        const endDate = value[1];
        if (moment(firstDate).isSameOrAfter(endDate)) {
          const [newFirstDate, newEndDate] = [endDate, firstDate];
          this.setFirstDate(newFirstDate);
          this.setEndDate(newEndDate);
        } else this.setEndDate(value[1]);
        this.isChooseFirstDate = true;
        this.isShow = false;
      }
    },
    reset() {
      this.setFirstDate("");
      this.setEndDate("");
    },
    convertDate() {
      if (this.startDate && this.endDate)
        return `${moment(this.startDate).format("YYYY年MM月DD日")} ~ ${moment(
          this.endDate,
        ).format("YYYY年MM月DD日")}`;
      return "";
    },
  },
  created() {},
};
</script>

<style lang="scss">
.datePicker.v-menu__content.theme--light.menuable__content__active {
  min-width: 0 !important;
}
</style>
