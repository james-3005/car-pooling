<template>
  <div>
    <div>Number of guests</div>
    <div
      v-for="item in items"
      :key="item.cap"
      class="d-flex align-center justify-space-between gap-5"
    >
      <div>{{ item.cap - 1 }}</div>
      <div
        :style="{ width: '16px', height: '7px', background: item.color }"
      ></div>
    </div>
  </div>
</template>
<script>
import { itemColor } from "@/utils/constant";

export default {
  name: "Instruction",
  data: () => ({
    items: itemColor,
  }),
};
</script>

<style lang="scss"></style>
