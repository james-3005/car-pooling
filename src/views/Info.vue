<template>
  <div class="userInfo p-relative h-100 d-flex flex-column">
    <div class="d-flex align-center pa-4">
      <v-btn icon plain raised rounded class="mr-2">
        <v-icon color="black" @click="$router.push('/')">mdi-arrow-left</v-icon>
      </v-btn>
      <p class="text-h6 font-weight-bold mb-0">Info</p>
    </div>
    <v-tabs
      v-model="tab"
      grow
      class="mx-auto text-center w-75 pt-4"
      color="primary"
      background-color="transparent"
      slider-color="primary"
    >
      <v-tab key="info">
        <h3>Change Information</h3>
      </v-tab>
      <v-tab key="password">
        <h3>Change Password</h3>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab" class="">
      <v-tab-item key="info" class="pa-4">
        <v-form class="mt-5 text-center">
          <v-img src="@/assets/bg-info.svg" class="p-absolute position w-100" />
          <v-avatar
            color="secondary"
            size="70"
            class="my-10 elevation-4 font-weight-bold text-uppercase"
            >{{ userName[0] }}
          </v-avatar>

          <v-text-field
            label="Username"
            class="input"
            v-model="user.username"
          />
          <v-text-field label="Name" class="input" v-model="user.name" />
          <v-radio-group row v-model="user.is_driver">
            <v-radio
              v-for="item in TYPE_USERS"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </v-radio-group>
          <v-btn color="primary" block height="50" @click="updateInfo"
            >Change
          </v-btn>
        </v-form>
      </v-tab-item>
      <v-tab-item key="password" class="pa-4">
        <v-form class="mt-5 text-center">
          <v-img src="@/assets/bg-info.svg" class="p-absolute position w-100" />

          <v-text-field
            label="Old Password"
            class="input"
            v-model="form.oldPw"
          />
          <v-text-field
            label="New Password"
            class="input"
            v-model="form.newPw"
          />
          <v-text-field
            label="Re-password"
            class="input"
            v-model="form.reNewPw"
          />
          <v-btn color="primary" block height="50" @click="updatePassword"
            >Update Password
          </v-btn>
        </v-form>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";
import { GENDER_ITEMS, TYPE_USERS } from "@/utils/constant";
import { changeInfo } from "@/services/auth";

@Component({
  components: {},
})
export default class Info extends Vue {
  TYPE_USERS = TYPE_USERS;
  user = JSON.parse(localStorage.getItem("user"));
  userName = JSON.parse(localStorage.getItem("user")).name;
  tab = "info";
  form = {
    oldPw: "",
    newPw: "",
    reNewPw: "",
  };

  async updateInfo() {
    try {
      this.loading(true);
      await changeInfo(this.user._id, this.user);
      this.alert.success("Update success");
      localStorage.removeItem("token");
      this.$router.push("/login");
    } catch (e) {
      this.alert.error("Update failed");
    } finally {
      this.loading(false);
    }
  }

  async updatePassword() {}
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

  .v-window {
    overflow: visible;
  }
}
</style>
