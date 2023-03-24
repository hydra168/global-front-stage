<template>
  <div class="LotteryList-001">
    <v-toolbar class="primary" :dark="dark" :height="height" @click="ifShow = !ifShow">
      <v-toolbar-items class="page-container">
        <div class="ck-title-wrap px-1">
          <div class="ck-title">{{ computedTitle }}</div>
        </div>
      </v-toolbar-items>
    </v-toolbar>
    <div :class="['game-list', { show: ifShow }]">
      <v-card :data-link="item.link" tile color="#fff" width="100%" height="40" v-for="(item, i) in menuData" :key="i">
        <a class="item-link" @click.prevent="routerPush(item)">
          <span>{{ item.label }}</span>
          <span class="highlight" v-if="item.isHot">{{ textFilter('hotText') }}</span>
        </a>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'LotteryList-001',
  props: {
    dark: {
      type: Boolean,
      default: true,
    },
    height: {
      type: String,
      default: '30',
    },
    title: {
      type: String,
      default: '',
    },
    menuItems: {
      type: Function,
      default: () => {
        return [
          { label: 'jsPk10', tag: '极速PK10', isHot: true },
          { label: 'jsft', tag: '极速飞艇', isHot: true },
          { label: 'maert', tag: '马耳他幸运飞艇', isHot: true },
          { label: 'opk10', tag: '北京PK拾', isHot: true },
          { label: 'bjPkH', tag: '北京赛马', isHot: true },
          { label: 'cqssc', tag: '重庆时时彩' },
          { label: 'jscar', tag: '极速飞车' },
          { label: 'jssyxw', tag: '极速11选5' },
          { label: 'tjssc', tag: '天津时时彩' },
          { label: 'txffc', tag: '腾讯分分彩' },
          { label: 'oynssc', tag: '云南时时彩' },
          { label: 'syxw', tag: '四省11选5' },
          { label: 'oxjssc', tag: '新疆时时彩' },
          { label: 'ssc', tag: '两省时时彩' },
          { label: 'or_js5', tag: '极速五分彩' },
          { label: 'or_js3', tag: '极速三分彩' },
          { label: 'zjbxs', tag: '浙江飞鱼' },
          { label: 'hksp6', tag: '香港六合彩' },
          { label: 'sp6', tag: '六合彩' },
        ];
      },
    },
  },
  computed: {
    ...mapGetters(['gameLinkList']),
    computedTitle() {
      return this.title ? this.$t(this.title) : this.textFilter('title', { length: this.menuData.length });
    },
  },
  watch: {
    gameLinkList() {
      this.menuHandler();
    },
  },
  data() {
    return {
      ifShow: false,
      menuData: [],
    };
  },
  created() {
    this.GET_GAME_LINK_LIST();
  },
  methods: {
    ...mapActions(['GET_GAME_LINK_LIST']),
    menuHandler() {
      let menu = [];
      this.menuItems().forEach(element => {
        menu.push({
          ...element,
          label: this.commonTextFilter(element.label),
          ...this.gameLinkList.find(obj => {
            return obj.name.indexOf(this.commonTextFilter(element.label)) >= 0;
          }),
        });
      });
      this.menuData = menu;
    },
    routerPush(item) {
      this.$router.push({ path: item.link ? '/play/' + item.link : '/play/BxkZVPiJb63a' });
    },
    textFilter(text, slot) {
      return slot ? textFilter(text, 'com_lotteryList_001_', slot) : textFilter(text, 'com_lotteryList_001_');
    },
    commonTextFilter(text) {
      return textFilter(text, 'common_gameList_');
    },
  },
};
</script>

<style lang="scss">
.LotteryList-001 {
  position: relative;
  .v-toolbar {
    box-shadow: none;
  }
  .v-toolbar__content {
    line-height: 30px;
    .v-toolbar__items {
      margin: 0 auto;
    }
  }
  .game-list {
    width: 100%;
    &.show {
      .v-card {
        height: #{(40/14)}em !important;
      }
    }
    .v-card {
      display: flex;
      align-items: center;
      height: 0 !important;
      transition: height 0.3s;
      padding: 0 15px;
      overflow: hidden;
      .item-link {
        color: #434344;
        text-decoration: none;
        &.disabled {
          color: #aaa;
          pointer-events: none;
        }
      }
    }
  }
  .highlight {
    font-size: 11px;
    padding: 0.1em 1em;
    margin-left: 1em;
    background: #fb412f;
    color: #fff;
    white-space: nowrap;
  }
}
</style>
