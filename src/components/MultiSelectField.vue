<template>
  <div :style="`width: ${width}`">
    <v-select
      :value="value"
      :items="items"
      :label="label"
      outlined
      dense
      v-bind="$attrs"
      multiple
      :no-data-text="$t('noDataSelect')"
      class="multiSelectField"
      :menu-props="{ contentClass: 'mt-10 listItem' }"
      @blur="handleBlur"
      @change="onChange"
    >
      <template v-slot:prepend-item v-if="items && items.length > 0">
        <template v-if="selectAll">
          <v-list-item @mousedown.prevent @click="toggle">
            <v-list-item-action>
              <v-icon :color="value.length > 0 ? 'primary' : ''">
                {{ icon }}
              </v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t("all") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </template>
      <template #selection="{ item, index }">
        <v-chip small label class="px-1" @click="focusDiv" @click.stop>
          <span class="multiSelectField_chip_text">{{ item[itemText] }}</span>
          <v-icon
            v-if="!readonly"
            x-small
            @click="toggleIds(item)"
            @click.stop
            class="ml-1"
            >mdi-close-circle
          </v-icon>
        </v-chip>
      </template>
    </v-select>
  </div>
</template>

<script>
export default {
  name: "MultiSelectField",
  data: () => ({
    itemsSelected: [],
    isShow: false,
    hideDetails: false,
    returnObject: false,
    itemValue: "value",
    itemText: "text",
    readonly: false,
    HTMLList: null,
  }),
  props: {
    items: {
      type: Array,
      require: true,
    },
    label: {
      type: String,
      require: false,
    },
    value: {},
    width: {
      type: String,
    },
    blur: {
      type: Function,
    },
    selectAll: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleBlur() {
      if (this.blur) this.blur();
    },
    onChange(value) {
      this.set(value);
      // this.set(value);
    },
    get() {
      return this.value;
    },
    set(value) {
      setTimeout(() => {
        this.$emit("input", value);
      }, 0);
    },
    toggle() {
      this.$nextTick(() => {
        if (this.selectedAllItems) {
          this.set([]);
        } else {
          if (this.returnObject) this.set(this.items.slice());
          else this.set(this.items.map((item) => item[this.itemValue]));
        }
        // this.set(this.itemsSelected);
      });
    },
    toggleIds(item) {
      if (this.returnObject)
        this.set(
          this.value.filter(
            (item2) => item2[this.itemValue] !== item[this.itemValue],
          ),
        );
      else
        this.set(this.value.filter((item2) => item2 !== item[this.itemValue]));
      // this.set(this.itemsSelected);
    },
    focusDiv() {
      this.HTMLList.focus();
    },
  },
  beforeDestroy() {
    this.itemsSelected = [];
  },
  computed: {
    selectedAllItems() {
      return this.items.length !== 0 && this.value.length === this.items.length;
    },
    selectedSomeItems() {
      return this.value.length > 0 && !this.selectedAllItems;
    },
    icon() {
      if (this.selectedAllItems) return "mdi-checkbox-marked";
      if (this.selectedSomeItems) return "mdi-minus-box";
      return "mdi-checkbox-blank-outline";
    },
  },
  mounted() {
    this.HTMLList = this.$el.querySelector(".v-select__selections");
    this.HTMLList.setAttribute("tabindex", 1);
    this.hideDetails =
      this.$attrs["hide-details"] || this.$attrs["hide-details"] === "";
    this.returnObject =
      this.$attrs["return-object"] || this.$attrs["return-object"] === "";
    this.itemValue = this.$attrs["item-value"] || "value";
    this.itemText = this.$attrs["item-text"] || "text";
    this.readonly = this.$attrs.readonly === "" || this.$attrs.readonly;
  },
};
</script>

<style lang="scss">
.multiSelectField {
  .v-select__selections {
    outline: none;
    overflow-x: scroll !important;
    -webkit-overflow-scrolling: touch;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    align-content: flex-start;
    overflow-y: hidden;
    height: 36px !important;
    min-height: 30px !important;
    &::-webkit-scrollbar {
      display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
    input {
      width: 0;
    }
  }
  &_chip {
    height: 20px !important;
    max-width: 100px;
    &_text {
      max-width: 80px !important;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.listItem .v-list-item__title {
  max-width: 350px !important;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.listItem .theme--light.v-list-item.v-list-item--highlighted::before {
  opacity: 0.12 !important;
}
</style>
