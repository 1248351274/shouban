<template>
<Content ScrollY>
  <div class='user_center'>
    <!-- <mt-header title="个人中心" class="headerColor"></mt-header> -->
    <div class='banner'>
      <div class="banner_img">
        <img :src="imgtx" alt="" width="100%" height="100%">
      </div>
      <div class='name'>{{ usermsg.User_Name }}</div>
    </div>
    <div class='cells'>
      <mt-cell title="资料" style='border:0.5px solid #ccc' is-link to="/user/zl">
        <img slot="icon" width="20"  src="@/assets/积分.png">
      </mt-cell>
      <!-- <mt-cell title="积分" style='border:0.5px solid #ccc' value="2" is-link>
        <img slot="icon" width="20"  src="@/assets/积分.png">
      </mt-cell> -->
      <mt-cell title="钱包" style='border:0.5px solid #ccc;border-top:none' :value="usermsg.User_Balance" is-link :to="'/user/qb/?ye='+usermsg.User_Balance">
        <img slot="icon" width="20"  src="@/assets/钱包.png">
      </mt-cell>
    </div>
    <div class='cells'>
      <mt-cell title="商品管理" style='border:0.5px solid #ccc;border-top:none' is-link to="user/goods">
      </mt-cell>
      <mt-cell title="店铺管理" style='border:0.5px solid #ccc;border-top:none' :value="usermsg.Shop_Name" is-link to="user/shop">
      </mt-cell> 
      <mt-cell title="订单记录" style='border:0.5px solid #ccc;border-top:none' is-link to="/user/jl">
      </mt-cell>
      <mt-cell title="销售记录" style='border:0.5px solid #ccc;border-top:none' is-link to="/user/sjl">
      </mt-cell>
    </div>
    <div class='cells'>
      <mt-cell title='退出登录' style='border:0.5px solid #ccc'>
        <v-touch @tap="loginout">
          <mt-button type='primary' size='small' class="outlogin">退出</mt-button>
        </v-touch>
      </mt-cell>
    </div>
  </div>
</Content>
</template>

<script>
    import * as TYPES from '@/store/type'
    import {getUserMsg,login_out} from '@/api/User/user'
    export default {
        name: "user",
        data() {
            return {
                ip:[],
                usermsg:[],
                imgtx:[]
            }
        },
        created () {
            this.getUserMsg();
            this.a();
        },
        methods:{
            async getUserMsg(){
                let a = await getUserMsg();
                if(a.data.result==1){
                    this.usermsg = a.data.info;
                    this.imgtx = this.ip+this.usermsg.User_Image;
                    console.log('a.data.info=',a.data.info)
                }else{
                    this.$toast(a.data.info);
                }
            },
            async loginout(){
                // let a = await login_out();
                // this.$toast(a.data.info);
                // this.$store.commit(TYPES.LOGOUT);
                this.$router.push({
                  path:'/login'
                })
            },
            a() {
              this.ip = this.config.ip;
            },
        },

        mounted(){

        }
    }
</script>

<style lang="scss">
@import '@/style/var.scss';
.user_center{
  width: 100%;
  height: 100%;
  .banner{
    height:height(400rem)/* 140/16 */;
    background: url(../../assets/banner-.png);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .banner_img{
      width: width(200rem) /* 100/16 */;
      height: height(200rem) /* 100/16 */;
    }
    .name{
      font-size: 28px; /* 14/16 */;
      text-align: center;
    }
  }
  // .cells{
  //   height: 10rem /* 160/16 */;
  // }
  .outlogin {
    background: $primary;
  }
  .fuwu{
    height: 7.5rem /* 120/16 */;
  }
}
</style>
