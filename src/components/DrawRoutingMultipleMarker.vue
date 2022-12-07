<script>
import { MapElementFactory } from "vue2-google-maps";

export default MapElementFactory({
  name: "DrawRouting2Marker",

  ctr() {
    return google.maps.DirectionsRenderer;
  },

  events: [],

  mappedProps: {},

  props: {
    waypoints: { type: Array },
    travelMode: { type: String },
  },

  afterCreate(directionsRenderer) {
    directionsRenderer.setOptions({ suppressMarkers: true });
    let directionsService = new google.maps.DirectionsService();
    this.$watch(
      () => [this.waypoints, this.travelMode],
      () => {
        let { waypoints, travelMode } = this;
        if (!waypoints || waypoints.length < 2 || !travelMode) return;
        directionsService.route(
          {
            origin: waypoints[0],
            destination: waypoints[waypoints.length - 1],
            waypoints: waypoints.slice(1, -1).map((item) => toLatLng(item)),
            travelMode,
          },
          (response, status) => {
            if (status !== "OK") return;
            directionsRenderer.setDirections(response);
          },
        );
      },
    );
  },
});
</script>
