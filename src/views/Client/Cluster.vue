<template>
  <div class="home-admin d-flex h-100">
    <div class="h-100 flex-1 d-flex p-relative">
      <gmap-map :center="center" :zoom="14" style="width: 100%; flex: 1">
      </gmap-map>
      <div
        style="
          width: 120px;
          position: absolute;
          bottom: 10px;
          right: 5px;
          background: #ffffffe6;
        "
        class="rounded elevation-1 pa-2"
      >
        <Instruction />
      </div>
    </div>
    <div class="white elevation-5 pa-2" style="width: 400px">
      <p class="text-subtitle-2">Ghép nhóm &#x111;i chung</p>
      <v-stepper v-model="e6" vertical v-if="!hasCluster">
        <v-stepper-step :complete="e6 > 1" step="1">
          Phân tích tuyến đường thường xuyên
          <small>Dựa trên dữ liệu di chuyển trong 7 ngày</small>
        </v-stepper-step>

        <v-stepper-content step="1">
          <v-btn color="success" @click="analysisFrequent"> Phân tích</v-btn>
          <v-btn
            color="primary"
            class="ml-1"
            @click="e6 = 2"
            :disabled="disableStep1"
          >
            Tiếp tục
          </v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 2" step="2">
          Phân tích các nhóm
        </v-stepper-step>

        <v-stepper-content step="2">
          <v-btn @click="analysisCluster" color="success"> Phân tích</v-btn>
          <v-btn
            color="primary"
            class="ml-1"
            @click="e6 = 3"
            :disabled="disableStep2"
          >
            Tiếp tục
          </v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 3" step="3">Xác nhận</v-stepper-step>

        <v-stepper-content step="3">
          <v-data-table
            hide-default-footer
            :headers="HEADER_CLUSTER_SMALL"
            :items="[{ name: 'Tran Nhat Huy', phone: 12331231 }]"
            :items-per-page="-1"
            class="elevation-2"
            style="border: 1px solid #8080802b"
          >
            <template v-slot:[`item.index`]="{ item, index }">
              {{ index + 1 }}
            </template>
            <template v-slot:[`item`]="{ item, index }">
              {{ item }}
            </template>
          </v-data-table>
          <v-btn text color="error" class="mt-10"> Huỷ</v-btn>
          <v-btn color="primary" class="mt-10" @click="e6 = 4"> Xác nhận</v-btn>
        </v-stepper-content>
      </v-stepper>
      <div v-else class="d-flex flex-column">
        <v-data-table
          hide-default-footer
          :headers="HEADER_CLUSTER_SMALL"
          :items="[{ name: 'Tran Nhat Huy', phone: 12331231 }]"
          :items-per-page="-1"
          class="elevation-2"
          style="border: 1px solid #8080802b"
        >
          <template v-slot:[`item.index`]="{ item, index }">
            {{ index + 1 }}
          </template>
        </v-data-table>
        <v-btn color="error" text class="mt-5 ml-auto" @click="modalLeave"
          >Rời nhóm
        </v-btn>
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

export default {
  name: "ClusterClient",
  components: { RoutingWithMarker, Instruction },
  data: () => ({
    e6: 1,
    disableStep1: true,
    disableStep2: true,
    HEADER_CLUSTER_SMALL,
    hasCluster: true,
  }),
  methods: {
    analysisFrequent() {
      this.disableStep1 = false;
    },
    analysisCluster() {
      this.disableStep2 = false;
    },
    modalLeave() {
      this.confirm({
        title: "Bạn có muốn rời nhóm không",
        content: "Hành động này không thể được hoàn tác",
      });
    },
  },
  computed: {
    ...mapState(useLocation, ["center"]),
  },
};
</script>
<style lang="scss"></style>
