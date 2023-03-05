<template>
  <GmapMarker
    v-if="position"
    :position="position"
    :draggable="false"
    :editable="false"
    :icon="{
      url: require('@/assets/taxi.png'),
      size: { width: 42, height: 42, f: 'px', b: 'px' },
      scaledSize: { width: 42, height: 42, f: 'px', b: 'px' },
    }"
    @click="click"
  />
</template>
<script>
export default {
  props: ["position", "click"],
  name: "TaxiMarker",
};
</script>
