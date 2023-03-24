import { mapActions, mapGetters } from 'vuex';

export default {
  // 為了防止使用mixins時設定沖突，名稱請加上'navbar'當前綴
  computed: {
    ...mapGetters(['menus']),
    navbarList() {
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
      return new Map([
        ['Navbar-default', this.navbarAddStartLogo],
        ['Navbar-002', this.navbarAddStartLogo2],
        ['Navbar-003', this.navbarAddMidLogoAndDivide],
        ['Navbar-004', this.navbarAddMidLogo],
        ['Navbar-005', this.navbarAddStartLogo],
        ['Navbar-007', this.navbarAddMidLogo],
        ['Navbar-009', this.navbarAddStartLogo],
      ]);
    },
  },
  methods: {
    ...mapActions(['ROUTER_PUSH', 'ROUTER_PUSHOPTION']),
    //
    navbarProcessList(originalList = [], styleName = '') {
      return this.navbarProcessMap.has(styleName) ? this.navbarProcessMap.get(styleName)(originalList) : originalList;
    },
    navbarCreateDivideItem({ title = '/', imgClassName = 'divide' } = {}) {
      return {
        title,
        // 顯示content文字用的參數
        content: '',
        // 顯示icon用的icon文字
        icon: '',
        // 圖片用的src參數
        imgSrc: '',
        // (客製化)後臺的顯示模式
        showType: 1,
        // 按鍵點擊時會使用的函式
        func: f => f,
        // 組件上層按鍵的Class
        imgClassName,
      };
    },
    navbarLogoItem({ imgClassName = 'logo', btnClassName = '' } = {}) {
      return {
        title: '',
        // 顯示content文字用的參數
        content: '',
        // 顯示icon用的icon文字
        icon: '',
        // 圖片用的src參數
        imgSrc: this.$store.getters.config.logo_image_pc,
        // (客製化)後臺的顯示模式
        showType: 3,
        // 按鍵點擊時會使用的函式
        func: () => this.ROUTER_PUSH('/'),
        // 組件圖片用的style參數
        imgClassName,
        // 組件上層按鍵的Class
        btnClassName,
      };
    },
    navbarAddMidLogoAndDivide(originalList = []) {
      let midIndex = Array.isArray(originalList) ? Math.floor((originalList.length - 1) / 2) : 0;
      let lastIndex = Array.isArray(originalList) ? originalList.length - 1 : 0;
      return originalList.flatMap((element, index) => {
        if (index === midIndex) {
          return [element, this.navbarLogoItem()];
        }
        if (index !== lastIndex) {
          return [element, this.navbarCreateDivideItem()];
        }
        return [element];
      });
    },
    navbarAddStartLogo(originalList = []) {
      return [this.navbarLogoItem(), ...originalList];
    },
    navbarAddStartLogo2(originalList = []) {
      return [this.navbarLogoItem({ btnClassName: 'item-logo-container' }), ...originalList];
    },
    navbarAddMidLogo(originalList = []) {
      let midIndex = Array.isArray(originalList) ? Math.floor((originalList.length - 1) / 2) : 0;
      return originalList.flatMap((element, index) => {
        if (index === midIndex) {
          return [element, this.navbarLogoItem()];
        }
        return [element];
      });
    },
  },
};
