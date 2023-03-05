<template>
  <div class="home-admin d-flex h-100">
    <div class="h-100 flex-1 d-flex p-relative">
      <gmap-map
        :center="center"
        :zoom="14"
        style="width: 100%; flex: 1"
        @click="handleClick"
      >
        <RoutingMultipleMarkerWithColor2
          v-for="(user, index) in listUser"
          :key="index"
          :color="user.color"
          :waypoints="user.location"
          @updateLocation="(value) => updateLocation(value, index)"
          v-if="user.location.length"
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
    <div class="white elevation-5 pa-2 overflow-auto" style="width: 400px">
      <v-tabs
        v-model="tab"
        grow
        class="mx-auto text-center w-100"
        color="primary"
        background-color="transparent"
        slider-color="primary"
      >
        <v-tab key="frequent" v-if="isDemo">
          <h6>Demo frequent</h6>
        </v-tab>
        <v-tab key="cluster" v-if="isDemo">
          <h6>Demo Ghép nhóm</h6>
        </v-tab>
        <v-tab key="grouping">
          <h6>Grouping</h6>
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item key="frequent" class="pa-4" v-if="isDemo">
          <h6 class="mb-2">1. Giả lập lịch sử di chuyển</h6>
          <h6 class="my-2">1.1 Thời điểm bắt đầu</h6>
          <v-row>
            <v-col cols="6">
              <DatePicker hide-details label="Ngày" v-model="form.date" />
            </v-col>
            <v-col cols="4">
              <TimePicker hide-details label="Giờ" v-model="form.time" />
            </v-col>
            <v-col cols="2" class="d-flex align-center"
              >{{ form.interval }}p
            </v-col>
          </v-row>
          <div>
            <v-row
              class="rowCustom"
              v-for="(user, index) in listUser"
              :key="index"
            >
              <v-col cols="5">
                <v-text-field
                  class="pt-0"
                  label="Tên"
                  hide-details
                  v-model="user.user_id"
                />
              </v-col>
              <v-col cols="4">
                <v-select
                  class="pt-0"
                  label="Màu"
                  hide-details
                  v-model="user.color"
                  :items="COLOR_PALETTE"
                >
                  <template v-slot:selection="{ item, index }">
                    <div
                      :style="`height: 20px; width: 100%; background: ${item}`"
                    />
                  </template>
                  <template v-slot:item="{ item }">
                    <div
                      :style="`height: 20px; width: 100%; background: ${item}`"
                    />
                  </template>
                </v-select>
              </v-col>
              <v-col cols="3">
                <v-btn icon color="primary" small>
                  <v-icon small @click="addCurrentLocation(index)"
                    >mdi-crosshairs-gps
                  </v-icon>
                </v-btn>
                <v-btn icon color="error" small @click="clearLocation(index)">
                  <v-icon small>mdi-restore</v-icon>
                </v-btn>
                <v-btn
                  icon
                  color="error"
                  small
                  @click="() => deleteUser(index)"
                >
                  <v-icon small>mdi-delete</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-btn
              block
              color="primary"
              small
              class="mt-4"
              @click="
                () => {
                  listUser = [...listUser, { location: [] }];
                }
              "
            >
              <v-icon small>mdi-plus</v-icon>
              Thêm người
            </v-btn>
          </div>
          <h6 class="my-2">1.2 Lưu lịch sử di chuyển vào server</h6>
          <div class="d-flex gap-2">
            <v-btn
              color="primary"
              small
              class="mt-4 flex-1"
              @click="saveMovement"
            >
              <v-icon small>mdi-database-marker</v-icon>
              Lưu vào server
            </v-btn>
            <v-btn
              color="error"
              small
              class="flex-1 mt-4"
              @click="deleteSchedule"
            >
              Xoá lịch trình
            </v-btn>
          </div>

          <h6 class="my-2">1.3 Phân tích tuyến đường thường xuyên</h6>
          <v-btn block color="primary" small class="mt-4" @click="saveMovement">
            <v-icon x-small class="mr-1">mdi-google-analytics</v-icon>
            Phân tích
          </v-btn>
          <h6 class="my-2">1.4 Ghép nhóm</h6>
          <v-btn block color="primary" small class="mt-4" @click="">
            <v-icon x-small class="mr-1">mdi-account-multiple</v-icon>
            Ghép nhóm
          </v-btn>
        </v-tab-item>
        <v-tab-item key="cluster" class="pa-4" v-if="isDemo"></v-tab-item>
        <v-tab-item key="grouping" class="pa-4">
          <h6 class="mb-2">Các nhóm</h6>
          <div>
            <v-expansion-panels class="h-70 overflow-y-auto elevation-3">
              <v-expansion-panel v-for="(item, index) in 2" :key="index">
                <v-expansion-panel-header
                  >Nhóm {{ index + 1 }}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-data-table
                    hide-default-footer
                    :headers="HEADER_CLUSTER_SMALL"
                    :items="[
                      { name: 'Tran Nhat Huy', phone: 12331231 },
                      {
                        name: 'Tran Nhat Huy 2',
                        phone: 12331231,
                        isDriver: true,
                      },
                    ]"
                    :items-per-page="-1"
                    class="elevation-2"
                    style="border: 1px solid #8080802b"
                  >
                    <template v-slot:[`item.index`]="{ item, index }">
                      {{ index + 1 }}
                    </template>
                    <template v-slot:[`item.name`]="{ item, index }">
                      <div class="d-flex align-center gap-2">
                        <img
                          src="@/assets/taxi-driver.png"
                          alt=""
                          style="height: 20px"
                          v-if="item.isDriver"
                        />
                        {{ item.name }}
                      </div>
                    </template>
                    <template v-slot:[`item.action`]="{ item, index }">
                      <v-btn color="error" x-small icon>
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </template>
                  </v-data-table>
                  <v-range-slider
                    :min="0"
                    :max="1440"
                    :step="5"
                    ticks-labels
                    tick-size="3"
                    thumb-label="always"
                    :value="[200, 500]"
                    readonly
                    class="mt-10"
                  >
                    <template #thumb-label="{ value }">
                      {{ formattedTime(value) }}
                    </template>
                  </v-range-slider>
                  <div class="d-flex gap-2">
                    <v-btn small>
                      <v-icon small>mdi-account-edit</v-icon>
                      Sửa thời gian
                    </v-btn>
                    <v-btn small color="primary">
                      <v-icon small>mdi-content-save</v-icon>
                      Lưu
                    </v-btn>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
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
import RoutingMultipleMarkerWithColor2 from "@/components/DrawMultipleMarkerWithColor2";
import { COLOR_PALETTE, HEADER_CLUSTER_SMALL } from "@/utils/constant";
import { formattedTime, removeElementAtIndex } from "@/utils/utilities";
import DatePicker from "@/components/DatePicker";
import TimePicker from "@/components/TimePicker";
import { clearMovement } from "@/services/movements";

export default {
  name: "ClusterAdmin",
  components: {
    TimePicker,
    DatePicker,
    RoutingWithMarker,
    Instruction,
    RoutingMultipleMarkerWithColor2,
  },
  data: () => ({
    tab: "init",
    listUser: JSON.parse(localStorage.getItem("locationSet")) || [],
    cap: 1,
    HEADER_CLUSTER_SMALL,
    COLOR_PALETTE,
    mapCursor: null,
    google,
    form: {
      date: "2022-03-10",
      time: "08:00",
      interval: "5",
    },
    isDemo: Boolean(JSON.parse(localStorage.getItem("isDemo"))),
  }),
  methods: {
    formattedTime,
    deleteUser(index) {
      this.listUser = removeElementAtIndex(this.listUser, index);
    },
    handleClick(e) {
      this.mapCursor = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
    },
    addCurrentLocation(index) {
      const newListUser = structuredClone(this.listUser);
      newListUser[index].location.push(this.mapCursor);
      this.listUser = newListUser;
    },
    updateLocation(value, userIndex) {
      const newListUser = structuredClone(this.listUser);
      newListUser[userIndex].location[value.index] = value.location;
      this.listUser = newListUser;
    },
    clearLocation(index) {
      const newListUser = structuredClone(this.listUser);
      newListUser[index].location = [];
      this.listUser = newListUser;
    },
    async deleteSchedule() {
      this.listUser = [];
      try {
        this.loading(true);
        await clearMovement();
        this.alert.success("Xoá lịch trình thành công");
      } catch (e) {
      } finally {
        this.loading(false);
      }
    },
    async saveMovement() {
      console.log(this.listUser);
    },
  },
  mounted() {},
  computed: {
    ...mapState(useLocation, ["center"]),
  },
  watch: {
    listUser: {
      handler: (value) => {
        localStorage.setItem("locationSet", JSON.stringify(value));
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss">
.v-expansion-panel-content__wrap {
  padding: 0 10px 16px;
}

.v-slider__thumb-label {
  font-size: 10px;
}

.rowCustom {
  .col {
    display: flex;
    align-items: center;
  }
}
</style>