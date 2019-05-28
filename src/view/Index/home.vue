<template>
    <!-- <div> -->
    <Content ScrollY>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(banner,index) in bannerList" :key='index'>
            <img :src="ip+banner.Ban_Url" :alt="banner.Ban_Name">
            </mt-swipe-item>
        </mt-swipe>
        <Search></Search>
            <!-- 导航栏 -->
        <div class="type-list">
            <div @click='ser(item.GT_Id)' v-for="(item,index) in typeList" :key='index' class="list" >
                <span class="icon" :style="{background:'url('+ip+item.GT_Image+')',backgroundSize:'cover'} "></span>
                <span class="text">{{item.GT_Type}}</span>
            </div>
        </div>
            <!-- 商品列表 -->
        <div class="goods">
             <!-- :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"  -->
             <mt-loadmore :auto-fill="false" ref="loadmore">
                <div class="goods-items" v-for="(item,index) in goodsList" :key='index'>
                    <!-- <h4>
                        {{item.type}}
                        <span>P{{index+1}}</span>
                    </h4> -->

                    <div v-for="(itm,index) in item.list" :key='index' class="item-Div" >
                        <!-- qqqqq -->
                        <div class="big-div">
                            <div class="state-div">
                                <img class="product" :src="ip+itm.img[0].Image_Location" alt="" @click="todet(itm)">
                                <div class="title-Div">
                                    <div>
                                        <img src="@/assets/img/relevant.png" alt="">
                                        <span class="title">{{itm.Goods_Remarks}}</span>
                                    </div>
                                    <!-- <span class="t-time">时间：{{getTime(itm.Goods_Time)}}</span> -->
                                </div>
                           </div>
                           <div class="evaluate-div">
                               <div>
                                   <span class="icon" @click="select(itm,index)" :class="itm.Goods_Like==1?'active':'none'"></span>
                                   <span class="zanCount">{{itm.Goods_LikeCount}}</span>
                               </div>
                                <div>
                                    <img class="ev-img" src="@/assets/img/eva.png" alt="">
                                    <span>2</span>
                               </div>
                                <!-- <div>
                                   <img class="ev-img" @click="likeBtn2()" :src="show2 ? 'http://127.0.0.1/wxshop/public/image/20180517/collection.png' : 'http://127.0.0.1/wxshop/public/image/20180517/collect-n.png'" alt="" />
                                    <span>6</span>
                               </div> -->
                           </div>
                        </div>
                    </div>
                <!-- </div> -->
                </div>
              </mt-loadmore>
        </div>
  
        <addCart :shopMsg="shopMsg"></addCart>
    <!-- </div> -->
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
                // dynamicList: [],
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
           getTime(timestamp) {
                const date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                const Y = date.getFullYear() + '-';
                const M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                const D = date.getDate() + ' ';
                const h = date.getHours() + ':';
                const m = date.getMinutes() + ':';
                const s = date.getSeconds();
                return Y+M+D+h+m+s;
            },

        },
        methods: {
            // async loadTop() {
            //   let a = await goodShow();
            //   if(a.data.result==1){
            //       console.log('this.goodsList', a.data.info)
            //       this.goodsList = a.data.info;
            //       this.$refs.loadmore.onTopLoaded();
            //   }
            // },
            // loadBottom() {
            //   this.allLoaded = true;
            //   this.$toast('无更多信息');
            //   this.$refs.loadmore.onBottomLoaded();
            // },
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
              let data = {
                type : id
              }
              let a = await goodShow(data);
              if(a.data.result==1){
                console.log('goodsList', a.data.info);

                this.goodsList = a.data.info;
                // this.goodsList.Goods_Time

              }else{
                this.$toast('无此类型的商品')
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
        mounted() {
            this.a();
            this.getType();
            this.goodShow();
            this.getBanner();
           //console.log(this)
        }
    }
</script>

<style lang="scss">
@import '@/style/var.scss';
    .mint-swipe{
        height:height(300rem);
        .mint-swipe-indicators {
            bottom: 2px;
            .mint-swipe-indicator{
                height: height(20rem);
                width: width(20rem);
            }
        }
    }
    .ban-content {
        display: flex;
        flex-direction: column;
        // .mint-swipe {
        //     // margin-top:50px;
        //     width: 100%;
        //     height: 200px;
        //     // margin-right: 50px;
        //     img {
        //         width: 100%;
        //         height: 200px;
        //     }
        //     .mint-swipe-indicator {
        //         opacity: .6;
        //     }
        // }
        // .all-div {
        //     background: red;

            // margin-top:10px;
            // margin-bottom: 10px;
            .type-list {
                padding:height(30rem) 0;
                // height: height(200rem);
                display: flex;
                flex-flow: row wrap;
                justify-content: space-around;
                align-items: center;
                background: #fff;
                // background: red;
                .list {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        // text-decoration: none;
                        // border:1px red solid;
                        .icon {
                            // flex-direction: column;
                            // display: inline-block;
                            width: 40px;
                            height: 40px;
                        }
                        .text {
                            color: #555;
                            font-size: 12px;
                        }
                    // }
                }
            }
        // }
        
        // .dynamic {
        //     background-color: #d1d0d0;
        //     height: 100px;
        // }
        .goods {
            flex:1;
            display: flex;
            // margin-right: 50px;
            background-color: #e6e3e3;
            .goods-items {
                overflow: auto;
                h4 {
                    padding: 0 10px;
                    line-height: 36px;
                    font-size: 14px;
                    // background-color: #fff;

                    span {
                        float: right;
                    }
                }
                h4:before {
                    content: "";
                    display: inline-block;
                    width: 4px;
                    height: 12px;
                    background-color: #e8380d;
                }
                .item-Div {
                    // li {
                        // border-top: 1px solid #ddd;
                        // border-bottom: 1px solid #ddd;
                        // position: relative;
                        display: flex;
                        flex-direction: column;
                        width:100%;
                        // height: 200px;
                        padding: 6px 0;
                        .big-div {
                            display: flex;
                            flex-direction: column;
                            border-radius: 5px; 
                            // background-color: #fff;
                            margin: 0 5px;
                            padding: 5px 0;
                            .state-div {
                                display: flex;
                                flex-direction: row;
                                justify-content: center;
                                .product {
                                    padding: 0 5px;
                                    width: 50%;
                                    height: 120px;
                                }
                                .title-Div {
                                    display: flex;
                                    flex-direction: column;
                                    justify-content: space-between;
                                    .title {
                                        font-size: 0.1rem;
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
                       
                        // .price {
                        //     padding-left: 10px;
                        //     font-size: 14px;
                        //     color: #e8380d;
                        // }
                        // .name {
                        //     padding: 10px;
                        //     font-size: 12px;
                        // }
                        // .car {
                        //     position: absolute;
                        //     width: 20px;
                        //     height:20px;
                        //     bottom: 3px;
                        //     right: 5px;
                        // }
                }
                //     li:not(:last-child) {
                //         border-right: 1px solid #ddd;
                //     }
                // }
                .hot{
                    // border:solid 1px greenyellow;
                    .hot-Div{
                        float: left;
                        margin:0.2rem; 
                        margin-left: 5px;
                        padding-left:0.4rem;
                        width: 9rem;
                        // background-color: #fff;
                        border-radius: 5px;
                        display: flex;
                        flex-direction:column;
                        .hot-product{
                            width: 100%;
                        }
                        .hot-title{
                            font-size: 0.8rem;
                        }
                        .introduce{
                            font-size: 0.5rem;
                        }
                        .hot-footer{
                            display: flex;
                            flex-direction: row;
                            justify-content: space-between;
                            .user{
                                display: flex;
                                flex-direction: row;
                                // border:1px solid red;
                                // .user-img{
                                //     width: 1rem;
                                //     height: 1rem;
                                //     border-radius: 50%;
                                // }
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
                                .user-name{
                                    font-size: 0.1rem;
                                }
                            }
                            .zan{
                                display: flex;
                                flex-direction: row;
                                // border:solid 1px greenyellow;
                                .zan-img{
                                    width: 1rem;
                                    height: 1rem;
                                    border-radius: 50%;
                                }
                                .zan-count{
                                    font-size: 0.1rem;
                                    margin-right:5px;
                                    margin-left:3px;
                                }
                            }
                        }
                }
                }
                
            }
        }
    }
</style>