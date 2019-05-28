<template>
    <div class="search">
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
@import '@/style/var.scss';
.search{
  .mint-search{
    height: height(120rem);
  }
  .mint-searchbar{
    background:$primary;
  }
  .mint-searchbar-core{
    font-size: 18px;
    padding-left:10px;
  }
}
</style>
