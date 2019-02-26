export function timestampToTime(timestamp) {
  var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + '-';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  let D = date.getDate() + ' ' ;
  let h = date.getHours() + ' : ' ;
  let m = date.getMinutes() + ' : ';
  let s = date.getSeconds();
  // let num = h <= 24 && h >= 18 ? '晚上' : h < 18 && h >= 12 ? '下午' : '上午';
  // return Y + M + D + (num + h) + ' ' + m + s;
  return Y + M + D +  h  +  m + s;
}


export function myGetTime( startTime , endTime) {
  
  let start = startTime.replace(/-/g, '/'), end = endTime.replace(/-/g, '/')
  
  let newEndTime = new Date(end).getTime(), newStartTime = new Date(start).getTime()
  
  let duration = newEndTime - newStartTime
  
  let dsy = Math.floor(duration / (3600000 * 24))
  
  let minute = Math.floor((duration % (3600000)) / (60000))
  
  let hour = Math.floor((duration % (3600000 * 24)) / (3600000))
  
  let days = (dsy > 0 ? dsy + '天' : '');
  
  let hours = (hour > 0 ? hour + '小时' : '');
  
  let minutes = (minute > 0 ? minute + '分' : '');
  
  if (duration > 60000) {
    
    return days + hours + minutes
    
  } else {
    
    return "1分钟"
  }
}
