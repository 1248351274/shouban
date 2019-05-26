import axios from 'axios'
import qs from 'qs'
import {devUrl} from '@/config/index'
import store from '@/store/index'
import router from '../router/index'
import * as TYPES from '@/store/type'
import Vue from 'vue'
axios.defaults.timeout = 20000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = devUrl;
//POST传参序列化
axios.interceptors.request.use((config) => {
  if(store.state.token){
    config.headers.Authorization = store.state.token
    config.headers.loginID = store.state.loginid
  }
  if(config.method  === 'post'){
    config.data = qs.stringify(config.data);
  }
  return config;
},(error) =>{
  return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use(
  response => {
    if (response) {
      switch (response.headers.status) {
        case '401':
          if (localStorage.getItem('token')) {
            Vue.$toast('此账号在其他地方已登录')
          }
          // 401 清除token信息并跳转到登录页面
          store.commit(TYPES.LOGOUT)
          router.replace({
            path: '/login'
          })
      }
    }
    return response
  },
  error => {
    // Vue.$vux.loading.hide()
    // Vue.$toast.show({
    //   text: '网络连接超时',
    //   type: 'warn'
    // })
    // console.log(JSON.stringify(error))// console : Error: Request failed with status code 402
    return Promise.reject(error)
  })
export default axios
