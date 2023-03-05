<template>
  <div>
    <DrawRoutingMultipleMarker
      v-if="filter !== 1"
      travelMode="DRIVING"
      :waypoints="waypoints"
      :capacity="capacity"
    />
    <gmap-info-window
      :position="marker.infoWindowPos"
      :opened="marker.infoWinOpen"
      @closeclick="marker.infoWinOpen = false"
    >
      <div>
        <h6 class="d-flex align-center gap-1">
          <img src="@/assets/stopwatch.png" alt="" style="height: 20px" />
          Khoảng thời gian trả
        </h6>
        <div class="d-flex gap-2 mt-2 text-caption">
          {{ marker.time }}
        </div>
      </div>
    </gmap-info-window>
    <gmap-marker
      v-if="filter !== 1"
      v-for="(item, key) in waypoints"
      :key="key"
      :position="item"
      :icon="{
        url: require('@/assets/marker.png'),
        size: { width: 35, height: 35, f: 'px', b: 'px' },
        scaledSize: { width: 35, height: 35, f: 'px', b: 'px' },
      }"
      @click="() => toggleInfoWindow(item, key)"
    />
    <TaxiMarker
      v-if="filter !== 2"
      :position="taxiPosition"
      :click="() => toggleInfoWindowTaxi(taxiPosition, taxiName, info._id)"
    />
    <gmap-info-window :position="taxi.infoWindowPos" :opened="taxi.infoWinOpen">
      <div>
        <h6 class="d-flex align-center gap-1">
          <img src="@/assets/taxi-driver.png" alt="" style="height: 20px" />
          {{ taxi.name }}
        </h6>
        <v-btn color="primary" x-small block class="mt-2"
          >Hiển thị mỗi taxi này
        </v-btn>
        <div class="d-flex gap-2 mt-2">
          <v-btn color="error" x-small>Xoá taxi</v-btn>
          <v-btn color="error" x-small>Xoá lịch trình</v-btn>
        </div>
      </div>
    </gmap-info-window>
  </div>
</template>

<script>
import DrawRoutingMultipleMarker from "@/components/DrawRoutingMultipleMarker";
import TaxiMarker from "@/components/TaxiMarker";
import { randomNumberLatLng, unixToTime } from "@/utils/utilities";

export default {
  components: {
    TaxiMarker,
    DrawRoutingMultipleMarker,
  },
  props: ["info", "filter"],
  name: "RoutingWithMarker",
  inheritAttrs: true,
  data: () => ({
    marker: {
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,
      time: "",
    },
    taxi: {
      infoWindowPos: null,
      infoWinOpen: false,
      currentMidx: null,
      name: "",
    },
  }),
  methods: {
    toggleInfoWindow: function (marker, idx) {
      this.marker.infoWindowPos = marker;
      this.marker.time = `${marker.firstTime}-${marker.lastTime}`;
      if (this.marker.currentMidx === idx) {
        this.marker.infoWinOpen = !this.marker.infoWinOpen;
      } else {
        this.marker.infoWinOpen = true;
        this.marker.currentMidx = idx;
      }
    },
    toggleInfoWindowTaxi(taxi, taxiName, idx) {
      this.taxi.infoWindowPos = taxi;
      this.taxi.name = taxiName;
      if (this.taxi.currentMidx === idx) {
        this.taxi.infoWinOpen = !this.taxi.infoWinOpen;
      } else {
        this.taxi.infoWinOpen = true;
        this.taxi.currentMidx = idx;
      }
    },
  },
  computed: {
    waypoints() {
      return this.info.s.nodes.map((item) => ({
        lat: item.p[0] + randomNumberLatLng(),
        lng: item.p[1] + randomNumberLatLng(),
        firstTime: unixToTime(item.wp[0]),
        lastTime: unixToTime(item.wp[1]),
      }));
    },
    capacity() {
      return this.info.current_capacity;
    },
    taxiPosition() {
      return {
        lat: this.info.l[0] + randomNumberLatLng(),
        lng: this.info.l[1] + randomNumberLatLng(),
      };
    },
    taxiName() {
      return this.info.name;
    },
  },
};
</script>
