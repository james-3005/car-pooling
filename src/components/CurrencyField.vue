<template>
  <div :style="`width: ${width}px`">
    <v-text-field
      ref="field"
      :value="model"
      @focus="onFocus"
      @keyup="onKeyUp"
      v-bind="$attrs"
      @change="onChange"
      dense
      @blur="onBlur"
    />
  </div>
</template>

<script>
import { toASCII } from "@/utils/utilities";

export default {
  props: {
    value: null,
    allowNegative: {
      type: Boolean,
      default: false,
    },
    thousandsSeparator: {
      type: String,
      default: ",",
    },
    decimalSeparator: {
      type: String,
      default: ".",
    },
    languageCode: {
      type: String,
      default: "en-US",
    },

    width: {
      type: Number,
      required: false,
    },
  },
  inheritAttrs: true,
  data() {
    return {
      numberValue: "",
      model: "",
      isMasked: true,
      thousandsSeparatorRegex: new RegExp(`\\${this.thousandsSeparator}`, "g"),
      decimalSeparatorRegex: new RegExp(`\\${this.decimalSeparator}`, "g"),
    };
  },

  methods: {
    onFocus() {
      this.isMasked = false;
      this.updateModel();
    },
    onBlur() {
      if (this.$listeners.blur) this.$listeners.blur();
      this.isMasked = true;
      this.format();
    },
    onKeyUp() {
      this.updateNumberValue();
    },
    onChange() {
      if (this.$listeners.change) this.$listeners.change();
    },
    updateNumberValue() {
      let v = this.toASCII(this.model) || null;
      if (v == null) {
        this.numberValue = null;
        return;
      }
      let parsed;
      v = v.replace(this.thousandsSeparatorRegex, "");
      if (this.decimalSeparator !== ".") {
        v = v.replace(this.decimalSeparatorRegex, this.thousandsSeparator);
      }
      let result = this.tryParseFloat(v);
      if (!result) {
        parsed = 0;
      } else {
        parsed = result;
      }
      if (!this.allowNegative && result < 0) {
        parsed = 0;
      }
      this.numberValue = Math.round(parsed * 100) / 100;
    },
    updateModel() {
      if (this.numberValue === undefined || this.numberValue === null) return;
      let v = this.numberValue.toString();
      v = v.replace(this.thousandsSeparatorRegex, this.decimalSeparator);
      this.model = v;
    },
    format() {
      if (this.numberValue === null || this.numberValue === undefined) {
        return;
      }
      let v = this.numberValue;
      v = v.toLocaleString(this.languageCode);
      if (
        v.length !== 1 &&
        v.slice(v.indexOf(this.decimalSeparator) + 1).length === 1
      ) {
        v += "0";
      }
      this.model = v;
    },
    tryParseFloat(str, defaultValue) {
      let retValue = defaultValue;
      if (str !== null && str.length > 0 && !isNaN(str)) {
        retValue = parseFloat(str);
      }
      return retValue;
    },
    toASCII(chars) {
      return toASCII(chars);
    },
  },

  watch: {
    numberValue(v) {
      this.$emit("input", v);
    },
    value(v) {
      this.numberValue = v;
      if (!this.$refs.field.isFocused) {
        this.format();
      }
    },
  },
  created() {
    this.numberValue = this.value;
    this.onFocus();
    this.onBlur();
  },
};
</script>

<style lang="scss" scoped></style>
