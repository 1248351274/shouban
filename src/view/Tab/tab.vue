<template>
  <Screen>
    <!-- <transition name="fade"> -->
      <!-- <heads :title=title></heads> -->
    <mt-header :title=title class="headerColor">
        <router-link to="/dynamicDet" slot="right" v-if="this.tabIndex==1">
            <mt-button >发布</mt-button>
        </router-link>
    </mt-header>

      <home v-if="this.tabIndex==0"/>
      <!-- <dynamic v-if="this.$route.query.id==1"/>
      <shopCar v-if="this.$route.query.id==2"/>
      <user v-if="this.$route.query.id==3"/> -->
      <router-view></router-view>
      <foot :data="can" @select="select"></foot>
    <!-- </transition> -->
  </Screen>
</template>

<script>
import home from '@/view/Index/home'
import dynamic from '@/view/ShopCar/dynamic'
import shopCar from '@/view/ShopCar/shopCar'
import user from '@/view/user/index'
import {mapState, mapGetters, mapActions} from 'vuex'
import {getType,goodShow,getBanner} from '@/api/Home/home'
export default {
  name: 'Tab',
  components: {
    home,
    dynamic,
    shopCar,
    user
  },
  data() {
    return{
      ip:[],
      bannerList: [],
      tabIndex:0,
      title:'首页',
      can:[
            {
              label:'首页',
              icon:[
                require('@/assets/ban-img/d-home.png'),
                require('@/assets/ban-img/c-home.png')
                ]
            },
            {
              label:'动态',
              icon:[
                require('@/assets/ban-img/d-dy.png'),
                require('@/assets/ban-img/c-dy.png')
                ]
            },
            {
              label:'手办库',
              icon:[
                require('@/assets/ban-img/d-shopcar.png'),
                require('@/assets/ban-img/c-shopcar.png')
                ]
            },
            {
              label:'个人中心',
              icon:[
                require('@/assets/ban-img/d-mine.png'),
                require('@/assets/ban-img/c-mine.png')
                ]
            },
          ]
    }
  },
  created () {
      console.log('ip+banner.Ban_Url',this.ip+this.banner)
      this.getBanner()
      this.a()
  },
  methods: {
      select(item,index){
        if(index==0){
          this.$router.push('/')
          console.log(item.label)
        }else if(index==1 ){
          // if(this.store.state.token){
          //   console.log('this.store.state.token',this.store.state.token)
            this.$router.push('/dynamic')
            console.log(this.store)
          // }
          // else{
          //   this.$router.push('/login')
          // }
        }else if(index==2){
          this.$router.push('/shopcar')
          console.log(item.label)
        }else{
          this.$router.push('/user')
          console.log(item.label)
        }
        this.tabIndex = index
        this.title = item.label
        // this.$route.query.id = index
        console.log('$router',this.$route)

      }
  },

}
</script>

<style lang="scss">

</style>
