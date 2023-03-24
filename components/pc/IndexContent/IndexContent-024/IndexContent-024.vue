<template>
  <div class="indexbot" :style="{ width: width, marginTop: wrapMarginTop }">
    <div class="youshi">
      <div v-for="item in youshiList" :key="item.id" class="youshi-list" :class="{ 'youshi-list-line': showBottomLine }">
        <div class="icon-box">
          <img :src="item.img" alt="" />
        </div>
        <div class="text">
          <h3 :class="titleClass">{{ $t(item.title) }}</h3>
          <p>{{ $t(item.description) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexContent-024',
  props: {
    width: {
      type: String,
      default: '1200px',
    },
    wrapMarginTop: {
      type: String,
      default: '200px',
    },
    titleClass: {
      type: String,
      default: '',
    },
    showBottomLine: {
      type: Boolean,
      default: true,
    },
    youshiList: {
      type: Array,
      default: () => [
        {
          title: 'g_com_indexContent_002_title1',
          description: 'g_com_indexContent_002_content1',
          img: require('./assets/smart-home.png'),
        },
        {
          title: 'g_com_indexContent_002_title2',
          description: 'g_com_indexContent_002_content2',
          img: require('./assets/lock.png'),
        },
        {
          title: 'g_com_indexContent_002_title3',
          description: 'g_com_indexContent_002_content3',
          img: require('./assets/smart-home-1.png'),
        },
        {
          title: 'g_com_indexContent_002_title4',
          description: 'g_com_indexContent_002_content4',
          img: require('./assets/siren.png'),
        },
      ],
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
.indexbot {
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
      color: #fff;
      img {
        width: 5%;
        margin: 0px 10px 0px 30px;
      }
    }
  }
  .text {
    margin: 0px 0;
    color: #fff;
    h3 {
      color: #fff;
    }
    p {
      color: #fff;
    }
    img {
      width: 25%;
    }
  }
  .marquee {
    &--vertical {
      width: 100%;
      height: 100px;
      overflow: hidden;
      margin: 10px 250px;
      position: relative;
      line-height: 35px;
      font-size: 20px;
      color: #fff;
      text-align: left;
      .announce-scroll p {
        width: 100%;
        height: 30px;
        font-size: 20px;
      }
      .announce-scroll {
        height: 100px;
        position: relative;
        animation: anis 300s linear infinite;
      }
      @keyframes anis {
        100% {
          transform: translateY(-2700px);
        }
      }
      .announce-scroll:hover {
        animation-play-state: paused;
        cursor: pointer;
      }
    }
  }
  .flash {
    display: flex;
    .flash-list {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .img1 {
        width: 100%;
      }
      .name {
        color: #fff;
        h3 {
          font-size: 20px;
          font-weight: normal;
        }
        p {
          font-size: 14px;
          text-transform: uppercase;
          margin-top: 5px;
        }
      }
    }
    /*.flash-list:nth-child(1) {*/
    /*  background: url('../assets/mg/jsbg1.png') no-repeat;*/
    /*  background-size: cover;*/
    /*  cursor: pointer;*/
    /*}*/
    /*.flash-list:nth-child(2) {*/
    /*  background: url('../assets/mg/jsbg1.png') no-repeat;*/
    /*  background-size: cover;*/
    /*  cursor: pointer;*/
    /*}*/
    /*.flash-list:nth-child(3) {*/
    /*  background: url('../assets/mg/jsbg2.png') no-repeat;*/
    /*  background-size: cover;*/
    /*  cursor: pointer;*/
    /*}*/
    /*.flash-list:nth-child(4) {*/
    /*  background: url('../assets/mg/jsbg3.png') no-repeat;*/
    /*  background-size: cover;*/
    /*  cursor: pointer;*/
    /*}*/
  }
  .youshi {
    padding: 0 0;
    display: flex;
    .youshi-list {
      min-height: 300px;
      position: relative;
      &.youshi-list-line {
        &::after {
          content: '';
          position: absolute;
          bottom: -20px;
          left: 0;
          right: 0;
          display: block;
          width: 80px;
          margin: 0 auto;
          height: 10px;
          background-color: #ffeb3b;
        }
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
          color: #fff;
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
          color: #fff;
          line-height: 28px;
          margin: 0 auto;
        }
      }
    }
  }
}
</style>
