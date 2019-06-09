<template>
  <Screen>
    <!-- <transition name="fade"> -->
      <!-- <heads :title=title></heads> -->
    <mt-header :title=title class="headerColor">
        <router-link to="/dynamicDet" slot="right" v-if="tabIndex==1">
            <mt-button >发布</mt-button>
        </router-link>
    </mt-header>
      <home v-if="tabIndex==0"/>
      <dynamic v-if="tabIndex==1"/>
      <shopCar v-if="tabIndex==2"/>
      <user v-if="tabIndex==3"/>
      <foot :data="can" @select="select"></foot>
    <!-- </transition> -->
  </Screen>
</template>

<script>
import home from '@/view/Index/home'
import dynamic from '@/view/ShopCar/dynamic'
import shopCar from '@/view/ShopCar/shopCar'
import user from '@/view/user/index'
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
  methods: {
      select(item,index){
        // if(index==0){
        //   this.$router.push('/')
        //   console.log(item.label)
        // }else if(index==1){
        //   this.$router.push('/shopcar')
        //   console.log(item.label)
        // }else if(index==2){
        //   this.$router.push('/dynamic')
        //   console.log(item.label)
        // }else{
        //   this.$router.push('/dynamic')
        //   console.log(item.label)
        // }
        this.tabIndex = index
        this.title = item.label

      }
  },

}
</script>

<style>

</style>
