<template>
  <div class="home-admin d-flex h-100">
    <div class="h-100 flex-1 d-flex p-relative">
      <gmap-map
        :center="center"
        :zoom="14"
        style="width: 100%; flex: 1"
        @click="handleClick"
      >
        <RoutingWithMarker
          v-if="locations"
          v-for="item in locations"
          :key="locations._id"
          :info="item"
          :filter="filter"
        />
        <GmapInfoWindow />
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
        <template v-if="showGrid">
          <gmap-polygon
            v-for="(item, index) in genPolygons()"
            :key="index"
            :paths="item.path"
            :options="{ ...item }"
          />
        </template>
      </gmap-map>
      <div class="rounded elevation-1 pa-2 instruction">
        <Instruction />
      </div>
    </div>
    <div class="white elevation-5 pa-2 overflow-auto" style="width: 400px">
      <v-tabs
        v-model="tab"
        grow
        class="mx-auto text-center w-100"
        color="primary"
        background-color="transparent"
        slider-color="primary"
      >
        <v-tab key="init">
          <h6>Tạo</h6>
        </v-tab>
        <v-tab key="monitor">
          <h6>Monitoring</h6>
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item key="init" class="pa-4">
          <template v-if="isDemo">
            <h6 class="mb-2">1. Tạo taxi</h6>
            <v-form ref="formCreateTaxiRef">
              <v-text-field
                label="Vị trí"
                readonly
                :value="formCreateTaxi.positionName"
                append-icon="mdi-crosshairs-gps"
                @click:append="getCursorPosition"
                :rules="[rules.required]"
              />
              <v-text-field
                label="Tên taxi"
                v-model="formCreateTaxi.name"
                :rules="[rules.required]"
              />
              <v-btn class="ma-2" small @click="resetFormCreateTaxi">
                <v-icon small>mdi-backup-restore</v-icon>
                Đặt lại
              </v-btn>
              <v-btn color="primary" small class="ma-2">
                <v-icon small>mdi-plus</v-icon>
                Tạo taxi
              </v-btn>
            </v-form>
          </template>
          <template>
            <h6 class="mb-2">{{ isDemo ? 2 : 1 }}. Tạo request</h6>
            <v-form ref="formCreateRequestRef">
              <v-select label="Người dùng" />
              <v-text-field
                label="Điểm đón"
                readonly
                :value="formCreateTaxi.positionName"
                append-icon="mdi-crosshairs-gps"
                @click:append="getCursorPosition"
                :rules="[rules.required]"
              />
              <v-text-field
                label="Điểm trả"
                readonly
                :value="formCreateTaxi.positionName"
                append-icon="mdi-crosshairs-gps"
                @click:append="getCursorPosition"
                :rules="[rules.required]"
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
              <v-btn
                class="ma-2"
                small
                color="primary"
                @click="createRideRequest"
              >
                <v-icon small>mdi-plus</v-icon>
                Tạo request
              </v-btn>
            </v-form>
          </template>
          <template v-if="isDemo">
            <h6 class="mb-2">3. Khác (chỉ dành cho kiểm thử)</h6>
            <v-btn color="error" small class="mr-2">Xoá hết lịch trình</v-btn>
            <v-btn color="error" small class="mr-2">Xoá hết taxi</v-btn>
            <v-btn color="info" class="mt-2" small @click="showGrid = !showGrid"
              >Hiển thị lưới
            </v-btn>
          </template>
        </v-tab-item>
        <v-tab-item key="monitor" class="pa-4">
          <v-row>
            <v-col>
              <v-select
                prepend-inner-icon="mdi-filter"
                label="Loại hiển thị"
                :items="filterOptions"
                v-model="filter"
              />
              <v-select
                prepend-inner-icon="mdi-filter"
                label="Hiển thị taxi"
                :items="[]"
                v-model="filterTaxi"
                clearable
              />
            </v-col>
          </v-row>
          <v-expansion-panels class="flex-1 overflow-y-auto elevation-3">
            <transition-group
              name="list-transition"
              tag="div"
              move-class="list-transition-move"
            >
              <v-expansion-panel
                v-if="locationsWS"
                v-for="item in locationsWS"
                :key="item.id"
              >
                <v-expansion-panel-header
                  >Update - {{ item.id }}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <p>Taxi: {{ item.taxiLocations.taxi_name }}</p>
                  <p>
                    Số lượng hành khách:
                    {{ item.taxiLocations.current_capacity }}
                  </p>
                  <p>
                    Bắt đầu lúc:
                    {{ unixToTime(item.taxiLocations.schedule.starts_at) }}
                  </p>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </transition-group>
          </v-expansion-panels>
        </v-tab-item>
        <v-tab-item key="grouping" class="pa-4">
          <template>
            <h6 class="mb-2">Tạo</h6>
          </template>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia/dist/pinia";
import { useLocation } from "@/store/location";
import Instruction from "@/components/Instruction";
import RoutingWithMarker from "@/components/RoutingWithMarker";
import io from "socket.io-client";

import { GET_ADDRESS_FROM_LATLNG, GET_TAXI_LIST } from "@/services/location";
import moment from "moment";
import { formattedTime, unixToTime, rules } from "@/utils/utilities";
import {
  filterOptions,
  formCreateRideRequest,
  formCreateTaxi,
} from "@/utils/constant";
import { genPolygons } from "@/utils/map";

export default {
  name: "HomeAdmin",
  components: { RoutingWithMarker, Instruction },
  data: () => ({
    showGrid: false,
    locations: null,
    locationsWS: [],
    filterOptions,
    filter: 0,
    filterTaxi: 0,
    tab: "init",
    mapCursor: null,
    google: google,
    formCreateTaxi: structuredClone(formCreateTaxi),
    formCreateRequest: structuredClone(formCreateRideRequest),
    rules,
    isDemo: Boolean(JSON.parse(localStorage.getItem("isDemo"))),
  }),
  methods: {
    async getTaxiList() {
      this.loading(true);
      GET_TAXI_LIST().then((res) => {
        this.loading(false);
        this.locations = res.data;
      });
    },
    async getCursorPosition() {
      try {
        const { lat, lng } = this.mapCursor;
        if (lat && lng) {
          this.loading(true);
          GET_ADDRESS_FROM_LATLNG(lat, lng)
            .then((res) => {
              this.formCreateTaxi.positionName =
                res.data.results[0].formatted_address;
              this.formCreateTaxi.position = this.mapCursor;
            })
            .finally(() => {
              this.loading(false);
            });
        }
      } catch (e) {}
    },
    resetFormCreateRequest() {
      this.formCreateRequest = structuredClone(formCreateRideRequest);
      this.$refs.formCreateRequestRef.resetValidation();
    },
    resetFormCreateTaxi() {
      this.formCreateTaxi = structuredClone(formCreateTaxi);
      this.$refs.formCreateTaxiRef.resetValidation();
    },
    createRideRequest() {
      console.log(this.formCreateRequest);
    },
    websocketConnect() {
      const socket = io("http://45.32.102.194:4001");

      socket.on("connect", () => {
        console.log("Connected to server");
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from server");
      });

      socket.on("SCHEDULE_UPDATED", (taxiLocations) => {
        this.alert.info("Yêu cầu đi xe mới đã được tạo");
        this.getTaxiList();
        this.locationsWS = [
          { taxiLocations, id: moment().format("HH:mm:ss") },
          ...this.locationsWS,
        ];
      });
    },
    genPolygons,
    unixToTime,
    handleClick(e) {
      this.mapCursor = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
    },
    formattedTime,
  },
  mounted() {
    this.getTaxiList();
    // this.websocketConnect();
  },
  computed: {
    ...mapState(useLocation, ["center"]),
  },
};
</script>
<style lang="scss">
.home-admin {
  .instruction {
    width: 120px;
    position: absolute;
    bottom: 5px;
    right: 5px;
    background: #ffffffe6;
  }

  .v-slider__thumb-label {
    font-size: 10px;
  }

  .list-transition-enter-active,
  .list-transition-leave-active,
  .list-transition-move {
    transition: all 0.5s;
  }

  .list-transition-enter {
    transform: translateY(-30px);
    opacity: 0;
  }

  .list-transition-enter-to {
    transform: translateY(0);
    opacity: 1;
  }

  .list-transition-move {
    transform: translateY(20px);
  }

  .v-item-group.theme--light.v-expansion-panels > div {
    width: 100%;
  }
}
</style>
