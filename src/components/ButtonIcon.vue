<template>
  <v-btn
    tile
    v-bind="$attrs"
    v-on="$listeners"
    :x-small="size === 'x-small'"
    :small="size === 'small'"
    :large="size === 'large'"
    :x-large="size === 'x-large'"
  >
    <v-icon
      dense
      class="mr-2 ButtonIcon_icon"
      :x-small="size === 'x-small'"
      :small="size === 'small'"
      :large="size === 'large'"
      :x-large="size === 'x-large'"
      >{{ icon }}</v-icon
    >
    {{ text }}
  </v-btn>
</template>
<script>
export default {
  props: {
    size: {
      type: String,
    },
    icon: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  inheritAttrs: false,
  name: "ButtonIcon",
};
</script>

<style lang="scss">
.ButtonIcon_icon {
  padding-top: 2px !important;
}
</style>
