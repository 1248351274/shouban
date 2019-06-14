<template>
    <transition name="cart">

        <div class="add-cart"  v-if="$store.getters.cart">

            <div class="mask" @click="sub()" v-if="shopMsg.img"></div>
            <div class="cart-content"  v-if="shopMsg.img">
                <div class="cart-detail">
                    <img class="product-img" :src="ip+shopMsg.img['0'].Image_Location" alt="">
                    <div class="info">
                        <p class="name">{{shopMsg.Goods_Name}}</p>
                        <p class="price">¥{{shopMsg.Goods_Price}}</p>
                        <div class="add">
                            <span class="jian"  @click="reduce()" :class="$store.getters.shop_num==0?'none':'active'">-</span>
                            <span class="num">{{$store.getters.shop_num}}</span>
                            <span class="jia" @click="increase()">+</span>
                        </div>
                    </div>
                </div>
                <div class="handle">
                    <div class="cart-total">
                        合计:
                        <span class="price">¥{{$store.getters.shop_num*shopMsg.Goods_Price}}</span>
                    </div>
                    <span class="order" @click="toShopCar(shopMsg)">加入手办库</span>
                </div>
            </div>
        </div>

    </transition>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import * as TYPES from '../store/type'
    import { editCart} from '@/api/Shopcart/shopcart'
    export default {
        name: "add-cart",
        data() {
            return {
                ip:[],
            }
        },
        props:{
          shopMsg:{}
        },
        computed: {
            ...mapGetters(['cart', 'shop_msg']),
        },
        methods: {
            //...mapActions(['toBuy', 'toShopCar']),
            toShopCar(){
                if(this.$store.getters.shop_num==0){
                    this.$toast('请添加数量')
                }else{
                    this.sub();
                    this.$toast('加入手办库成功')
                }

            },
            async sub(){
              if(this.$store.getters.shop_num!=0){
                let data = {
                  G_Id: this.shopMsg.Goods_Id,
                  G_Num: this.$store.getters.shop_num
                };
                let a = await editCart(data);
              }
              this.$store.commit(TYPES.CART_STATUS);
              this.$store.commit(TYPES.SET_CART_NUM,0);
            },
            increase(){
                //console.log(id);
                this.$store.commit(TYPES.INCREASE_NUM);
                //console.log(this.$store.getters.getCartNum(id).num)
                //console.log(this.shopMsg.img[0].Image_Location)
                // this.shopMsg.num = this.shopMsg.num+1;
                // console.log(this.shopMsg.num);
            },
            reduce(){
                if(this.$store.getters.shop_num===0){
                    return
                }
                this.$store.commit(TYPES.REDUCE_NUM);
                //console.log(this.$store.getters.getCartNum(id).num);
            },
            a(){
                this.ip = this.config.ip;
            },
        },
        beforeUpdate(){
            // this.$store.commit(TYPES.SET_CART_NUM,this.shopMsg);
            // this.single_num=this.$store.getters.getCartNum(this.shopMsg.Goods_Id).num;
        },
        mounted() {
            this.a();
        },
    }
</script>

<style lang="scss">
    .cart-enter-active, .cart-leave-active {
        transition: all .2s;
    }
    .cart-enter, .cart-leave-to {
        transform: translateY(100%);
        opacity: .4;
    }
    .add-cart {
        position: fixed;
        z-index: 30;
        top: 0;
        bottom: 0;
        width: 100%;
        .mask {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 100%;
            background-color: rgba(0, 0, 0, .6);
        }
        .cart-content {
            position: fixed;
            bottom: 0;
            width: 100%;
            background-color: #fff;
            .cart-detail {
                display: flex;
                align-items: center;
                .product-img {
                    margin: 0 10px;
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                }
                .info {
                    position: relative;
                    width: 100%;
                    .name {
                        line-height: 30px;
                    }
                    .price {
                        font-size: 14px;
                        line-height: 20px;
                        color: #e8380d;
                    }
                    .add {
                        position: absolute;
                        top: 50%;
                        right: 10px;
                        transform: translateY(-50%);
                        .jian {
                            display: inline-block;
                            width: 25px;
                            height: 25px;
                            text-align: center;
                            background: rgb(238, 238, 238);
                            line-height: 25px;
                            border-radius: 50%;
                            font-size: 20px;
                            color: #fff;
                        }
                        .active {
                            background: rgb(18, 150, 219);
                        }
                        .num {
                            margin: 0 10px;
                            // line-height: 30px;
                            font-size: 20px;
                        }
                        .jia {
                            display: inline-block;
                            width: 25px;
                            height: 25px;
                            line-height: 25px;
                            text-align: center;
                            background: rgb(18, 150, 219);
                            border-radius: 50%;
                            font-size: 20px;
                            color: #fff;
                        }
                    }
                }
            }
            .handle {
                margin-top: 10px;
                line-height: 36px;
                font-size: 14px;
                .cart-total {
                    padding-left: 20px;
                    float: left;
                    width: 50%;
                    .price {
                        font-size: 16px;
                        color: #e8380d;
                    }
                }
                .order {
                    float: right;
                    width: 50%;
                    text-align: center;
                    color: #fff;
                    background-color: #fc91c6;
                }
            }
        }
    }
</style>
