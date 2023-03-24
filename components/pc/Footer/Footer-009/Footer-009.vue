<template>
  <div class="Footer-wrap" :class="footerClass">
    <div class="copyRight">
      <div class="list__wrap mb-2">
        <div class="footer__list" v-for="item in copyRightList" :key="item.code" @click="ROUTER_PUSH(item.url)">
          <span>{{ textFilter(item.name) }}</span>
        </div>
      </div>
      <div class="py-5">
        <img src="./assets/foot-pay.png" alt="" />
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
    copyRightList: {
      type: Array,
      default: () => [
        { url: '/helpCentre/problem', name: 'faq' },
        { url: '/helpCentre/about', name: 'about_us' },
        { url: '/helpCentre/terms', name: 'terms_use' },
        { url: '/helpCentre/features', name: 'features' },
        { url: 'liveChat', name: 'contact_us' },
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
    ...mapMutations(['SET_GLOBAL_BOX']),
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
    textFilter(text, slot) {
      return slot ? textFilter(text, 'com_footer_005_', slot) : textFilter(text, 'com_footer_005_');
    },
  },
};
</script>
<style lang="scss" scope>
.Footer-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .copyRight {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    .list__wrap {
      display: flex;
      margin-top: 32px;
    }
    .footer__list {
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: 0px;
      text-align: center;
      cursor: pointer;
      // hover 效果
      span {
        &:hover {
          display: inline-block;
          color: var(--v-primary-base);
        }
      }
    }
  }
}
</style>
