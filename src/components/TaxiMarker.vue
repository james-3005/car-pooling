<template>
  <GmapMarker
    v-if="position"
    :position="position"
    :draggable="false"
    :editable="false"
    :icon="{
      url: require('@/assets/taxi.png'),
      size: { width: 70, height: 38, f: 'px', b: 'px' },
      scaledSize: { width: 70, height: 38, f: 'px', b: 'px' },
    }"
  />
</template>
<script>
export default {
  props: ["position"],
  name: "TaxiMarker",
};
</script>
