<template>
  <!-- 更改備註 -->
  <v-dialog v-model="isOpen" max-width="600px" @click:outside="close">
    <v-card>
      <v-card-title class="text-center py-5 d-flex justify-center">
        {{ textFilter('title') }}
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field :label="textFilter('originalNoteLabel')" v-model="info.remark" disabled> </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field :label="textFilter('noteLabel')" v-model="remark"> </v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="close" outlined>{{ textFilter('cancelBtn') }}</v-btn>
        <v-btn color="primary" depressed @click="update">{{ textFilter('confirmBtn') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'RemarkModal',
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    info: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      remark: '',
    };
  },
  methods: {
    update() {
      const input = {
        target_id: this.info.user_id,
        remark: this.remark,
      };
      this.$emit('update', input);
    },
    close() {
      this.$emit('close', false);
    },
    textFilter(text) {
      return textFilter(text, 'layout_userCentre_default_agencyCenter_remarkModal_');
    },
  },
};
</script>
