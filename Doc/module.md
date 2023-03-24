# 組件模版的UML

本文件只是簡單版本

## 主架構

```nomnoml
[持久層|只和JS隅合;後臺來的資料:JSON]
[數據層|只和框架隅合;1.把持久層的資料處後的的資料:JSON;2.事件處理：JS]
[展示層|只和專案隅合;1.數據層給的資料:JSON;2.把事件傳回數據層]

[後臺] - [持久層]
[持久層] - [數據層]
[數據層] - [展示層]
[展示層] - [<actor> User]
```

## 導航欄

```nomnoml
[<frame> 導航欄持久層|寫在元件庫|

  [<start> state] -> [GET_MENU]
  [GET_MENU] -> [SET_MENUS]
  [SET_MENUS] -> [<state> menus]
]

[<frame> 導航欄數據層|寫在專案裡，可以部分使用|

  [navbarList| 基本的資料處理]
  [navbarProcessList| 把資料做二次處理]
  [navbarProcessMap| 二次處理的處理函式]

  [<start> state] -> [navbarList]
  [navbarList] -> [navbarProcessList]
  [navbarProcessMap] - [navbarProcessList]
  [navbarProcessList] -> [<end> end]
]
[<frame> 導航欄展示層|寫在專案裡|
  [Navbar-000 | 父組件]
  [NavbarItem-000 | 子組件]

  [data] -> [Navbar-000]
  [Navbar-000] - [NavbarItem-000]
]

[導航欄持久層] -> [導航欄數據層]
[導航欄數據層] -> [導航欄展示層]
```

## 遊戲列表

```nomnoml
[<frame> 遊戲列表持久層|寫在元件庫|

  [<start> state] -> [GET_LOTTORY_GAME_LIST]
  [GET_LOTTORY_GAME_LIST] -> [SET_LOTTORY_GAME_LIST]
  [SET_LOTTORY_GAME_LIST] -> [<state> lottoryGameList]
]

[<frame> 遊戲列表數據層|寫在專案裡，可以部分使用|

  [lottoryPopularList| 基本的資料處理]
  [lottoryPopularProcessList| 把資料做二次處理]
  [lottoryPopularProcessMap| 二次處理的處理函式]

  [<start> state] -> [lottoryPopularList]
  [lottoryPopularList] -> [lottoryPopularProcessList]
  [lottoryPopularProcessMap] - [lottoryPopularProcessList]
  [lottoryPopularProcessList] -> [<end> end]
]
[<frame> 遊戲列表展示層|寫在專案裡|
  [LotteryPupular-000 | 父組件]
  [LotteryPupularItem-000 | 子組件]

  [data] -> [LotteryPupular-000]
  [LotteryPupular-000] - [LotteryPupularItem-000]
]

[遊戲列表持久層] -> [遊戲列表數據層]
[遊戲列表數據層] -> [遊戲列表展示層]
```

## 快速列表

```nomnoml
[<frame> 遊戲列表持久層|寫在元件庫|
]

[<frame> 遊戲列表數據層|寫在專案裡，可以部分使用|

  [quickBarList| 基本的資料處理]
  [quickBarProcessList| 把資料做二次處理]
  [quickBarProcessMap| 二次處理的處理函式]

  [<start> state] -> [quickBarList]
  [quickBarList] -> [quickBarProcessList]
  [quickBarProcessMap] - [quickBarProcessList]
  [quickBarProcessList] -> [<end> end]
]
[<frame> 遊戲列表展示層|寫在專案裡|
  [quickBar-000 | 父組件]
  [quickBarItem-000 | 子組件]

  [data] -> [quickBar-000]
  [quickBar-000] - [quickBarItem-000]
]

[遊戲列表持久層] -> [遊戲列表數據層]
[遊戲列表數據層] -> [遊戲列表展示層]
```
