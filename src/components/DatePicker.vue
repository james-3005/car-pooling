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
          :value="value"
          append-icon="mdi-calendar"
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
      no-title
      :value="value"
      @input="setDate"
      :min="$attrs.min"
      :max="$attrs.max"
      header-color="primary"
      first-day-of-week="1"
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
    value: {},
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
  },
  name: "DatePicker",
  inheritAttrs: true,
  data: () => ({
    isShow: false,
    moment,
  }),
  // methods: {},
  methods: {
    get() {
      return this.value;
    },
    set(value) {
      this.$emit("input", value);
    },
    setDate(value) {
      this.set(value);
      this.isShow = false;
    },
    reset() {
      this.set("");
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
