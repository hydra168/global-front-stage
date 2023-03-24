<template>
  <div class="Footer-wrap" :class="footerClass">
    <div class="msg copyRight">
      <p class="copyright">
        {{ textFilter('copyright1', { year }) }}
        <span :class="webTitleClass">{{ webTitle }} </span>
        {{ textFilter('copyright2') }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { textFilter } from '@UTILS/i18n';
import { textReplacer } from '@UTILS';
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
    payList: {
      type: Array,
      default: () => [
        { src: require('./assets/bitmap_20.png') },
        { src: require('./assets/bitmap_19.png') },
        { src: require('./assets/bitmap_18.png') },
        { src: require('./assets/bitmap_21.png') },
        { src: require('./assets/bitmap_17.png') },
        { src: require('./assets/bitmap_12.png') },
        { src: require('./assets/bitmap_13.png') },
        { src: require('./assets/ag.png') },
        { src: require('./assets/bitmap_11.png') },
      ],
    },
    footerClass: {
      type: String,
      default: 'white black--text',
    },
    webTitleClass: {
      type: String,
      default: '',
    },
    administerContent: {
      type: String,
      default: null,
    },
  },
  computed: {
    ...mapGetters(['config', 'webTitle', 'locale', 'appDownloadPath']),
    formatedAdministerContent() {
      return this.administerContent
        ? textReplacer('@@{{webTitle}}@@', this.administerContent, this.webTitle)
        : this.textFilter('supervision_content', { webTitle: this.webTitle });
    },
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

  .Footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    .license__img {
      width: 58px;
      height: 58px;
      margin-top: 46px;
      background: url('./assets/license.png') no-repeat;
      background-size: 100% 100%;
      margin-bottom: 20px;
    }

    .license__text {
      margin-bottom: 28px;
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.92;
      letter-spacing: 0px;
      text-align: center;
      color: #fff;
      margin: 10px;
    }

    span {
      display: flex;
      flex-direction: column;
      text-align: center;
    }

    .pay {
      margin-top: 34px;
      ul {
        li {
          float: left;
          margin: 30px 30px 0px 0px;
          list-style: none;
          list-style-type: none; /*沒有標誌，不使用編號*/
        }
      }
    }
  }
  .copyRight {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    .footer__img {
      width: 625px;
      height: 30px;
      margin-top: 24px;
      background: url('./assets/game.png') no-repeat;
      background-size: 100% 100%;
    }

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
          transform: scale(1.1);
          transition: all 0.5s;
        }
      }
    }

    p {
      margin-top: 20px;

      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: normal;
      letter-spacing: 0px;
      text-align: center;
    }
  }
}
</style>
