<template>
  <v-row ref="article" class="article-container">
    <v-col cols="12" v-if="index > 0"> <hr /></v-col>
    <v-col :class="{ 'flex-grow-0': DEVICE_TYPE == 'pc' }">
      <div class="image-holder primary lighten-5 d-flex justify-center">
        <v-icon class="align-self-center" size="30" color="white">image</v-icon>
        <transition>
          <div class="article-image" v-show="picture.loaded" :style="{ backgroundImage: `url(${picture.src})` }"></div>
        </transition>
      </div>
    </v-col>
    <v-col :cols="DEVICE_TYPE != 'pc' ? 12 : undefined">
      <div :style="{ height: `${this.containerHeight}px` }" :class="{ emphasis: emphasis }" class="item-content pr-1">
        <h3 class="article-title">
          <v-row>
            <v-col>{{ article.title }}</v-col>
            <v-col class="grey--text caption flex-grow-0 text-no-wrap">{{ article.created | formatDate }}</v-col>
          </v-row>
        </h3>

        <div class="raw-content" v-html="article.content"></div>
        <div class="text-center expand-button" v-show="articleHeight > 200">
          <v-btn
            @click="
              expanded = !expanded;
              $forceUpdate();
            "
            text
            small
            class="primary--text"
            >{{ expanded ? '收合' : '展开' }}<v-icon>{{ expanded ? 'expand_less' : 'expand_more' }}</v-icon></v-btn
          >
        </div>
      </div>
    </v-col>
  </v-row>
</template>
<script>
import { DEVICE_TYPE } from '@G/consts';
export default {
  name: 'ArticlesItem',
  props: {
    article: {
      type: Object,
      default: () => {},
    },
    index: {
      type: Number,
      default: () => 0,
    },
  },
  watch: {
    'article.id'(id) {
      this.expanded = false;
      this.initPic(this.pictureSrc);
    },
  },
  data() {
    return {
      DEVICE_TYPE,
      expanded: false,
      showContent: false,
      domHeights: {
        contentHeight: 0,
        titleHeight: 0,
        btnHeight: 0,
      },
      loading: false,
    };
  },
  computed: {
    containerHeight() {
      return this.domHeights.contentHeight + this.domHeights.btnHeight + this.domHeights.titleHeight;
    },
    articleHeight() {
      return this.domHeights.contentHeight + this.domHeights.titleHeight;
    },
    emphasis() {
      return !this.expanded && this.articleHeight > 200;
    },
    picture() {
      return this.article.picture || { loaded: false };
    },
    pictureSrc() {
      return DEVICE_TYPE === 'pc' ? this.article.pcImageUrl : this.article.mobileImageUrl;
    },
  },
  updated() {
    if (!this.loading) {
      this.loading = true;
      this.domSize();
    } else {
      this.loading = false;
    }
  },
  mounted() {},
  created() {
    window.resize = this.domSize;
    this.domSize();
    this.initPic(this.pictureSrc);
  },
  methods: {
    getComputedStyle(element, attr) {
      return Number(window.getComputedStyle(element).getPropertyValue(attr).replace(/px/, ''));
    },
    domSize() {
      this.domHeights.contentHeight = !this.$refs.article ? 0 : this.$refs.article.querySelector('.raw-content').offsetHeight;
      this.domHeights.titleHeight = !this.$refs.article ? 0 : this.$refs.article.querySelector('.article-title').offsetHeight;
      this.domHeights.btnHeight = !this.$refs.article
        ? 0
        : this.getComputedStyle(this.$refs.article.querySelector('.expand-button button'), 'line-height');
      this.$forceUpdate();
    },
    testImage(obj) {
      const tester = new Image();
      // obj.loaded = false;
      tester.onload = () => {
        obj.loaded = true;
        this.$forceUpdate();
      };
      tester.src = obj.src;
    },
    initPic(src) {
      this.article.picture = {
        src,
        loaded: false,
      };
      this.testImage(this.article.picture);
    },
  },
};
</script>

<style lang="scss" scoped>
.article-container {
  .image-holder {
    width: 200px;
    height: 200px;
    position: relative;
    @media screen and (max-width: 800px) {
      width: 100%;
    }
  }
  .article-image {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: center/cover;
  }
  .article-item {
    position: relative;
    overflow: hidden;
  }
  .expand-button {
    width: 100%;
  }
  .item-content {
    overflow: hidden;
    position: relative;
    transition-duration: 0.25s;
    .raw-content {
      padding: 1px 0;
    }
    ::v-deep img {
      max-width: 100%;
      height: auto !important;
      display: block;
      margin: 0 auto;
    }
    &:before {
      opacity: 0;
      height: 0;
      // tran
      transition: 3s opacity 0s, 0s height 0.25s;
    }
    &.emphasis {
      transition-duration: 0.15s;
      height: 200px !important;
      &:before {
        position: absolute;
        content: '';
        height: 100%;
        width: 100%;
        opacity: 1;
        transition: 3s opacity 0s, 0s height 0.25s;

        background: -webkit-repeating-linear-gradient(top, rgba(0, 0, 0, 0) 0px, #fff 100%);
      }
      .expand-button {
        top: 200px;
        position: absolute;
        margin-top: -1.5em;
      }
    }
  }
}

//圖淡入
.v-leave {
  opacity: 1;
}
.v-leave-active {
  transition: opacity 0.15s;
}
.v-leave-to {
  opacity: 0;
}
.v-enter {
  opacity: 0;
}
.v-enter-active {
  transition: opacity 0.25s;
}
.v-enter-to {
  opacity: 1;
}
</style>
