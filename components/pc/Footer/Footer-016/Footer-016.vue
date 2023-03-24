<template>
  <div class="Footer-default-wrap">
    <div class="Footer-default py-5" :class="footerClass">
      <div class="license__img1">
        <img v-for="(item, index) in license1List" :key="index" :src="item.src" />
      </div>
      <div class="license__text pb-5">
        <span>{{ $t(licenseText1) }}</span>
        <span>{{ $t(licenseText2) }}</span>
      </div>
      <div>
        <img :src="require('./assets/lottery-group.png')" alt="" />
      </div>
      <div class="browser">
        <span>- 推荐浏览器 -</span>
      </div>
      <div>
        <img :src="require('./assets/browser.png')" alt="" />
      </div>
    </div>
    <div class="msg copyRight" :class="copyRightClass">
      <div v-if="isShowPay" class="pay">
        <ul>
          <li v-for="(item, index) in payList" :key="index">
            <v-img :src="item.src"></v-img>
          </li>
        </ul>
      </div>
      <div class="list__wrap">
        <div class="footer__list" v-for="item in list" :key="item.code" @click="ROUTER_PUSH(item.url)">
          <span>{{ textFilter(item.name) }}</span>
        </div>
      </div>
      <p :class="copyRightSubClass">{{ textFilter('copyright1', { year }) }}{{ webTitle }} {{ textFilter('copyright2') }}</p>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'Footer-default',
  props: {
    footerClass: {
      type: String,
      default: 'white--text black',
    },
    copyRightClass: {
      type: String,
      default: 'white--text black',
    },
    copyRightSubClass: {
      type: String,
      default: 'white--text black',
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
    licenseText1: {
      type: String,
      default: 'g_com_footer_default_license1',
    },
    licenseText2: {
      type: String,
      default: 'g_com_footer_default_license2',
    },
    license1List: {
      type: Array,
      default: () => [{ src: require('./assets/license1.png') }, { src: require('./assets/license2.png') }],
    },
    license2List: {
      type: Array,
      default: () => [
        { src: require('./assets/icon-g-001.png'), text: 'g_common_logoIcon_welfare_lottery' },
        { src: require('./assets/icon-g-002.png'), text: 'g_common_logoIcon_sports_lottery' },
      ],
    },
    isShowPay: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapGetters(['config', 'webTitle', 'locale', 'appDownloadPath']),
    year() {
      return this.config.copyright ? this.config.copyright : new Date().getFullYear();
    },
  },
  data() {
    return {
      list: [
        { url: '/helpCentre/problem', name: 'faq' },
        { url: '/helpCentre/about', name: 'about_us' },
        { url: '/helpCentre/terms', name: 'terms_use' },
        { url: 'liveChat', name: 'contact_us' },
      ],
    };
  },
  methods: {
    ...mapMutations(['SET_GLOBAL_BOX']),
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
    textFilter(text, slot) {
      return slot ? textFilter(text, 'com_footer_default_', slot) : textFilter(text, 'com_footer_default_');
    },
  },
};
</script>
<style lang="scss">
.Footer-default-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .Footer-default {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding-top: 20px;
    .license__img1 {
      margin-bottom: 30px;
      img {
        margin-right: 40px;
      }
    }
    .license__text {
      font-size: 14px;
      line-height: 1.93;
      letter-spacing: 0px;
      // color: #c9c9c9;
      color: var(--v-secondary-base);
      span {
        display: flex;
        flex-direction: column;
        text-align: center;
      }
    }
    .license__img2 {
      margin: 10px 20px 20px 0;
      .image {
        width: 32px;
        height: 32px;
      }
      span {
        margin-left: 10px;
      }
    }
  }
  .copyRight {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    .pay {
      ul {
        li {
          float: left;
          margin: 30px 30px 0px 0px;
          list-style: none;
          list-style-type: none; /*沒有標誌，不使用編號*/
        }
      }
    }

    .list__wrap {
      display: flex;
      margin-top: 32px;
    }

    .footer__list {
      min-width: 105px;
      text-align: center;
      font-size: 18px;
      cursor: pointer;
    }

    p {
      margin-top: 24px;

      font-size: 12px;
      letter-spacing: 0px;
      text-align: center;
    }
  }
}

// Hover effect
.footer__list {
  span {
    &:hover {
      font-size: 19px;
      font-weight: 600;
    }
  }
}
.browser {
  margin: 10px 0 20px;
}
</style>
