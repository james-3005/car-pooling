<script>
import { MapElementFactory } from "vue2-google-maps";
import { itemColor } from "@/utils/constant";

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
    capacity: { type: Number },
  },

  afterCreate(directionsRenderer) {
    directionsRenderer.setOptions({
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: itemColor.find((item) => item.cap === this.capacity).color,
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
      () => [this.waypoints, this.travelMode, this.capacity],
      () => {
        directionsRenderer.setOptions({
          suppressMarkers: true,
          polylineOptions: {
            strokeColor: itemColor.find((item) => item.cap === this.capacity)
              .color,
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
