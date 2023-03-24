import { mapActions, mapGetters } from 'vuex';

export default {
  // 為了防止使用mixins時設定沖突，名稱請加上'righttoolbar'當前綴
  computed: {
    ...mapGetters(['menus']),
    righttoolbarList() {
      return (
        this.menus.menus
          // 濾出pc菜單的列表
          .filter(element => element.Group === 'pc_main_menu' && element.ShowFront === 1)
          // 做成前臺能使用的資料
          .map(element => ({
            ...element,
            // 顯示文字用的參數
            title: element.ShowTitle,
            // 顯示icon用的icon文字
            icon: element.Icon,
            // 圖片用的src參數
            imgSrc: element.Pic,
            // 按鍵點擊時會使用的函式
            func: () => this.ROUTER_PUSH(element.Action),
            // (客製化)後臺的顯示模式
            showType: undefined,
            /**
             * 以下是進階客製化用參數，平常不用設定
             */
            // 上面函式的附加參數，通常不用設定
            // funcOption: {},
            // 組件上層按鍵通用的Options(選項請參考veutify的button組件的參數)
            // btnOptions: {},
            // 當本元素被選擇時會使用的class
            // itemSelectClassName: '',
            // 組件上層按鍵通用的Class
            // btnClassName: '',
            // 組件的Class
            // itemClassName: '',
            // 組件顯示文字用的span標籤用的class參數
            // itemTitleClassName: '',
            // 組件icon用的顏色
            // iconColor: '',
            // 組件icon用的class參數
            // itemIconClassName: '',
            // 組件圖片用的style參數
            // imgClass: '',
          }))
      );
    },
    righttoolbarItemType() {
      return this.menus.showType;
    },
    righttoolbarProcessMap() {
      return new Map([
        ['RightToolbar-003', this.righttoolbarAddHideRightItem],
        ['RightToolbar-007', this.righttoolbarAddHideRightItem],
      ]);
    },
  },
  methods: {
    ...mapActions(['ROUTER_PUSH', 'SHOW_LIVE_CHAT']),
    //
    righttoolbarProcessList(originalList = [], styleName = '') {
      return this.righttoolbarProcessMap.has(styleName) ? this.righttoolbarProcessMap.get(styleName)(originalList) : originalList;
    },
    righttoolbarHideRightItem({ icon = 'chevron_right', containerClassName = '' } = {}) {
      return {
        title: 'hideTitle',
        // 顯示content文字用的參數
        content: '收起',
        // 顯示icon用的icon文字
        icon,
        // 圖片用的src參數
        imgSrc: '',
        // 按鍵點擊時會使用的函式
        // func: () => this.ROUTER_PUSH('/'),
        // 組件圖片用的style參數
        imgClassName: '',
        // 組件圖片用的style參數
        itemClassName: 'hide-item',
        // 組件上層按鍵的Class
        containerClassName,
      };
    },
    righttoolbarHideLeftItem({ icon = 'chevron_left', containerClassName = '' } = {}) {
      return {
        title: 'hideTitle',
        // 顯示content文字用的參數
        content: '收起',
        // 顯示icon用的icon文字
        icon,
        // 圖片用的src參數
        imgSrc: '',
        // 按鍵點擊時會使用的函式
        // func: () => this.ROUTER_PUSH('/'),
        // 組件圖片用的style參數
        imgClassName: '',
        // 組件圖片用的style參數
        itemClassName: 'hide-item',
        // 組件上層按鍵的Class
        containerClassName,
      };
    },
    righttoolbarScrollTopItem({ icon = 'vertical_align_top', containerClassName = '' } = {}) {
      return {
        title: '返回顶部',
        // 顯示content文字用的參數
        content: '返回顶部',
        // 顯示icon用的icon文字
        icon,
        // 圖片用的src參數
        imgSrc: '',
        // 按鍵點擊時會使用的函式
        func: () => this.ROUTER_PUSH('scrollTop'),
        // 組件圖片用的style參數
        imgClassName: '',
        // 組件圖片用的style參數
        itemClassName: '',
        // 組件上層按鍵的Class
        containerClassName,
      };
    },
    righttoolbarAddHideLeftItem(originalList = []) {
      return [...originalList, this.righttoolbarScrollTopItem(), this.righttoolbarHideLeftItem()];
    },
    righttoolbarAddHideRightItem(originalList = []) {
      return [...originalList, this.righttoolbarScrollTopItem(), this.righttoolbarHideRightItem()];
    },
  },
};
