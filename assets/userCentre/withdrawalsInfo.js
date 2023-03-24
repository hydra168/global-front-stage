// 取款狀態
export const withdrawalsStatusList = {
  '-1': {
    color: 'black',
    title: 'g_common_withdrawalsStatusList_-1', // 未知
  },
  0: {
    color: 'orange',
    title: 'g_common_withdrawalsStatusList_0', // 处理中
  },
  1: {
    color: 'success',
    title: 'g_common_withdrawalsStatusList_1', // 已出金
  },
  2: {
    color: 'grey',
    title: 'g_common_withdrawalsStatusList_2', // 已拒绝
  },
};

// 取款類型
export const withdrawalsTypeList = {
  0: {
    color: 'orange',
    title: 'g_common_withdrawalsTypeList_0', // 未确认
  },
  1: {
    color: 'orange darken-1',
    title: 'g_common_withdrawalsTypeList_1', // 混合出金
  },
  2: {
    color: 'success darken-2',
    title: 'g_common_withdrawalsTypeList_2', // USDT出金
  },
  3: {
    color: 'success',
    title: 'g_common_withdrawalsTypeList_3', // 現金出金
  },
};
