import Vue from "vue";
import Router from "vue-router";
import store from "@/store/index";
import * as TYPES from "@/store/type";
import Home from "@/view/Index/home";
// import Category from "@/components/category";
import shopCar from "@/view/ShopCar/shopCar";
import user from "@/view/User/index";
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
import Dynamic from "@/view/ShopCar/dynamic";
import Tab from "@/view/Tab/tab";
import main from "@/view/Index/main";
import News from "@/components/public/News"
import dynamicDet from "@/view/ShopCar/dynamicDet";
import addrecord from '@/view/admin/addrecord'
import text from '@/view/admin/text'
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "Tab",
      component: Tab,
      children:[
        {
          path: "/Home",
          name: "Home",
          component: Home,
        },
        {
          path: "/user",
          name: "user",
          meta: {
            requireAuth: true
          },
          component: user,
        },
        {
          path: "/shopCar",
          name: "shopCar",
          meta: {
            requireAuth: true
          },
          component: shopCar,
        },
        {
          path: "/Dynamic",
          name: "Dynamic",
          meta: {
            requireAuth: true
          },
          component: Dynamic,
        },
      ]
    },
    {
      path: "/News",
      name: "News",
      component: News,
    },
    {
      path: "/main",
      name: "main", 
      component: main,
    },
    {
      path: "/detail",
      name: "detail",
      component: Detail
      
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/zc",
      name: "register",
      component: Register
    },
    {
      path: "/user/zl",
      name:'ZL',
      component: ZL
    },
    {
      path: "/user/qb",
      name:'QB',
      component: QB
    },
    {
      path: "/user/shop",
      name:'Shop',
      component: Shop
    },
    {
      path: "/user/jl",
      name:'Jl',
      component: Jl
    },
    {
      path: "/user/sjl",
      name:'SJl',
      component: SJl
    },
    {
      path: "/user/goods",
      name:'Goods',
      component: Goods
    },
    {
      path: "/user/upgoo",
      name:'EditGoods',
      component: EditGoods
    },
    {
      path: "/user/addgoo",
      name: 'AddGoods',
      component: AddGoods
    },
    {
      path: "/dynamicDet",
      name: "dynamicDet",
      component: dynamicDet,
    },
    {
      path: "/addrecord",
      name: "addrecord",
      component: addrecord,
    },
    {
      path: "/text",
      name: "text",
      component: text,
    }
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
