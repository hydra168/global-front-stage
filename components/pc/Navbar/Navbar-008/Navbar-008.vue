<template>
  <section class="NavBar-008" :style="navBarBg">
    <div class="navbar__wrap">
      <div class="wrap icon__wrap">
        <div class="icon__list" v-for="(item, index) in list" :key="index" @click="item.func ? item.func() : ROUTER_PUSH(item.link)">
          <v-icon x-large :color="navIconColor" v-bind="navIconBind">{{ item.icon }}</v-icon>
        </div>
      </div>
      <div class="wrap text__wrap" :style="textBarBg">
        <div class="text__list" v-for="(item, index) in list" :key="index" @click="item.func ? item.func() : ROUTER_PUSH(item.link)">
          <span>{{ $t(item.name) }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Navbar008',

  props: {
    // icon參數
    navIconBind: {
      type: Object,
      default: () => {},
    },

    navIconColor: {
      type: String,
      default: 'primary',
    },
    list: {
      type: Array,
      default: () => [
        { icon: 'sports_soccer', name: 'g_common_game_cs_sports', link: '/play/30n4hvJ4MGjhfY', src: require('./assets/cs.png') },
        { icon: 'casino', name: 'g_common_game_kaiyuan', link: '/play/BgFcIROExgMd', src: require('./assets/ky.png') },
        { icon: 'face', name: 'g_common_game_live', link: '/livelobby', src: require('./assets/live.png') },
        { icon: 'games', name: 'g_common_game_lottery_bet', link: '/ultimate', src: require('./assets/lottery.png') },
        { icon: 'sports_esports', name: 'g_common_game_mg_slot', link: '/slotlobby', src: require('./assets/mg.png') },
        { icon: 'gps_fixed', name: 'g_common_game_ag_fish', link: '/play/AGSvcZAA53g2Ly', src: require('./assets/ag.png') },
        { icon: 'card_giftcard', name: 'g_common_link_user', link: '/userCentre', src: require('./assets/userCentre.png') },
        { icon: 'smartphone', name: 'g_common_navbar_menu_appdownload', link: '/appdownload', src: require('./assets/app.png') },
      ],
    },
    navBar: {
      type: String,
      default: '#242424',
    },
    textBar: {
      type: Object,
      default: () => {
        return {
          backgroundColor: '#4c4b4b',
          color: '#fff',
        };
      },
    },
  },

  computed: {
    navBarBg() {
      return {
        background: this.navBar,
      };
    },
    textBarBg() {
      return {
        background: this.textBar.backgroundColor,
        color: this.textBar.color,
      };
    },
  },

  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
  },
};
</script>

<style lang="scss" scoped>
.navbar__wrap {
  display: flex;
  flex-direction: column;
}

.wrap {
  display: flex;
  justify-content: center;
  cursor: pointer;
}

.icon__wrap {
  padding: 24px 0;
  img {
    width: 35px;
    height: 35px;
  }
}

.text__wrap {
  padding: 12px 0;
}

.icon__list,
.text__list {
  width: 120px;
  text-align: center;
  margin: 0 60px;
}

// hover
.icon__list {
  transition: all 0.5s;
  &:hover {
    transform: rotateY(180deg);
  }
}
.text__list:hover {
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.8);
}
</style>
