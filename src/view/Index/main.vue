<template>
    <div>
        <div class="home" style="margin-bottom:70px;">
                   <!-- 轮播 -->
            <mt-swipe :auto="4000">
              	<mt-swipe-item v-for="(banner,index) in bannerList" :key='index'>
                  <img :src="ip+banner.Ban_Url" :alt="banner.Ban_Name">
              	</mt-swipe-item>
            </mt-swipe>
            <!-- 导航栏 -->
            <ul class="type-list clearfix">
              	<li class="list" v-for="(item,index) in typeList" :key='index'>
                  <div @click='ser(item.GT_Id)'>
                    <span class="icon" :style="{background:'url('+ip+item.GT_Image+')',backgroundSize:'cover'} "></span>
                    <span class="text">{{item.GT_Type}}</span>
                  </div>
              	</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { Loadmore } from 'mint-ui';
    import Search from '@/components/public/search'
    import addCart from '@/components/addCart'
    import {mapState, mapGetters, mapActions} from 'vuex'
    import * as TYPES from '@/store/type'
    import {getType,goodShow,getBanner} from '@/api/Home/home'
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
                //allLoaded:false
            }
        },
        computed: {
            ...mapState(['test']),
            ...mapGetters(['home'])

        },
        methods: {
            // async loadTop() {
            //   let a = await goodShow();
            //   if(a.data.result==1){
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
                  //console.log(type.data.info);
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
                this.goodsList = a.data.info;

              }else{
                this.$toast('无此类型的手办')
              }
            },
            async goodShow(){
              let goods = await goodShow();
              if(goods.data.result==1){
                  //console.log(goods.data.info);
                  this.goodsList = goods.data.info;
              }else{
                  this.$toast(goods.data.info);
              }

            },
            async getBanner(){
              let banner = await getBanner();
              if(banner.data.result==1){
                  //console.log(banner.data.info);
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
            }
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


<style lang="scss" scoped>

</style>
