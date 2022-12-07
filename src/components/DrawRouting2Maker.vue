<script>
import { MapElementFactory } from "vue2-google-maps";

export default MapElementFactory({
  name: "DrawRoutingMultipleMarker",

  ctr() {
    return google.maps.DirectionsRenderer;
  },

  events: [],

  mappedProps: {},

  props: {
    origin: { type: Object },
    destination: { type: Object },
    travelMode: { type: String },
  },

  afterCreate(directionsRenderer) {
    let directionsService = new google.maps.DirectionsService();

    this.$watch(
      () => [this.origin, this.destination, this.travelMode],
      () => {
        let { origin, destination, travelMode } = this;
        if (!origin || !destination || !travelMode) return;

        directionsService.route(
          {
            origin,
            destination,
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
