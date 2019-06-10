import * as TYPES from './type'

const state = {
    isBlock: false,//是否显示详情页
    cart: false,//是否显示添加购物
    msg: {},//详情页信息
    shop_car_status: true,
    shop_num: null,//商品数量
    hasBuy:[],//已经购买的订单
    token: null,
    loginid: null,
    imgid:[],  //上传的图片id
    footer:true,
    userMsg: []
};
const getters = {
    staus: state => state.isBlock,
    msg: state => state.msg,
    cart: state => state.cart,
    shop_car_status: state => state.shop_car_status,
    shop_num: state => state.shop_num,
    getCartNum: (state) => (Goods_Id) => {
        return state.shop_num.find(item => item.Goods_Id === Goods_Id)
    },
    imgid: state => state.imgid,
    footer: state => state.footer,
    userMsg: state => state.userMsg
}
const actions = {
    toDetail({commit}, options) {
        commit(TYPES.TO_DETAIL, {
            options
        })
    },//点击去详情页
    goBack({commit}) {
        commit(TYPES.GO_BACK)
    },//从详情页返回首页
    toBuy({commit}) {
        commit(TYPES.CART_STATUS)
    },//去添加购物页
    reduce({commit}) {
        commit(TYPES.REDUCE_NUM)
    },//商品数量减少
    increase({commit}, item) {
        commit(TYPES.INCREASE_NUM, {
            item
        })
    },//商品数量增加
    toShopCar({commit}, shop_msg) {
       // console.log(shop_msg,'state')
        commit(TYPES.TO_SHOP_CAR, {shop_msg})
    },
    addimg({commit}, id) {
      commit(TYPES.ADDIMG,{id})
    },
    delimg({commit}, id) {
      commit(TYPES.DELIMG,{id})
    },
    resetimg({commit}) {
      commit(TYPES.RESETIMG)
    },
    footerdis({commit}) {
      commit(TYPES.FOOT_DISPLAY)
    },
    footerhide({commit}) {
      commit(TYPES.FOOT_HIDE)
    }
};
const mutations = {
    [TYPES.FOOT_DISPLAY](state) {
        state.footer = true;
    },
    [TYPES.FOOT_HIDE](state) {
        state.footer = false;
    },
    [TYPES.ADDIMG](state,id) {
      state.imgid.push(id);
    },
    [TYPES.DELIMG](state,id) {
      let arr = state.imgid;
      for(let i=0;i<arr.length;i++){
        if(arr[i]==id){
          arr.splice(i,1)
        }
      }
      state.imgid = arr;
    },
    [TYPES.RESETIMG](state) {
      state.imgid = [];
    },
    [TYPES.TO_DETAIL](state, opt) {
        // state.isBlock = !state.isBlock;
        state.msg = opt;
        console.log(state.msg)
    },
    [TYPES.GO_BACK](state) {
        state.isBlock = !state.isBlock;

    },
    [TYPES.CART_STATUS](state) {
        state.cart = !state.cart;
    },
    [TYPES.REDUCE_NUM](state, id) {
        // let shop_num = state.shop_num;
        // for (let i = 0; i < shop_num.length; i++) {
        //     if (shop_num[i].Goods_Id === id) {
        //         shop_num[i].num--;
        //         return
        //     } else {
        //         continue
        //     }
        // }
        state.shop_num--;
    },
    [TYPES.INCREASE_NUM](state) {
        // let shop_num = state.shop_num;
        // for (let i = 0; i < shop_num.length; i++) {
        //     if (shop_num[i].Goods_Id === id) {
        //         shop_num[i].num++;
        //         return
        //     } else {
        //         continue
        //     }
        // }
        state.shop_num++;
    },
    [TYPES.TO_SHOP_CAR](state, val) {
        // state.isBlock=!state.isBlock;
        state.shop_car_status = false;
        state.cart = !state.cart;
        window.location.href = '/#/shopcar';
        let shop_num = state.shop_num;
        for (let i = 0; i < shop_num.length; i++) {
            if (shop_num[i].Goods_Id === val.shop_msg.Goods_Id) {
                if (shop_num[i].num > 0) {
                    return
                } else {
                    shop_num[i].num = 1;
                    return
                }
            } else {
                continue
            }
        }
        val.shop_msg.num = 1;
        val.shop_msg.chooseStatus = false;
        state.shop_num.push(val.shop_msg);
    },
    [TYPES.SET_CART_NUM](state, val) {
        //let shop_num = state.shop_num;
        // for (let i = 0; i < shop_num.length; i++) {
        //     if (shop_num[i].Goods_Id === val.Goods_Id) {
        //         return
        //     } else {
        //         continue
        //     }
        // }
        // val.num = 0
        // val.chooseStatus = false
        // shop_num.push(val)
        state.shop_num = val;
    },
    toShopCar(state,val){
        let shop_num=state.shop_num;
        state.isBlock=false
        for(let i=0;i<shop_num.length;i++){
            if(shop_num[i].Goods_Id===val.Goods_Id){
                if(shop_num[i].num>0){
                    return
                }else{
                    shop_num[i].num=1;
                    return
                }
            }else{
                continue
            }
        }
        val.num=1;
        val.chooseStatus=false;
        shop_num.push(val)
    },
    hasOrder(state,val){
        //console.log(val,'val')
        state.hasBuy.push(val)
        //console.log(state.hasBuy)
    },
    [TYPES.CLEAR_CAR](state){
        state.shop_num=[]
    },
    [TYPES.LOGIN]: (state, data) => {
        localStorage.token = data
        state.token = data
    },
    [TYPES.USERMSG]: (state, data) => {
        localStorage.userMsg = data
        state.userMsg = data
    },
    [TYPES.LOGOUT]: (state) => {
        localStorage.removeItem('token')
        localStorage.removeItem('loginid')
        state.token = null
        state.login = null
    },
    [TYPES.LOGINID]: (state, data) => {
        localStorage.loginid = data
        state.loginid = data
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}
