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

export default Vue.extend({
  data: () => ({
    markers: [],
    places: [],
    currentPlace: null,
  }),
  name: "DefaultDriver",
  components: { NavBar },
  methods: {
    changeCenter(location) {
      this.setCenter({
        lat: location.geometry.location.lat(),
        lng: location.geometry.location.lng(),
      });
    },
    async getCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
          },
          (err) => {
            console.log(err.message);
          },
        );
      } else {
        console.log("123");
      }
    },
    locationToValue(v) {
      if (v)
        return {
          lat: v.geometry.location.lat(),
          lng: v.geometry.location.lng(),
        };
    },
    // geolocate: function () {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     this.center = {
    //       lat: position.coords.latitude,
    //       lng: position.coords.longitude,
    //     };
    //   });
    // },
    ...mapActions(useLocation, ["setCenter"]),
  },
  mounted() {
    // this.geolocate();
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
