<template>
  <div class="error403" :class="{ pc: isPc, mobile: !isPc }">
    <img v-if="isPc" class="img" src="./assets/403_pc_img.png" alt="403" border="0" />
    <img v-else class="img" src="./assets/403_mobile_img.png" alt="403" border="0" />
    <div class="textArea black--text">
      <!-- <div v-if="isPc" class="title">
        <span class="oops">Oops.. </span>
        Forbidden
      </div>
      <div v-else class="title">
        <span class="preText"> {{ params && params.blackip ? params.blackip : 'blackip not found' }} </span>
        <span class="notFound">Forbidden</span>
      </div> -->
      <div class="title">
        <span class="preText"> {{ params && params.blackip ? params.blackip : 'blackip not found' }} </span>
        <span class="notFound">Forbidden</span>
      </div>
      <div v-if="config.page403_error_message" class="text">
        <span> {{ config.page403_error_message }} </span>
      </div>
      <div v-else class="text">
        <span> 访问IP在系统黑名单内，拒绝访问 </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { isMobile } from '../../consts';

export default {
  name: 'error403',
  data() {
    return {
      isPc: !isMobile,
    };
  },
  computed: {
    ...mapGetters(['config']),
    params() {
      return this.$route.params;
    },
  },
};
</script>

<style lang="scss" scoped>
.error403 {
  &.pc {
    background-image: url('./assets/403_pc_bg.png');
    background-size: 100% 100%;
    height: 100vh;
    text-align: center;
    .img,
    .textArea {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
    .img {
      width: 30%;
      top: 0;
    }
    .textArea {
      top: 70%;
      line-height: 40px;
      .title {
        font-weight: bold;
        .oops {
          font-size: 2rem;
        }
      }
    }
  }
  &.mobile {
    background: #eaeaea;
    height: 100vh;
    .img {
      position: absolute;
      top: 45%;
    }
    .textArea {
      text-align: center;
      padding-top: 25%;
      line-height: 40px;
      .title {
        .preText {
          font-size: 1.7rem;
        }
        .notFound {
          font-size: 14px;
        }
      }
      .text {
        &::after {
          content: ' ';
          display: block;
          line-height: 0;
          border: solid;
          width: 100px;
          margin: auto;
        }
      }
    }
  }
  .text {
    font-weight: bold;
  }
}
</style>
