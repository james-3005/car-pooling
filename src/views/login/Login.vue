<template>
  <div class="login h-100 d-flex overflow-hidden">
    <div class="LoginPage-image">
      <img src="@/assets/bg.jpg" alt="" />
    </div>
    <div class="h-100 flex-1">
      <v-card
        max-width="500"
        width="100%"
        class="login-card text-center pt-3 px-2 elevation-0 mx-auto"
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
            <h3>Login</h3>
          </v-tab>
          <v-tab key="signUp">
            <h3>Register</h3>
          </v-tab>
        </v-tabs>
        <v-card-text class="pb-0">
          <v-tabs-items v-model="tab">
            <v-tab-item key="signIn" class="px-4">
              <v-form v-model="validateLogin" ref="login">
                <v-text-field
                  prepend-inner-icon="mdi-account-circle"
                  label="Username"
                  v-model="login.username"
                  outlined
                  :rules="[rules.required, rules.username]"
                  autocomplete="off"
                />
                <PasswordField
                  label="Password"
                  :rules="[rules.required]"
                  v-model="login.password"
                />
                <v-btn color="primary" width="100%" large @click="doLogin"
                  >Login
                </v-btn>
              </v-form>
            </v-tab-item>
            <v-tab-item key="signUp" class="px-4 pb-0">
              <v-form v-model="validateRegister" ref="register">
                <v-text-field
                  prepend-inner-icon="mdi-account-circle"
                  outlined
                  label="Username"
                  :rules="[rules.required, rules.username]"
                  autocomplete="off"
                  v-model="register.username"
                />
                <PasswordField
                  label="Password"
                  :rules="[rules.required]"
                  v-model="register.password"
                />
                <PasswordField
                  label="Re-Password"
                  :rules="[
                    rules.required,
                    (v) => rules.rePassword(v, register.password),
                  ]"
                  v-model="register.rePassword"
                />
                <v-text-field
                  prepend-inner-icon="mdi-account-box-outline"
                  outlined
                  label="Name"
                  :rules="[rules.required]"
                  v-model="register.name"
                />
                <v-text-field
                  prepend-inner-icon="mdi-email-outline"
                  outlined
                  label="Email"
                  :rules="[rules.required, rules.email]"
                  v-model="register.email"
                />
                <v-text-field
                  prepend-inner-icon="mdi-phone"
                  outlined
                  label="Phone number"
                  :rules="[rules.required, rules.phone]"
                  v-model="register.phone"
                />

                <v-radio-group v-model="register.is_driver" row class="mt-0">
                  <v-radio
                    v-for="user in TYPE_USERS"
                    :key="user.value"
                    :label="user.label"
                    :value="user.value"
                    :disabled="user.disabled"
                  />
                </v-radio-group>
                <v-text-field
                  v-if="register.is_driver"
                  prepend-inner-icon="mdi-clipboard-account"
                  outlined
                  label="License plate"
                  :rules="[rules.required, rules.plate]"
                />
                <v-btn color="primary" width="100%" large @click="doRegister">
                  Register
                </v-btn>
              </v-form>
            </v-tab-item>
          </v-tabs-items>
        </v-card-text>
      </v-card>
      <v-footer class="white pt-1">
        <v-col class="d-flex align-center justify-center" cols="12">
          <img
            src="@/assets/taxi.png"
            alt=""
            class="mr-2"
            style="width: 20px"
          />
          {{ new Date().getFullYear() }} — <strong>RideSharing</strong>
        </v-col>
      </v-footer>
    </div>
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
    email: "",
    phone: "",
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
  .v-input__slot {
    min-height: 52px !important;
    margin-bottom: 0 !important;
  }
  .LoginPage-image {
    max-width: 50%;
    flex: 1;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  background-size: cover !important;
  background-repeat: no-repeat !important;

  &-card {
    background-color: white !important;

    .v-tabs-items {
      background-color: transparent !important;
    }
  }

  .v-input__slot {
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      background: #ffffffe8;
      -webkit-box-shadow: 0 0 0 30px #ffffffe8 inset !important;
    }
  }
}
</style>
