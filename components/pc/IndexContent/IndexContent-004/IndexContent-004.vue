<template>
  <div class="IndexContent-004">
    <div class="youshi">
      <div v-for="(item, i) in youshi" :key="i" class="youshi-list" :class="item.line">
        <div class="icon-box">
          <img class="icon-img" :src="item.src" :alt="item.name" width="100%" />
        </div>
        <div class="text">
          <h3>{{ $t(item.title) }}</h3>
          <img :src="item.subSrc" alt="" />
          <p>{{ $t(item.content) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mergeArrayObjects } from '../../../../utils/index.js';

export default {
  name: 'IndexContent-004',
  props: {
    contents: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      defaultContents: [
        {
          title: 'g_com_indexContent_004_title1',
          content: 'g_com_indexContent_004_content1',
          src: require('./assets/profession.png'),
          subSrc: require('./assets/uk.png'),
          img: 'img',
          line: 'line',
        },
        {
          title: 'g_com_indexContent_004_title2',
          content: 'g_com_indexContent_004_content2',
          src: require('./assets/safe.png'),
          subSrc: require('./assets/france.png'),
          img: 'img',
          line: 'line',
        },
        {
          title: 'g_com_indexContent_004_title3',
          content: 'g_com_indexContent_004_content3',
          src: require('./assets/convenient.png'),
          subSrc: require('./assets/spain.png'),
          img: 'img',
          line: 'line',
        },
        {
          title: 'g_com_indexContent_004_title4',
          content: 'g_com_indexContent_004_content4',
          src: require('./assets/fast.png'),
          subSrc: require('./assets/germany.png'),
          img: 'img',
          line: 'line',
        },
      ],
    };
  },
  computed: {
    youshi() {
      return mergeArrayObjects(this.contents, this.defaultContents);
    },
  },
};
</script>

<style lang="scss" scoped>
.IndexContent-004 {
  display: flex;
  justify-content: center;
  background: url('./assets/bg.png') no-repeat;
  background-size: 100% 100%;

  .youshi {
    display: flex;
    max-width: 1200px;
    color: #fff;

    .youshi-list {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
      position: relative;
      .icon-box {
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;

        .icon-img {
          width: 30px;
          height: 36px;
        }
      }
      .text {
        margin-bottom: 60px;

        h3 {
          font-size: 24px;
          color: #fff;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 30px;
          position: relative;
          &::after {
            content: '';
            width: 250px;
            height: 14px;
            background: url('./assets/line.png') no-repeat;
            background-size: 100% 100%;
            position: absolute;
            top: 40px;
          }
        }
        p {
          width: 90%;
          font-size: 18px;
          color: #fff;
          line-height: 28px;
          margin: 20px auto;
        }
        img {
          display: flex;
          width: 162px;
          height: 180px;
          margin: 0 auto;
          margin-top: 28px;
        }
      }
    }
  }
}

.content__img {
  width: 46px;
  height: 46px;
}

.IndexContent-004 .youshi .line::after {
  bottom: 0;
}
</style>
