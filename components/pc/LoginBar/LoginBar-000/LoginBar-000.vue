<template>
  <div class="LoginBar" :class="className">
    <slot name="default"><div></div></slot>
    <keep-alive>
      <template v-if="isLogin">
        <slot name="loginState"></slot>
      </template>
      <template v-else>
        <slot name="logoutState"></slot>
      </template>
    </keep-alive>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapActions, mapMutations, mapGetters } from 'vuex';
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'LoginBar-000',
  props: {
    // 組件的class
    className: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapGetters(['isLogin']),
  },
  watch: {},
  created() {
    this.CHECK_REMEMBER();
  },
  methods: {
    ...mapActions(['CHECK_REMEMBER']),
  },
};
</script>

<style lang="scss" scoped>
.LoginBar {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
}
</style>
