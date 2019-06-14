<template>
    <Content ScrollY>
        <mt-swipe :auto="2000">
            <mt-swipe-item v-for="(banner,index) in bannerList" :key='index'>
            <img :src="ip+banner.Ban_Url" :alt="banner.Ban_Name">
            </mt-swipe-item>
        </mt-swipe>
         <!-- <Search></Search> -->
        <div class="type-list">
            <div @click='ser(item.GT_Id)' v-for="(item,index) in typeList" :key='index' class="list" >
                <span class="icon" :style="{background:'url('+ip+item.GT_Image+')',backgroundSize:'cover'} "></span>
                <span class="text">{{item.GT_Type}}</span>
            </div>
        </div>
        <div class="goods">
             <mt-loadmore :auto-fill="false" ref="loadmore">
                <div class="goods-items" v-for="(item,index) in goodsList" :key='index'>
                    <h4>
                        {{item.type}}
                        <span>P{{index+1}}</span>
                    </h4>
                    <div v-for="(itm,index) in item.list" :key='index' class="item-Div"  >
                        <v-touch @tap="todet(itm)">
                        <div class="state-div">
                            <!-- <div class="state-bgimg"></div> -->
                            <img class="product" :src="ip+itm.img[0].Image_Location" alt="" >
                            <div class="title-Div">
                                <!-- <div> -->
                                    <!-- <img src="@/assets/img/relevant.png" alt=""> -->
                                    <div class="title-relevant"><span>相关</span></div>
                                    <span class="title">{{itm.Goods_Remarks}}</span>
                                <!-- </div> -->
                                <!-- <span class="t-time">时间：{{ getTime }}</span> -->
                            </div>
                        </div>
                        </v-touch>
                    </div>
                </div>
              </mt-loadmore>
        </div>
  
        <!-- <addCart :shopMsg="shopMsg"></addCart> -->
    </Content>

</template>

<script>
    import { Loadmore } from 'mint-ui';
    import Search from '@/components/public/search'
    import addCart from '@/components/addCart'
    import {mapState, mapGetters, mapActions} from 'vuex'
    import * as TYPES from '@/store/type'
    import {getType,goodShow,getBanner} from '@/api/Home/home'
    import {updatelike} from '@/api/User/user'
    import {getCarNum} from '@/api/Shopcart/shopcart'
    export default {
        name: "home",
        components: {
            Search,
            addCart
        },
        data() {
            return {
                ip:[],
                bannerList: [],
                typeList: [],
                goodsList: [],
                shopMsg: {}, //点击当前项的数据,
                // allLoaded:false,
                show1: true,
                show2: true,
                dynamicList: [
                    {
                        img: 'assets/add_img.png',
                        context: '图片加载'
                    },
                    {
                        img: 'assets/add_img.png',
                        context: '图片加载'
                    },
                    {
                        img: 'assets/add_img.png',
                        context: '图片加载'
                    }
                ],
            }
        },
        computed: {
            ...mapState(['test']),
            ...mapGetters(['home']),
        },
        methods: {
            async getType(){
              let type = await getType();
              if(type.data.result==1){
                  console.log('typeList',type.data.info);
                  this.typeList = type.data.info;

              }else{
                  this.$toast(type.data.info);
              }
            },
            async ser(id){
                console.log('ser')
              let data = {
                type : id
              }
              let a = await goodShow(data);
              if(a.data.result===1){
                console.log('goodsList', a.data.info);

                this.goodsList = a.data.info;
                // this.goodsList.Goods_Time

              }else{
                console.log('serelse');
                this.$toast('无此类型的手办')
              }
            },
           async select(item, index) {
              const date = new Date().toLocaleString()
              console.log('date',date)
              item.Goods_Like = 1-item.Goods_Like
              if(item.Goods_Like===1){
                item.Goods_LikeCount+= 1
              }else{
                item.Goods_LikeCount-= 1  
              }
              let data = {
                // Goods_Time: this.stime1 + this.stime2,
                Goods_Id: item.Goods_Id,
                Goods_Like: item.Goods_Like,
                Goods_LikeCount: item.Goods_LikeCount
              };
              let a = await updatelike(data);
              console.log(1111)
              if(b.data.result==1){
                  this.$toast('评论成功');
                  console.log(222222)
                  this.$router.push({
                    path:'/'
                  })
              }else{
                  this.$toast('评论失败');
              }
              console.log('index',index)
              console.log('item',item)
              console.log(1111);
            }, 
            async goodShow(){
              let goods = await goodShow();
              if(goods.data.result==1){
                  console.log('goodsList',goods.data.info[0].list);
                  for(item in goods.data.info.length){
                      console.log(22,item)
                      console.log(111,goods.data.info[item].list)
                  }
                  this.goodsList = goods.data.info;
              }else{
                  this.$toast(goods.data.info);
              }

            },
            async getBanner(){
              let banner = await getBanner();
              if(banner.data.result==1){
                  console.log('banner',banner.data.info);
                  this.bannerList = banner.data.info;
              }else{
                  this.$toast(banner.data.info);
              }

            },
            a(){
               this.ip = this.config.ip;
               this.$store.commit(TYPES.FOOT_DISPLAY)
            },
            ...mapActions(['toDetail']),
            todet(opt){
              //this.$store.commit(TYPES.TO_DETAIL,opt);
              //console.log(this.$store.getters.footer)
              this.$store.commit(TYPES.FOOT_HIDE);
              //console.log(this.$store.getters.footer)
              this.$router.push({
                path:'/detail/?msg='+JSON.stringify(opt)
              });
            },
            async toBuy(opt) {
                if(window.localStorage.getItem("loginid")){
                  let data = {
                    G_Id:opt.Goods_Id
                  }
                  let a = await getCarNum(data);
                  if(a.data.result==1){
                    opt.num = a.data.info;
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
            // async likeBtn(datalike) {
            //   let like = await goodlike();
            //   if(like.data.result=='1'){
            //       console.log(datalike)
            //   }else{
            //       console.log('失败',datalike)
            //   }
              
            //     this.show1=!this.show1
            //     // console.log(itm.Goods_Id)
            //     // console.log(ip+itm.img[0].Image_Location)
            // },
            // likeBtn2(event) {
            //     this.show2=!this.show2
            //     // console.log(this.show2)
            //     // console.log(ip+itm.img[0].Image_Location)
            // }
        },
        created () {
            console.log('ip+banner.Ban_Url',this.ip+this.banner)
            this.a();
            this.getBanner();
            this.getType();
            this.goodShow();   
        }
    }
</script>

<style lang="scss">
@import '@/style/var.scss';

    .ban-content {
        .mint-swipe{
            position: none;
            overflow: visible;
            height: 200px;
            width:100%;
            img {
                width: 100%;
                height: 200px;
            }
                .mint-swipe-indicator{
                    opacity: .6;
                }
        }
        .type-list {
            flex: 3;
            padding:height(30rem) 0;
            // height: height(200rem);
            display: flex;
            flex-flow: row wrap;
            justify-content: space-around;
            align-items: center;
            background: rgb(250, 245, 245);
            // background: red;
            .list {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    .icon {
                        width: 40px;
                        height: 40px;
                    }
                    .text {
                        color: #555;
                        font-size: 12px;
                    }
            }
        }
        .goods {
            flex:1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            background-color: #f1f0f0;
            .goods-items {
                background-color: #ffffff;
                // overflow: auto;
                h4 {
                    padding: 0 10px;
                    line-height: 36px;
                    font-size: 14px;
                }
                h4:before {
                    content: "";
                    display: inline-block;
                    width: 4px;
                    height: 12px;
                    background-color: #e8380d;
                }
                .item-Div {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    padding: 6px 0;
                    .state-div {
                        display: flex;
                        flex-direction: row;
                        justify-content: center;
                        .product {
                            // width: width(300rem);
                            height: height(300rem);
                            padding: 0 5px;
                            width: 40%;
                            // width: 150px;
                            // height: 120px;
                        }
                        .title-Div {
                            display: flex;
                            flex-flow: row nowrap;
                            justify-content: space-between;
                            width: 60%;
                            .title-relevant {
                                width:50px;
                                height:20px;
                                border:solid 1px #f89e62;
                                box-shadow: #f89e62;
                                border-radius: 5px;
                                display: flex;
                                margin-right: 10px;
                                span{
                                    flex: 1;
                                    font-size: 10px;
                                    text-align: center;
                                    color: #f89e62;
                                }
                            }
                            .title {
                                // border:1px solid red;
                                width:80%;
                                font-size: 16px;
                            }
                            .t-time {
                                font-size: 0.1rem;
                            }
                        }
                        
                    }
                    .evaluate-div {
                        // background-color: #fff;
                        display: flex;
                        flex-direction: row;
                        justify-content: space-around; 
                        // border:1px solid red;
                        .icon {
                            margin-left: 6px;
                            margin: auto 0;
                            padding: 0;
                            display: inline-block;
                            width: 16px;
                            height: 16px;
                            background: url("../../assets/img/like.png") no-repeat;
                            background-size: cover;
                        }
                        .active {
                            background: url("../../assets/img/like-e.png") no-repeat;
                        }
                        .zanCount{
                            padding-right: 10px;
                            font-size: 16px;
                        }
                    }
                }
            }
        }
    }
</style>