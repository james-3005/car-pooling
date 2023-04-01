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
          v-for="(item, index) in filteredTaxi"
          :key="index + 'schedule'"
          :info="item"
          @clearSchedule="clearScheduleTaxi"
          @filterTaxi="(id) => (selectTaxi = id)"
          :listValidUser="listValidUser"
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
    <div class="white elevation-5 pa-2 overflow-auto" style="width: 550px">
      <v-tabs
        v-model="tab"
        grow
        class="mx-auto text-center w-100"
        color="primary"
        background-color="transparent"
        slider-color="primary"
      >
        <v-tab key="init">
          <h6>Create Realtime</h6>
        </v-tab>
        <v-tab key="monitor">
          <h6>Monitoring Realtime</h6>
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item key="init" class="pa-4">
          <template>
            <h6 class="mb-2">1. Create realtime request</h6>
            <v-form ref="formCreateRequestRef">
              <v-select
                label="User"
                :items="listValidUser.filter((item) => !item.ride_request_id)"
                v-model="formCreateRequest.owner"
                :rules="[rules.required]"
                item-text="name"
                item-value="_id"
              />
              <v-text-field
                label="Pick up position"
                readonly
                :value="formCreateRequest.pickup"
                append-icon="mdi-crosshairs-gps"
                @click:append="() => getCursorPosition('pickup')"
                :rules="[rules.required]"
              />
              <v-text-field
                label="Drop off position"
                readonly
                :value="formCreateRequest.dropoff"
                append-icon="mdi-crosshairs-gps"
                @click:append="() => getCursorPosition('dropoff')"
                :rules="[rules.required]"
              />
              <v-subheader>Pick up time (expect)</v-subheader>
              <v-slider
                :min="0"
                :max="1430"
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
                :max="1430"
                :step="5"
                thumb-label="always"
                ticks-labels
                tick-size="3"
                v-model="formCreateRequest.wdn"
                :rules="[
                  rules.required,
                  (drop) =>
                    rules.isGreaterThanPick(formCreateRequest.wpn, drop),
                ]"
              >
                <template #thumb-label="{ value }">
                  {{ formattedTime(value) }}
                </template>
              </v-slider>
              <v-btn class="ma-2" small @click="resetFormCreateRequest">
                <v-icon small>mdi-backup-restore</v-icon>
                Reset form
              </v-btn>
              <v-btn
                class="ma-2"
                small
                color="primary"
                @click="createRideRequest"
              >
                <v-icon small>mdi-plus</v-icon>
                Create request
              </v-btn>
            </v-form>
          </template>
          <template>
            <h6 class="text-uppercase red--text">2. Other (Only for demo)</h6>
            <v-btn
              color="primary"
              class="mt-2"
              block
              small
              @click="importFileMovement"
            >
              <input
                type="file"
                ref="fileInput2"
                style="display: none"
                accept="application/json"
                @change="onFileChange"
              />
              <v-icon small>mdi-file</v-icon>
              Import schedule
            </v-btn>
            <v-btn
              color="error"
              small
              block
              class="mt-2"
              @click="clearAllScheduleTaxi"
            >
              <v-icon small>mdi-delete</v-icon>
              Clear all schedule
            </v-btn>
            <v-btn
              color="info"
              class="mt-2"
              block
              small
              @click="showGrid = !showGrid"
            >
              <v-icon small>mdi-table</v-icon>
              Show grid
            </v-btn>
          </template>
        </v-tab-item>
        <v-tab-item key="monitor" class="pa-4">
          <v-row>
            <v-col>
              <v-select
                prepend-inner-icon="mdi-filter"
                label="Taxi"
                :items="listTaxi"
                item-text="name"
                item-value="_id"
                v-model="selectTaxi"
                clearable
              >
                <template v-slot:selection="{ item, index }">
                  <div :key="index">{{ item.name }}-{{ item.phone }}</div>
                </template>
                <template v-slot:item="{ item }">
                  <div>{{ item.name }}-{{ item.phone }}</div>
                </template>
              </v-select>
            </v-col>
          </v-row>
          <v-expansion-panels class="flex-1 overflow-y-auto elevation-3">
            <v-expansion-panel
              v-if="filteredTaxi"
              v-for="item in filteredTaxi"
              :key="item._id"
              @click="
                () => {
                  if (selectTaxi === item.driver_id) selectTaxi = null;
                  else selectTaxi = item.driver_id;
                }
              "
            >
              <v-expansion-panel-header
                >Taxi: {{ item.driver_name }} - Capacity:
                {{ item.current_capacity }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <h5 class="mb-2">
                  {{ item.license_plate }} -
                  {{
                    listTaxi.find((taxi) => taxi._id === item.driver_id).phone
                  }}
                </h5>
                <v-data-table
                  hide-default-footer
                  :headers="HEADER_CLUSTER"
                  v-if="item.s && item.s.nodes"
                  :items="
                    lodash.uniq(item.s.nodes.map((node) => node.user_id)) || []
                  "
                  :items-per-page="-1"
                  class="elevation-2"
                  style="border: 1px solid #8080802b"
                >
                  <template v-slot:[`item.index`]="{ item, index }">
                    {{ index + 1 }}
                  </template>
                  <template v-slot:[`item.name`]="{ item, index }">
                    <div class="d-flex align-center gap-2">
                      {{ listValidUser.find((user) => user._id === item).name }}
                    </div>
                  </template>
                  <template v-slot:[`item.phone`]="{ item, index }">
                    {{ listValidUser.find((user) => user._id === item).phone }}
                  </template>
                </v-data-table>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
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
import { formattedTime, unixToTime, rules } from "@/utils/utilities";
import { formCreateRideRequest, HEADER_CLUSTER } from "@/utils/constant";
import { genPolygons } from "@/utils/map";
import { getAllUser } from "@/services/auth";
import {
  clearAllSchedule,
  clearSchedule,
  rideRequest,
} from "@/services/rideRequest";
import moment from "moment";
import lodash from "lodash";

export default {
  name: "HomeAdmin",
  components: { RoutingWithMarker, Instruction },
  data: () => ({
    showGrid: false,
    locations: [],
    tab: "init",
    mapCursor: null,
    google: google,
    formCreateRequest: structuredClone(formCreateRideRequest),
    rules,
    listValidUser: [],
    selectTaxi: "",
    socket: null,
    HEADER_CLUSTER,
    lodash,
    listTaxi: [],
  }),
  methods: {
    async getTaxiList(taxiId) {
      this.loading(true);
      await this.fetchAllUser();
      GET_TAXI_LIST().then((res) => {
        this.loading(false);
        this.locations = res.data;
        if (taxiId) {
          this.selectTaxi = taxiId;
        }
      });
    },
    async getCursorPosition(type) {
      try {
        const { lat, lng } = this.mapCursor;
        if (lat && lng) {
          this.loading(true);
          GET_ADDRESS_FROM_LATLNG(lat, lng)
            .then((res) => {
              if (type === "pickup") {
                this.formCreateRequest.pickup = structuredClone(
                  res.data.results[0].formatted_address,
                );
                this.formCreateRequest.o = structuredClone([
                  this.mapCursor.lat,
                  this.mapCursor.lng,
                ]);
              } else
                this.formCreateRequest.dropoff = structuredClone(
                  res.data.results[0].formatted_address,
                );
              this.formCreateRequest.d = structuredClone([
                this.mapCursor.lat,
                this.mapCursor.lng,
              ]);
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
        `02-04-2023 ${formattedTime(newFormCreate.wpn) - 10}`,
        "DD-MM-YYYY HH:mm",
      ).format();
      const { wpn, wdn, pickup, dropoff, ...params } = newFormCreate;
      try {
        this.loading(true);
        const { data } = await rideRequest(params);
        requestAnimationFrame(() => {
          this.alert.success(
            `Create request successfully. \n ${data?.taxi_driver_name}-${data?.taxi_license_plate}`,
          );
        });
        this.formCreateRequest.owner = null;
        this.getTaxiList(data.taxi_id);
      } catch (e) {
        this.alert.error("Create request failed");
      } finally {
        this.loading(false);
      }
    },
    async clearScheduleTaxi(id) {
      this.loading(true);
      try {
        await clearSchedule(id);
        this.alert.success("Clear schedule success");
      } catch (e) {
        this.alert.error("Clear schedule fail");
      } finally {
        this.loading(false);
        this.getTaxiList();
      }
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
        this.alert.info("A request has been created");
        this.getTaxiList();
      });
      this.socket = socket;
    },
    importFileMovement() {
      this.$refs.fileInput2.click();
    },
    async onFileChange(event) {
      this.listFrequentSorted = [];
      this.showFrequent = false;
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = async () => {
        const listRequest = JSON.parse(reader.result);
        try {
          this.loading(true);
          await this.clearAllScheduleTaxi();
          for (let request of listRequest) {
            await rideRequest(request);
          }
          this.getTaxiList();
        } catch (e) {
          this.alert.error("Import error");
        } finally {
          this.loading(false);
          this.alert.success("Import success");
        }

        this.$refs.fileInput2.value = "";
      };
      reader.readAsText(file);
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
    async clearAllScheduleTaxi() {
      this.loading(true);
      try {
        await clearAllSchedule();
        this.alert.success("Clear all schedule success");
      } catch (e) {
        this.alert.error("Clear all schedule fail");
      } finally {
        this.loading(false);
        this.getTaxiList();
      }
    },
    async fetchAllUser() {
      await getAllUser().then((res) => {
        this.listValidUser = res.data.filter(
          (item) => item.role === "USER" && !item.is_driver,
        );
        this.listTaxi = res.data.filter(
          (item) => item.role === "USER" && !!item.is_driver,
        );
      });
    },
  },
  beforeRouteLeave(from, to, next) {
    this.socket?.disconnect();
    this.socket = null;
    next();
  },
  mounted() {
    this.getTaxiList();
    this.websocketConnect();
  },

  computed: {
    ...mapState(useLocation, ["center"]),
    filteredTaxi: function () {
      if (!this.selectTaxi) return this.locations;
      return this.locations?.filter((location) =>
        location.driver_id.includes(this.selectTaxi),
      );
    },
  },
};
</script>
<style lang="scss">
.home-admin {
  .instruction {
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
