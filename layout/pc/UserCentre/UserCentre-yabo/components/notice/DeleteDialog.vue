<template>
  <v-dialog v-model="dialog" persistent max-width="290px">
    <v-card>
      <v-toolbar dark color="primary">
        <v-spacer></v-spacer>
        <v-toolbar-title class="headline">{{ textFilter('title') }}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap text-center>
            <v-flex xs12>
              <v-card-text>{{ delString }}</v-card-text>
            </v-flex>
            <v-flex xs12>
              <v-btn color="primary" outlined @click="close()">
                {{ textFilter('cancelBtn') }}
              </v-btn>
              <v-btn class="ml-10" color="primary" depressed @click="confirm()">
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
  props: ['isOpen', 'delString'],
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
      return textFilter(text, 'layout_userCentre_default_com_notice_deleteDialog_');
    },
  },
};
</script>
