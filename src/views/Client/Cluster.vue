<template>
  <div class="home-user d-flex h-100">
    <div class="h-100 flex-1 d-flex p-relative">
      <gmap-map :center="center" :zoom="14" style="width: 100%; flex: 1">
        <RoutingMultipleMarkerWithColor2
          key="waypointsaved"
          :waypoints="waypointSaved"
          v-if="waypointSaved.length"
        />
      </gmap-map>
    </div>
    <div class="white elevation-5 pa-2" style="width: 400px">
      <p class="text-subtitle-2">Group</p>
      <div class="d-flex flex-column">
        <!--        <v-data-table-->
        <!--          hide-default-footer-->
        <!--          :headers="HEADER_CLUSTER_SMALL"-->
        <!--          :items="[{ name: 'Tran Nhat Huy', phone: 12331231 }]"-->
        <!--          :items-per-page="-1"-->
        <!--          class="elevation-2"-->
        <!--          style="border: 1px solid #8080802b"-->
        <!--        >-->
        <!--          <template v-slot:[`item.index`]="{ item, index }">-->
        <!--            {{ index + 1 }}-->
        <!--          </template>-->
        <!--        </v-data-table>-->
        <v-alert v-if="!listSavedGroup.t" type="info">
          You haven't belong to any group
        </v-alert>
        <template v-else>
          <v-data-table
            hide-default-footer
            :headers="HEADER_CLUSTER_SMALL"
            :items="listSavedGroup ? listSavedGroup.user_ids : []"
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
          <v-range-slider
            :min="0"
            :max="1440"
            :step="5"
            ticks-labels
            tick-size="3"
            thumb-label="always"
            v-model="listSavedGroup.t"
            class="mt-10"
            readonly
          >
            <template #thumb-label="{ value }">
              {{ formattedTime(value) }}
            </template>
          </v-range-slider>
          <v-btn color="error" small class="mt-5 ml-auto" @click="modalLeave">
            <v-icon small>mdi-close</v-icon>
            leave
          </v-btn>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia/dist/pinia";
import { useLocation } from "@/store/location";
import Instruction from "@/components/Instruction";
import RoutingWithMarker from "@/components/RoutingWithMarker";
import { HEADER_CLUSTER_SMALL } from "@/utils/constant";
import { GET_GROUP_USER, USER_LEAVE_GROUP } from "../../services/crudGroup";
import {
  formattedTime,
  groupSequentialNumbers,
  removeElementAtIndex,
  unixToMinutes,
} from "@/utils/utilities";
import { getAllUser } from "../../services/auth";
import RoutingMultipleMarkerWithColor2 from "@/components/DrawMultipleMarkerWithColor2";

export default {
  name: "ClusterClient",
  components: {
    RoutingWithMarker,
    Instruction,
    RoutingMultipleMarkerWithColor2,
  },
  data: () => ({
    e6: 1,
    HEADER_CLUSTER_SMALL,
    hasCluster: true,
    listSavedGroup: {},
    listValidUser: [],
    formattedTime,
  }),
  methods: {
    modalLeave() {
      this.confirm({
        title: "Do you want to leave",
        content: "This action cannot be undone",
        checkAction: () => {
          USER_LEAVE_GROUP().then(() => {
            this.$router.push("/");
          });
        },
      });
    },
  },
  async mounted() {
    getAllUser().then((res) => {
      this.listValidUser = res.data.filter(
        (item) => item.role === "USER" && !item.is_driver,
      );
    });
    console.log(123);
    try {
      this.loading(true);
      const { data } = await GET_GROUP_USER();
      console.log(123);
      this.listSavedGroup = {
        ...data,
        t: [unixToMinutes(data.pickup_t), unixToMinutes(data.deliver_t)],
      };
    } catch (e) {
    } finally {
      this.loading(false);
    }
  },
  computed: {
    ...mapState(useLocation, ["center"]),
    waypointSaved: function () {
      if (!this.listSavedGroup.pickup_l) return [];
      else {
        return [
          {
            lat: this.listSavedGroup.pickup_l[0],
            lng: this.listSavedGroup.pickup_l[1],
          },
          {
            lat: this.listSavedGroup.deliver_l[0],
            lng: this.listSavedGroup.deliver_l[1],
          },
        ];
      }
    },
  },
};
</script>
<style lang="scss">
.home-user {
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
}
</style>
