<template>
    <div :class="list.length===0 ? '' : 'sjl'">
        <mt-header title="销售记录" class="headerColor">
            <router-link to="/user" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
          <p v-if="list.length===0" style="text-align:center;margin-top:50px">
              <img
                  src="@/assets/kong.png"
                  style = 'width:40%;'
                  alt="销售记录为空">
          </p>
          <ul class='srelist' v-if="list.length!=0">
              <li style="margin-top:10px;background:white;padding:10px" v-for="(item,index) in list" :key="index">
                <img :src="ip+item.user.User_Image" class="userimg" alt=""><span class='sp1'>{{item.user.User_Name}}</span>
                <span class="sp2">交易成功</span>
                <div class="clear"></div>
                <div class="content">
                  <img :src="ip+item.Img" alt="">
                  <div class="conin">
                    <span>商品：{{item.G_Name}}</span><br>
                    <span>数量：{{item.Order_Num}}</span>&nbsp;&nbsp;&nbsp;
                    <span>价格：￥{{item.Order_Price}}</span><br>
                    <span>评价：{{item.eva}}星</span><br>
                    <span>时间：{{item.Order_Time}}</span>
                  </div>
                  <div class="clear"></div>
                </div>

              </li>
          </ul>
        </mt-loadmore>
    </div>
</template>
<script>
import rate from '@/components/rate'
import { Loadmore } from 'mint-ui';
import {srecorder} from '@/api/User/user'
export default{
    data (){
        return {
            list:[],
            ip:[],
            allLoaded:false
        }
    },
    created () {

    },
    methods:{
        async getlist(){
            let a = await srecorder();
            if(a.data.result==1){
                this.list = a.data.info;
                console.log(this.list)
            }else{
                this.$toast('销售记录为空');
            }
        },
        async loadTop() {
            // let a = await recorder();
            // if(a.data){
            //     this.list = a.data.info;
            //     this.$refs.loadmore.onTopLoaded();
            // }
            this.getlist();
            this.$refs.loadmore.onTopLoaded();
        },
        loadBottom() {
          this.allLoaded = true;
          this.$toast('无更多信息');
          this.$refs.loadmore.onBottomLoaded();
        },
    },

    mounted(){
      this.getlist();
      this.ip = this.config.ip;
    }
}
</script>
<style lang="scss">
.sjl{
    background:rgb(238, 233, 233);
    padding-bottom:100px;
    min-height: 100%;
    .srelist{
      padding-left:10px;
      padding-right:10px;
      .userimg{
        width:35px;
        height:35px;
        border-radius:50%;
        float:left
      }
      .sp1{
        float:left;
        line-height: 35px
      }
      .sp2{
        float:right;
        color:rgb(255, 102, 0);
        line-height: 35px;
        margin-left:10px
      }
      .content{
        img{
          width:100px;
          height:100px;
          float:left;
        }
      }

    }
    .clear{
      clear:both
    }
}
</style>
