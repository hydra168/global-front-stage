export default {
  props: {
    // 從navber組件的list陣列參數中，每個元素的內容
    item: {
      type: Object,
      default: () => ({
        // 顯示文字用的參數
        title: '',
        // 顯示icon用的icon文字
        icon: '',
        // 圖片用的src參數
        imgSrc: '',
        // (客製化)後臺的顯示模式
        showType: undefined,
        // 按鍵點擊時會使用的函式
        func: f => f,
        /**
         * 以下是進階客製化用參數，平常不用設定
         */
        // 上面函式的附加參數，通常不用設定
        funcOption: {},
        // 組件上層按鍵的Options(選項請參考veutify的button組件的參數)
        btnOption: {},
        // 組件上層按鍵的Class
        btnClassName: '',
        // 當本元素被選擇時會使用的class
        itemSelectClassName: '',
        // 組件的Class
        itemClassName: '',
        // 組件顯示文字用的span標籤用的class參數
        itemTitleClassName: '',
        // 組件icon用的顏色
        iconColor: '',
        // 組件icon用的class參數
        itemIconClassName: '',
        // 組件圖片用的class參數
        imgClassName: '',
      }),
    },
    // 對父組件來說，本組件是否被選擇
    isSelectItem: {
      type: Boolean,
      default: false,
    },
    // 對父組件來說，本組件的index
    itemIndex: {
      type: Number,
      default: null,
    },
    // 本組件通用的Class
    globalItemClassName: {
      type: String,
      default: '',
    },
    // 本組件被選擇時通用的Class
    globalItemSelectClassName: {
      type: String,
      default: '',
    },
    // 本組件內的文字通用的Class
    globalItemTitleClassName: {
      type: String,
      default: '',
    },
    // 本組件內的icon通用的顏色
    globalIconColor: {
      type: String,
      default: '',
    },
    // 本組件內的icon通用的Class
    globalItemIconClassName: {
      type: String,
      default: '',
    },
    // 本組件內的圖片通用的style參數
    globalImgClassName: {
      type: String,
      default: '',
    },
    // 後臺通用的顯示模式
    showType: {
      type: Number,
      default: 9999,
    },
  },
  computed: {
    calcShowTitle() {
      return this.item.showType || this.showType;
    },
    showTitle() {
      switch (this.calcShowTitle) {
        case 1:
          return true;
        case 2:
          return false;
        case 3:
          return false;
        case 4:
          return true;
        case 5:
          return true;
        default:
          return true;
      }
    },
    showIcon() {
      switch (this.calcShowTitle) {
        case 1:
          return false;
        case 2:
          return true;
        case 3:
          return false;
        case 4:
          return false;
        case 5:
          return true;
        default:
          return true;
      }
    },
    showImg() {
      switch (this.calcShowTitle) {
        case 1:
          return false;
        case 2:
          return false;
        case 3:
          return true;
        case 4:
          return true;
        case 5:
          return false;
        default:
          return true;
      }
    },
  },
};
