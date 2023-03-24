<template>
  <div class="LineCheck">
    <v-img :src="require('./assets/active-top.jpg')"></v-img>
    <v-container grid-list-md class="content pt-9">
      <div class="title-wrap text-center">
        <h1 class="primary--text mb-3">{{ $t('g_common_lineCheck') }}</h1>
        <div class="title-point primary"></div>
        <div class="title-line primary"></div>
      </div>
    </v-container>
    <LineCheck />
  </div>
</template>
<script>
import LineCheck from '@LAYOUT/mobile/LineCheck/LineCheck-default';

export default {
  name: 'lineCheck',
  components: {
    LineCheck,
  },
  data() {
    const domains = {
      host: {
        url: location.origin,
      },
      zendesk: {
        url: 'https://static.zdassets.com/ekr/snippet.js',
      },
    };
    return {
      loading: false,
      fields: [
        {
          key: 'url',
          title: '检测网址',
        },
        {
          key: 'latencyMs',
          title: '延迟(毫秒)',
        },
      ],
      values: Object.keys(domains).reduce((acc, key) => {
        const { url } = domains[key];
        acc[key] = {
          name: key,
          loading: false,
          url,
          latencyMs: null,
          xmlRequestInstance: null,
        };
        return acc;
      }, {}),
    };
  },
  created() {
    Object.keys(this.values).forEach(key => {
      this.ping(this.values[key]);
    });
  },
  methods: {
    ping({ name, url }) {
      this.values[name].loading = true;
      const started = new Date().getTime();
      const http = (this.values[name].xmlRequestInstance = new XMLHttpRequest());
      http.open('GET', url, true);
      http.onreadystatechange = () => {
        if (http.readyState == 2) {
          const ended = new Date().getTime();
          this.values[name].latencyMs = ended - started;
        }
        this.values[name].loading = false;
      };
      try {
        http.send(null);
      } catch (e) {
        console.log(e);
      }
    },
  },
  beforeDestroy() {
    Object.keys(this.values).forEach(key => {
      this.values[key].xmlRequestInstance.abort();
    });
  },
};
</script>
<style lang="scss">
.LineCheck {
  .title-wrap {
    position: relative;
    margin-bottom: 50px;
    .title-point {
      width: 10px;
      height: 10px;
      margin: auto;
      transform: rotate(45deg);
    }
    .title-line {
      &::before {
        content: '';
        position: absolute;
        bottom: 5px;
        right: 0;
        width: 47%;
        height: 2px;
        background-color: var(--v-primary-base);
      }
      &::after {
        content: '';
        position: absolute;
        bottom: 5px;
        left: 0;
        width: 47%;
        height: 2px;
        background-color: var(--v-primary-base);
      }
    }
  }
}
</style>
