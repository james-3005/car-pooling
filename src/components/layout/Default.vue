<template>
  <v-app id="inspire">
    <NavBar />
    <v-main>
      <v-container fluid class="my-container pa-0 d-flex flex-column h-100">
        <gmap-map :center="center" :zoom="16" style="width: 100%; height: 100%">
          <gmap-marker
            v-if="location.startLocation"
            :position="locationToValue(location.startLocation)"
            @click="() => changeCenter(location.startLocation)"
          />
          <gmap-marker
            v-if="location.endLocation"
            :position="locationToValue(location.endLocation)"
            @click="() => changeCenter(location.endLocation)"
          />
          <CurrentPosition :position="now" />
          <!--          <gmap-polyline-->
          <!--            v-if="location.startLocation && location.endLocation"-->
          <!--            :path="[-->
          <!--              locationToValue(location.startLocation),-->
          <!--              locationToValue(location.endLocation),-->
          <!--            ]"-->
          <!--            v-bind:options="{ strokeColor: '#008000' }"-->
          <!--          />-->
          <!--          <MapElementFactory-->
          <!--            travelMode="DRIVING"-->
          <!--            :origin="locationToValue(location.startLocation)"-->
          <!--            :destination="locationToValue(location.endLocation)"-->
          <!--          />-->
          <DrawRoutingMultipleMarker
            travelMode="DRIVING"
            :waypoints="[
              locationToValue(location.startLocation),
              locationToValue(location.endLocation),
            ]"
          />
        </gmap-map>
      </v-container>
    </v-main>
  </v-app>
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
  name: "LayoutDefault",
  components: {
    TaxiMarker,
    CurrentPosition,
    NavBar,
    DrawRoutingMultipleMarker,
  },
  methods: {
    changeCenter(location) {
      this.setCenter({
        lat: location.lat,
        lng: location.lng,
      });
    },
    locationToValue(v) {
      if (v)
        return {
          lat: v.lat,
          lng: v.lng,
        };
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
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

<style lang="scss" scoped>
.h-40 {
  height: 40px !important;
}

.screen-title {
  color: #333;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  letter-spacing: 5px;
}

#inspire {
  height: 100vh;
  overflow: auto;
}
</style>
