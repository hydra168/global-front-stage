const items = process.argv[3];
let config = {
  excelProjectToken: '1uRcRXwYZS4H25cl_nFkYeDDQZLBuXugGbst7dT9_tOo', // google excel id
  useApiKey: 'AIzaSyCIEIcu681TDPkDaJOlaqEAsZ-yVFlRCG4',
  sheet: [], // 預計抓取的 tabs
  distFolder: './src/lang', // 檔案輸出路徑
};

if (items) {
  const item = items.split('=');
  const itemKey = item[0];
  const itemValue = item[1];
  if (itemKey === 'tab' && itemValue) {
    const itemArray = itemValue.split(',');
    itemArray.forEach(i => {
      config.sheet.push(i);
    });
  }
}

module.exports = config;
