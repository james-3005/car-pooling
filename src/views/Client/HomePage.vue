<template>
  <div
    class="h-100 d-flex flex-column p-relative overflow-hidden"
    style="background-color: #085da0"
  >
    <div class="pa-4">
      <div class="d-flex justify-space-between">
        <p class="text-subtitle-1 white--text">Chào Trần Nhật Huy!</p>
        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-chip color="primary" v-bind="attrs" v-on="on"
              >1,234
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
      <div class="px-3 py-1 mt-4 white rounded c-pointer">
        <v-text-field
          prepend-icon="mdi-map-marker"
          placeholder="Nhập điểm đến"
          class="textfield"
          @click="toggleDrawer"
        />
        <div class="d-flex gap-3">
          <v-chip color="accent">Đặt xe nhanh</v-chip>
          <v-chip color="accent">Chi phí rẻ</v-chip>
        </div>
      </div>
    </div>
    <div class="rounded-t-lg flex-grow-1 pa-4 white d-flex flex-column gap-3">
      <v-skeleton-loader v-if="loader" type="card" height="184" />
      <v-skeleton-loader v-if="loader" type="card" height="184" />
      <v-card color="#952175" dark v-if="!loader">
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title class="text-h5">Ghép cặp</v-card-title>

            <v-card-subtitle class="my-1"
              >Dựa trên phân tích tuyến đường thường xuyên
            </v-card-subtitle>
            <v-card-actions class="pb-4">
              <v-btn class="ml-2" outlined rounded small> Bắt đầu</v-btn>
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
            <v-card-title class="text-h5">Ship đồ</v-card-title>

            <v-card-subtitle class="my-1"
              >Gửi đồ đến nơi bạn muốn
            </v-card-subtitle>
            <v-card-actions class="pb-4">
              <v-btn class="ml-2" outlined rounded small> Bắt đầu</v-btn>
            </v-card-actions>
          </div>

          <v-avatar class="ma-3" size="125" tile>
            <v-img src="@/assets/deliver.svg" />
          </v-avatar>
        </div>
      </v-card>
    </div>
    <div class="px-4 white">
      <v-carousel
        cycle
        :show-arrows="false"
        hide-delimiter-background
        delimiter-icon="mdi-minus"
        height="180"
      >
        <v-carousel-item v-for="(_, i) in 2" :key="i">
          <v-sheet height="100%" tile>
            <v-row class="fill-height" align="center" justify="center">
              <v-img src="@/assets/bottom-banner-1.png" />
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </div>
    <BookingDrawer :open-drawer="openDrawer" :toggle-drawer="toggleDrawer" />
  </div>
</template>

<script>
import BookingDrawer from "@/views/Client/BookingDrawer";

export default {
  name: "HomePage",
  components: { BookingDrawer },
  data: () => ({
    openDrawer: false,
    loader: true,
  }),
  methods: {
    toggleDrawer() {
      this.openDrawer = !this.openDrawer;
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
</style>
