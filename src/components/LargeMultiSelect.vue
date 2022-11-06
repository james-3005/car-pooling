<template>
  <div :style="`width: ${width}`">
    <v-menu
      v-model="isShow"
      transition="scale-transition"
      offset-y
      :close-on-content-click="false"
      bottom
      content-class="mt-n6"
      class="listItem"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-select
          :value="value"
          outlined
          dense
          v-bind="{ ...attrs, ...$attrs }"
          multiple
          chips
          :menu-props="{ contentClass: 'd-none' }"
          v-on="on"
          class="multiSelectField"
          :items="[
            {
              [itemValue]: null,
              [itemText]: $t('all'),
            },
            ...$attrs.items,
          ]"
        >
          <template v-slot:append>
            <v-icon v-if="value.length" @click="clearData" @click.stop
              >{{ $t("ic.close") }}
            </v-icon>
            <v-icon
              v-on="on"
              :color="isShow ? 'primary' : ''"
              :class="isShow && 'turnUp'"
              >{{ "mdi-menu-down" }}
            </v-icon>
          </template>
          <template #selection="{ item }">
            <v-chip
              small
              label
              class="multiSelectField_chip px-1"
              @click.stop
              @click="focusDiv"
            >
              <span class="multiSelectField_chip_text">{{
                item[itemText]
              }}</span>
              <v-icon
                v-if="!($attrs.readonly === '' || $attrs.readonly)"
                x-small
                @click="(e) => toggleIds(item, 'remove')"
                @click.stop.prevent
                class="ml-1"
                >mdi-close-circle
              </v-icon>
            </v-chip>
          </template>
        </v-select>
      </template>
      <v-list-item
        v-if="$attrs.items.length === 0"
        class="white c-pointer listItem"
      >
        <v-list-item-title>{{ $t("noDataSelect") }}</v-list-item-title>
      </v-list-item>
      <v-virtual-scroll
        v-if="$attrs.items.length !== 0"
        :height="$attrs.items.length > 7 ? 336 : ($attrs.items.length + 1) * 48"
        item-height="48"
        :items="[
          {
            [itemValue]: null,
            [itemText]: $t('all'),
          },
          ...$attrs.items,
        ]"
      >
        <template v-slot:default="{ item }">
          <v-list-item
            :key="item[itemValue]"
            dense
            class="white c-pointer"
            @click="(e) => toggleIds(item, 'add')"
            :class="{
              'primary--text v-list-item--active v-list-item--link ':
                returnObject
                  ? value.find((item2) => item2[itemValue] === item[itemValue])
                  : value.find((item2) => item2[itemValue] === item[itemValue]),
            }"
          >
            <v-list-item-avatar class="my-1">
              <v-checkbox
                hide-details=""
                class="ma-0"
                :ripple="false"
                :input-value="
                  value.find((item2) => item2[itemValue] === item[itemValue])
                "
                readonly
              />
            </v-list-item-avatar>
            <v-list-item-title class="textOverflow">{{
              item[itemText]
            }}</v-list-item-title>
          </v-list-item>
        </template>
      </v-virtual-scroll>
    </v-menu>
  </div>
</template>
<script>
export default {
  data: () => ({
    isShow: false,
    itemValue: "value",
    itemText: "text",
    HTMLList: null,
  }),
  props: {
    width: {
      type: String,
    },
    value: {
      type: Array,
      default: [],
    },
    blur: {
      type: Function,
    },
  },
  inheritAttrs: true,
  name: "LargeMultiSelect",
  methods: {
    set(value) {
      this.$emit("input", value);
    },
    toggleIds(item) {
      if (
        !this.value.find(
          (item2) => item2[this.itemValue] === item[this.itemValue],
        )
      ) {
        if (this.value[0] && this.value[0][this.itemValue] === null) {
          this.set([item]);
        } else {
          if (item[this.itemValue] === null) {
            this.set([item]);
          } else this.set([...this.value, item]);
        }
      } else {
        this.set(
          this.value.filter(
            (item2) => item2[this.itemValue] !== item[this.itemValue],
          ),
        );
      }
    },
    clearData() {
      this.set([]);
    },
    focusDiv() {
      this.HTMLList.focus();
    },
  },
  watch: {
    isShow() {
      if (!this.isShow && this.blur) {
        this.blur();
      }
    },
    value() {
      if (!this.isShow && this.blur) {
        this.blur();
      }
    },
  },
  mounted() {
    this.HTMLList = this.$el.querySelector(".v-select__selections");
    this.HTMLList.setAttribute("tabindex", 1);
    this.hideDetails =
      this.$attrs["hide-details"] || this.$attrs["hide-details"] === true;
    this.returnObject =
      this.$attrs["return-object"] || this.$attrs["return-object"] === true;
    this.itemValue = this.$attrs["item-value"] || "value";
    this.itemText = this.$attrs["item-text"] || "text";
  },
};
</script>
<style lang="scss">
.v-list.overflow-hidden.listItem.v-sheet.theme--light {
  max-height: 300px !important;
  overflow-y: auto !important;
}
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
      display: none;
    }
  }
  &_chip {
    height: 20px !important;
    max-width: 100px;
    &_text {
      max-width: 80px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
div:focus {
  outline: 0px solid transparent;
}
.turnUp {
  .turnUp {
    transform: rotate(180deg);
    transition: 0.3s;
  }
}
</style>
