<template>
<Srceen>
    <mt-header title="订单记录" class="headerColor">
        <router-link to="/" slot="left">
            <mt-button icon="back">返回</mt-button>
        </router-link>
    </mt-header>
    <Content ScrollY>
    <div :class="list.length===0 ? '' : 'jl'">
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">
          <p v-if="list.length===0" style="text-align:center;margin-top:50px">
              <img
                  src="@/assets/kong.png"
                  style = 'width:40%;'
                  alt="订单记录为空">
          </p>
          <ul class='relist' v-if="list.length!=0">
              <li style="margin-top:10px;background:white;padding:10px" v-for="(item,index) in list" :key="index">
                <span class='sp1'>{{item.Shop}} <span style="color:#ccc;margin-left:20px"> ></span></span>  <span class='sp2'>交易成功</span>
                <div style="clear:both"></div>
                <div class='content'>
                  <div style='width:120px;padding-right:10px'><img :src="ip+item.Img" alt=""></div>
                  <div style='width:160px;height:75px;overflow:hidden'><span>{{item.Remark}}</span></div>
                  <div style='width:80px;'>￥：{{item.Order_Price}}</div>
                </div>
                <div style="clear:both"></div>
                <div calss='pri' style="color:rgb(255, 102, 0)">共{{item.Order_Num}}件手办，合计：￥{{item.Order_Price}}<span style="float:right">{{item.Order_Time}}</span></div>
                <span style="float:left">评价：</span><rate :grade="item.eva? item.eva:0" :hasCounter="item.eva ? true:false" :ordermsg="item" style="float:left;width:85%" />
                <div style="clear:both"></div>
              </li>
          </ul>
        </mt-loadmore>
    </div>
    </Content>
</Srceen>
</template>
<script>
import rate from '@/components/rate'
import { Loadmore } from 'mint-ui';
import {recorder} from '@/api/User/user'
export default{
    data (){
        return {
            list:[],
            ip:[],
            allLoaded:false
        }
    },
    components: {
      rate
    },
    created () {

    },
    methods:{
        async getlist(){
            let a = await recorder();
            if(a.data.result==1){
                this.list = a.data.info;
                console.log(1122, this.list )
            }else{
                this.$toast('无订单记录');
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
@import '@/style/var.scss';
.jl{
    // background:rgb(238, 233, 233);
    padding-bottom:100px;
    min-height: 100%;
    font-family: Monospace  ;
    font-size: 16px;
    .relist{
      padding-left:10px;
      padding-right:10px;

      .sp1{
        float:left;
      }
      .sp2{
        float:right;
        color:rgb(255, 102, 0)
      }

      .content{
        overflow: auto;
        background: rgb(248, 248, 248);
        margin-bottom:10px;
        div{
          float:left;
        }
        img{
          height:100px;
          width:120px
        }
      }
    }
}
</style>
