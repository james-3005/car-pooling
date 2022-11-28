<template>
  <v-select
    :value="value"
    v-on="$listeners"
    @input="(v) => $emit('input', v)"
    dense
    v-bind="$attrs"
    no-data-text="Không có data"
    outlined
    class="selectField_data"
    :menu-props="{ contentClass: 'mt-10 white' }"
  />
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class SelectField extends Vue {
  @Prop({ default: "200px" }) readonly width!: string;
  @Prop() readonly value!: any;
  @Prop() readonly required: boolean | string | undefined;
  inheritAttrs = false;
}
</script>
<style lang="scss">
// .selectField_data .v-select__selections {
// outline: none;
// overflow-x: scroll !important;
// -webkit-overflow-scrolling: touch;
// flex-direction: column;
// flex-wrap: wrap;
// justify-content: center;
// align-items: flex-start;
// align-content: flex-start;
// overflow-y: hidden;
// height: 36px !important;
// min-height: 30px !important;
// &::-webkit-scrollbar {
//   display: none;
// }
// -ms-overflow-style: none;
// scrollbar-width: none;
// input {
//   display: none;
// }
//   .v-chip {
//     padding: 0 4px !important;
//     border-radius: 4px !important;
//     height: 20px;
//     .v-icon {
//       font-size: 12px !important;
//     }
//   }

//   .v-chip__content {
//     margin: 0 4px !important;
//   }
// }
</style>
