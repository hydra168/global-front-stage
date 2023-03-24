export default {
  props: {
    // 從navber組件的list陣列參數中，每個元素的內容
    item: {
      type: Object,
      default: () => ({
        // 顯示title文字用的參數
        title: '',
        // 顯示content文字用的參數
        content: '',
        // 顯示icon用的icon文字
        icon: '',
        // 圖片用的src參數
        imgSrc: '',
        // (客製化)title文字的顯示模式
        showTitle: undefined,
        // (客製化)content文字的顯示模式
        showContent: undefined,
        // (客製化)Icon的顯示模式
        showIcon: undefined,
        // (客製化)Img的顯示模式
        showImg: undefined,
        // 按鍵點擊時會使用的函式
        func: f => f,
        /**
         * 以下是進階客製化用參數，平常不用設定
         */
        // 上面函式的附加參數，通常不用設定
        funcOption: {},
        // 當本元素被選擇時會使用的class
        itemSelectClass: '',
        // 組件的Class
        itemClassName: '',
        // 組件外層容器的Class
        containerClassName: '',
        // 組件顯示title文字用的span標籤用的class參數
        itemTitleClassName: '',
        // 組件顯示content文字用的span標籤用的class參數
        itemContentClassName: '',
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
    // 觸發父組件的選擇事件
    changeSelectEvent: {
      type: Function,
      default: f => f,
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
    // 本組件內的title文字通用的Class
    globalItemTitleClassName: {
      type: String,
      default: '',
    },
    // 本組件內的content文字通用的Class
    globalItemContentClassName: {
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
  },
  methods: {
    handItemClick({ func = f => f, funcOption = {}, index = null, changeSelectEvent = f => f }) {
      changeSelectEvent(index);
      func(funcOption);
    },
  },
};
