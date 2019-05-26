<template>
    <!-- <div class="footer-menu" @click="aa()" v-if="$store.getters.footer">
      <router-link to="/"><img src="../../assets/img/home.png" alt="">首页</router-link>
      <router-link to="/dynamic"><img src="../../assets/img/shopcar.png" alt="">动态</router-link>
      <router-link to="/user"><img src="../../assets/img/user.png" alt="">个人中心</router-link>
    </div> -->
  <div class="ban-foot">
     <div class="foot-item" @click="handle(item,index)" v-for="(item,index) in data" :key="item.label">
        <div class="foot-item-icon">
          <img v-if="index != canIndex" :src="item.icon[0]" alt="">
          <img v-else :src="item.icon[1]" alt="">
        </div>
        <div class="foot-item-label" :class="{active:index==canIndex}">{{item.label}}</div>
     </div>
  </div>
</template>

<script>
import * as TYPES from '@/store/type'
	export default {
    name: "foot",
    props: {
      data: Array
    },
    data() {
      return {
          canIndex: 0,
          
      }
    },
    methods:{
      handle(item,index) {
        this.canIndex = index
        this.$emit('select',item,index)
      },
    }
	}
</script>

<style lang="scss">
@import '@/style/var.scss';
.ban-foot{
   height: 50px;
  //  width:1rem;
   border-top: 1px solid $foot-border-color;
   display: flex;
   justify-content: space-around;
   align-items: center;
   font-size: 12px;
   .foot-item{
     display: flex;
     flex-flow: column nowrap;
     justify-content: center;
     align-items: center;
     text-align: center;
      .foot-item-label{
        font-size: fontSize(12em);
        &.active{
          color: $primary;
        }
        // text-align: center;
      }
      .foot-item-icon{
        // width: width(45rem);
        // height: height(45rem);
        // padding: 3px 0;
        img {
          width: 1.7em;
          height: 1.7em;
        }
        // text-align: center;
        // font-size: fontSize(12em);
      }
   }


}
// .footer-menu{
//   position: fixed;
//   z-index: 1000;
//   bottom: 0;
//   left: 0;
//   width: 100%;
//   height: 50px;
//   display: flex;
//   padding: 6px 0;
//   background-color:#fff;
//   border-top: 1px solid #888;
//   a{
//     flex: 1;
//     text-decoration: none;
//     display: flex;
//     text-align: center;
//     align-items: center;
//     flex-direction: column;
//     color: #111111;
//     font-size: 14px;
//     img{
//       filter: grayscale(100%);
//     }
//     &.router-link-exact-active{
//       color:#1296db;
//       img{
//         filter: grayscale(0);
//       }
//     }
//   }
// }
</style>
