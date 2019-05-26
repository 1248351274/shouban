<template>
    <transition name="fade">
        <div>
            <div class="detail-pages">
                <div class="detail">
                    <mt-header  :title="detailMsg.Goods_Name" style="background:#35495e">
                        <router-link to="/" slot="left">
                            <mt-button @click="goBack">返回</mt-button>
                        </router-link>
                        <router-link to="/shopcar" slot="right">
                            <mt-button >清单</mt-button>
                        </router-link>
                    </mt-header>
                    <div class="title-Div">
                      <img :src=ip+demsg.User_Image alt="" class="joinCar">
                      <span class="tit">{{demsg.User_Name}}</span>
                      <!-- <img src="@/assets/hand.jpg" alt="" class="joinCar"> -->
                      <!-- <mt-button @click="goBack" class="joinCar">加入清单</mt-button> -->
                    </div>
                    <div class="price-Div">
                      <span >价格：</span>
                      <span>日期：</span>
                    </div>
                    <!-- <div v-for="(url,index) in detailMsg.img" :key="index" class="imgs">
                      <img :src="ip+url.Image_Location" alt="" class="goods-img">
                        <mt-swipe :auto="4000">
                            <mt-swipe-item v-for="(url,index) in detailMsg.img" :key="index">
                                <img :src="ip+url.Image_Location" alt="">
                            </mt-swipe-item>
                        </mt-swipe>
                    </div> -->
                    <div class="detail">
                        <mt-swipe :auto="4000">
                            <mt-swipe-item v-for="(url,index) in detailMsg.img" :key="index">
                                <img :src="ip+url.Image_Location" alt="">
                            </mt-swipe-item>
                        </mt-swipe>
                    </div>
                    <div class="introduce">
                        <p class="introdice-name">{{detailMsg.Goods_Name}}</p>
                        <p class="introdice-detail">{{detailMsg.Goods_Remarks}}</p>
                        <p class="introdice-price">¥{{detailMsg.Goods_Price}}</p>
                    </div>
                    <!-- <span>控控introduce</span>
                    <table border="1">
                      <tr>
                        <th>店铺名称</th>
                        <th>Savings</th>
                      </tr>
                      <tr>
                        <td>产品名</td>
                        <td>$100</td>
                      </tr>
                      <tr>
                        <td>官方价格</td>
                        <td>$100</td>
                      </tr>
                      <tr>
                        <td>上新时间</td>
                        <td>$100</td>
                      </tr>上新时间
                    </table> -->
                    <mt-navbar v-model="selected">
                      <mt-tab-item id="1">商品详情</mt-tab-item>
                      <mt-tab-item id="2">卖家信息</mt-tab-item>
                    </mt-navbar>
                    <mt-tab-container v-model="selected">
                      <mt-tab-container-item id="1">
                        <mt-cell title="所属店铺" :value="demsg.shop"></mt-cell>
                        <mt-cell title="好评率" :value="demsg.eva"></mt-cell>
                      </mt-tab-container-item>
                      <mt-tab-container-item id="2">
                        <!-- <rate :grade="3"/> -->
                        <mt-cell :title="demsg.User_Name" style="height:50px" value="联系卖家" is-link >
                          <img slot="icon" width="30" height="30" style="border-radius:50%;" :src="ip+demsg.User_Image">
                        </mt-cell>
                        <mt-badge type="warning" >10</mt-badge>
                      </mt-tab-container-item>
                    </mt-tab-container>
                </div>
                <div class="handle">
                    <div class="cart" @click="toBuy(detailMsg)">加入清单</div>
                    <div class="order" @click="toShopCar">立即带走</div>
                </div>
            </div>
            <addCart :shopMsg="detailMsg"></addCart>
        </div>
    </transition>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import { Navbar, TabItem } from 'mint-ui';
import addCart from "@/components/addCart";
import * as TYPES from "@/store/type";
import {getCarNum,getmsg} from '@/api/Shopcart/shopcart'
export default {
  name: "goods-detail",
  data() {
    return {
      detailMsg: {},
      ip: [],
      selected: '1',
      demsg: [],
    };
  },
  components: {
    addCart,
  },
  computed: {
    ...mapGetters(["msg"])
  },
  created () {
    this.a()
  },
  methods: {
    goBack() {
      // console.log(this.$store.getters.footer)
      this.$store.commit(TYPES.FOOT_DISPLAY);
   //   console.log(this.$store.getters.footer)
      this.$router.push("/");
    },
    toBuy() {
      //this.detailMsg = this.$store.getters.msg.options;
      this.$store.commit(TYPES.CART_STATUS);
      //console.log(this.detailMsg)
    },
    async toBuy(opt) {
        if(window.localStorage.getItem("loginid")){
          let data = {
            G_Id:opt.Goods_Id
          }
          let a = await getCarNum(data);
          if(a.data.result==1){
            opt.num = a.data.info;
            console.log('opt.num', opt.num)
          }else{
            opt.num = 0;
          }
          this.$store.commit(TYPES.SET_CART_NUM,opt.num);
          this.shopMsg = opt;
          this.$store.commit(TYPES.CART_STATUS)
        }else{
          this.$router.push({
            path:'/login'
          })
        }
    },
    toShopCar() {
      //this.detailMsg = this.$store.getters.msg.options;
      //this.$store.commit("toShopCar", this.detailMsg);
      this.$store.commit(TYPES.FOOT_DISPLAY);
      this.$router.push("/shopCar");

    },
    async a() {
      this.detailMsg = JSON.parse(this.$route.query.msg);
      let data = {
        gid : this.detailMsg.Goods_Id
      }
      let a = await getmsg(data);
      if(a.data.result==1){
        this.demsg = a.data.info;
        console.log('this.demsg', this.demsg)
      }
      this.ip = this.config.ip;
    }
  },
  mounted() {

  }
};
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s;
}

.fade-enter,
.fade-leave-to {
  transform: translateX(-100%);
  opacity: 0.4;
}

.detail-pages {
  .title-Div{
    display: flex;
    // justify-content:s;
    margin: 5px;
    background: #fff;
    border-radius: 5px;
    padding:10px;
    .tit{
      // margin: 10px;
      font-size: 0.8rem;
    }
    .joinCar{
      // border-left:solid 1px red;
      
      width: 50px;
      height:50px;
      // border-left:2px #abcdef inset;
      // box-shadow:2px 0px 5px 2px #abcdef  inset;
      /*这6个值分别是：left值 、top值、透明度、阴影外延宽度、颜色、向里凹陷（选填，默认为外延）*/
      padding-left:5px;
      // font-size: 0.8rem;
    }
  }
  width: 100%;
  background-color:#F3F3F3;
  .imgs{
    .goods-img {
      border:1px solid red;
      margin:6px;
      text-align: center;
      width: 95%;
      height: 100%;
    }
  }

  .detail {
    .title {
      padding-left: 10px;
      line-height: 36px;
      font-size: 14px;
      text-align: center;
      color: #fff;
      background-color: #1296db;
    }
    .detail {
      margin-top: -50px;
      .mint-swipe {
        height: 40vh;
        img {
          width: 100%;
          height: 40vh;
        }
        .mint-swipe-indicator {
          opacity: 0.6;
        }
      }
    }
    .introduce {
      padding-left: 10px;
      .introdice-name {
        line-height: 40px;
        font-size: 22px;
      }
      .introdice-detail {
        color: #555;
      }
      .introdice-price {
        font-size: 18px;
        font-weight: 700;
        line-height: 36px;
        color: #e8380d;
      }
    }
    .mint-navbar {
      margin-top: 10px;
      background-color: #F3F3F3;

      a{
        padding:15px 0;
      }
      .mint-tab-item-label {
        font-size: 16px;
      }
      a:not(:last-child) {
        border-right: 1px solid #aaa;
      }
    }
    .mint-tab-container-item{
      height:150px
    }
    .info {
      padding-top: 20px;
      margin-bottom: 70px;
      img {
        display: block;
        width: 100%;
      }
    }
  }
  .handle {
    position: fixed;
    z-index: 20;
    bottom: 0;
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    text-align: center;
    color: #fff;
    box-shadow: 0 -1px 10px 1px #ddd;
    .cart {
      float: left;
      width: 50%;
      background-color: #1296db;
    }
    .order {
      float: right;
      width: 50%;
      background-color: #e8380d;
    }
  }

}

</style>
