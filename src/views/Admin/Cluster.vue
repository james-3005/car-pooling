<template>
  <div class="cluster-admin d-flex h-100">
    <div class="h-100 flex-1 d-flex p-relative">
      <gmap-map
        :center="center"
        :zoom="14"
        style="width: 100%; flex: 1"
        @click="handleClick"
      >
        <RoutingMultipleMarkerWithColor2
          key="waypointsaved"
          :waypoints="waypointSaved"
          v-if="tab === 2 && waypointSaved.length"
        />
        <RoutingMultipleMarkerWithColor2
          v-for="(user, index) in listFrequentSorted"
          :key="index + 'frequent'"
          :waypoints="
            user.map((item) => ({
              lat: item.coordinates[0],
              lng: item.coordinates[1],
            }))
          "
          v-if="listFrequentSorted.length && showFrequent && tab === 0"
        />
        <RoutingMultipleMarkerWithColor2
          v-for="(user, index) in listUser"
          :key="index + 'movement'"
          :color="user.color"
          :waypoints="user.locations"
          @updateLocation="(value) => updateLocation(value, index)"
          v-if="user.locations.length && tab === 0 && !showFrequent"
        />
        <RoutingMultipleMarkerWithColor2
          v-for="(user, index) in filteredSelectedGroup"
          :key="user.user_id + 'user'"
          :color="user.color"
          :waypoints="user.locations"
          @updateLocation="(value) => updateLocationFrequent(value, index)"
          v-if="user.locations.length && tab === 1"
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
        <template v-if="showGrid">
          <gmap-polygon
            v-for="(item, index) in genPolygons()"
            :key="index + 'polygon'"
            :paths="item.path"
            :options="{ ...item }"
          />
        </template>
      </gmap-map>
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
        <v-tab key="frequent">
          <h6>Frequent routes</h6>
        </v-tab>
        <v-tab key="cluster">
          <h6>Grouping</h6>
        </v-tab>
        <v-tab key="grouping">
          <h6>Groups</h6>
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item key="frequent" class="pa-4">
          <h6 class="mb-2">1.1 Simulate movement history</h6>
          <h6 class="my-2">Time picker</h6>
          <v-row>
            <v-col cols="6">
              <DatePicker label="Date" v-model="form.date" hide-details />
            </v-col>
            <v-col cols="3" class="px-0">
              <TimePicker
                label="Time"
                v-model="form.time"
                hide-details
                readonly
              />
            </v-col>
            <v-col cols="1" class="d-flex align-center"
              >{{ form.interval }}min
            </v-col>
            <v-col cols="2" class="d-flex align-center">
              <v-btn icon color="primary" @click="addTime" v-if="isDemo">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <div class="mt-4 pt-4 d-flex flex-column">
            <v-row
              class="rowCustom"
              v-for="(user, index) in listUser"
              :key="index"
            >
              <v-col cols="6">
                <v-text-field
                  class="pt-0"
                  label="Date time"
                  hide-details
                  :value="user.date"
                  readonly
                  outlined
                  dense
                />
              </v-col>
              <v-col cols="3">
                <v-select
                  class="pt-0"
                  label="Label"
                  hide-details
                  v-model="user.color"
                  :items="COLOR_PALETTE"
                  outlined
                  dense
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
                <v-btn icon color="primary" small v-if="isDemo">
                  <v-icon small @click="addCurrentHistory(index)"
                    >mdi-crosshairs-gps
                  </v-icon>
                </v-btn>
                <v-btn
                  icon
                  color="error"
                  small
                  @click="clearHistory(index)"
                  v-if="isDemo"
                >
                  <v-icon small>mdi-restore</v-icon>
                </v-btn>
                <v-btn
                  icon
                  color="error"
                  small
                  @click="() => deleteHistory(index)"
                >
                  <v-icon small>mdi-delete</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </div>
          <div class="d-flex gap-2 mt-4">
            <v-btn
              color="primary"
              small
              class="flex-1"
              @click="importFileMovement"
            >
              <v-icon small>mdi-file</v-icon>
              Import
            </v-btn>
            <input
              type="file"
              ref="fileInput2"
              style="display: none"
              accept="application/json"
              @change="onFileChange2"
            />
          </div>
          <div class="d-flex gap-2 mt-4">
            <v-btn
              color="error"
              small
              class="flex-1"
              @click="
                () => {
                  listUser = [];
                  listFrequentSorted = [];
                  showFrequent = false;
                }
              "
            >
              <v-icon small>mdi-delete</v-icon>
              Clear all history data
            </v-btn>
          </div>
          <h6 class="my-2">1.2 Mining frequent</h6>
          <v-text-field
            label="Max distance"
            v-model.number="form.maxDistance"
            suffix="m"
            type="number"
          />
          <v-btn
            block
            color="primary"
            small
            class="mt-4"
            @click="miningPatterns"
          >
            <v-icon x-small class="mr-1">mdi-google-analytics</v-icon>
            Mining
          </v-btn>
          <div class="d-flex gap-2" v-if="listFrequentSorted.length">
            <v-btn
              color="primary"
              class="mt-4 flex-1"
              small
              @click="showFrequent = !showFrequent"
            >
              Toggle frequent
            </v-btn>
            <v-btn
              color="error"
              small
              class="mt-4 flex-1"
              @click="
                () => {
                  listFrequentSorted = [];
                  showFrequent = false;
                }
              "
            >
              Delete frequent
            </v-btn>
          </div>
          <h6 class="text-uppercase red--text mt-4">
            1.3 Other (Only for demo)
          </h6>
          <v-btn
            block
            color="primary"
            small
            class="mt-4"
            @click="showGrid = !showGrid"
          >
            <v-icon small>mdi-table</v-icon>
            Show Grid
          </v-btn>
        </v-tab-item>
        <v-tab-item key="cluster" class="pa-4">
          <h6 class="my-2">2.1 Simulate frequents</h6>
          <v-row
            class="rowCustom"
            v-for="(user, index) in listUserFrequent"
            :key="index"
          >
            <v-col cols="6">
              <v-select
                :items="listValidUser"
                class="pt-0"
                label="User"
                hide-details
                v-model="user.user_id"
                item-text="name"
                item-value="_id"
                dense
                outlined
              />
            </v-col>
            <v-col cols="3">
              <v-select
                class="pt-0"
                label="Label"
                hide-details
                v-model="user.color"
                :items="COLOR_PALETTE"
                dense
                outlined
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
                <v-icon small @click="addCurrentLocation(index)" v-if="isDemo"
                  >mdi-crosshairs-gps
                </v-icon>
              </v-btn>
              <v-btn
                icon
                color="error"
                small
                @click="clearLocation(index)"
                v-if="isDemo"
              >
                <v-icon small>mdi-restore</v-icon>
              </v-btn>
              <v-btn icon color="error" small @click="() => deleteUser(index)">
                <v-icon small>mdi-delete</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <div class="d-flex gap-2">
            <v-btn
              color="primary"
              small
              class="mt-4 flex-1"
              @click="addUser"
              v-if="isDemo"
            >
              <v-icon small>mdi-plus</v-icon>
              Add person
            </v-btn>
            <v-btn
              color="primary"
              small
              class="mt-4 flex-1"
              @click="importFileCluster"
            >
              <v-icon small>mdi-file</v-icon>
              Import data
            </v-btn>
            <input
              type="file"
              ref="fileInput"
              accept="application/json"
              style="display: none"
              @change="onFileChange"
            />
          </div>
          <div class="d-flex gap-2">
            <v-btn
              color="error"
              small
              class="mt-4 flex-1"
              @click="
                () => {
                  listUserFrequent = [];
                  validGroup = [];
                  selectedGroup = null;
                }
              "
            >
              <v-icon small>mdi-delete</v-icon>
              Clear All Frequent data
            </v-btn>
          </div>
          <h6 class="my-2">2.2 Mining Cluster</h6>
          <v-text-field
            label="Max distance"
            v-model.number="form2.maxDistance"
            suffix="m"
            type="number"
          />
          <v-text-field
            label="Min duration"
            v-model.number="form2.minDuration"
            suffix="point"
            type="number"
          />
          <v-text-field
            label="Min weight"
            v-model.number="form2.minWeight"
            type="number"
          />
          <v-text-field
            label="Size"
            v-model.number="form2.size"
            suffix="people"
            type="number"
          />
          <div class="d-flex gap-2">
            <v-btn
              color="primary"
              small
              class="mt-4 flex-1"
              @click="() => miningCluster('agp')"
            >
              AGP
            </v-btn>
            <v-btn
              color="primary"
              small
              class="mt-4 flex-1"
              @click="() => miningCluster('vgg')"
            >
              VG-Growth
            </v-btn>
            <v-btn
              color="primary"
              small
              class="mt-4 flex-1"
              @click="() => miningCluster('avgg')"
            >
              <span class="text-lowercase">a</span>VG-Growth
            </v-btn>
          </div>

          <div v-if="validGroup.length">
            <v-btn
              color="success"
              small
              class="mt-4 flex-1"
              @click="saveAllGroup"
            >
              Save all {{ validGroup.length }} groups
            </v-btn>
          </div>
          <v-expansion-panels
            class="h-70 overflow-y-auto elevation-3 mt-5"
            v-if="validGroup.length"
            v-model="selectedGroup"
          >
            <v-expansion-panel v-for="(item, index) in validGroup" :key="index">
              <v-expansion-panel-header>
                <h4>Group: {{ index + 1 }}</h4>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-data-table
                  hide-default-footer
                  :headers="HEADER_CLUSTER"
                  :items="item.usersInfo"
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
                      {{
                        listValidUser.find((user) => user._id === item._id).name
                      }}
                    </div>
                  </template>
                  <template v-slot:[`item.phone`]="{ item, index }">
                    {{
                      listValidUser.find((user) => user._id === item._id).phone
                    }}
                  </template>
                </v-data-table>
                <v-btn
                  color="success"
                  class="mt-4"
                  small
                  @click.stop="() => saveGroup(item)"
                >
                  <v-icon small>mdi-content-save</v-icon>
                  Save group {{ index + 1 }}
                </v-btn>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <v-btn
            color="error"
            small
            class="mt-4 flex-1"
            v-if="validGroup.length"
            @click="clearResults"
            block
          >
            Delete data from the group
          </v-btn>
        </v-tab-item>
        <v-tab-item key="grouping" class="pa-4">
          <h6 class="mb-2">Groups</h6>
          <div>
            <v-expansion-panels
              class="h-70 overflow-y-auto elevation-3"
              v-model="selectedEditGroup"
            >
              <v-expansion-panel
                v-for="(item, index) in listSavedGroup"
                :key="index"
              >
                <v-expansion-panel-header
                  ><h4>Group: {{ index + 1 }}</h4>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-data-table
                    hide-default-footer
                    :headers="HEADER_CLUSTER_SMALL"
                    :items="item.user_ids || []"
                    :items-per-page="-1"
                    class="elevation-2"
                    style="border: 1px solid #8080802b"
                  >
                    <template v-slot:[`item.index`]="{ item, index }">
                      {{ index + 1 }}
                    </template>
                    <template v-slot:[`item.name`]="{ item, index }">
                      <div class="d-flex align-center gap-2">
                        {{
                          listValidUser.find((user) => user._id === item).name
                        }}
                      </div>
                    </template>
                    <template v-slot:[`item.phone`]="{ item, index }">
                      {{
                        listValidUser.find((user) => user._id === item).phone
                      }}
                    </template>
                    <template v-slot:[`item.action`]="{ item }">
                      <v-btn color="error" x-small icon>
                        <v-icon @click="() => removedUser(index, item)"
                          >mdi-delete
                        </v-icon>
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
                    v-model="item.t"
                    class="mt-10"
                  >
                    <template #thumb-label="{ value }">
                      {{ formattedTime(value) }}
                    </template>
                  </v-range-slider>
                  <div class="d-flex justify-space-between gap-2 mt-10">
                    <v-btn
                      small
                      color="primary"
                      @click="() => updateGroup(item)"
                    >
                      <v-icon small>mdi-content-save</v-icon>
                      Save change
                    </v-btn>
                    <v-btn
                      small
                      color="success"
                      @click="() => startRequest(item)"
                    >
                      <v-icon small>mdi-content-save</v-icon>
                      Active group
                    </v-btn>
                    <v-btn
                      small
                      color="error"
                      @click="() => removeGroup(item._id)"
                    >
                      <v-icon small>mdi-delete</v-icon>
                      Delete group
                    </v-btn>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <v-btn
              @click="deleteAllSavedGroups"
              small
              color="error"
              class="mt-4"
              v-if="listSavedGroup && listSavedGroup.length"
            >
              <v-icon small>mdi-delete</v-icon>
              Delete all groups
            </v-btn>
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
import {
  COLOR_PALETTE,
  HEADER_CLUSTER_SMALL,
  HEADER_CLUSTER,
} from "@/utils/constant";
import {
  formattedTime,
  groupSequentialNumbers,
  removeElementAtIndex,
  unixToMinutes,
} from "@/utils/utilities";
import DatePicker from "@/components/DatePicker";
import TimePicker from "@/components/TimePicker";
import {
  buildPattern,
  clearMovement,
  createMovementMany,
  createPatternMany,
  frequentClear,
  getCluster,
} from "@/services/movements";
import moment from "moment";
import { getAllUser } from "@/services/auth";
import { genPolygons } from "@/utils/map";
import {
  DELETE_GROUP,
  DELETE_GROUP_ALL,
  GET_GROUP,
  SAVE_GROUP,
  UPDATE_GROUP,
} from "@/services/crudGroup";
import { REQUEST_GROUP } from "../../services/crudGroup";
import { unixToTime } from "../../utils/utilities";

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
    showGrid: false,
    tab: "frequent",
    listUser: JSON.parse(localStorage.getItem("locationSet")) || [],
    listUserFrequent:
      JSON.parse(localStorage.getItem("locationSetFrequent")) || [],
    HEADER_CLUSTER_SMALL,
    HEADER_CLUSTER,
    COLOR_PALETTE,
    mapCursor: null,
    google,
    form: {
      date: "2022-03-10",
      time: "08:00",
      interval: "5",
      maxDistance: 500,
    },
    form2: {
      hour: 8,
      maxDistance: 500,
      minDuration: 3,
      minWeight: 0.4,
      size: 4,
    },
    listValidUser: [],
    validGroup: [],
    userMovement: "641db1461e4e45a6d7929b98",
    listFrequentSorted: [],
    showFrequent: false,
    selectedGroup: null,
    listSavedGroup: [],
    selectedEditGroup: null,
    isDemo: JSON.parse(localStorage.getItem("isDemo")) || false,
    selectedAlgo: null,
  }),
  methods: {
    formattedTime,
    genPolygons,
    deleteUser(index) {
      const newUser = structuredClone(this.listUserFrequent);
      this.listUserFrequent = removeElementAtIndex(newUser, index);
    },
    deleteHistory(index) {
      const newListUser = structuredClone(this.listUser);
      this.listUser = removeElementAtIndex(newListUser, index);
    },
    handleClick(e) {
      this.mapCursor = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
    },
    addCurrentHistory(index) {
      const newListUser = structuredClone(this.listUser);
      newListUser[index].locations.push(this.mapCursor);
      this.listUser = newListUser;
    },
    addCurrentLocation(index) {
      if (this.mapCursor) {
        const newList = structuredClone(this.listUserFrequent);
        newList[index].locations.push(this.mapCursor);
        this.listUserFrequent = newList;
      }
    },
    updateLocation(value, userIndex) {
      const newListUser = structuredClone(this.listUser);
      newListUser[userIndex].locations[value.index] = value.location;
      this.listUser = newListUser;
    },
    updateLocationFrequent(value, userIndex) {
      const newListUser = structuredClone(this.listUserFrequent);
      newListUser[userIndex].locations[value.index] = value.location;
      this.listUserFrequent = newListUser;
    },
    clearLocation(index) {
      const newList = structuredClone(this.listUserFrequent);
      newList[index].locations = [];
      this.listUserFrequent = newList;
    },
    clearHistory(index) {
      const newListUser = structuredClone(this.listUser);
      newListUser[index].locations = [];
      this.listUser = newListUser;
    },
    async deleteSchedule() {
      try {
        this.loading(true);
        await clearMovement();
        this.alert.success("delete movement successfully");
      } catch (e) {
      } finally {
        this.loading(false);
      }
    },
    async saveMovement() {
      await this.deleteMovement();
      const params = {
        hour_start: this.form2.hour,
        list: this.listUserFrequent,
      };
      try {
        this.loading(true);
        await createPatternMany(params);
        this.alert.success("Save data successfully");
      } catch (e) {
        this.alert.error("Save data failed");
      } finally {
        this.loading(false);
      }
    },
    async deleteMovement() {
      try {
        this.loading(true);
        await frequentClear();
        this.alert.success("Delete movement successfully");
      } catch (e) {
        this.alert.error("Delete movement failed");
      } finally {
        this.loading(false);
      }
    },
    addTime() {
      if (this.form.time && this.form.date) {
        const dateTime = `${this.form.date}-${this.form.time}`;
        if (!this.listUser.find((item) => item.date === dateTime)) {
          const newListUser = structuredClone(this.listUser);
          newListUser.push({ date: dateTime, locations: [] });
          this.listUser = newListUser;
        }
      }
    },
    async saveHistory() {
      await this.deleteSchedule();
      try {
        this.loading(true);
        for (let user of this.listUser) {
          await createMovementMany({
            t_start: moment(`${user.date}`, "YYYY-MM-DD-HH:mm").format(),
            t_interval: 5,
            list: [
              {
                user_id: this.userMovement,
                locations: user.locations,
              },
            ],
          });
        }
        this.loading(false);
        this.alert.success("Save movement successfully");
      } catch (e) {
        this.alert.error("Save movement failed");
      }
    },
    addUser() {
      const newListUser = structuredClone(this.listUserFrequent);
      newListUser.push({ locations: [] });
      this.listUserFrequent = newListUser;
    },
    async miningCluster(type) {
      if (this.form2.maxDistance <= 200) {
        this.alert.error("Please choose a distance larger than 200");
        return;
      }
      this.clearResults();
      await this.saveMovement();
      const { size, hour, ...rest } = this.form2;
      this.selectedAlgo = type;
      const params = {
        size: type === "agp" ? this.form2.size : undefined,
        opts: {
          hourId: this.form2.hour,
          ...rest,
          numTimePoints: this.listUserFrequent?.[0].locations?.length,
        },
      };
      try {
        this.loading(true);
        const { data } = await getCluster(params, type);
        this.validGroup = data.filter((item) => item?.usersInfo.length > 1);
        this.alert.info(`Found ${this.validGroup?.length} groups`);
      } catch (e) {
        this.alert.error("Found 0 group");
      } finally {
        this.loading(false);
      }
    },
    async miningPatterns() {
      if (this.form.maxDistance <= 200) {
        this.alert.error("Please choose a distance larger than 200");
        return;
      }
      await this.saveHistory();
      try {
        this.loading(true);
        const { data } = await buildPattern(this.userMovement, {
          max_meters: this.form.maxDistance,
        });
        this.listFrequentSorted = groupSequentialNumbers(data);
        this.showFrequent = true;
      } catch (e) {
        this.alert.error("Cannot find any frequent");
      } finally {
        this.loading(false);
      }
    },
    importFileCluster() {
      this.$refs.fileInput.click();
    },
    onFileChange(event) {
      this.selectedGroup = null;
      this.validGroup = [];
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.listUserFrequent = JSON.parse(reader.result);
        this.$refs.fileInput.value = "";
      };
      reader.readAsText(file);
    },
    importFileMovement() {
      this.$refs.fileInput2.click();
    },
    onFileChange2(event) {
      this.listFrequentSorted = [];
      this.showFrequent = false;
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.listUser = JSON.parse(reader.result);
        this.$refs.fileInput2.value = "";
      };
      reader.readAsText(file);
    },
    async saveGroup(group, disableAlert) {
      if (this.selectedAlgo !== "avgg") {
        this.confirm({
          title: "Cannot save group",
          content: `Only groups analyzed by aVG-Growth can be saved (you are using ${
            this.selectedAlgo || "agp"
          })`,
        });
        return;
      }
      const firstUser = this.listUserFrequent.find(
        (item) => item.user_id === group.usersInfo?.[0]._id,
      );
      const params = {
        user_ids: group.usersInfo?.map((item) => item._id),
        pickup_t: moment("02-04-2023 08:00", "DD-MM-YYYY HH:mm")
          .add(group.segments[0][0] * 5, "minute")
          .format(),
        deliver_t: moment("02-04-2023 08:00", "DD-MM-YYYY HH:mm")
          .add(group.segments[0][1] * 5, "minute")
          .format(),
        pickup_l: [
          firstUser.locations[group.segments[0][0]].lat,
          firstUser.locations[group.segments[0][0]].lng,
        ],
        deliver_l: [
          firstUser.locations[group.segments[0][1]].lat,
          firstUser.locations[group.segments[0][1]].lng,
        ],
      };
      try {
        if (!disableAlert) this.loading(true);
        await SAVE_GROUP(params);
        if (!disableAlert) this.alert.success("Save Group successfully");
      } catch (e) {
        this.alert.error(
          "Save Group failed, some user is already in another group",
        );
      } finally {
        this.loading(false);
      }
    },
    async saveAllGroup() {
      if (this.selectedAlgo !== "avgg") {
        this.confirm({
          title: "Cannot save group",
          content: `Only groups analyzed by aVG-Growth can be saved (you are using ${
            this.selectedAlgo || "agp"
          })`,
        });
        return;
      }
      this.loading(true);
      for (let group of this.validGroup) {
        await this.saveGroup(group, true);
      }
      this.loading(false);
      this.alert.success("Save All Groups successfully");
    },
    async fetchSavedGroup() {
      try {
        this.loading(true);
        const { data } = await GET_GROUP({ page_size: 100 });
        this.listSavedGroup = data.data.map((item) => ({
          ...item,
          t: [unixToMinutes(item.pickup_t), unixToMinutes(item.deliver_t)],
        }));
      } catch (e) {
        this.alert.error("Fetch saved group failed");
      } finally {
        this.loading(false);
      }
    },
    async updateGroup(group) {
      try {
        this.loading(true);
        const { t, ...params } = structuredClone(group);
        params.pickup_t = moment(
          `02-04-2023 ${formattedTime(t[0])}`,
          "DD-MM-YYYY HH:mm",
        ).format();
        params.deliver_t = moment(
          `02-04-2023 ${formattedTime(t[1])}`,
          "DD-MM-YYYY HH:mm",
        ).format();
        await UPDATE_GROUP(params);
        this.alert.success("Update Group successfully");
      } catch (e) {
        this.alert.error("Update Group failed");
      } finally {
        this.loading(false);
      }
    },
    async removedUser(groupIdx, userId) {
      this.listSavedGroup[groupIdx].user_ids = this.listSavedGroup[
        groupIdx
      ].user_ids.filter((i) => i !== userId);
    },
    async removeGroup(groupIdx) {
      try {
        this.selectedEditGroup = null;
        this.loading(true);
        await DELETE_GROUP(groupIdx);
        this.alert.success("Remove Group successfully");
        this.fetchSavedGroup();
      } catch (e) {
        this.alert.error("Remove Group failed");
      } finally {
        this.loading(false);
      }
    },
    async clearResults() {
      this.selectedGroup = null;
      this.validGroup = [];
    },
    async deleteAllSavedGroups() {
      this.loading(true);
      try {
        await DELETE_GROUP_ALL();
        this.alert.success("Delete All Groups successfully");
        this.listSavedGroup = [];
        this.selectedEditGroup = null;
      } catch (e) {
        this.alert.error("Delete Group failed");
      } finally {
        this.loading(false);
      }
    },
    async startRequest(item) {
      try {
        this.loading(true);
        const t = moment.unix(item.pickup_t).subtract(10, "minutes");
        await REQUEST_GROUP(item._id, {
          t,
        });
        this.alert.success("Active group successfully");
      } catch (e) {
        this.alert.error("Active group failed, group is already active");
      } finally {
        this.loading(false);
      }
    },
  },
  async mounted() {
    getAllUser().then((res) => {
      this.listValidUser = res.data.filter(
        (item) => item.role === "USER" && !item.is_driver,
      );
    });
  },
  computed: {
    ...mapState(useLocation, ["center"]),
    filteredSelectedGroup: function () {
      if (!this.selectedGroup && this.selectedGroup !== 0)
        return this.listUserFrequent;
      const validGroup = structuredClone(this.validGroup[this.selectedGroup]);
      const list = structuredClone(
        this.listUserFrequent.find(
          (item) => item.user_id === validGroup.usersInfo[0]._id,
        ),
      );
      list.locations = structuredClone(list.locations).slice(
        validGroup.segments[0][0],
        validGroup.segments[0][1] + 1,
      );
      return [list];
    },
    waypointSaved: function () {
      if (!this.selectedEditGroup && this.selectedEditGroup !== 0) return [];
      else {
        const selectedGroup = this.listSavedGroup[this.selectedEditGroup];
        return [
          { lat: selectedGroup.pickup_l[0], lng: selectedGroup.pickup_l[1] },
          {
            lat: selectedGroup.deliver_l[0],
            lng: selectedGroup.deliver_l[1],
          },
        ];
      }
    },
  },
  watch: {
    listUser: {
      handler: (value) => {
        localStorage.setItem("locationSet", JSON.stringify(value));
      },
      deep: true,
    },
    listUserFrequent: {
      handler: (value) => {
        localStorage.setItem("locationSetFrequent", JSON.stringify(value));
      },
      deep: true,
    },
    tab: {
      handler: function (value) {
        if (value === 2) {
          this.fetchSavedGroup();
        }
      },
    },
  },
};
</script>
<style lang="scss">
.cluster-admin {
  .v-expansion-panel-content__wrap {
    padding: 0 10px 16px;
  }

  .v-slider__thumb-label {
    font-size: 10px;
  }

  .v-slider__thumb-container:last-of-type {
    .v-slider__thumb-label {
      transform: translateY(190%) translateY(-12px) translateX(-50%)
        rotate(45deg) !important;
      border-radius: 0 50% 50% !important;
    }
  }

  .rowCustom {
    .col {
      display: flex;
      align-items: center;
    }
  }
}
</style>
