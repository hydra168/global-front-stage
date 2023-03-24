<template>
  <div class="IndexContent-013" :style="mainBgImg">
    <div class="content__list__wrap">
      <div class="content__list" v-for="node in list" :key="node.code">
        <div class="list__img" :style="listBgImg(node.src)">
          <div class="img__cover">
            <p :class="textClass">{{ $t(node.text) }}</p>
          </div>
        </div>
        <div class="list__line">
          <div class="list__line__img" :style="lineBgImg"></div>
        </div>
        <div class="list__icon">
          <v-icon v-bind="listIconBind">{{ node.icon }}</v-icon>
        </div>
        <p :class="titleClass">{{ $t(node.name) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexContent013',

  props: {
    textClass: {
      type: String,
      default: 'white--text',
    },
    titleClass: {
      type: String,
      default: 'black--text',
    },
    mainBg: {
      type: String,
      default: require('./assets/bg.png'),
    },
    lineBg: {
      type: String,
      default: require('./assets/line.png'),
    },
    listIconBind: {
      type: Object,
      default: () => {
        return {
          large: true,
          color: 'white',
        };
      },
    },
    list: {
      type: Array,
      default: () => [
        {
          code: 'profession',
          name: 'g_com_indexContent_013_list1_name',
          text: 'g_com_indexContent_013_list1_text',
          src: require('./assets/profession.png'),
          icon: 'stars',
        },
        {
          code: 'safe',
          name: 'g_com_indexContent_013_list2_name',
          text: 'g_com_indexContent_013_list2_text',
          src: require('./assets/safe.png'),
          icon: 'security',
        },
        {
          code: 'convenient',
          name: 'g_com_indexContent_013_list3_name',
          text: 'g_com_indexContent_013_list3_text',
          src: require('./assets/convenient.png'),
          icon: 'phone_iphone',
        },
        {
          code: 'fast',
          name: 'g_com_indexContent_013_list4_name',
          text: 'g_com_indexContent_013_list4_text',
          src: require('./assets/fast.png'),
          icon: 'flash_on',
        },
      ],
    },
  },

  data() {
    return {};
  },

  computed: {
    mainBgImg() {
      return {
        background: `url(${this.mainBg}) no-repeat`,
        backgroundSize: '100% 100%',
      };
    },
    lineBgImg() {
      return {
        background: `url(${this.lineBg}) no-repeat`,
        backgroundSize: '100% 100%',
      };
    },
  },

  methods: {
    listBgImg(img) {
      return {
        background: `url(${img}) no-repeat`,
        backgroundSize: '100% 100%',
      };
    },

    listIconImg(img) {
      return {
        background: `url(${img}) no-repeat`,
        backgroundSize: '100% 100%',
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.IndexContent-013 {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 33.5vw;
  color: #fff;
}

.content__list__wrap {
  display: flex;
  justify-content: center;
}

.content__list {
  text-align: center;
  margin: 0 0.6vw;
  width: 16.5vw;
  height: 15vw;
}

.list__img {
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  border-radius: 20px;

  .img__cover {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 45%;
    background: rgba($color: #000, $alpha: 0.5);

    p {
      width: 100%;
      font-size: calc(0.6vw);
    }
  }
}

.list__line {
  display: flex;
  justify-content: center;
  margin-top: 1vw;

  .list__line__img {
    width: 9vw;
    height: 0.5vw;
  }
}

.list__icon {
  display: flex;
  justify-content: center;
  margin: 1vw 0;

  .list__icon__img {
    width: 1.2vw;
    height: 1.5vw;
  }
}

.list__text {
  font-size: 1vw;
  font-weight: bold;
}
</style>
