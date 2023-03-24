<template>
  <div class="fill-height">
    <!-- 成功 -->
    <div>
      <!-- 三方連結坎入 -->
      <iframe
        v-show="!loadThird"
        @load="load"
        scrolling="yes"
        style="margin-top: 56px; z-index: 10; position: relative; height: calc(100vh - 56px - 56px)"
        id="iframe"
        width="100%"
        height="100%"
        :src="showUrl"
        frameborder="0"
      ></iframe>
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
      height: window.outerHeight - 56 - 56,
      showUrl: '',
      iframeBody: null,
      loadThird: 1,
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
    'iframe.contentWindow.location'(dom) {
      console.log(dom);
    },
  },
  methods: {
    ...mapMutations(['SET_LOADING_BAR']),
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
    textFilter(text) {
      return textFilter(text, 'layout_gameSlot_default_gameSlot_');
    },
    load() {
      this.SET_LOADING_BAR({ show: true });
      const after = () => {
        const dom = window.document.querySelector('#iframe').contentDocument;
        dom.body.innerHTML = `<body style="height:100%"> ${unescape(this.$route.params.form)}</body>`;
        const form = dom.querySelector('form');
        form.target = '_self';
        form.submit();
        this.iframe = window.document.querySelector('#iframe');
        return true;
      };
      const wait = setInterval(() => {
        if (window.document.querySelector('#iframe') == null) {
          clearInterval(wait);
          return;
        }
        window.document.querySelector('#iframe').contentDocument && after() && clearInterval(wait);
      }, 100);
      this.loadThird = setInterval(() => {
        try {
          if (this.iframe.contentWindow.location.href != 'about:blank') {
            console.log(this.iframe.contentWindow.location.href);
          }
        } catch (e) {
          // console.log(e);
          clearInterval(this.loadThird);
          this.loadThird = 0;
          this.SET_LOADING_BAR({ show: false });
        }
      }, 100);
    },
  },
};
</script>
