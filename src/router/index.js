import Vue from "vue";
import Router from "vue-router";
import store from "@/store/index";
import * as TYPES from "@/store/type";
// import Home from "@/view/Index/home";
// import Category from "@/components/category";
// import ShopCar from "@/view/ShopCar/shopCar";
// import User from "@/view/User/index";
// import addCart from "@/components/addCart";
import ZL from "@/view/User/ziliao";
import Login from "@/view/Login/login";
import Register from "@/view/Login/register";
import QB from "@/view/User/recharge";
import Detail from "@/view/Index/goodsDetail";
import Shop from "@/view/User/shop";
import Jl from "@/view/User/recorder";
import SJl from "@/view/User/srecorder";
import Goods from "@/view/User/goodslist";
import EditGoods from "@/view/User/goods";
import AddGoods from "@/view/User/addgoods";
// import Dynamic from "@/view/ShopCar/dynamic";
import Tab from "@/view/Tab/tab";
import main from "@/view/Index/main";
import News from "@/components/public/News"
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "Tab",
      // meta: {
      //   footer: true
      // },
      component: Tab,
    },
    {
      path: "/News",
      name: "News",
      component: News,
    },
    // {
    //   path: "/",
    //   name: "home",
    //   meta: {
    //     footer: true
    //   },
    //   component: Home,
    // },
    {
      path: "/main",
      name: "main",
      // meta: {
      //   footer: true
      // },
      component: main,
    },
    {
      path: "/detail",
      name: "detail",
      // meta: {
      //   footer: false
      // },
      component: Detail
      
    },
    // {
    //   path: "/shopCar",
    //   name: "shopCar",
    //   meta: {
    //     requireAuth: true,
    //     footer: false
    //   },
    //   component: ShopCar
    // },
    // {
    //   path: "/user",
    //   name: "user",
    //   meta: {
    //     requireAuth: true,
    //     footer: true
    //   },
    //   component: User
    // },
    {
      path: "/login",
      name: "login",
      // meta: {
      //   footer: true
      // },
      component: Login
    },
    {
      path: "/zc",
      name: "register",
      // meta: {
      //   footer: true
      // },
      component: Register
    },
    {
      path: "/user/zl",
      // meta: {
      //   footer: true
      // },
      component: ZL
    },
    {
      path: "/user/qb",
      // meta: {
      //   footer: false
      // },
      component: QB
    },
    {
      path: "/user/shop",
      // meta: {
      //   footer: false
      // },
      component: Shop
    },

    {
      path: "/user/jl",
      // meta: {
      //   footer: false
      // },
      component: Jl
    },
    {
      path: "/user/sjl",
      // meta: {
      //   footer: false
      // },
      component: SJl
    },
    {
      path: "/user/goods",
      // meta: {
      //   footer: false
      // },
      component: Goods
    },
    {
      path: "/user/upgoo",
      // meta: {
      //   footer: false
      // },
      component: EditGoods
    },
    {
      path: "/user/addgoo",
      // meta: {
      //   footer: false
      // },
      component: AddGoods
    },
    // {
    //   path: "/dynamic",
    //  name: 'dynamic',
    //   meta: {
    //     footer: true
    //   },
    //   component: Dynamic
    // }
    // {
    //   path: "/detail",
    //   name: "detail",
    //   component: addCart
    // }
  ]
});
if (window.localStorage.getItem("token")) {
  store.commit(TYPES.LOGIN, window.localStorage.getItem("token"));
}
if (window.localStorage.getItem("loginid")) {
  store.commit(TYPES.LOGINID, window.localStorage.getItem("loginid"));
}
router.beforeEach(function(to, from, next) {
  // if(to.name=='detail'){
  //   store.commit(TYPES.FOOT_HIDE);
  // }else{

  //   store.commit(TYPES.FOOT_DISPLAY);
  // }
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.token && store.state.loginid) {
      next();
      //console.log(window.localStorage.getItem("token"))
    } else {
      //console.log('22')
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    }
  } else {
    next();
  }
});
export default router
