<template>
  <div
    class="login h-100 d-flex justify-center align-center"
    :style="{ background: `url(${require('@/assets/bg.jpg')})` }"
  >
    <v-card
      max-width="500"
      width="100%"
      height="100%"
      max-height="700"
      class="login-card text-center py-10 px-2"
    >
      <v-tabs
        v-model="tab"
        grow
        class="mx-auto text-center w-75"
        color="primary"
        background-color="transparent"
        slider-color="primary"
      >
        <v-tab key="signIn">
          <h3>Đăng nhập</h3>
        </v-tab>
        <v-tab key="signUp">
          <h3>Đăng ký</h3>
        </v-tab>
      </v-tabs>
      <v-card-text>
        <v-tabs-items v-model="tab">
          <v-tab-item key="signIn" class="pa-4">
            <v-form v-model="validateLogin" ref="login">
              <v-text-field
                prepend-inner-icon="mdi-account-circle"
                label="Tên đăng nhập"
                v-model="login.username"
                outlined
                :rules="[rules.required, rules.username]"
                autocomplete="off"
              />
              <PasswordField
                label="Mật khẩu"
                :rules="[rules.required]"
                v-model="login.password"
              />
              <v-btn color="primary" width="100%" large @click="doLogin"
                >Đăng nhập
              </v-btn>
            </v-form>
          </v-tab-item>
          <v-tab-item key="signUp" class="pa-4">
            <v-form v-model="validateRegister" ref="register">
              <v-text-field
                prepend-inner-icon="mdi-account-circle"
                outlined
                label="Tên đăng nhập"
                :rules="[rules.required, rules.username]"
                autocomplete="off"
                v-model="register.username"
              />
              <PasswordField
                label="Mật khẩu"
                :rules="[rules.required]"
                v-model="register.password"
              />
              <PasswordField
                label="Xác nhận mật khẩu"
                :rules="[
                  rules.required,
                  (v) => rules.rePassword(v, register.password),
                ]"
                v-model="register.rePassword"
              />
              <v-text-field
                prepend-inner-icon="mdi-account-box-outline"
                outlined
                label="Tên hiển thị"
                :rules="[rules.required]"
                v-model="register.name"
              />
              <!--              <v-text-field-->
              <!--                prepend-inner-icon="mdi-phone"-->
              <!--                outlined-->
              <!--                label="Số điện thoại"-->
              <!--                :rules="[rules.required, rules.phone]"-->
              <!--              />-->
              <v-radio-group v-model="register.is_driver" row>
                <v-radio
                  v-for="user in TYPE_USERS"
                  :key="user.value"
                  :label="user.label"
                  :value="user.value"
                />
              </v-radio-group>
              <v-btn color="primary" width="100%" large @click="doRegister"
                >Đăng ký
              </v-btn>
            </v-form>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import PasswordField from "@/components/PasswordField.vue";
import { TYPE_USERS } from "@/utils/constant";
import { rules } from "@/utils/utilities";
import { IForm } from "@/utils/types";
import { register, login } from "@/services/auth";

@Component({
  components: { PasswordField },
})
export default class Login extends Vue {
  login = {
    username: "",
    password: "",
  };
  register = {
    username: "",
    password: "",
    name: "",
    is_driver: false,
    rePassword: "",
  };
  tab = "signIn";
  TYPE_USERS = TYPE_USERS;
  rules = rules;
  validateLogin = true;
  validateRegister = true;

  async doLogin(): Promise<void> {
    if (!(this.$refs.login as unknown as IForm).validate()) return;
    try {
      const { data } = await login(this.login.username, this.login.password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      this.$router.push("/");
    } catch (e) {
      this.alert.error("Đăng nhập thất bại");
    }
  }

  async doRegister(): Promise<void> {
    if (!(this.$refs.register as unknown as IForm).validate()) return;
    try {
      await register(this.register);
      this.alert.success("Đăng ký thành công");
    } catch (e) {
      console.log(e);
      this.alert.error("Đăng ký thất bại");
    }
  }
}
</script>
<style lang="scss">
.login {
  background-size: cover !important;
  background-repeat: no-repeat !important;

  &-card {
    background-color: #ffffffe8 !important;

    .v-tabs-items {
      background-color: transparent !important;
    }
  }

  .v-input__slot {
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 30px #eeeeee inset !important;
    }
  }
}
</style>
