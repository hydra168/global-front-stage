<template>
  <div class="youshi">
    <v-layout row wrap class="youshi-list" :style="`color:${textColor};`">
      <v-flex xs3 v-for="item in dataList" :key="item.name">
        <div class="text-center">
          <img v-if="item.img" :src="item.img" />
          <v-icon v-else-if="item.icon" large color="primary">{{ item.icon }}</v-icon>
          <h3>{{ $t(item.name) }}</h3>
          <v-img v-if="lineImg" :src="lineImg" />
          <span v-else-if="isInline" class="inline" :class="inlineClass" />
        </div>
        <h4>{{ $t(item.title) }}</h4>
        <p :class="contentClass">{{ $t(item.content, { webTitle }) }}</p>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import { mapMutations, mapActions, mapGetters } from 'vuex';
import { textFilter } from '@UTILS/i18n';
export default {
  name: 'IndexContent-008',
  props: {
    textColor: {
      type: String,
      default: '#000000',
    },
    contentClass: {
      type: String,
      // 可選樣式style1
      default: '',
    },
    isInline: {
      type: Boolean,
      default: true,
    },
    inlineClass: {
      type: String,
      default: 'primary',
    },
    lineImg: {
      type: String,
      default: require('./assets/line.png'),
    },
    dataList: {
      type: Array,
      default: () => [
        {
          name: 'g_com_indexContent_008_dataList1_name',
          title: 'g_com_indexContent_008_dataList1_title',
          content: 'g_com_indexContent_008_dataList1_content',
          icon: 'stars',
        },
        {
          name: 'g_com_indexContent_008_dataList2_name',
          title: 'g_com_indexContent_008_dataList2_title',
          content: 'g_com_indexContent_008_dataList2_content',
          icon: 'security',
        },
        {
          name: 'g_com_indexContent_008_dataList3_name',
          title: 'g_com_indexContent_008_dataList3_title',
          content: 'g_com_indexContent_008_dataList3_content',
          icon: 'phone_iphone',
        },
        {
          name: 'g_com_indexContent_008_dataList4_name',
          title: 'g_com_indexContent_008_dataList4_title',
          content: 'g_com_indexContent_008_dataList4_content',
          icon: 'flash_on',
        },
      ],
    },
  },
  computed: {
    ...mapGetters(['webTitle']),
  },
};
</script>
<style lang="scss">
.youshi {
  min-width: 1200px;
  margin: 0 auto;
  display: flex;
  .flex {
    padding: 5em 3em;
  }
  img {
    height: 100%;
  }
  h3 {
    font-size: 24px;
    font-weight: normal;
    margin: 1em auto 1em;
  }
  h4 {
    font-size: 26px;
    text-align: left;
    font-weight: normal;
    margin: 1em auto 0.5em;
  }
  p {
    margin: 1em auto 0;
    font-size: 18px;
    text-align: left;
    &.style1 {
      font-size: 16px;
      letter-spacing: 0px;
    }
  }
  .inline {
    text-align: center;
    display: inline-block;
    transform: rotate(45deg);
    width: 14px;
    height: 14px;
  }
}
</style>
