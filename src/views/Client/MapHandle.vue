<template>
  <v-navigation-drawer
    :value="true"
    absolute
    temporary
    bottom
    class="map-handle"
  >
    <div class="h-100 d-flex flex-column">
      <gmap-map :center="center" :zoom="14" style="width: 100%; flex: 1">
        <gmap-marker
          v-if="location.start"
          :position="location.start"
          @click="() => changeCenter(location.start)"
          :icon="{
            url: require('@/assets/marker.png'),
            size: { width: 40, height: 40, f: 'px', b: 'px' },
            scaledSize: { width: 40, height: 40, f: 'px', b: 'px' },
          }"
        />
        <gmap-marker
          v-if="location.end"
          :position="location.end"
          @click="() => changeCenter(location.end)"
          :icon="{
            url: require('@/assets/marker.png'),
            size: { width: 40, height: 40, f: 'px', b: 'px' },
            scaledSize: { width: 40, height: 40, f: 'px', b: 'px' },
          }"
        />
        <CurrentPosition :position="now" />
        <DrawRoutingMultipleMarker
          travelMode="DRIVING"
          :waypoints="[location.start, location.end]"
        />
      </gmap-map>
      <div class="white elevation-5">
        <div
          class="d-flex gap-10 align-center py-2 px-4"
          style="background: #f3f4f6"
        >
          <div class="d-flex gap-3">
            <v-icon small class="icon-success">mdi-map-marker-distance</v-icon>
            <p class="text-caption mb-0 font-weight-bold">Khoảng cách: 7Km</p>
          </div>
          <div class="d-flex gap-3">
            <v-icon small class="icon-success">mdi-cash</v-icon>
            <p class="text-caption mb-0 font-weight-bold">Tiền mặt: 38k</p>
          </div>
          <v-icon small class="ml-auto">mdi-chevron-right</v-icon>
        </div>
        <div class="pa-4 d-flex gap-2 align-center">
          <v-btn class="elevation-1" fab x-small @click="$router.push('/')">
            <v-icon dark> mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn class="flex-1 success">Đặt xe</v-btn>
        </div>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script>
import NavBar from "@/components/layout/NavBar.vue";
import Vue from "vue";
import { mapActions } from "pinia/dist/pinia";
import { useLocation } from "@/store/location";
import { mapState } from "pinia";
import CurrentPosition from "@/components/CurrentLocation";
import TaxiMarker from "@/components/TaxiMarker";
import DrawRoutingMultipleMarker from "@/components/DrawRoutingMultipleMarker";

export default Vue.extend({
  data: () => ({
    markers: [],
    places: [],
    currentPlace: null,
    now: null,
  }),
  name: "MapHandle",
  components: {
    TaxiMarker,
    CurrentPosition,
    NavBar,
    DrawRoutingMultipleMarker,
  },
  methods: {
    changeCenter(location) {
      this.setCenter(location);
    },
    geolocate() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.now = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
        },
        () => {},
        {
          enableHighAccuracy: true,
        },
      );
    },
    ...mapActions(useLocation, ["setCenter"]),
  },
  mounted() {
    this.geolocate();
  },

  computed: {
    ...mapState(useLocation, ["location", "center"]),
  },
});
</script>

<style lang="scss">
.map-handle {
  max-height: 100% !important;

  .icon-success {
    color: #2268af;
  }
}
</style>
