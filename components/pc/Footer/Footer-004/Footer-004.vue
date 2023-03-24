<template>
  <div class="Footer-004-wrap">
    <div class="Footer-004">
      <div class="license__img"></div>
      <div class="license__text">
        <span>{{ textFilter('contentText') }}</span>
        <span>{{ textFilter('note') }}</span>
      </div>
      <div class="pay"></div>
    </div>
    <div class="msg copyRight001">
      <div class="footer__img"></div>
      <div class="list__wrap">
        <div class="footer__list" v-for="item in list" :key="item.code" @click="ROUTER_PUSH(item.url)">
          <span>{{ textFilter(item.name) }}</span>
        </div>
      </div>
      <p>{{ textFilter('copyright', { year, webTitle }) }}</p>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'Footer-004',

  computed: {
    ...mapGetters(['config', 'webTitle', 'locale', 'appDownloadPath']),
    year() {
      return this.config.copyright ? this.config.copyright : new Date().getFullYear();
    },
  },
  data() {
    return {
      list: [
        { url: '/helpCentre/problem', name: 'link_problem' },
        { url: '/helpCentre/about', name: 'link_about' },
        { url: '/helpCentre/terms', name: 'link_terms' },
        { url: '/helpCentre/features', name: 'link_features' },
        { url: 'liveChat', name: 'link_contact' },
      ],
    };
  },
  methods: {
    ...mapMutations(['SET_GLOBAL_BOX']),
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
    textFilter(text, slot) {
      return slot ? textFilter(text, 'com_footer_004_', slot) : textFilter(text, 'com_footer_004_');
    },
  },
};
</script>

<style lang="scss">
.Footer-004-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .Footer-004 {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background: #fff;

    .license__img {
      width: 388px;
      height: 120px;
      margin-top: 46px;
      background: url('./assets/license.png') no-repeat;
      background-size: 100% 100%;
      margin-bottom: 20px;
    }

    .license__text {
      line-height: 36px;
      font-size: 18px;
      margin-bottom: 28px;
    }

    span {
      display: flex;
      flex-direction: column;
      text-align: center;
    }

    .pay {
      width: 835px;
      height: 37px;
      background: url('./assets/pay.png') no-repeat;
      background-size: 100% 100%;
      margin-bottom: 34px;
    }
  }
  .copyRight001 {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    color: #fff;
    background: #000;

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
      width: 105px;
      text-align: center;
      font-size: 18px;
      cursor: pointer;

      // hover 效果
      @keyframes swing {
        15% {
          transform: translateX(5px);
        }
        40% {
          transform: translateX(-5px);
        }
        65% {
          transform: translateX(2px);
        }
        85% {
          transform: translateX(-2px);
        }
        100% {
          transform: translateX(0px);
        }
      }
      span {
        &:hover {
          display: inline-block;
          color: var(--v-primary-base);
          animation: swing 1s 1;
        }
      }
    }

    p {
      margin-top: 24px;
      margin: 40px;
    }
  }
}
</style>
