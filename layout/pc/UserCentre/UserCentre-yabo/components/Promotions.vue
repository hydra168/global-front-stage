<template>
  <div class="Promotions white pa-5" v-if="promotionList && promotionList.length">
    <h3 class="d-flex mt-0 black--text align-center justify-space-between font-size-18 font-weight-400">
      优惠活动
      <v-btn class="pa-0 justify-end" text color="#4d9974" @click="ROUTER_PUSH({ name: 'promotion' })">
        <template #default> 更多<v-icon class="ma-0" left>chevron_right</v-icon> </template>
      </v-btn>
    </h3>
    <div class="d-flex flex-wrap">
      <template v-for="(item, i) in promotionList.slice(0, 3)">
        <div v-if="item.loaded" class="d-flex flex-column width-100 grey--text my-5 border-bottom" :key="i">
          <v-btn class="height-auto" text @click="ROUTER_PUSH(`/promotion-detail/${item.id}`)">
            <img class="width-200px" :src="item.pc_image_url" :title="item.title" :alt="item.title" />
          </v-btn>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { textFilter } from '@UTILS/i18n';
import { mapGetters, mapActions } from 'vuex';
import { map } from 'lodash';

export default {
  name: 'Promotions',
  props: {},
  created() {
    this.GET_PROMOTION_LIST();
  },
  watch: {
    promotionList() {
      this.promotionList.forEach(item => {
        const img = window.document.createElement('img');
        try {
          img.onload = () => {
            item.loaded = true;
            this.$forceUpdate();
          };
        } catch (e) {
          item.item.loaded = false;
        }
        img.src = item.pc_image_url;
      });
    },
  },
  data() {
    return {};
  },

  computed: {
    ...mapGetters(['promotionList', 'promotionType']),
  },
  methods: {
    ...mapActions(['ROUTER_PUSH', 'GET_PROMOTION_LIST']),
    formatNumber(n) {
      return n.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
    },
  },
};
</script>
