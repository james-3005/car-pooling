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
    :style="width && `width: ${width}`"
  >
    <template v-slot:activator="{ on, attrs }">
      <div
        :style="width && `width: ${width}`"
        :class="{ requiredLabel: required }"
      >
        <v-text-field
          v-model="selected"
          @input="$emit('input', $event)"
          @click="openDialog"
          @click:append="openDialog"
          :label="label"
          :clearable="clearable"
          dense
          v-on="readonly ? null : on"
          :hide-details="hideDetails"
          v-bind="{ ...attrs, ...$attrs }"
          readonly
          outlined
          append-icon="mdi-clock"
        />
      </div>
    </template>
    <v-time-picker
      scrollable
      v-model="selected"
      :min="min"
      :max="max"
      format="24hr"
      class="timePickerMenu"
      @click:minute="isShow = false"
    />
  </v-menu>
</template>

<script>
export default {
  components: {},
  props: {
    value: {},
    label: {},
    width: {},
    hideDetails: {
      default: false,
      type: Boolean,
    },
    clearable: {
      default: false,
      type: Boolean,
    },
    min: {},
    max: {},
    required: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  name: "TimePicker",
  data: () => ({
    isShow: false,
  }),
  methods: {
    openDialog() {
      if (!this.readonly) this.isShow = true;
    },
  },
  computed: {
    selected: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>

<style lang="scss">
.requiredLabel label {
  &:after {
    font-weight: bold;
    content: " *";
    color: #ff5252;
    font-size: 17px;
  }
}

.timePicker.v-menu__content.theme--light.menuable__content__active {
  min-width: 0 !important;
}

.timePickerMenu {
  .v-picker__title {
    padding: 10px;
  }

  .theme--light.v-time-picker-clock {
    background: #e8e2e1;

    .v-time-picker-clock__item {
      font-weight: 600;
    }
  }

  .v-time-picker-title {
    justify-content: center;

    .v-time-picker-title__time {
      display: flex;
      justify-content: center;
      gap: 2px;

      .v-picker__title__btn {
        padding: 2px;
        width: 70px;
        border-radius: 8px;
        font-size: 40px;
      }

      .v-picker__title__btn--active {
        background-color: #55a1ec;
      }
    }
  }
}
</style>
