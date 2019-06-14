<template>
<Screen>
      <mt-header  :title="detailMsg.Goods_Name" class="headerColor">
        <router-link to="/" slot="left">
            <mt-button @click="goBack">返回</mt-button>
        </router-link>
      </mt-header>
      <Content ScrollY>
        <div>
            <div class="detail-pages">
                <div class="detail">
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
                    <mt-navbar v-model="selected">
                      <mt-tab-item id="1">手办详情</mt-tab-item>
                      <mt-tab-item id="2">卖家信息</mt-tab-item>
                    </mt-navbar>
                    <mt-tab-container v-model="selected">
                      <mt-tab-container-item id="1">
                        <mt-cell title="所属用户" :value="demsg.shop"> {{demsg.User_Name}}</mt-cell>
                        <mt-cell title="好评率" :value="demsg.eva">{{demsg.eva}}</mt-cell>
                      </mt-tab-container-item>
                      <mt-tab-container-item id="2">
                        <!-- <rate :grade="3"/> --> 
                        <div @click="popupVisible=!popupVisible">
                        <mt-cell :title="demsg.User_Name" style="height:50px" value="联系卖家"  >
                          <img slot="icon" width="30" height="30" style="border-radius:50%;" :src="ip+demsg.User_Image"  @click="telShow">
                        </mt-cell>
                        </div>
                        <div v-if="popupVisible">
                          <span style="font-size:20px;text-align:center" >{{demsg.User_Tel}}</span>
                        </div>
                        <mt-popup
            
                            :closeOnClickModal=popupVisible
                            popup-transition="popup-fade">
                            <template>
                              <div>123</div>
                            </template>
                          </mt-popup>
                        <!-- <mt-badge type="warning" >10</mt-badge> -->
                      </mt-tab-container-item>
                    </mt-tab-container>
                </div>
                <div class="handle">
                    <div class="cart" @click="toBuy(detailMsg)">加入手办库</div>
                    <!-- <div class="order" @click="toShopCar">立即带走</div> -->
                </div>
            </div>
            <addCart :shopMsg="detailMsg"></addCart>
        </div>
      </Content>
    <!-- </transition> -->
</Screen>
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
      popupVisible: false,
      detailMsg: [],
      ip: [],
      selected: '1',
      demsg: [],
      title:'手办详情'
    }
  },
  components: {
    addCart,
  },
  computed: {
    ...mapGetters(["msg"])
  },
  created () {
    this.a()
          this.ip = this.config.ip 
      console.log('ip',this.ip)
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
      this.$router.push("/");

    },
    telShow(){
      console.log(this.popupVisible)
      this.popupVisible=true
      console.log(this.popupVisible)
    },
    async a() {
      this.detailMsg = JSON.parse(this.$route.query.msg);
      console.log('this.detailMsg',this.detailMsg)
      let data = {
        gid : this.detailMsg.Goods_Id
      }
      let a = await getmsg(data);
      if(a.data.result==1){
        this.demsg = a.data.info;
        console.log('this.demsg', this.demsg)
      }

    }
  },
  mounted() {

  }
};
</script>

<style lang="scss">
@import '@/style/var.scss';
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
        height: 50vh;
        img {
          width: 100%;
          height: 80vh;
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
        font-size: 18px;
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
      // float: left;
      // width: 50%;
      background: #ff88bb;
    }
    .order {
      float: right;
      width: 50%;
      background: #ff88bb;
    }
  }

}

</style>
