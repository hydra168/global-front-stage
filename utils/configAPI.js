/**
 * 把/system/configByCode這支API中的value值解碼成Object
 * @param {String} value /system/configByCode中的Val值
 * @returns {Object}
 */
export function decodeConfigAPIValue(value = '{}') {
  if (value === '') {
    return {};
  }
  try {
    return JSON.parse(value);
  } catch (error) {
    return {};
  }
}
/**
 * 把Object編碼成config這支API中的value值
 * @param {*} obj
 * @returns {String}
 */
export function encodeConfigAPIValue(obj) {
  return JSON.stringify(obj);
}
