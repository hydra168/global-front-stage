<template>
  <div class="IndexContent-009">
    <div class="container">
      <v-img class="image" :src="require('./assets/group-2.png')"></v-img>
      <div class="text__box">
        <div class="text01 mb-5">{{ $t('g_com_indexContent_009_title') }}</div>
        <div class="text02 mb-5">{{ $t('g_com_indexContent_009_context') }}</div>
        <div class="text03 mb-5">{{ $t('g_com_indexContent_009_sub_context') }}</div>
        <div class="btn mb-5 d-flex justify-center align-center" :class="[hoverClass]" @click="ROUTER_PUSH('/appdownload')">
          <v-icon>phone_iphone</v-icon>
          <span class="text04 text-subtitle-1 ml-2">{{ $t('g_com_indexContent_009_appdownload') }}</span>
        </div>
        <div class="text05">- {{ $t('g_com_indexContent_009_sub_context2') }}<span class="sp__color">HTML5</span> -</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations } from 'vuex';
export default {
  name: 'IndexContent-009',
  props: {
    //hover效果
    hoverClass: {
      type: String,
      default: 'translateX20-hover background-primary-hover font-secondary-color-hover',
    },
  },
  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
  },
};
</script>
<style lang="scss" scoped>
@import '@ASSETS/scss/hover.scss';
.IndexContent-009 {
  max-width: 1320px;
  .container {
    position: relative;
    .text__box {
      width: 600px;
      position: absolute;
      top: 193px;
    }
    .text01 {
      color: #548dff;
      font-size: 24px;
    }
    .text02 {
      font-size: 18px;
      color: #737373;
    }
    .text03 {
      font-size: 24px;
      color: #737373;
    }
    .text04 {
      color: #777777;
      span {
        color: #407ffb;
      }
    }
    .text05 {
      font-size: 18px;
    }
    .btn {
      width: 190px;
      border-radius: 50px;
      border: 1px solid #d0d0d0;
      padding-top: 10px;
      padding-bottom: 10px;
      cursor: pointer;
    }
    .sp__color {
      color: #407ffb;
    }
  }
}
</style>
