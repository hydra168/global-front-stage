<template>
  <aside class="Navbar-016" :class="color">
    <div pa-0 class="d-flex align-stretch">
      <div v-for="(item, i) in youshi" :key="i" @click="item.func" class="nav-item text-center" :class="[hoverColor ? 'isHover' : '']">
        <v-btn dark text :class="itemClass">
          <v-icon v-if="item.icon" :color="iconColor">{{ item.icon }} </v-icon>
          <span :class="itemTitleClass">{{ $t(item.title) }}</span>
        </v-btn>
      </div>
    </div>
  </aside>
</template>

<script>
import { mapActions } from 'vuex';
import { mergeArrayObjectsCode } from '@UTILS/';

export default {
  name: 'Navbar-016',
  props: {
    itemClass: {
      type: String,
      default: 'py-3 px-4',
    },
    itemTitleClass: {
      type: String,
      default: 'font-weight-black text-subtitle-1',
    },
    color: {
      type: String,
      default: 'primary',
    },
    iconColor: {
      type: String,
      default: 'white',
    },
    hoverColor: {
      type: Boolean,
      default: false,
    },
    menuDataOptions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      menuData: [
        { sort: 1, show: true, code: 'home', title: '', icon: 'home', func: () => this.ROUTER_PUSH('/') },
        {
          sort: 2,
          show: true,
          code: 'cssports',
          title: 'g_common_navbar_menu_sports',
          func: () => this.ROUTER_PUSH('/play/30n4hvJ4MGjhfY'),
        },
        { sort: 3, show: true, code: 'lottery', title: 'g_common_game_lottery_bet', func: () => this.ROUTER_PUSH('/ultimate') },
        {
          sort: 4,
          show: true,
          code: 'chess',
          title: 'g_common_game_chesscard_showdown',
          func: () => this.ROUTER_PUSH('/play/HLIyM9l2Whjg'),
        },
        { sort: 5, show: true, code: 'fish', title: 'g_common_game_fish_game', func: () => this.ROUTER_PUSH('/play/FQdYENQVDS4i') },
        { sort: 6, show: true, code: 'live', title: 'g_common_game_live', func: () => this.ROUTER_PUSH('/play/xDwICiYhUjpc') },
        // { sort: 7, show: true, code: 'slot', title: 'g_common_game_slot_game', func: () => this.ROUTER_PUSH('/slot') },
        { sort: 8, show: true, code: 'helpCentre', title: 'g_common_link_help', func: () => this.ROUTER_PUSH('/helpCentre') },
        { sort: 9, show: true, code: 'userCentre', title: 'g_common_link_user', func: () => this.ROUTER_PUSH('/userCentre') },
        {
          sort: 10,
          show: true,
          code: 'promotion',
          title: 'g_common_link_promotions',
          func: () => this.ROUTER_PUSH('/promotion'),
        },
        {
          sort: 11,
          show: true,
          code: 'appdownload',
          title: 'g_common_link_app',
          func: () => this.ROUTER_PUSH('/appdownload'),
        },
        {
          sort: 12,
          show: true,
          code: 'installdownload',
          title: 'g_common_link_pc',
          func: () => this.ROUTER_PUSH('/installdownload'),
        },
      ],
    };
  },
  computed: {
    youshi() {
      return mergeArrayObjectsCode(this.menuDataOptions, this.menuData);
    },
  },
  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
  },
};
</script>

<style lang="scss" scoped>
.Navbar-016 {
  .full-width {
    width: 100%;
  }
  $base-color: #fc0a2e;
  .nav-item {
    display: flex;
    flex: 1;
    justify-items: center;
    position: relative;
    // &:hover {
    //   height: calc(100% + 0.3em);
    // }
    &:after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 11;
      transition-duration: 0.25s;
    }
    &:hover:after {
      height: calc(100% + 0.3em);
      // text-shadow: 0 0 6px #fdf8ee, 0 0 10px #ff435f, 0 0 16px #ff435f, 0 0 20px #ff435f;
    }
    button {
      transition-duration: 0.25s;
      &:before {
        transition-duration: 0.25s;
      }
      &:hover {
        &:before {
          height: calc(100% + 0.3em);
        }
        text-shadow: 0 0 6px #fdf8ee, 0 0 10px #ff435f, 0 0 16px #ff435f, 0 0 20px #ff435f;
      }
    }
    @for $i from 1 through 50 {
      &:nth-child(#{$i}):after {
        background: $base-color;
        background: -webkit-gradient(
          linear,
          left top,
          right top,
          from(darken($base-color, 15%)),
          color-stop($base-color),
          color-stop($base-color),
          to($base-color)
        );
        background: linear-gradient(to right, darken($base-color, 15%), $base-color, $base-color, $base-color);
      }
      $base-color: darken($base-color, 3.6%);
    }
  }
  .theme--dark.v-btn {
    position: relative;
    z-index: 12;
    height: auto;
    width: 100%;
    height: 100%;
  }
}
</style>
