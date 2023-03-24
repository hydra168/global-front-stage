<template>
  <span class="ColumnSelector">
    <v-menu v-model="isShow" :close-on-content-click="false" offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" :color="color" :disabled="isLoading" depressed>{{ $t(text) }}</v-btn>
      </template>
      <v-card v-if="isShow" max-height="30vh">
        <v-card-text style="background: #fff">
          <p class="text-right">
            <v-btn small depressed :color="color" @click="reset">{{ textFilter('reset') }}</v-btn>
          </p>
          <v-checkbox
            v-for="(item, index) in list"
            :key="item.text"
            :label="itemFilter(item.text)"
            :input-value="item.isShow"
            @click="change(index, item.isShow)"
          ></v-checkbox>
        </v-card-text>
      </v-card>
    </v-menu>
  </span>
</template>

<script>
import { mapGetters } from 'vuex';
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'ColumnSelector',
  props: {
    color: {
      type: String,
      default: 'primary',
    },
    text: {
      type: String,
      default: 'g_layout_userCentre_default_agencyCenter_columnSelector_btn',
    },
    list: {
      type: Array,
      required: true,
    },
    preLanguage: {
      type: String,
      default: 'layout_userCentre_default_agencyCenter_overview_',
    },
  },
  data() {
    return {
      isShow: false,
    };
  },
  computed: {
    ...mapGetters(['isLoading']),
  },
  methods: {
    reset() {
      this.list.forEach(i => {
        i.isShow = true;
      });
      this.$emit('change');
    },
    change(index, status) {
      this.list[index]['isShow'] = !status;
      this.$emit('change');
    },
    textFilter(text) {
      return textFilter(text, 'layout_userCentre_default_agencyCenter_columnSelector_');
    },
    itemFilter(text) {
      return textFilter(text, this.preLanguage);
    },
  },
};
</script>
