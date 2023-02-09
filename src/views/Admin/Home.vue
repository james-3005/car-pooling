<template>
  <div class="d-flex h-100">
    <div class="h-100 flex-1 d-flex">
      <gmap-map :center="center" :zoom="14" style="width: 100%; flex: 1">
      </gmap-map>
    </div>
    <div class="white elevation-5 pa-2" style="width: 500px">
      <p class="text-subtitle-2">Bảng điều khiển</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia/dist/pinia";
import { useLocation } from "@/store/location";

export default {
  name: "HomeAdmin",
  components: {},
  data: () => ({}),
  methods: {},
  mounted() {},
  computed: {
    ...mapState(useLocation, ["center"]),
  },
};
</script>
<style lang="scss"></style>
