import { mapActions, mapGetters } from 'vuex';
import { jsonDecode } from '../utils/json.js';

function filter2Item(originalList = []) {
  return [...originalList].slice(0, 2);
}
function filter4Item(originalList = []) {
  return [...originalList].slice(0, 4);
}
function filter5Item(originalList = []) {
  return [...originalList].slice(0, 5);
}
function filter6Item(originalList = []) {
  return [...originalList].slice(0, 6);
}
const lottoryPopularProcessMap = new Map([
  ['LottoryPopular-default', filter6Item],
  ['LottoryPopular-001', filter5Item],
  ['LottoryPopular-002', filter4Item],
  ['LottoryPopular-005', filter6Item],
  ['LottoryPopular-007', filter4Item],
  ['LottoryPopular-008', filter4Item],
  ['LottoryPopular-010', filter2Item],
  ['LottoryPopular-011', filter5Item],
  ['LottoryPopular-011-1', filter6Item],
  ['LottoryPopular-013', filter4Item],
  ['LottoryPopular-014', filter6Item],
  ['LottoryPopular-029', filter4Item],
  ['LottoryPopular-030', filter4Item],
]);

export default {
  // 為了防止使用mixins時設定沖突，名稱請加上'lottoryPopular'當前綴
  computed: {
    ...mapGetters(['lottoryGameList']),
    // 第一群組的資料
    lottoryPopularListGroups1() {
      return this.lottoryPopularFilterData(this.lottoryGameList, 1).map(element => this.lottoryPopularCreateData(element));
    },
    // 第二群組的資料
    lottoryPopularListGroups2() {
      return this.lottoryPopularFilterData(this.lottoryGameList, 2).map(element => this.lottoryPopularCreateData(element));
    },
    // 第三群組的資料
    lottoryPopularListGroups3() {
      return this.lottoryPopularFilterData(this.lottoryGameList, 3).map(element => this.lottoryPopularCreateData(element));
    },
  },
  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
    // 轉換資料第二步
    lottoryPopularProcessList(originalList = [], styleName = '') {
      return lottoryPopularProcessMap.has(styleName) ? lottoryPopularProcessMap.get(styleName)(originalList) : originalList;
    },
    // 過攄指定的群組
    lottoryPopularFilterData(DataList = [], groupid = 1) {
      return DataList.filter(element => Number(element.groupId) === groupid);
    },
    // 轉換資料第一步
    lottoryPopularCreateData(element) {
      const { gameName: title = '', gameContent: content = [] } = jsonDecode(element.showName, {});
      return {
        ...element,
        // 顯示title文字用的參數
        title,
        // 顯示content文字用的參數
        content,
        // 顯示icon用的icon文字
        icon: '',
        // 圖片用的src參數
        img: jsonDecode(element.picture, []),
        // 按鍵點擊時會使用的函式
        func: () => this.ROUTER_PUSH(`/play/${element.link}`),
      };
    },
  },
};
