<template>
  <v-dialog v-model="dialog" persistent max-width="290px">
    <v-card style="border-radius: 10px">
      <v-toolbar class="toobar grey--text text--darken-1 text-center" :elevation="0">
        <v-toolbar-title class="text-h6 d-flex">{{ textFilter('title') }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu bottom left>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon @click="close()">
              <v-icon>close</v-icon>
            </v-btn>
          </template>
        </v-menu>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-layout wrap>
            <v-flex xs12>
              <v-card-text class="text-center">{{ textFilter('content') }}</v-card-text>
            </v-flex>
            <v-flex xs12 text-center mt-5>
              <v-btn depressed class="primary white--text x-small" @click="confirm()">
                {{ textFilter('confirmBtn') }}
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { textFilter } from '@UTILS/i18n';

export default {
  props: ['isOpen'],
  data() {
    return {
      dialog: false,
    };
  },
  watch: {
    isOpen() {
      this.dialog = this.isOpen;
    },
  },
  methods: {
    confirm() {
      this.$emit('confirm');
    },
    close() {
      this.$emit('close', false);
    },
    textFilter(text) {
      return textFilter(text, 'layout_userCentre_default_com_deleteDialog_');
    },
  },
};
</script>

<style lang="scss" scoped>
.toobar {
  background-image: none;
  font-size: 1.4rem;
  box-shadow: none;
}
.confitm-btn {
  margin-left: 10vw;
  width: 150px;
  background-image: none;
}
</style>
