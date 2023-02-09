<template>
  <v-navigation-drawer
    :value="openDrawer"
    absolute
    temporary
    bottom
    class="booking-drawer"
    mobile-breakpoint="10000"
  >
    <div class="pa-3 userInfo p-relative h-100" style="background: #f3f4f6">
      <div class="d-flex align-center">
        <v-btn icon plain raised rounded class="mr-2">
          <v-icon color="black" @click="toggleDrawer">mdi-arrow-left</v-icon>
        </v-btn>
        <p class="text-h6 font-weight-bold mb-0">Điểm đến</p>
      </div>
      <v-card
        class="py-3 mt-4"
        style="  box-shadow: 0 4px 6px rgb(0 0 0 / 0.2); !important;"
      >
        <v-text-field
          prepend-icon="mdi-account-supervisor"
          placeholder="Chọn điểm đón"
          class="mt-0 px-4 textfield-focus"
          v-model="startValue"
          @input="searchAutoCompleteDebounce"
          @focus="focus = 'start'"
          append-icon="mdi-crosshairs-gps"
          @click:append="selectCurrentLocation"
        />
        <div class="my-3 mr-4" />
        <v-text-field
          prepend-icon="mdi-map-marker"
          placeholder="Chọn điểm đến"
          class="textfield mt-n1 px-4 textfield-focus"
          v-model="endValue"
          @focus="focus = 'end'"
          @input="searchAutoCompleteDebounce"
        />
        <v-row class="mx-0 align-center row-custom">
          <v-col>
            <v-text-field
              prepend-icon="mdi-clock-time-four-outline"
              placeholder="Thời gian đón"
              class=""
              hide-details
            />
          </v-col>
          <span class="mt-4">~</span>
          <v-col>
            <v-text-field placeholder="Thời gian đón" class="" hide-details />
          </v-col>
        </v-row>
        <v-row class="mx-0 align-center row-custom">
          <v-col>
            <v-text-field
              prepend-icon="mdi-clock-time-four-outline"
              placeholder="Thời gian trả"
              class=""
              hide-details
            />
          </v-col>
          <span class="mt-4">~</span>
          <v-col>
            <v-text-field placeholder="Thời gian trả" class="" hide-details />
          </v-col>
        </v-row>
      </v-card>
      <v-skeleton-loader
        class="mt-2"
        type="list-item-avatar-three-line, list-item-avatar-three-line, list-item-avatar-three-line"
        v-if="isLoadingLocation"
      />
      <div
        v-else
        v-for="(item, index) in searchList"
        :key="index"
        class="d-flex gap-2 px-3 py-1 align-center c-pointer hover-black rounded mt-2"
        @click="() => getSelectPlace(item)"
      >
        <v-btn class="elevation-0" fab x-small style="background: #dddde0ff">
          <v-icon class="icon-map">mdi-map-marker</v-icon>
        </v-btn>
        <div class="name flex-1 pt-2">
          <p
            class="text-button mb-0 font-weight-bold"
            style="line-height: 1.4rem"
          >
            {{ currentValue }}
          </p>
          <p class="text-caption mb-0 text-ellipsis" style="max-width: 300px">
            {{ item }}
          </p>
        </div>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script>
import {
  GET_ADDRESS_FROM_LATLNG,
  GET_LATLNG_FROM_ADDRESS,
  GET_LOCATION_LIST,
} from "@/services/location";
import { debounce } from "lodash";
import { mapActions } from "pinia/dist/pinia";
import { useLocation } from "@/store/location";

export default {
  name: "BookingDrawer",
  props: ["openDrawer", "toggleDrawer"],
  components: {},
  data: () => ({
    startValue: "",
    endValue: "",
    searchList: [],
    currentValue: "",
    focus: null,
    isLoadingLocation: false,
  }),
  methods: {
    searchAutoCompleteDebounce: debounce(function (str) {
      this.isLoadingLocation = true;
      this.currentValue = str;
      GET_LOCATION_LIST(str)
        .then((res) => {
          this.searchList = res.data?.predictions?.map(
            (item) => item.description,
          );
        })
        .finally(() => {
          this.isLoadingLocation = false;
        });
    }, 800),
    getSelectPlace(name) {
      GET_LATLNG_FROM_ADDRESS(name).then((res) => {
        this.setLocation(this.focus, res.data?.results[0]?.geometry?.location);
        if (this.focus === "end") {
          this.endValue = res.data?.results[0]?.formatted_address;
          this.setCenter(res.data?.results[0]?.geometry?.location);
        } else this.startValue = res.data?.results[0]?.formatted_address;

        this.focus = null;
        this.searchList = [];
        if (this.endValue && this.startValue) {
          this.$router.push("/map");
        }
      });
    },
    selectCurrentLocation() {
      navigator.geolocation.getCurrentPosition((position) => {
        GET_ADDRESS_FROM_LATLNG(
          position.coords.latitude,
          position.coords.longitude,
        ).then((res) => {
          this.startValue = res.data?.results[0]?.formatted_address;
          this.setLocation("start", res.data?.results[0]?.geometry?.location);
          if (this.endValue && this.startValue) {
            this.$router.push("/map");
          }
        });
      });
    },
    ...mapActions(useLocation, ["setLocation", "setCenter", "clearLocation"]),
  },
  watch: {
    openDrawer(value) {
      if (!value) {
        this.clearLocation();
        this.startValue = "";
        this.endValue = "";
        this.searchList = [];
      }
    },
  },
};
</script>
<style lang="scss">
.booking-drawer {
  max-height: 100% !important;

  .textfield {
    .v-icon {
      color: #ffbf0f;
    }
  }

  .v-text-field:not(.timefield) > .v-input__control > .v-input__slot:before,
  .v-text-field:not(.timefield) > .v-input__control > .v-input__slot:after {
    width: 0 !important;
  }

  .name {
    border-bottom: thin solid #d9d9d9;
  }

  .icon-map {
    color: #07213b !important;
  }

  .hover-black:hover {
    background: #e3e3e3;
  }

  .border {
    border-bottom: 2px solid #2268af !important;
    width: 100%;
  }

  .border-transparent {
    border-bottom: 2px solid transparent;
  }

  .border-transparent-start {
    border-bottom: 2px solid #d9d9d9;
    margin-left: 40px;
    margin-right: 16px;
  }

  .v-icon.mdi-crosshairs-gps {
    color: #2268af;
  }

  .row-custom:has(.v-input--is-focused) {
    border-bottom: 2px solid #2268af !important;
  }

  .textfield-focus.v-input--is-focused {
    border-bottom: 2px solid #2268af !important;
  }
}
</style>
