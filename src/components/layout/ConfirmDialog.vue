<template>
  <v-dialog v-model="confirm.value" :width="width || 500">
    <v-card width="500">
      <v-card-title
        class="primary white--text d-flex justify-space-between py-3"
        >{{ confirm.title || "Xác nhận" }}
        <v-icon class="white--text" @click="turnOffConfirm"> mdi-close</v-icon>
      </v-card-title>
      <v-card-text class="py-2 black--text">{{ confirm.content }}</v-card-text>
      <v-card-actions>
        <div class="d-flex gap-5 ma-auto">
          <ButtonIcon
            class="col-6 secondary black--text"
            @click="
              () => {
                if (confirm.cancelAction) confirm.cancelAction();
                turnOffConfirm();
              }
            "
            icon="mdi-close"
            text="Huỷ"
          />
          <ButtonIcon
            class="col-6 primary"
            @click="
              () => {
                turnOffConfirm();
                confirm.checkAction();
              }
            "
            icon="mdi-check"
            text="Xác nhận"
          />
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import ButtonIcon from "../ButtonIcon.vue";
import { useNotification } from "@/store/notification";
import { mapState, mapActions } from "pinia";

export default {
  components: { ButtonIcon },
  props: {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    value: {
      type: Boolean,
    },
    width: {
      type: String,
    },
    height: {
      type: String,
      default: null,
    },
    checkAction: {
      type: Function,
      require: true,
    },
    cancelAction: {
      type: Function,
    },
  },
  methods: {
    ...mapActions(useNotification, ["turnOffConfirm"]),
  },
  computed: {
    ...mapState(useNotification, ["confirm"]),
  },
  name: "ConfirmDialog",
};
</script>
