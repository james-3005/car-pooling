<script>
import { MapElementFactory } from "vue2-google-maps";

export default MapElementFactory({
  name: "DrawRoutingColor",

  ctr() {
    return google.maps.DirectionsRenderer;
  },

  events: [],

  mappedProps: {},

  props: {
    waypoints: { type: Array },
    travelMode: { type: String },
    color: { type: String, default: "#609EA2" },
  },

  afterCreate(directionsRenderer) {
    directionsRenderer.setOptions({
      suppressMarkers: true,
      preserveViewport: true,
      polylineOptions: {
        strokeColor: this.color,
        strokeWeight: 4,
      },
    });
    let directionsService = new google.maps.DirectionsService();
    let { waypoints, travelMode } = this;
    if (waypoints && waypoints.length >= 2 && travelMode)
      directionsService.route(
        {
          origin: waypoints[0],
          destination: waypoints[waypoints.length - 1],
          waypoints: waypoints
            .slice(1, -1)
            .map((item) => ({ location: { ...item }, stopover: true })),
          travelMode,
        },
        (response, status) => {
          if (status !== "OK") return;
          directionsRenderer.setDirections(response);
        },
      );
    this.$watch(
      () => [this.waypoints, this.travelMode, this.color],
      () => {
        directionsRenderer.setOptions({
          suppressMarkers: true,
          polylineOptions: {
            strokeColor: this.color,
            strokeWeight: 4,
          },
        });
        let { waypoints, travelMode } = this;
        if (!waypoints || waypoints.length < 2 || !travelMode) return;
        directionsService.route(
          {
            origin: waypoints[0],
            destination: waypoints[waypoints.length - 1],
            waypoints: waypoints
              .slice(1, -1)
              .map((item) => ({ location: { ...item }, stopover: true })),
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
