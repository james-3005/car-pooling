<template>
  <div
    class="d-flex flex-column p-relative h-100"
    style="background-color: #085da0"
  >
    <div class="pa-4">
      <div class="d-flex justify-space-between">
        <p class="text-subtitle-1 white--text">Chào {{ user }}!</p>
        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-chip color="primary" v-bind="attrs" v-on="on">
              Quản lý
              <v-icon size="small" class="ml-2">mdi-account-circle</v-icon>
            </v-chip>
          </template>
          <v-list class="pa-0">
            <v-list-item class="c-pointer" @click="logout">
              <v-list-item-title>Đăng xuất</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
    <div class="rounded-t-lg flex-grow-1 pa-4 white d-flex flex-column gap-3">
      <v-skeleton-loader v-if="loader" type="card" height="184" />
      <v-skeleton-loader v-if="loader" type="card" height="184" />
      <v-card color="#952175" dark v-if="!loader">
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title class="text-h5">Quản lý xe</v-card-title>

            <v-card-subtitle class="my-1"
              >Hiển thị taxi và các tuyến đường
            </v-card-subtitle>
            <v-card-actions class="pb-4">
              <v-btn
                class="ml-2"
                outlined
                rounded
                small
                @click="$router.push('/monitor')"
              >
                Bắt đầu
              </v-btn>
            </v-card-actions>
          </div>

          <v-avatar class="ma-3" size="125" tile>
            <v-img src="@/assets/grouping.svg" />
          </v-avatar>
        </div>
      </v-card>

      <v-card color="#1F7087" dark v-if="!loader">
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title class="text-h5">Quản lý nhóm</v-card-title>

            <v-card-subtitle class="my-1"
              >Quản lý các nhóm đi chung
            </v-card-subtitle>
            <v-card-actions class="pb-4">
              <v-btn
                class="ml-2"
                outlined
                rounded
                small
                @click="$router.push('/cluster')"
              >
                Bắt đầu</v-btn
              >
            </v-card-actions>
          </div>

          <v-avatar class="ma-3" size="125" tile>
            <v-img src="@/assets/deliver.svg" />
          </v-avatar>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import BookingDrawer from "@/views/Client/BookingDrawer";

export default {
  name: "HomePage",
  components: { BookingDrawer },
  data: () => ({
    loader: true,
    user: JSON.parse(localStorage.getItem("user")).name,
  }),
  methods: {
    toggleDrawer() {
      this.$router.push("/map");
    },
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
  mounted() {
    setTimeout(() => {
      this.loader = false;
    }, 1000);
  },
};
</script>
<style lang="scss">
.w-85 {
  width: 85%;
}

.textfield {
  .v-icon {
    color: #ffbf0f;
  }
}

.position {
  bottom: 0;
  left: 0;
}
</style>
