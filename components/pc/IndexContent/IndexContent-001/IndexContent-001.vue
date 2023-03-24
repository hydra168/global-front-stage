<template>
  <div class="IndexContent-001" :style="{ width: width }">
    <div class="youshi">
      <div v-for="(item, i) in youshi" :key="i" class="youshi-list" :class="item.line">
        <div class="icon-box">
          <img :class="item.img" :src="item.src" :alt="item.name" width="80%" />
        </div>
        <div class="text">
          <h3 :class="item.titleColor">{{ $t(item.title) }}</h3>
          <p :class="item.textColor">{{ $t(item.content) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mergeArrayObjects } from '@UTILS/';

export default {
  name: 'IndexContent-001',
  props: {
    width: {
      type: String,
      default: '1200px',
    },
    contents: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      defaultContents: [
        {
          title: 'g_com_indexContent_001_title1',
          content: 'g_com_indexContent_001_content1',
          src: require('./assets/img/smart-home.png'),
          titleColor: 'primary--text',
          textColor: 'primary--text',
          img: 'img',
          line: 'line',
        },
        {
          title: 'g_com_indexContent_001_title2',
          content: 'g_com_indexContent_001_content2',
          src: require('./assets/img/lock.png'),
          titleColor: 'primary--text',
          textColor: 'primary--text',
          img: 'img',
          line: 'line',
        },
        {
          title: 'g_com_indexContent_001_title3',
          content: 'g_com_indexContent_001_content3',
          src: require('./assets/img/smart-home-1.png'),
          titleColor: 'primary--text',
          textColor: 'primary--text',
          img: 'img',
          line: 'line',
        },
        {
          title: 'g_com_indexContent_001_title4',
          content: 'g_com_indexContent_001_content4',
          src: require('./assets/img/siren.png'),
          titleColor: 'primary--text',
          textColor: 'primary--text',
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
.IndexContent-001 {
  margin: 0 auto;
  .bannerbox {
    background: linear-gradient(110deg, #000 50%, #ffd426 50%) center center;
    width: 100%;
    display: flex;
    justify-self: center;
    align-items: center;
    margin: 0 auto;
    padding: 0;
    font-size: 24px;
    line-height: 50px;
    .online {
      display: flex;
      justify-self: center;
      align-items: center;
      color: #fff;
      width: 50%;
      img {
        width: 5%;
        margin: 0px 10px 0px 30px;
      }
    }
    .registered {
      display: flex;
      justify-self: center;
      align-items: center;
      width: 50%;
      color: #000;
      img {
        width: 5%;
        margin: 0px 10px 0px 30px;
      }
    }
  }
  .text {
    margin: 0px 0;
    img {
      width: 25%;
    }
  }
  .youshi {
    padding: 0 0;
    display: flex;
    .youshi-list {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        bottom: -20px;
        left: 0;
        right: 0;
        display: block;
        width: 100px;
        margin: 0 auto;
        height: 10px;
        background-color: map-get(map-get($colors, primary), base);
      }
      .icon-box {
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .text {
        padding: 0 0 34px 0;
        h3 {
          font-size: 28px;
          color: #000;
          font-weight: normal;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 10px;
          span {
            font-size: 48px;
            font-weight: bold;
            margin-left: 10px;
          }
        }
        p {
          width: 80%;
          font-size: 14px;
          color: #000;
          line-height: 28px;
          margin: 0 auto;
        }
      }
    }
  }
}

.content__img {
  width: 46px;
  height: 46px;
}

.IndexContent-001 .youshi .line::after {
  bottom: 0;
}
</style>
