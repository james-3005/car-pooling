<template>
  <div
    class="d-flex flex-column p-relative h-100"
    style="background-color: #085da0"
  >
    <div class="pa-4">
      <div class="d-flex gap-2">
        <p class="text-subtitle-1 white--text">Hi {{ user }}!</p>
        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-badge dot color="error" content="6" class="ml-auto mr-2">
              <v-btn icon small v-bind="attrs" v-on="on">
                <v-icon color="white">mdi-bell</v-icon>
              </v-btn>
            </v-badge>
          </template>
          <v-list class="pa-0">
            <v-list-item class="c-pointer">
              <v-list-item-avatar>
                <v-icon color="primary">mdi mdi-account-multiple</v-icon>
              </v-list-item-avatar>
              <v-list-item-content
                >The system has suggested you a group to go together.<br />
                <span class="success--text" @click="$router.push('/cluster')"
                  >Click to see details</span
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-menu>
          <template v-slot:activator="{ on, attrs }">
            <v-chip color="primary" v-bind="attrs" v-on="on">
              Manage
              <v-icon size="small" class="ml-2">mdi-account-circle</v-icon>
            </v-chip>
          </template>
          <v-list class="pa-0">
            <v-list-item class="c-pointer" @click="logout">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <div class="px-3 py-1 mt-4 white rounded c-pointer">
        <v-text-field
          prepend-icon="mdi-map-marker"
          placeholder="Input destination"
          class="textfield"
          @click="toggleDrawer"
        />
        <div class="d-flex gap-3">
          <v-chip color="accent">Ride request</v-chip>
          <v-chip color="accent">Car pooling</v-chip>
        </div>
      </div>
    </div>
    <div class="rounded-t-lg flex-grow-1 pa-4 white d-flex flex-column gap-3">
      <v-skeleton-loader v-if="loader" type="card" height="184" />
      <v-skeleton-loader v-if="loader" type="card" height="184" />
      <v-card color="#952175" dark v-if="!loader">
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title class="text-h5">Group</v-card-title>

            <v-card-subtitle class="my-1"
              >Based on frequent route analysis
            </v-card-subtitle>
            <v-card-actions class="pb-4">
              <v-btn
                class="ml-2"
                outlined
                rounded
                small
                @click="$router.push('/cluster')"
              >
                Start
              </v-btn>
            </v-card-actions>
          </div>

          <v-avatar class="ma-3" size="125" tile>
            <v-img src="@/assets/grouping.svg" />
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
