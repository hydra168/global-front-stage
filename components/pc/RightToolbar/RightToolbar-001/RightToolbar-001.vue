<template>
  <div id="RightToolbar" class="RightToolbar-001">
    <div class="tools">
      <ul>
        <li :class="{ show: show, hide: !show }" @click="view('/')"><i class="img-icon-home nomargin"></i>{{ textFilter('home') }}</li>
        <li :class="{ show: show, hide: !show }" @click="SHOW_LIVE_CHAT()"><i class="img-icon-kf2 nomargin"></i>{{ textFilter('onlineService') }}</li>
        <li :class="{ show: show, hide: !show }" @click="view('/userCentre/deposit')"><i class="img-icon-home nomargin"></i>充值</li>
        <li :class="{ show: show, hide: !show }" @click="view('/helpCentre')"><i class="img-icon-kf2 nomargin"></i>帮助中心</li>

        <li
          class="togglebtn"
          :class="{ show: show, hide: !show, shousuo: !hover && !show, onreday: hover && !show }"
          @click="show = !show"
          @mouseenter="hover = true"
          @mouseleave="hover = false"
        >
          {{ show ? textFilter('close') : textFilter('open') }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { textFilter } from '@UTILS/i18n';

export default {
  name: 'RightToolbar-001',
  data() {
    return {
      show: true,
      hover: false,
    };
  },
  methods: {
    ...mapActions(['SHOW_LIVE_CHAT']),
    view(link) {
      this.$router.push({ path: link });
    },
    textFilter(text) {
      return textFilter(text, 'com_rightToolbar_001_', {}, this);
    },
  },
};
</script>

<style lang="scss" scoped>
.RightToolbar-001 {
  position: fixed;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  z-index: 2000;
  margin-top: -30px;
}
.RightToolbar-001 .img-icon-home:before {
  background-image: url('./assets/ico-home.png');
  width: 26px;
  height: 26px;
}
.RightToolbar-001 .img-icon-activity:before {
  background-image: url('./assets/ico-activity.png');
  width: 26px;
  height: 26px;
}
.RightToolbar-001 .img-icon-user2:before {
  background-image: url('./assets/ico-user2.png');
  width: 23px;
  height: 23px;
  background-position: top center;
}
.RightToolbar-001 .img-icon-kf2:before {
  background-image: url('./assets/ico-kf2.png');
  width: 26px;
  height: 26px;
}
.RightToolbar-001 .img-icon-yl:before {
  background-image: url('./assets/ico-yl.png');
  width: 26px;
  height: 26px;
}
.RightToolbar-001 .img-icon-yl.off:before {
  background-image: url('./assets/ico-ylg.png');
}
.RightToolbar-001 .img-icon-gg:before {
  background-image: url('./assets/ico-gg.png');
  width: 26px;
  height: 26px;
}
.RightToolbar-001 .img-icon-lo:before {
  background-image: url('./assets/ico-lo.png');
  width: 26px;
  height: 26px;
}
.RightToolbar-001 .tools ul {
  pointer-events: none;
}
.RightToolbar-001 .tools ul li {
  border: none;
  outline: none;
  pointer-events: auto;
  width: 70px;
  cursor: pointer;
  position: relative;
  height: 60px;
  background: #333;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 12px;
  transition: right 300ms;
}
.RightToolbar-001 .tools ul li + li {
  margin-top: 5px;
}
.RightToolbar-001 .tools ul li.hide {
  right: -90px;
}
.RightToolbar-001 .tools ul li.show {
  right: 0;
}
.RightToolbar-001 .tools ul li.onreday {
  right: -20px;
}
.RightToolbar-001 .tools ul li.shousuo {
  right: -80px;
}
.RightToolbar-001 .tools ul li.imgli {
  background-color: transparent;
}
.RightToolbar-001 .tools ul li.imgli:hover {
  background-color: transparent;
  opacity: 0.8;
}
.RightToolbar-001 .tools ul li i {
  margin-bottom: 3px;
  font-size: 24px;
  display: flex;
  align-items: center;
}
.RightToolbar-001 .tools ul li.sp {
  background-color: #e76b10;
}
.RightToolbar-001 .tools ul li.sp:hover {
  background-color: #da9c6e;
}
.RightToolbar-001 .tools ul li.togglebtn i {
  font-size: 20px;
}
[class^='img-icon-'].nomargin:before,
[class^='img-icon-'].nomargin:after,
[class*=' img-icon-'].nomargin:before,
[class*=' img-icon-'].nomargin:after {
  margin: 0;
}
.RightToolbar-001 .tools ul li.act,
.RightToolbar-001 .tools ul li:hover {
  background: -webkit-linear-gradient(#dd6d99, #97355b); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(#dd6d99, #97355b); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(#dd6d99, #97355b); /* Firefox 3.6 - 15 */
  background: linear-gradient(#dd6d99, #97355b); /* 标准的语法 */
}
</style>
