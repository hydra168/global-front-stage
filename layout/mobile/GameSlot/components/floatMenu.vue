<template>
  <v-speed-dial
    id="FloatMenu"
    v-model="fab"
    fixed
    :direction="direction"
    :transition="transition"
    :style="`top: ${y}; left: ${x}; touch-action: none;`"
  >
    <template v-slot:activator>
      <v-btn v-model="fab" color="primary" dark fab small>
        <v-icon v-if="fab">close</v-icon>
        <v-icon v-else>menu</v-icon>
      </v-btn>
    </template>
    <v-btn @click="routerPush(item)" v-for="(item, i) in items" :key="i" fab dark small :color="item.color" :class="item.class">
      <v-icon>{{ item.icon }}</v-icon>
    </v-btn>
  </v-speed-dial>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'FloatMenu',
  data() {
    return {
      fab: false,
      direction: 'top',
      transition: 'slide-y-reverse-transition',
      items: [
        { class: 'floatMenuHome', color: 'green', icon: 'home', router: '/' },
        { class: 'floatMenuDeposit', color: 'indigo', icon: 'credit_card', router: '/deposit' },
        { class: 'floatMenuRecord', color: 'blue', icon: 'article', router: '/record' },
        { class: 'floatMenuUserCentre', color: 'red', icon: 'person', router: '/userCentre' },
        { class: 'floatMenuLiveChat', color: 'info', icon: 'chat', router: 'liveChat' },
      ],
      x: '86%',
      y: '62%',
    };
  },
  mounted() {
    const floatMenu = document.getElementById('FloatMenu');
    floatMenu.addEventListener('touchmove', this.doDrag, false);
  },
  beforeDestroy() {
    const floatMenu = document.getElementById('FloatMenu');
    floatMenu && floatMenu.removeEventListener('touchmove', this.doDrag, false);
  },
  methods: {
    ...mapActions(['SHOW_LIVE_CHAT']),
    dragStart() {},
    doDrag(event) {
      const { width, height } = getComputedStyle(event.target);
      const rW = width.split('px')[0];
      const rH = height.split('px')[0];
      this.x = `${event.touches[0].pageX - rW}px`;
      this.y = `${event.touches[0].pageY - rH}px`;
    },
    dragEnd() {},
    routerPush(v) {
      if (v.router == 'liveChat') {
        this.SHOW_LIVE_CHAT(0);
        return;
      }
      this.$router.push(v.router);
    },
  },
};
</script>

<style lang="scss" scoped>
.FloatMenu {
  width: 40px;
  height: 40px;
  position: fixed;
  touch-action: none;
}
.floatMenuRecord {
  display: none;
}
</style>
