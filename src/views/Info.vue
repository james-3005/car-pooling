<template>
  <v-container class="gap-5 pa-5 d-flex flex-wrap" fluid>
    <p class="text-h6 mb-0">Thay đổi thông tin</p>
    <v-form class="w-100">
      <TextField label="Tên hiển thị" />
      <SelectField label="Giới tính" :items="GENDER_ITEMS" />
      <TextField label="Số điện thoại" />
      <v-radio-group row>
        <v-radio
          v-for="user in TYPE_USERS"
          :key="user.value"
          :label="user.label"
          :value="user.value"
        />
      </v-radio-group>
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
