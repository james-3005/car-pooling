<template>
  <div class="map-handle d-flex h-100">
    <div class="h-100 flex-1 d-flex p-relative">
      <gmap-map
        :center="center"
        :zoom="14"
        style="width: 100%; flex: 1"
        @click="handleClick"
      >
        <RoutingWithMarker
          v-if="locations"
          v-for="(item, index) in locations"
          :key="index + 'schedule'"
          :info="item"
          :hideAction="true"
          :listValidUser="listValidUser"
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
        <h6 class="mb-2">Create ride request</h6>
        <v-form ref="formCreateRequestRef">
          <v-text-field
            v-model="formCreateRequest.startName"
            label="Pick up"
            hide-no-data
            :rules="[rules.required]"
            :menu-props="{ maxWidth: '368px' }"
            @click:append="() => getCursorPosition('start')"
            append-icon="mdi-crosshairs-gps"
          />
          <v-text-field
            v-model="formCreateRequest.destinationName"
            label="Drop off"
            hide-no-data
            :rules="[rules.required]"
            @click:append="() => getCursorPosition('end')"
            append-icon="mdi-crosshairs-gps"
          />
          <v-subheader>Pick up time (expect)</v-subheader>
          <v-slider
            :min="0"
            :max="1440"
            :step="5"
            ticks-labels
            tick-size="3"
            thumb-label="always"
            v-model="formCreateRequest.wpn"
            :rules="[rules.required]"
          >
            <template #thumb-label="{ value }">
              {{ formattedTime(value) }}
            </template>
          </v-slider>
          <v-subheader>Drop off time (expect)</v-subheader>
          <v-slider
            :min="0"
            :max="1440"
            :step="5"
            thumb-label="always"
            ticks-labels
            tick-size="3"
            v-model="formCreateRequest.wdn"
            :rules="[
              rules.required,
              (drop) => rules.isGreaterThanPick(formCreateRequest.wpn, drop),
            ]"
          >
            <template #thumb-label="{ value }">
              {{ formattedTime(value) }}
            </template>
          </v-slider>
          <v-btn class="ma-2" small @click="resetFormCreateRequest">
            <v-icon small>mdi-backup-restore</v-icon>
            Reset
          </v-btn>
          <v-btn class="ma-2" small color="primary" @click="createRideRequest">
            <v-icon small>mdi-plus</v-icon>
            Create request
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
  GET_TAXI_LIST,
  ONLINE_BOOKING,
} from "@/services/location";
import moment from "moment";
import { formattedTime, rules } from "@/utils/utilities";
import Instruction from "@/components/Instruction";
import { debounce } from "lodash";
import { rideRequest } from "@/services/rideRequest";
import { getAllUser } from "@/services/auth";

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
    selectedLocation: null,
    disabledUpdateLocation: true,
    locations: [],
    listValidUser: [],
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
                this.formCreateRequest.o = structuredClone([
                  this.mapCursor.lat,
                  this.mapCursor.lng,
                ]);
              } else {
                this.formCreateRequest.destinationName =
                  res.data.results[0].formatted_address;
                this.formCreateRequest.d = structuredClone([
                  this.mapCursor.lat,
                  this.mapCursor.lng,
                ]);
              }
            })
            .finally(() => {
              this.loading(false);
              // this.disabledUpdateLocation = false;
            });
        }
      } catch (e) {
        this.alert.warning("Please select location on the map");
      }
    },
    handleClick(e) {
      this.mapCursor = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
    },
    async createRideRequest() {
      if (!this.$refs.formCreateRequestRef.validate()) return;
      const newFormCreate = structuredClone(this.formCreateRequest);
      newFormCreate.wp = [
        moment(
          `02-04-2023 ${formattedTime(newFormCreate.wpn)}`,
          "DD-MM-YYYY HH:mm",
        ).format(),
        moment(
          `02-04-2023 ${formattedTime(newFormCreate.wpn + 5)}`,
          "DD-MM-YYYY HH:mm",
        ).format(),
      ];
      newFormCreate.wd = [
        moment(
          `02-04-2023 ${formattedTime(newFormCreate.wdn)}`,
          "DD-MM-YYYY HH:mm",
        ).format(),
        moment(
          `02-04-2023 ${formattedTime(newFormCreate.wdn + 5)}`,
          "DD-MM-YYYY HH:mm",
        ).format(),
      ];
      newFormCreate.t = moment(
        `02-04-2023 ${formattedTime(newFormCreate.wpn) - 7}`,
        "DD-MM-YYYY HH:mm",
      ).format();
      const { wpn, wdn, startName, destinationName, ...params } = newFormCreate;
      try {
        this.loading(true);
        const { data } = await rideRequest(params);
        this.alert.success(
          `Create request successfully. \n ${data?.taxi_driver_name}-${data?.taxi_license_plate}`,
        );
        this.getTaxiList(data.taxi_id);
      } catch (e) {
        this.alert.error("Create request failed");
      } finally {
        this.loading(false);
      }
    },
    async getTaxiList(taxiId) {
      this.loading(true);
      GET_TAXI_LIST().then((res) => {
        this.loading(false);
        this.locations = res.data?.filter((item) => item._id === taxiId);
      });
    },
    ...mapActions(useLocation, ["setCenter"]),
  },
  mounted() {
    getAllUser().then((res) => {
      this.listValidUser = res.data
        .filter((item) => item.role === "USER" && !item.is_driver)
        .map((item) => ({
          text: item.name,
          value: item._id,
        }));
    });
  },
  computed: {
    ...mapState(useLocation, ["location", "center"]),
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
