import axios from '../index'
export const getShopMsg = data => {
  return axios.post('/Shop/getshopmsg',data)
}
export const getAddGoods = data => {
  return axios.post('/Shop/getaddgoo',data)
}
export const createShop = data => {
  return axios.post('/Shop/createshop',data)
}
export const addShop = data => {
  return axios.post('/Shop/addshop',data)
}
export const removeShop = data => {
  return axios.post('/Shop/remove',data)
}
export const editShop = data => {
  return axios.post('/Shop/editshop',data)
}