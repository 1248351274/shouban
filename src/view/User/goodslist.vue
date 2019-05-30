<template>
<Srceen>
        <mt-header title="我的商品" class="headerColor">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
            <router-link to="/user/addgoo" slot="right">
                <mt-button>添加</mt-button>
            </router-link>
        </mt-header>
      <Content ScrollY>
    <div class="goodslist">

        <!-- <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore"> -->
          <p v-if="goodslist.length===0" style="text-align:center;margin-top:50px">
              <img
                  src="@/assets/kong.png"
                  style = 'width:40%;'
                  alt="商品列表为空">
          </p>
          <ul v-if="goodslist.length!=0">
            <li v-for="(item,index) in goodslist" :key="index">
              <div class='goodsitem'>
                <div class="good-intro">
                    <img :src="ip+item.img[0].Image_Location" alt="无图片">
                    <div class="good-intro-tit">
                        <span class="good_title">{{item.Goods_Name}}</span>
                        <span class="good_remarks">{{item.Goods_Remarks}}</span>
                    </div>
                </div>
                <div class="msg">
                    <div class="msg-intro">
                        <span>价格:</span>
                        <span>{{ item.Goods_Price }}</span>
                    </div>
                    <div class="msg-intro">
                        <span>状态:</span>
                        <span class="red" v-if="item.Goods_Status==1">
                            审核通过
                        </span>
                        <span class="red" v-if="item.Goods_Status==0">
                            待审核
                        </span>
                        <span class="red" v-if="item.Goods_Status==2">
                            审核未通过
                        </span>
                    </div>
                </div>
                <div class="opera">
                    <!-- <v-touch @tap="bj(item.Goods_Id)"> -->
                        <mt-button class="btn" size="small" type="primary" @click="bj(item.Goods_Id)"> 
                            <!-- <img src="@/assets/编辑.png" alt="" > -->
                            编辑
                        </mt-button>
                    <!-- </v-touch> -->
                    <!-- <v-touch @tap="sc(item.Goods_Id,index)"  @click="bj(item.Goods_Id)"> -->
                       <mt-button class="btn" size="small"  @click="sc(item.Goods_Id,index)">
                        删除
                        <!-- <img src="@/assets/删除.png" alt=""> -->
                        </mt-button>
                    <!-- </v-touch> -->
                </div>
              </div>
            
            </li>
          </ul>

        <!-- </mt-loadmore> -->
    </div>
      </Content>
</Srceen>
</template>
<script>
import {getGoods,getGoodsMsg,delGoods} from '@/api/User/user'
import { Picker,MessageBox,Loadmore } from 'mint-ui';
export default{
    data (){
        return {
            ip: [],
            name:[],
            mob:[],
            addr:[],
            goodslist:[],
            goodsImg:[],
            allLoaded:false
        }
    },
    created () {
        console.log(11111)
        this.getgoodslist()
    },
    methods:{
        async loadTop() {
            let a = await getGoods();
            if(a.data.result==1){
                this.goodslist=a.data.info;
                this.$refs.loadmore.onTopLoaded();
                console.log(90,this.goodslist)
            }
        },
        loadBottom() {
          this.allLoaded = true;
          this.$toast('无更多信息');
          this.$refs.loadmore.onBottomLoaded();
        },
        async getgoodslist(){
            this.goodsImg=[]
          let a = await getGoods();
          if(a.data.result==1){
              console.log('this.goodslist',a.data.info)
              this.goodslist=a.data.info;
          }
          for(const item of this.goodslist){
              this.goodsImg.push(item.img[0])
          }
          console.log(this.goodsImg)
        },
        bj(id){
          this.$router.push({
            path:'upgoo/?id='+id
          })
        },
        sc(id,index){
           MessageBox.confirm('确定删除?').then(async res => {
             let data = {
               Goods_Id : id
             }
             let a = await delGoods(data);
             if(a.data.result){
               this.$toast('删除成功');
               this.goodslist.splice(index,1);
             }else{
               this.$toast('删除失败');
             }
           })
        },
        async sub(){
            let data = {
                User_Name: this.name,
                User_Tel: this.mob,
                User_Address: this.addr
            };
            //console.log(data)
            let b = await editMsg(data)
            if(b.data.result==1){
                this.$toast(b.data.info);
                this.$router.push({
                    path:'/user'
                })
            }else{
                this.$toast(b.data.info);
            }
        },
         a(){
            this.ip = this.config.ip;
        },
    },
    mounted(){
        this.a()
    }
}
</script>
<style lang="scss">
@import '@/style/var.scss';
.goodslist{
    padding-bottom: 150px;
    img{
        height: 100px;
    }
    ul{
      list-style: none;
      margin:5px;
      padding:0;
      li{
        margin-top:10px;
        .goodsitem{
          border-bottom:0.5px solid $line-color;
          padding-bottom: 10px;
          display: flex;
          flex-direction: column;
          .good-intro{
            display: flex;
            img{
                width:50%;
                height: height(300rem);
            }
            .good-intro-tit{
                display: flex;
                flex-direction: column;
                width:50%;
                margin-left:10px;
                .good_title{
                    font-size: 20px;
                    margin-bottom:10px;
                }
                .good_remarks{
                    font-size: 16px;
                }
            }
          }
          .msg{
            padding:10px;
            display: flex;
            justify-content: space-around;
            .msg-intro{
                font-size: 20px;
            }
            .red{
                color:red
            }
          }
          .opera{
            display: flex;
            justify-content: space-around;
            // border:1px solid #ccc;
            height:35px;
            .btn{
                width: 49%;
                background: $primary;
                color: #fff;

            }
          }   
        }

      }
    }
}
</style>
