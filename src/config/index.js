let ISDEV = true
//let ISDEV = false
// let ip = 'http://www.udao56.com'
let ip = 'http://127.0.0.1'
let requrl = ip+'/wxshop/index.php/wshop'
let devUrl = requrl
if (ISDEV) {
  devUrl = '/api'
}
// export default {
//     ip,
//     requrl,
//     devUrl
// }
module.exports = {
  ip,
  requrl,
  devUrl
}
