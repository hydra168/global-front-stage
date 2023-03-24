import { mapActions, mapGetters } from 'vuex';

export default {
  // 為了防止使用mixins時設定沖突，名稱請加上'navbar'當前綴
  computed: {
    ...mapGetters(['menus']),
    navbarList() {
      return (
        this.menus.menus
          // 濾出pc菜單的列表
          .filter(element => element.Group === 'h5_main_menu' && element.ShowFront === 1)
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
            func: () => this.ROUTER_PUSHOPTION({ link: element.Action, option: { Blank: element.Blank } }),
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
            // imgStyle: {},
          }))
      );
    },
    navbarItemType() {
      return this.menus.showType;
    },
    navbarProcessMap() {
      return new Map([['BottomNavigation-003', this.navbarAddMidLogo]]);
    },
  },
  methods: {
    ...mapActions(['ROUTER_PUSH', 'ROUTER_PUSHOPTION']),
    navbarProcessList(originalList = [], styleName = '') {
      return this.navbarProcessMap.has(styleName) ? this.navbarProcessMap.get(styleName)(originalList) : originalList;
    },
    navbarAddMidLogo(originalList = []) {
      let homeIndex = originalList.findIndex(element => element.Id === 3000);
      let othersArr = originalList.filter(element => element.Id !== 3000);
      let midIndex = Array.isArray(othersArr) ? Math.floor((othersArr.length - 1) / 2) : 0;
      return othersArr.flatMap((element, index) => {
        if (index === midIndex) {
          return [element, this.navbarLogoItem(originalList[homeIndex], { imgClassName: 'logo' })];
        }
        return [element];
      });
    },
    navbarLogoItem(element, { imgClassName = 'logo', btnClassName = '' } = {}) {
      return {
        ...element,
        // 按鍵點擊時會使用的函式
        func: () => this.ROUTER_PUSH('/'),
        // 組件圖片用的style參數
        imgClassName,
        // 組件上層按鍵的Class
        btnClassName,
      };
    },
  },
};
