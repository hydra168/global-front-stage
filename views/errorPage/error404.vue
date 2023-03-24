<template>
  <div class="error404" :class="{ pc: isPc, mobile: !isPc }">
    <img v-if="isPc" class="img" src="./assets/404_pc.png" alt="404" border="0" />
    <img v-else class="img" src="./assets/404_mobile.png" alt="404" border="0" />
  </div>
</template>

<script>
import { isMobile } from '../../consts';

export default {
  name: 'error404',
  data() {
    return {
      isPc: !isMobile,
    };
  },
  computed: {
    params() {
      return this.$route.params;
    },
  },
};
</script>

<style lang="scss" scoped>
.error404 {
  &.pc {
    .img {
      width: 100%;
    }
  }
  &.mobile {
    .img {
      width: 100%;
    }
  }
}
</style>
