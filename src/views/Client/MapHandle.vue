<template>
  <div class="map-handle d-flex h-100">
    <div class="h-100 flex-1 d-flex p-relative">
      <gmap-map
        :center="center"
        :zoom="14"
        style="width: 100%; flex: 1"
        @click="handleClick"
      >
        <!--        <RoutingWithMarker-->
        <!--            v-if="locations"-->
        <!--            v-for="item in locations"-->
        <!--            :key="locations._id"-->
        <!--            :info="item"-->
        <!--            :filter="filter"-->
        <!--        />-->
        <!--        <GmapInfoWindow />-->
        <gmap-marker
          v-if="formCreateRequest.start"
          :position="formCreateRequest.start"
          :animation="google.maps.Animation.DROP"
          :icon="{
            url: require('@/assets/marker.png'),
            size: { width: 35, height: 35, f: 'px', b: 'px' },
            scaledSize: { width: 35, height: 35, f: 'px', b: 'px' },
          }"
        />
        <gmap-marker
          v-if="formCreateRequest.destination"
          :position="formCreateRequest.destination"
          :animation="google.maps.Animation.DROP"
          :icon="{
            url: require('@/assets/marker.png'),
            size: { width: 35, height: 35, f: 'px', b: 'px' },
            scaledSize: { width: 35, height: 35, f: 'px', b: 'px' },
          }"
        />
        <gmap-marker
          v-if="mapCursor"
          :position="mapCursor"
          :animation="google.maps.Animation.DROP"
          :draggable="true"
          @dragend="handleClick"
          :icon="{
            url: require('@/assets/pointer.png'),
            size: { width: 35, height: 35, f: 'px', b: 'px' },
            scaledSize: { width: 35, height: 35, f: 'px', b: 'px' },
          }"
        />

        <!--        <template v-if="showGrid">-->
        <!--          <gmap-polygon-->
        <!--              v-for="(item, index) in genPolygons()"-->
        <!--              :key="index"-->
        <!--              :paths="item.path"-->
        <!--              :options="{...item}"-->
        <!--          />-->
        <!--        </template>-->
      </gmap-map>
      <div
        style="
          width: 120px;
          position: absolute;
          bottom: 5px;
          right: 5px;
          background: #ffffffe6;
        "
        class="rounded elevation-1 pa-2"
      >
        <Instruction />
      </div>
    </div>
    <div class="white elevation-5 pa-2 overflow-auto pa-4" style="width: 400px">
      <template>
        <h6 class="mb-2">Đặt xe</h6>
        <v-form ref="formCreateRequestRef">
          <v-autocomplete
            v-model="formCreateRequest.startName"
            :items="itemsSearchListStart"
            label="Điểm đón"
            @change="onLocationChangeStart"
            :search-input.sync="searchStart"
            hide-no-data
            :rules="[rules.required]"
            :menu-props="{ maxWidth: '368px' }"
            @click:append="() => getCursorPosition('start')"
            append-icon="mdi-crosshairs-gps"
          />
          <v-autocomplete
            v-model="formCreateRequest.destinationName"
            :items="itemsSearchListEnd"
            label="Điểm trả"
            @change="onLocationChangeEnd"
            :search-input.sync="searchEnd"
            hide-no-data
            :rules="[rules.required]"
            :menu-props="{ maxWidth: '368px' }"
            @click:append="() => getCursorPosition('end')"
            append-icon="mdi-crosshairs-gps"
          />
          <v-subheader>Khoảng thời gian đón</v-subheader>
          <v-range-slider
            :min="0"
            :max="1440"
            :step="5"
            ticks-labels
            tick-size="3"
            thumb-label="always"
            v-model="formCreateRequest.wp"
            :rules="[rules.required]"
          >
            <template #thumb-label="{ value }">
              {{ formattedTime(value) }}
            </template>
          </v-range-slider>
          <v-subheader>Khoảng thời gian trả</v-subheader>
          <v-range-slider
            :min="0"
            :max="1440"
            :step="5"
            thumb-label="always"
            ticks-labels
            tick-size="3"
            v-model="formCreateRequest.wd"
            :rules="[
              rules.required,
              (drop) => rules.isGreaterThanPick(formCreateRequest.wp, drop),
            ]"
          >
            <template #thumb-label="{ value }">
              {{ formattedTime(value) }}
            </template>
          </v-range-slider>
          <v-btn class="ma-2" small @click="resetFormCreateRequest">
            <v-icon small>mdi-backup-restore</v-icon>
            Đặt lại
          </v-btn>
          <v-btn class="ma-2" small color="primary" @click="createRideRequest">
            <v-icon small>mdi-plus</v-icon>
            Tạo request
          </v-btn>
        </v-form>
      </template>
    </div>
  </div>
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
import DetailDialog from "@/views/Client/DetailDialog";
import { formCreateRequestUser, formCreateRideRequest } from "@/utils/constant";
import RoutingWithMarker from "@/components/RoutingWithMarker";
import {
  GET_ADDRESS_FROM_LATLNG,
  GET_LATLNG_FROM_ADDRESS,
  GET_LOCATION_LIST,
  ONLINE_BOOKING,
} from "@/services/location";
import moment from "moment";
import { formattedTime, rules } from "@/utils/utilities";
import Instruction from "@/components/Instruction";
import { debounce } from "lodash";

export default Vue.extend({
  data: () => ({
    markers: [],
    places: [],
    currentPlace: null,
    now: null,
    openDetail: false,
    response: null,
    formCreateRequest: formCreateRequestUser,
    mapCursor: null,
    formattedTime,
    rules,
    google,
    itemsSearchListStart: [],
    itemsSearchListEnd: [],
    searchEnd: "",
    searchStart: "",
    selectedLocation: null,
    disabledUpdateLocation: true,
  }),
  name: "MapHandle",
  components: {
    Instruction,
    RoutingWithMarker,
    DetailDialog,
    TaxiMarker,
    CurrentPosition,
    NavBar,
    DrawRoutingMultipleMarker,
  },
  methods: {
    changeCenter(location) {
      this.setCenter(location);
    },
    resetFormCreateRequest() {
      this.formCreateRequest = structuredClone(formCreateRideRequest);
      this.$refs.formCreateRequestRef.resetValidation();
    },
    getWayPoint() {
      if (!this.response) return null;
      return this.response.schedule.nodes.slice(0, 25).map((item) => ({
        lat: item.p[1],
        lng: item.p[0],
        eta: item.eta,
        wp: item.wp,
      }));
    },
    async getCursorPosition(type) {
      try {
        const { lat, lng } = this.mapCursor;
        if (lat && lng) {
          this.loading(true);
          this.disabledUpdateLocation = true;
          GET_ADDRESS_FROM_LATLNG(lat, lng)
            .then((res) => {
              if (type === "start") {
                this.formCreateRequest.startName =
                  res.data.results[0].formatted_address;
                this.formCreateRequest.start = this.mapCursor;
                this.searchStart = res.data.results[0].formatted_address;
              } else {
                this.formCreateRequest.destinationName =
                  res.data.results[0].formatted_address;
                this.formCreateRequest.destination = this.mapCursor;
                this.searchEnd = res.data.results[0].formatted_address;
              }
            })
            .finally(() => {
              this.loading(false);
              // this.disabledUpdateLocation = false;
            });
        }
      } catch (e) {
        this.alert.warning("Bạn chưa chọn điểm");
      }
    },
    // async querySearching() {
    //   try {
    //     const {
    //       pickEarly,
    //       pickLate,
    //       dropEarly,
    //       dropLate,
    //       startValue,
    //       endValue,
    //     } = this.$route.query;
    //     const { data } = await ONLINE_BOOKING({
    //       t: moment().toISOString(),
    //       o_alias: startValue,
    //       d_alias: endValue,
    //       wp: [
    //         moment(pickEarly, "HH:mm").toISOString(),
    //         moment(pickLate, "HH:mm").toISOString(),
    //       ],
    //       wd: [
    //         moment(dropEarly, "HH:mm").toISOString(),
    //         moment(dropLate, "HH:mm").toISOString(),
    //       ],
    //     });
    //     this.alert.success("Tìm thấy chuyến đi");
    //     this.response = data;
    //     this.loading(false);
    //   } catch (e) {
    //     this.confirm({
    //       title: "Không tìm thấy chuyến đi",
    //       content: e.response.data.message,
    //       checkAction: () => {},
    //     });
    //     this.loading(false);
    //   }
    // },
    handleClick(e) {
      this.mapCursor = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
    },
    createRideRequest() {},
    onLocationChangeStart() {
      if (this.disabledUpdateLocation) return;
      GET_LATLNG_FROM_ADDRESS(this.searchStart).then((res) => {
        this.formCreateRequest.start = res.data?.results[0]?.geometry?.location;
      });
    },
    onLocationChangeEnd() {
      if (this.disabledUpdateLocation) return;
      GET_LATLNG_FROM_ADDRESS(this.searchEnd).then((res) => {
        this.formCreateRequest.destination =
          res.data?.results[0]?.geometry?.location;
      });
    },
    fetchLocations: debounce(function (value, type) {
      if (!value) {
        if (type === "start") this.itemsSearchListStart = [];
        else this.itemsSearchListEnd = [];
        return;
      }
      GET_LOCATION_LIST(value).then((res) => {
        if (type === "start")
          this.itemsSearchListStart = res.data?.predictions?.map((item) => ({
            text: item.description,
            value: item.description,
          }));
        else
          this.itemsSearchListEnd = res.data?.predictions?.map((item) => ({
            text: item.description,
            value: item.description,
          }));
      });
    }, 800),
    ...mapActions(useLocation, ["setCenter"]),
  },
  computed: {
    ...mapState(useLocation, ["location", "center"]),
  },
  watch: {
    searchStart(value) {
      if (value) this.fetchLocations(value, "start");
    },
    searchEnd(value) {
      if (value) this.fetchLocations(value, "end");
    },
  },
});
</script>

<style lang="scss">
.custom-select .v-list-item__title {
  font-size: 10px;
  height: 24px; /* adjust as needed */
}

.map-handle {
  .v-slider__thumb-label {
    font-size: 10px;
  }

  max-height: 100% !important;

  .icon-success {
    color: #2268af;
  }

  .float-icon {
    bottom: 100px;
    right: 10px;
  }

  .gmnoprint,
  .gm-style-cc {
    display: none;
  }
}
</style>
