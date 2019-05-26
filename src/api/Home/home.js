import axios from '../index'
export const getType = data => {
  return axios.post('/Index/getType')
}
export const getGoods = data => {
  return axios.post('/Index/getGoods')
}
export const goodShow = data => {
  return axios.post('/Index/goodShow',data)
}
export const getBanner = data => {
  return axios.post('/Index/getBanner')
}
