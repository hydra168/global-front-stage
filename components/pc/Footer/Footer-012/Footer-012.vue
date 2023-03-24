<template>
  <div class="Footer-007">
    <div class="container pb-7">
      <div class="d-flex justify-center align-center">
        <div class="w50">
          <div class="d-flex justify-center white--text text01 mb-6">{{ textFilter('payment') }}</div>
          <div class="d-flex justify-center">
            <div class="ml-4 mr-4" v-for="item in formatedDataList01" :key="item.id">
              <img :src="item.img" alt="" />
            </div>
          </div>
        </div>
        <div class="w50">
          <div class="d-flex justify-center white--text text01 mb-6">{{ textFilter('partner') }}</div>
          <div class="d-flex justify-center">
            <div class="ml-4 mr-4" v-for="item in formatedDataList02" :key="item.id">
              <img :src="item.img" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-center align-center mt-8 mb-8">
        <div class="footer__list white--text" v-for="item in formatedList" :key="item.code" @click="ROUTER_PUSH(item.url)">
          <span>{{ textFilter(item.name) }}</span>
        </div>
      </div>
      <div class="d-flex justify-center align-center">
        <div class="d-flex justify-center">
          <div class="ml-4 mr-4" v-for="item in formatedDataList03" :key="item.id">
            <img :src="item.img" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-center pt-10 pb-10 copyright">
      {{ textFilter('copyright1', { year }) }}{{ webTitle }}{{ textFilter('copyright2') }}
    </div>
  </div>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { textFilter } from '@UTILS/i18n';
import { mergeArrayObjectsCode } from '@UTILS/';

export default {
  name: 'Footer-007',
  props: {
    pDataList01: {
      type: Array,
      default: () => [],
    },
    pDataList02: {
      type: Array,
      default: () => [],
    },
    pDataList03: {
      type: Array,
      default: () => [],
    },
    pList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      dataList01: [
        { code: 0, img: require('./assets/icon12.png'), show: true },
        { code: 1, img: require('./assets/icon11.png'), show: true },
        { code: 2, img: require('./assets/icon08.png'), show: true },
        { code: 3, img: require('./assets/icon04.png'), show: true },
        { code: 4, img: require('./assets/icon13.png'), show: true },
      ],
      dataList02: [
        { code: 0, img: require('./assets/icon09.png'), show: true },
        { code: 1, img: require('./assets/icon15.png'), show: true },
        { code: 2, img: require('./assets/icon05.png'), show: true },
        { code: 3, img: require('./assets/icon02.png'), show: true },
      ],
      dataList03: [
        { code: 0, img: require('./assets/icon06.png'), show: true },
        { code: 1, img: require('./assets/icon01.png'), show: true },
        { code: 2, img: require('./assets/icon07.png'), show: true },
        { code: 3, img: require('./assets/icon10.png'), show: true },
        { code: 4, img: require('./assets/icon14.png'), show: true },
        { code: 5, img: require('./assets/icon03.png'), show: true },
      ],
      list: [
        { code: 0, url: '/helpCentre/problem', name: 'faq', show: true },
        { code: 1, url: '/helpCentre/about', name: 'about_us', show: true },
        { code: 2, url: '/helpCentre/terms', name: 'terms_use', show: true },
        { code: 3, url: '/helpCentre/features', name: 'features', show: true },
        { code: 4, url: 'liveChat', name: 'contact_us', show: true },
      ],
    };
  },
  computed: {
    ...mapGetters(['config', 'webTitle', 'locale', 'appDownloadPath']),
    formatedDataList01() {
      return mergeArrayObjectsCode(this.pDataList01, this.dataList01);
    },
    formatedDataList02() {
      return mergeArrayObjectsCode(this.pDataList02, this.dataList02);
    },
    formatedDataList03() {
      return mergeArrayObjectsCode(this.pDataList03, this.dataList03);
    },
    formatedList() {
      return mergeArrayObjectsCode(this.pList, this.list);
    },
    year() {
      return this.config.copyright ? this.config.copyright : new Date().getFullYear();
    },
  },
  methods: {
    ...mapMutations(['SET_GLOBAL_BOX']),
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
    textFilter(text, slot) {
      return slot ? textFilter(text, 'com_footer_007_', slot) : textFilter(text, 'com_footer_007_');
    },
  },
};
</script>
<style lang="scss" scoped>
.Footer-007 {
  background-color: #6ab5f9;
  padding-top: 60px;
}
.w50 {
  width: 50%;
}
.text01 {
  font-size: 19px;
}
.container {
  width: 1350px;
}
.copyright {
  background-color: #1565c0;
  color: #fff;
}
// hover 效果
.footer__list {
  cursor: pointer;
  &:hover {
    background: rgba($color: #000, $alpha: 0.2);
    border-radius: 50%;
    padding: 10px;
    transition: all 0.5s;
  }
}
</style>
