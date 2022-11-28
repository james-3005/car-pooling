<template>
  <v-text-field
    :id="passId"
    v-bind="$attrs"
    v-on="$listeners"
    dense
    outlined
  />
</template>

<script>
export default {
  name: "LocationAutoComplete",
  data: () => ({}),
  props: ["passId"],
  mounted() {
    let autoComplete = new google.maps.places.Autocomplete(
      document.getElementById(this.passId),
      {
        bounds: new google.maps.LatLngBounds(
          new google.maps.LatLng(21.028511, 105.804817)
        ),
      }
    );
    setTimeout(() => {
      document.getElementById(this.passId).setAttribute("placeholder", "");
    }, 0);

    autoComplete.addListener("place_changed", () => {
      this.$emit("location", autoComplete.getPlace());
    });
  },
};
</script>

<style lang="scss">
.pac-item {
  padding: 10px;
  //font-size: 16px;
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
