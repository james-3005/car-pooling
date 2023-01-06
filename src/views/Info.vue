<template>
  <div class="pa-4 userInfo p-relative h-100">
    <div class="d-flex align-center">
      <v-btn icon plain raised rounded class="mr-2">
        <v-icon color="black" @click="$router.push('/')">mdi-arrow-left</v-icon>
      </v-btn>
      <p class="text-h6 font-weight-bold mb-0">Chỉnh sửa hồ sơ</p>
    </div>
    <v-form class="mt-5 text-center">
      <v-img src="@/assets/bg-info.svg" class="p-absolute position" />

      <v-avatar
        color="secondary"
        size="70"
        class="my-10 elevation-4 font-weight-bold"
        >NH</v-avatar
      >

      <v-text-field label="Họ và tên" class="input" />
      <v-text-field label="Số điện thoại" class="input" />
      <v-select label="Giới tính" :items="GENDER_ITEMS" class="input" />
      <v-radio-group row>
        <v-radio
          v-for="user in TYPE_USERS"
          :key="user.value"
          :label="user.label"
          :value="user.value"
        />
      </v-radio-group>
      <v-btn color="primary" block height="50">Cập nhật</v-btn>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import TextField from "@/components/TextField.vue";
import SelectField from "@/components/SelectField.vue";
import { GENDER_ITEMS, TYPE_USERS } from "@/utils/constant";

@Component({
  components: { SelectField, TextField },
})
export default class Info extends Vue {
  GENDER_ITEMS = GENDER_ITEMS;
  TYPE_USERS = TYPE_USERS;
}
</script>
<style lang="scss">
.userInfo {
  .input {
    .v-label.v-label--active.theme--light {
      font-weight: 600;
    }
  }
  .position {
    bottom: 0;
    left: 0;
  }
}
</style>
