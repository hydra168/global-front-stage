<template>
  <ul class="Marquee-wrap" ref="ul" :style="stylesWrap" @mouseenter="mouseEnter()" @mouseleave="mouseLeave()">
    <li v-for="(item, index) in marqueeList" @click="openAnnouncement(item.id)" :key="index" class="marquee-list-wrap" ref="li">
      <div class="d-flex pl-2" :style="stylesItem">
        <div v-if="showTitle">【{{ item.title }}】</div>
        <div class="d-flex" v-html="pureHtml(item.content)"></div>
      </div>
    </li>
  </ul>
</template>

<script>
import { pureHtml } from '@G/filters/index.js';
export default {
  name: 'Marquee',
  data() {
    return {
      current: -1,
      // ul样式
      stylesWrap: {
        width: this.width,
        height: this.height,
      },
      // li样式
      stylesItem: {
        height: this.height,
        lineHeight: this.height,
        color: this.fontColor,
        fontSize: this.fontSize,
      },
      scrollHeight: 0,
      showing: false,
      paused: false,
    };
  },
  props: {
    // 是否顯示 title
    showTitle: {
      type: Boolean,
      default: true,
    },
    // 宽度
    width: {
      type: String,
      default: '100%',
    },
    // 高度
    height: {
      type: String,
      default: '30px',
    },
    // 字体颜色
    fontColor: {
      type: String,
      default: '#ffffff',
    },
    // 字体大小
    fontSize: {
      type: String,
      default: '14px',
    },
    // 下拉速度
    showSpeed: {
      type: Number,
      validator(val) {
        return /^\d+$/.test(val);
      },
      default: 15,
    },
    // 切换间隔时间(ms)
    pauseTime: {
      type: Number,
      validator(val) {
        return /^\d+$/.test(val);
      },
      default: 2500,
    },
    // 滚动速度
    scrollSpeed: {
      type: Number,
      validator(val) {
        return /^\d+$/.test(val);
      },
      default: 22,
    },
    // 悬停时暂停
    pauseOnHover: {
      type: Boolean,
      default: true,
    },
    // 内容
    marqueeList: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    if (this.marqueeList.length > 0) {
      this.init();
    }
  },
  methods: {
    openAnnouncement(index) {
      this.$emit('openAnnouncement', index);
    },
    init() {
      this.mqLength = this.marqueeList.length;
      this.scrollHeight = this.height.replace(/[^0-9]/gi, '');
      this.$nextTick(() => {
        this.showNext();
      });
    },
    mouseEnter() {
      if (!this.pauseOnHover === true) return false;

      this.pause();
    },
    mouseLeave() {
      if (!this.pauseOnHover === true) return false;
      this.resume();
    },
    // 暫停
    pause() {
      this.paused = true;
      if (this.$refs.li && this.showing !== true) {
        let li = this.$refs.li[this.current];
        clearInterval(li.timer);
      }
    },
    resume() {
      this.paused = false;
      if (this.showing !== true) {
        let li = this.$refs.li[this.current];
        this.scroll(li, 1);
      }
    },
    showNext() {
      this.current++;
      this.current >= this.mqLength && (this.current = 0);
      this.show(this.current);
    },
    show(i) {
      for (let item of this.$refs.li) {
        if (hasClass(item, 'active')) {
          return false;
        }
      }
      let li = this.$refs.li[i];
      // 调整至可见区域顶部
      li.style.left = '0px';
      li.style.top = -this.scrollHeight + 'px';
      addClass(li, 'active');
      this.showing = true;
      //下移至可见区域
      animate(li, { top: 0 }, this.showSpeed, 0.01, () => {
        this.showing = false;
        this.scroll(li);
      });
    },
    scroll(li, delay) {
      if (this.paused === true) return false;
      if (li.scrollWidth > this.$refs.ul.clientWidth) {
        // 左移
        setTimeout(() => {
          if (this.paused === true) return false;
          animate(li, { left: -300 }, this.scrollSpeed, 1, () => {
            this.finish(li);
          });
        }, delay || 1000);
      } else {
        setTimeout(() => {
          // 下移动至底部不可见区域
          if (this.paused === true) return false;
          animate(li, { top: this.scrollHeight }, this.showSpeed, 0.01);
          this.finish(li);
        }, delay || this.pauseTime);
      }
    },
    finish(li) {
      animate(li, { top: this.scrollHeight }, this.showSpeed, 0.01);
      removeClass(li, 'active');
      this.showNext();
    },
    pureHtml(html) {
      return pureHtml(html);
    },
  },
  beforeDestroy() {
    this.pause();
    this.current = -1;
  },
  watch: {
    marqueeList(val) {
      val.length > 0 && this.init();
    },
  },
};

function animate(obj, json, interval, sp, fn) {
  clearInterval(obj.timer);
  obj.timer = setInterval(() => {
    var flag = true;
    for (var arr in json) {
      var icur = 0;
      if (arr == 'opacity') {
        icur = Math.round(parseFloat(getStyle(obj, arr)) * 100);
      } else {
        icur = parseInt(getStyle(obj, arr));
      }
      var speed;
      if (sp == 1) {
        // 匀速
        speed = 0;
        if (json[arr] < 0) {
          speed--;
        } else {
          speed++;
        }
      } else {
        // 缓冲效果
        speed = (json[arr] - icur) * sp;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
      }

      if (icur != json[arr]) {
        flag = false;
      }
      if (arr == 'opacity') {
        obj.style.filter = 'alpha(opacity : ' + (icur + speed) + ')';
        obj.style.opacity = (icur + speed) / 100;
      } else {
        obj.style[arr] = icur + speed + 'px';
      }
    }

    if (flag) {
      clearInterval(obj.timer);
      if (fn) {
        fn();
      }
    }
  }, interval);
}

// 获取样式
function getStyle(obj, name) {
  if (obj.currentStyle) {
    return obj.currentStyle[name];
  } else {
    return getComputedStyle(obj, false)[name];
  }
}

function hasClass(ele, cls) {
  let reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
  return ele.className.match(reg);
}

function addClass(ele, cls) {
  if (!hasClass(ele, cls)) {
    let reg = new RegExp('/(^s*)|(s*$)/g');
    let className = ele.className.replace(reg, '');
    ele.className = className + ' ' + cls;
  }
}

function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    let reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
    ele.className = ele.className.replace(reg, ' ');
  }
}
</script>

<style lang="scss" scoped>
.Marquee-wrap {
  overflow: hidden;
  position: relative;
  width: 100%;
  display: inline-block;
  .active {
    border: none !important;
    cursor: pointer;
  }
}
.marquee-list-wrap {
  display: block;
  width: 100%;
  white-space: nowrap;
  position: absolute;
  top: -999em;
  left: 0;
}
</style>
