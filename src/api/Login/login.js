import axios from '../index'
//登录
export const login = data => {
  return axios.post('/Login/login',data)
}
//注册
export const register = data => {
    return axios.post('/Login/register',data)
}
//登出
export const Loginloginout = data => {
    return axios.post('/Login/login_out', data)
}