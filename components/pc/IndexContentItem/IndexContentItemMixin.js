export default {
  props: {
    // 從navber組件的list陣列參數中，每個元素的內容
    item: {
      type: Object,
      default: () => ({
        // 顯示title文字用的參數
        title: '',
        // 顯示title文字用的參數
        subTitle: '',
        // 顯示content文字用的參數
        content: '',
        // 圖片用的src參數
        imgSrc: '',
        // 圖片用的src參數
        subImgSrc: '',
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
        // 組件顯示subTitle文字用的span標籤用的class參數
        itemSubTitleClassName: '',
        // 組件顯示content文字用的span標籤用的class參數
        itemContentClassName: '',
        // 組件圖片用的class參數
        imgClassName: '',
        // 組件圖片用的class參數
        subImgClassName: '',
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
    // 本組件內的subTitle文字通用的Class
    globalItemSubTitleClassName: {
      type: String,
      default: '',
    },
    // 本組件內的content文字通用的Class
    globalItemContentClassName: {
      type: String,
      default: '',
    },
    // 本組件內的圖片通用的Class
    globalImgClassName: {
      type: String,
      default: '',
    },
    // 本組件內的圖片通用的Class
    globalSubImgClassName: {
      type: String,
      default: '',
    },
  },
  methods: {
    handItemClick({ func = f => f, funcOption = {} }) {
      func(funcOption);
    },
  },
};
