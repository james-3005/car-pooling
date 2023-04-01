<template>
  <div>
    <RoutingMultipleMarkerWithColor
      travelMode="DRIVING"
      :waypoints="waypoints || []"
      :color="color"
    />
    <gmap-marker
      v-for="(item, key) in waypoints"
      :key="key"
      :position="item"
      :icon="{
        url: getUrl(),
        size: { width: 35, height: 35, f: 'px', b: 'px' },
        scaledSize: { width: 35, height: 35, f: 'px', b: 'px' },
      }"
      :draggable="true"
      @dragend="(e) => updateLocation(e, key)"
    />
  </div>
</template>

<script>
import RoutingMultipleMarkerWithColor from "@/components/RoutingMultipleMarkerWithColor";

export default {
  components: {
    RoutingMultipleMarkerWithColor,
  },
  props: ["waypoints", "color"],
  name: "RoutingWithMarker",
  inheritAttrs: true,
  data: () => ({}),
  methods: {
    updateLocation(e, index) {
      this.$emit("updateLocation", {
        location: {
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        },
        index,
      });
    },
    getUrl() {
      switch (this.color) {
        case "#2B3467":
          return require("@/assets/marker2.png");
        case "#FFB84C":
          return require("@/assets/marker3.png");
        case "#4E6C50":
          return require("@/assets/marker4.png");
        case "#3A98B9":
          return require("@/assets/marker5.png");
        case "#473C33":
          return require("@/assets/marker6.png");
        default:
          return require("@/assets/marker.png");
      }
    },
  },
};
</script>
