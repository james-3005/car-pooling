<template>
  <div class="home-admin d-flex h-100">
    <div class="h-100 flex-1 d-flex p-relative">
      <gmap-map :center="center" :zoom="14" style="width: 100%; flex: 1">
      </gmap-map>
    </div>
    <div class="white elevation-5 pa-2" style="width: 400px">
      <p class="text-subtitle-2">Group</p>
      <div class="d-flex flex-column">
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
        <v-btn color="error" small class="mt-5 ml-auto" @click="modalLeave">
          <v-icon small>mdi-close</v-icon>
          leave
        </v-btn>
        <!--        <v-btn color="primary" small class="mt-5 ml-auto" @click="modalLeave">-->
        <!--          <v-icon small>mdi-check</v-icon>-->
        <!--          Accept-->
        <!--        </v-btn>-->
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
    HEADER_CLUSTER_SMALL,
    hasCluster: true,
  }),
  methods: {
    modalLeave() {
      this.confirm({
        title: "Do you want to leave",
        content: "This action cannot be undone",
      });
    },
  },
  computed: {
    ...mapState(useLocation, ["center"]),
  },
};
</script>
<style lang="scss"></style>
