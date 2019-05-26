import axios from '../index'
export const showCart = data => {
  return axios.post('/Shopcart/showcart')
}
export const editCart = data => {
  return axios.post('/Shopcart/editCart',data)
}
export const delCart = data => {
  return axios.post('/Shopcart/delCart',data)
}
export const getCarNum = data => {
  return axios.post('/Shopcart/getcarnum',data)
}
export const order = data => {
  return axios.post('/Shopcart/order',data)
}
export const getmsg = data => {
  return axios.post('/Shopcart/getmsg',data)
}
