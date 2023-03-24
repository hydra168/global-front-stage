<template>
  <div class="Footer-011" :class="footerClass">
    <div class="copyRight">
      <div class="d-flex align-center justify-center my-5">
        <img class="mx-3" width="100%" v-for="item in partnerList" :key="item.key" :src="item.src" alt="" />
      </div>
      <div class="d-flex align-center justify-center mb-5">
        <img class="mx-3" width="100%" v-for="item in payList" :key="item.key" :src="item.src" alt="" />
      </div>
      <p :class="webTitleClass">{{ textFilter('copyright1', { year }) }} {{ webTitle }} {{ textFilter('copyright2') }}</p>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'Footer',
  props: {
    partnerList: {
      type: Array,
      default: () => [
        { key: 1, src: require('./assets/img/bank01.png') },
        { key: 2, src: require('./assets/img/bank02.png') },
        { key: 3, src: require('./assets/img/bank03.png') },
        { key: 4, src: require('./assets/img/bank04.png') },
      ],
    },
    payList: {
      type: Array,
      default: () => [
        { key: 1, src: require('./assets/img/pay01.png') },
        { key: 2, src: require('./assets/img/pay02.png') },
        { key: 3, src: require('./assets/img/pay03.png') },
        { key: 4, src: require('./assets/img/pay04.png') },
        { key: 5, src: require('./assets/img/pay05.png') },
      ],
    },
    footerClass: {
      type: String,
      default: 'black--text',
    },
    webTitleClass: {
      type: String,
      default: 'black--text',
    },
  },
  computed: {
    ...mapGetters(['config', 'webTitle']),
    year() {
      return this.config.copyright ? this.config.copyright : new Date().getFullYear();
    },
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
    textFilter(text, slot) {
      return slot ? textFilter(text, 'com_footer_005_', slot) : textFilter(text, 'com_footer_005_');
    },
  },
};
</script>
<style lang="scss" scope>
.Footer-011 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #17263e;
  .copyRight {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    // .list__wrap {
    //   display: flex;
    //   flex-wrap: wrap;
    //   justify-content: center;
    //   width: 70%;
    //   margin: 30px 0;
    //   img {
    //     margin: 20px 50px;
    //   }
    // }
  }
}
</style>
