<template>
  <GmapMarker
    v-if="position"
    :position="position"
    :draggable="false"
    :editable="false"
    :icon="{
      url: require('@/assets/currentLocation.png'),
      size: { width: 40, height: 40, f: 'px', b: 'px' },
      scaledSize: { width: 40, height: 40, f: 'px', b: 'px' },
    }"
  />
</template>
<script>
export default {
  props: ["position"],
  name: "CurrentLocation",
};
</script>
