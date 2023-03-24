<template>
  <div class="loginlogo" :class="className">
    <v-img width="200" :src="config.logo_image_pc" @click="$router.push('/')" style="cursor: pointer"></v-img>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'login-logo-item',
  props: {
    // 組件的class
    className: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapGetters(['config']),
    name() {
      return this.data;
    },
  },
};
</script>

<style></style>
