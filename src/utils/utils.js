import moment from 'moment'

let util = {}

util.longTimestampToString = function (longTimestamp) {
  if (longTimestamp && longTimestamp > 0) {
    // longTimestamp/
    return moment(longTimestamp).format('YYYY-MM-DD HH:mm:ss')
    // return moment(longTimestamp).format('YYYY-MM-DD HH:mm:ss');
  }
  return ''
}

util.yyyyMMddNow = function () {
  return moment(new Date()).format('YYYY-MM-DD')
}
export default util
