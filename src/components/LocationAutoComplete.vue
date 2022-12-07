<template>
  <v-text-field
    :id="passId"
    v-bind="$attrs"
    v-on="$listeners"
    dense
    outlined
    :readonly="false"
    append-icon="mdi-map-marker-radius"
    @click:append="clickAppend"
  />
</template>

<script>
import { GET_ADDRESS_FROM_LOCATION } from "@/services/location";

export default {
  name: "LocationAutoComplete",
  data: () => ({}),
  props: ["passId"],
  methods: {
    async clickAppend() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          GET_ADDRESS_FROM_LOCATION(lat, lng).then((res) => {
            try {
              console.log(res.data);
              this.$emit("input", res.data.results[0].formatted_address);
              this.$emit("location", { lat, lng });
            } catch (e) {
              console.log("max request");
            }
          });
        },
        () => {},
        {
          enableHighAccuracy: true,
        },
      );
    },
  },
  mounted() {
    let autoComplete = new google.maps.places.Autocomplete(
      document.getElementById(this.passId),
      {
        bounds: new google.maps.LatLngBounds(
          new google.maps.LatLng(21.028511, 105.804817),
        ),
      },
    );
    setTimeout(() => {
      document.getElementById(this.passId).setAttribute("placeholder", "");
    }, 0);

    autoComplete.addListener("place_changed", () => {
      const location = autoComplete.getPlace().geometry.location;
      this.$emit("location", { lat: location.lat(), lng: location.lng() });
      this.$emit("input", autoComplete.getPlace().formatted_address);
    });
  },
};
</script>

<style lang="scss">
.pac-item {
  padding: 10px;
  cursor: pointer;
}

.pac-item:hover {
  background-color: #ececec;
}

.pac-item-query {
  font-size: 14px;
}

.pac-container {
  min-width: 320px;
}

.pac-container:after {
  display: none;
}
</style>
