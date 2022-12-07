<template>
  <v-text-field
    :value="value"
    @input="(v) => $emit('input', v)"
    outlined
    v-on="$listeners"
    v-bind="$attrs"
    :type="showPassword ? 'text' : 'password'"
    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
    @click:append="showPassword = !showPassword"
    autocomplete="off"
  />
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class PasswordField extends Vue {
  @Prop() readonly value: string | number | undefined;
  showPassword = false;
}
</script>
