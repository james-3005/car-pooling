<template>
  <div>
    <DrawRoutingMultipleMarker
      travelMode="DRIVING"
      :waypoints="waypoints"
      :capacity="capacity"
      v-if="waypoints.length"
    />
    <gmap-info-window
      :position="marker.infoWindowPos"
      :opened="marker.infoWinOpen"
      @closeclick="marker.infoWinOpen = false"
    >
      <div>
        <h4 class="d-flex align-center gap-1 text-h6">
          <img src="@/assets/stopwatch.png" alt="" style="height: 20px" />
          Timeline
        </h4>
        <div class="mt-2 text-subtitle-1">
          <h5
            class="d-block"
            v-if="
              !!listValidUser &&
              !!listValidUser.find((user) => user.value === marker.userId)
            "
          >
            {{
              listValidUser.find((user) => user.value === marker.userId).text
            }}
          </h5>
          <h5>{{ marker.time }}</h5>
        </div>
      </div>
    </gmap-info-window>
    <gmap-marker
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
      :position="taxiPosition"
      :click="() => toggleInfoWindowTaxi(taxiPosition, taxiName, info._id)"
    />
    <gmap-info-window :position="taxi.infoWindowPos" :opened="taxi.infoWinOpen">
      <div>
        <h5 class="d-flex align-center gap-1 text-h6">
          <img src="@/assets/taxi-driver.png" alt="" style="height: 20px" />
          {{ info.driver_name }} - {{ info.license_plate }}
        </h5>
        <h5
          v-if="info.s.total_vnd"
          class="mt-2 success--text text-subtitle-1 font-weight-bold"
        >
          {{ formatCurrency(info.s.total_vnd) }} -
          {{ info.s.total_kilometers + " Km" }}
        </h5>
        <v-btn
          color="primary"
          x-small
          block
          class="mt-2"
          @click="() => $emit('filterTaxi', info._id)"
          v-if="!hideAction"
          >Show only this Schedule
        </v-btn>
        <v-btn
          v-if="!hideAction"
          color="error"
          x-small
          block
          class="mt-2"
          @click="() => $emit('clearSchedule', info._id)"
          >Clear Schedule
        </v-btn>
      </div>
    </gmap-info-window>
  </div>
</template>

<script>
import DrawRoutingMultipleMarker from "@/components/DrawRoutingMultipleMarker";
import TaxiMarker from "@/components/TaxiMarker";
import { formatCurrency, unixToTime } from "@/utils/utilities";

export default {
  components: {
    TaxiMarker,
    DrawRoutingMultipleMarker,
  },
  props: ["info", "hideAction", "listValidUser"],
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
      this.marker.userId = marker.userId;
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
    formatCurrency,
  },
  computed: {
    waypoints() {
      return this.info.s.nodes.map((item) => ({
        lat: item.p[0],
        lng: item.p[1],
        firstTime: unixToTime(item.wp[0]),
        lastTime: unixToTime(item.wp[1]),
        userId: item.user_id,
      }));
    },
    capacity() {
      return this.info.current_capacity;
    },
    taxiPosition() {
      return {
        lat: this.info.l[0],
        lng: this.info.l[1],
      };
    },
    taxiName() {
      return this.info.name;
    },
  },
};
</script>
