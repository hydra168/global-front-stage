<template>
  <v-container class="line-check" style="padding: 0px">
    <v-img v-if="DEVICE_TYPE === 'mobile'" class="mb-2" :src="require('./assets/active-top.jpg')"></v-img>
    <div v-for="item in values" :key="item.name" class="content-container">
      <v-card class="content">
        <v-btn class="retry-btn darken-1--text" text :loading="item.loading" @click="retry(item)">
          <v-icon small class="spinner">cached</v-icon>
        </v-btn>
        <v-card-text :class="{ 'darken-1': true, [field.type]: true }" v-for="field in fields" :key="`${item.name}_${field.key}`">
          {{ field.type !== 'header' ? $t(field.title) + ': ' : '' }}
          <span :class="`${field.key === 'latencyMs' ? item.networkQualityColor : 'darken-1'}--text`">{{ $t(item[field.key]) }}</span>
        </v-card-text>
        <div class="linner-wrap">
          <v-progress-linear
            class="linner"
            striped
            rounded
            height="10"
            :color="item.networkQualityColor"
            :value="item.networkQuality"
            :indeterminate="item.networkQuality === 'loading' ? true : false"
          ></v-progress-linear>
        </div>
      </v-card>
    </div>
  </v-container>
</template>
<script>
import { DEVICE_TYPE } from '@G/consts';
export default {
  name: 'lineCheck',
  data() {
    const domains = {
      host: {
        siteName: 'g_common_lineCheck_host',
        url: location.origin,
      },
      zendesk: {
        siteName: 'g_common_lineCheck_customService_zendesk',
        url: 'https://static.zdassets.com/ekr/snippet.js',
      },
    };
    return {
      DEVICE_TYPE,
      loading: false,
      fields: [
        {
          type: 'header',
          key: 'siteName',
          title: 'g_common_lineCheck_siteName',
        },
        {
          type: 'cell',
          key: 'url',
          title: 'g_common_lineCheck_url',
        },
        {
          type: 'cell',
          key: 'latencyMs',
          title: 'g_common_lineCheck_latencyMs',
        },
      ],
      values: Object.keys(domains).reduce((acc, key) => {
        const { url, siteName } = domains[key];
        acc[key] = {
          name: key,
          siteName,
          loading: false,
          url,
          latencyMs: 0,
          networkQuality: 'loading',
          networkQualityColor: 'grey',
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
  computed: {
    latencyMsAvg() {
      const keys = Object.keys(this.values);
      const latencySum = keys.reduce((acc, key) => {
        if (typeof this.values[key] === 'number') {
          acc += this.values[key].latencyMs;
        }
        return acc;
      }, 0);
      return latencySum / keys.length;
    },
  },
  methods: {
    retry(item) {
      const { name } = item;
      this.values[name].loading = true;
      this.values[name].latencyMs = 0;
      this.values[name].networkQuality = 'loading';
      this.values[name].networkQualityColor = 'grey';
      setTimeout(() => {
        this.ping(item);
      }, 1000);
    },
    ping({ name, url }) {
      this.values[name].loading = true;
      const started = new Date().getTime();
      const http = (this.values[name].xmlRequestInstance = new XMLHttpRequest());
      http.open('GET', url, true);
      http.onreadystatechange = () => {
        if (http.readyState == 2) {
          const ended = new Date().getTime();
          const latencyMs = ended - started;
          const quality = this.getConnectionQuality(latencyMs);
          const qualityColor = this.getNetworkQualityClass(quality);
          this.values[name].latencyMs = latencyMs;
          this.values[name].networkQuality = quality;
          this.values[name].networkQualityColor = qualityColor;
        }
        this.values[name].loading = false;
      };
      try {
        http.send(null);
      } catch (e) {
        console.log(e);
      }
    },
    getConnectionQuality(latency) {
      if (latency <= 500) return '100';
      else if (latency > 500 && latency <= 3000) return '75';
      else if (latency > 3000 && latency <= 5000) return '50';
      else if (latency > 5000 && latency <= 7000) return '25';
      else if (latency > 7000 && latency <= 9000) return '5';
      else return '0';
    },
    getNetworkQualityClass(quality) {
      const mapNetworkQualityColor = {
        100: 'success',
        75: 'warning',
        50: 'warning',
        25: 'warning',
        5: 'error',
        0: 'error',
      };
      return mapNetworkQualityColor[quality];
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
.line-check {
  .content-container {
    margin-bottom: 30px;
    margin: 10px;
    .content {
      padding: 10px;
      .retry-btn {
        position: absolute;
        right: 0px;
        height: 30px !important;
        min-width: 0px;
        width: 30px;
        padding: 0px;
        border-radius: 100% !important;
        margin-right: 10px;
      }
      .header {
        font-size: 20px;
        font-weight: bold;
      }
      .cell {
        font-size: 14px;
      }
      .v-card__text {
        padding: 5px !important;
        padding-bottom: 5px;
      }
      .linner-wrap {
        padding: 5px;
      }
    }
  }
}
</style>
