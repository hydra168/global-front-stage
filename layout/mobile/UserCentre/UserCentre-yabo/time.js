export const getDuration = (stamp, tem) => {
  const hour = Math.floor(stamp / (1000 * 60 * 60));
  let ms = stamp - hour * 1000 * 60 * 60;
  const min = Math.floor(ms / (1000 * 60));
  ms = ms - min * 1000 * 60;
  const sec = Math.floor(ms / 1000);
  return tem
    .replace('hh', hour > 0 ? hour : '0' + hour)
    .replace('mm', min > 9 ? min : '0' + min)
    .replace('ss', sec > 9 ? sec : '0' + sec);
};

export const getMonth = (date, tem) => {
  const year = date.getFullYear();
  const mon = date.getMonth() + 1;
  return tem.replace('yy', year).replace('mm', mon > 9 ? mon : '0' + mon);
};

export const getDate = (timeStamp, tem) => {
  const date = new Date(timeStamp * 1000);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month > 9 ? month : '0' + month;
  let day = date.getDate();
  day = day > 9 ? day : '0' + day;
  let hour = date.getHours();
  hour = hour > 9 ? hour : '0' + hour;
  let min = date.getMinutes();
  min = min > 9 ? min : '0' + 9;
  let sec = date.getSeconds();
  sec = sec > 9 ? sec : '0' + sec;
  return tem
    .replace('yy', year.toString())
    .replace('mm', month.toString())
    .replace('dd', day.toString())
    .replace('hh', hour.toString())
    .replace('mt', min.toString())
    .replace('ss', sec.toString());
};
