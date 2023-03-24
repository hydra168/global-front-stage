<template>
  <div class="article-list" ref="itemList">
    <template v-for="(item, i) in articleList">
      <ArticleItem :article="item" :index="i" :key="i" />
    </template>
    <v-pagination v-model="pagination.page" :length="pagination.length" :total-visible="15" :disabled="loading"></v-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { DEVICE_TYPE } from '@G/consts';
import ArticleItem from './components/ArticleItem.vue';

export default {
  name: 'Articles-default',
  components: {
    ArticleItem,
  },
  props: {},
  computed: {
    ...mapGetters(['articles', 'articleTotal']),
  },
  watch: {
    articles(list) {
      this.articleList = list;
      this.pagination.length = Math.ceil(this.articleTotal / this.pagination.num);
    },
    'pagination.page'(n) {
      this.loadData(n);
    },
  },
  created() {
    this.loadData();
  },
  data() {
    return {
      DEVICE_TYPE,
      pagination: {
        page: 1,
        num: 10,
        length: 1,
      },
      articleList: [],
      loading: false,
    };
  },
  methods: {
    ...mapActions(['GET_ARTICLES']),
    async loadData() {
      this.loading = true;
      await this.GET_ARTICLES(this.pagination);
      this.loading = false;
    },
    getComputedStyle(element, attr) {
      return Number(window.getComputedStyle(element).getPropertyValue(attr).replace(/px/, ''));
    },
  },
};
</script>

<style lang="scss" scoped>
.article-list {
  background: #fff;
  padding: 40px 0px;
  .row {
    margin-bottom: 0;
    .col {
      position: relative;
    }
  }
  .row + .row {
    margin-top: 5px;
  }
}
</style>
