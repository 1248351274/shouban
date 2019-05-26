<template>
    <div class="search">
      <!-- <img class="search-icon" src="../../assets/search.png" alt="">
      <input class="search-input" v-model="value" type="text" placeholder="          请输入" @keyup.13="search">
      <span class="search-delete" @click="del">X</span> -->
      <!-- <input type="text" v-model="value" @click="search" ref="se"> -->
      <mt-search  v-model="value" @blur.native.capture="search" @keyup.enter.native="search" ref="se"></mt-search>

    </div>

</template>

<script>
  import { MessageBox,Search } from 'mint-ui'
  import { goodShow } from '@/api/Home/home'
	export default {
		name: "search",
    data(){
		  return{
		    value:''
      }
    },
    methods:{
		  del(){
		    this.value=''
      },
      async search(){
       // this.$refs.se.blur();
        console.log(this.$refs.se)
        let data = {
          name : this.value
        }
        //alert(this.value)
        let a = await goodShow(data);
        if(a.data.result==1){
          this.$parent.goodsList = a.data.info;
        }else{
          this.$toast('无此商品信息')
        }
      }
    }
	}
</script>

<style lang="scss">
.search{
  position: fixed;
  top: 0;
  left: 0;
  height:50px;
  width: 100%;
  z-index: 10;
  .mint-search{
    height: 50px;
  }
  .mint-searchbar{
    background:rgb(255, 102, 0)
  }
  // .search-icon{
  //   position: absolute;
  //   top: 9px;
  //   left: 14px;
  // }
  // .search-input{
  //   width: 100%;
  //   line-height: 26px;
  //   color: #fff;
  //   background-color: hsla(0,0%,78%,.6);
  //   border-radius: 6px;
  // }
  // .search-delete{
  //   color: #fff;
  //   position: absolute;
  //   right: 15px;
  //   top:8px;
  // }
}
</style>
