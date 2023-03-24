<template>
  <v-dialog v-model="innerDialogPageType" ref="userCentreDialog" content-class="dialog-page" max-width="1440px" scrollable overlay-opacity="0">
    <v-card class="round">
      <v-toolbar dark color="primary" height="60px">
        <v-layout>
          <v-flex xs12>
            <v-toolbar-title class="headline text-center"> <v-icon>home</v-icon>&nbsp;&nbsp;{{ dialogTitle }} </v-toolbar-title>
          </v-flex>
        </v-layout>
        <v-btn icon @click="close()">
          <v-icon>close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card class="content" style="border-radius: 0px">
        <template v-if="isUserCentre">
          <UserCentre :isDialog="true" />
        </template>
        <template v-else-if="isHelpCentre">
          <HelpCentre :isDialog="true" />
        </template>
      </v-card>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
import UserCentre from '@LAYOUT/pc/UserCentre/UserCentre-default/index.vue';
import HelpCentre from '@LAYOUT/pc/HelpCentre/HelpCentre-default/index.vue';

export default {
  name: 'DialogPage-default',
  components: {
    UserCentre,
    HelpCentre,
  },
  computed: {
    ...mapGetters(['dialogPageType', 'dialogPagePath']),
    isUserCentre() {
      return this.dialogPageType === 'userCentre';
    },
    isHelpCentre() {
      return this.dialogPageType === 'helpCentre';
    },
    dialogTitle() {
      if (this.isUserCentre) return '个人中心';
      if (this.isHelpCentre) return '帮助中心';
      return '';
    },
    innerDialogPageType: {
      get: function () {
        return this.dialogPageType;
      },
      set: function (v) {
        if (!v) {
          this.$store.commit('CLEAR_DIALOG_PAGE');
        }
      },
    },
  },
  methods: {
    close() {
      this.innerDialogPageType = false;
    },
  },
};
</script>
<style lang="scss">
.dialog-page {
  .round {
    .content {
      overflow: scroll;
      max-height: 60vh;
      min-height: 60vh;
      display: flex;
      justify-content: space-between;
      .section {
        margin: 10px;
      }
      .tabs-wrap {
        .tabs {
          width: 200px;
        }
      }
      .content-wrap {
        width: 100%;
        padding: 20px;
      }
    }
  }
}
</style>
