<template>
  <v-text-field
    v-bind="$attrs"
    :value="value"
    v-on="$listeners"
    @input="(v) => $emit('input', v)"
    outlined
    dense
  />
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class TextField extends Vue {
  @Prop() readonly value: string | number | undefined;
}
</script>
