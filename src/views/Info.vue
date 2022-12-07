<template>
  <v-container class="gap-5 pa-5 d-flex flex-wrap" fluid>
    <p class="text-h6 mb-0">Thay đổi thông tin</p>
    <v-form class="w-100">
      <TextField label="Họ và tên" />
      <SelectField label="Giới tính" :items="GENDER_ITEMS" />
      <TextField label="Số điện thoại" />
      <SelectField label="Vai trò" :items="TYPE_USERS" item-text="label" />
      <v-row>
        <v-col>
          <v-btn color="error" block>Huỷ</v-btn>
        </v-col>
        <v-col>
          <v-btn color="primary" block>Thay đổi</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
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
<style lang="scss" scoped>
.home {
  &_btn {
    &_container {
      height: 70px !important;
      outline: none !important;
    }
  }
}
</style>
