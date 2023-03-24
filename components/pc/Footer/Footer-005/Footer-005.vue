<template>
  <div class="Footer-wrap" :class="footerClass">
    <div class="Footer">
      <div class="pay">
        <ul>
          <li v-for="(item, index) in payList" :key="index">
            <img width="100%" :src="item.src" />
          </li>
        </ul>
      </div>
      <div class="license__img"></div>
      <div class="license__text">
        <span> {{ formatedAdministerContent }} </span>
      </div>
    </div>
    <div class="copyRight">
      <div class="list__wrap">
        <div class="footer__list" v-for="item in copyRightList" :key="item.code" @click="ROUTER_PUSH(item.url)">
          <span>{{ textFilter(item.name) }}</span>
        </div>
      </div>
      <p class="copyRightTitle">
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
        { src: require('./assets/img/bitmap_20.png') },
        { src: require('./assets/img/bitmap_19.png') },
        { src: require('./assets/img/bitmap_18.png') },
        { src: require('./assets/img/bitmap_21.png') },
        { src: require('./assets/img/bitmap_17.png') },
        { src: require('./assets/img/bitmap_12.png') },
        { src: require('./assets/img/bitmap_13.png') },
        { src: require('./assets/img/ag.png') },
        { src: require('./assets/img/bitmap_11.png') },
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
      background: url('./assets/img/license.png') no-repeat;
      background-size: 100% 100%;
    }
    .license__text {
      width: 620px;
      margin: 20px;
      font-size: 12px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.92;
      letter-spacing: 0px;
      text-align: center;
      color: #000;
    }
    span {
      display: flex;
      flex-direction: column;
      text-align: center;
    }
    .pay {
      ul {
        display: flex;
        align-items: center;
        justify-content: center;
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
    .list__wrap {
      display: flex;
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
