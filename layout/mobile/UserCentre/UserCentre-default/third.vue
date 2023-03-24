<template>
  <div class="fill-height">
    <!-- 成功 -->
    <div>
      <!-- 三方連結坎入 -->
      <iframe scrolling="yes" ref="iframe" width="100%" :height="height" :src="showUrl" frameborder="0"></iframe>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { textFilter } from '@UTILS/i18n';

export default {
  components: {},
  name: 'third',
  data() {
    return {
      height: '',
      showUrl: 'about:blank',
    };
  },
  computed: {
    ...mapGetters(['fullscreen']),
  },
  watch: {
    $route: {
      handler(info) {},
      deep: true,
    },
  },
  async created() {
    console.log(this.$route.params.url);
  },
  mounted() {
    this.SET_FULL_WIDTH(true);
  },
  methods: {
    ...mapMutations([]),
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
    textFilter(text) {
      return textFilter(text, 'layout_gameSlot_default_gameSlot_');
    },
  },
};
</script>
