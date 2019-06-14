import axios from '../index'
export const getUserMsg = data => {
  return axios.post('/User/getUserMsg')
}
export const editMsg = data => {
  return axios.post('/User/editMsg',data)
}
export const recharge = data => {
  return axios.post('/User/recharge',data)
}
export const getGoods = data => {
  return axios.post('/Goods/getgoods')
}
export const getGoodsMsg = data => {
  return axios.post('/Goods/getgoodsmsg',data)
}
export const getTypes = data => {
  return axios.post('/Goods/gettype')
}
export const editGoods = data => {
  return axios.post('/Goods/editgoods',data)
}
export const delGoods = data => {
  return axios.post('/Goods/delgood',data)
}
export const addGoods = data => {
  return axios.post('/Goods/addgood',data)
}
export const getdynamics = data => {
  return axios.post('/Goods/getdynamics')
}
export const addDynamics = data => {
  return axios.post('/Goods/addDynamic',data)
}
export const upimg = data => {
  return axios.post('/Goods/upimg',data)
}
export const delimg = data => {
  return axios.post('/Goods/delimg',data)
}
export const dyupimg = data => {
  return axios.post('/Goods/dyupimg',data)
}
export const dydelimg = data => {
  return axios.post('/Goods/dydelimg',data)
}
export const updatelike = data => {
  return axios.post('/Goods/updatelike',data)
}
// export const goodlikeB = data => {
//   return axios.post('/Goods/goodlikeB',data)
// }
export const recorder = data => {
  return axios.post('/User/recorder',data)
}
export const srecorder = data => {
  return axios.post('/User/srecorder',data)
}
export const login_out = data => {
  return axios.post('/Login/login_out',data)
}
export const upuserimg = data => {
  return axios.post('/User/upimg',data)
}
export const subeva = data => {
  return axios.post('/User/subeva',data)
}



