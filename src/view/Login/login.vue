<template>
<Screen>
    <!-- <div> -->
      <!-- <heads title="登录" /> -->
        <mt-header title="登录" class="headerColor"></mt-header>
        <Content>
          <div class="logo">
            <img src="@/assets/ban-img/logo.png" alt="logo">
          </div>
        <div class="login">
            <mt-field label="手机号" placeholder="请输入手机号" v-model="mob" :attr="{ maxlength: 11 }" class='mtinp'>
                <img src="@/assets/mob.png" style="padding-right:.625rem /* 10/16 */;display:block;float:left" height="30px" width="22px">
            </mt-field>
            <mt-field label="密码" placeholder="请输入密码(6-10位)" v-model="psd" :attr="{ maxlength: 10 }" type="password"  class='mtinp'>
                <img src="@/assets/pas.png" style="padding-right:.625rem /* 10/16 */;display:block;float:left" height="30px" width="22px">
            </mt-field>
            <v-touch  @tap="login"><mt-button type="primary" size="large" class="loginBtn" >登录</mt-button></v-touch>
            <div class="sp">
              <div>
                <router-link to="/goods"><span>忘记密码</span></router-link>
                <router-link to="/zc"><span>免费注册</span></router-link>
              </div>
              <!-- <div>
                <span>登录即代表阅读并同意服务条款</span>
              </div> -->

            </div>
        </div>
        </Content>
    <!-- </div> -->
</Screen>
</template>
<script>
import * as TYPES from '@/store/type'
import {login} from '@/api/Login/login'
export default {
  data () {
    return {
      mob: "15238632359",
      psd: "123456",
      msg: []
    }
  },
  methods: {
    // verify(type,value,msg){//type:验证的类型，value：：:需要验证的值，msg：验证失败弹出的提示信息
    //   switch(type){
    //     case 'tel':
    //     if (!(/^1[3456789]\d{9}$/).test(value)){
    //         $toast('手机号不正确')
    //     }
    //     case 'password':
    //     if(!(/^\d{6}$/).test(value)){
    //       $toast('密码少于六位')
    //     }
    //   }
    // },
    async login () {
      console.log('taplogin')

      if(!(/^1[34578]\d{9}$/).test(this.mob)){
        this.$toast("手机号不正确")
      } else{
        if(!(/^\d{6}$/).test(this.psd)){
          this.$toast('密码少于六位')
        }else{

     

      if (this.mob && this.psd) {
        let data = {
            User_Tel: this.mob,
            User_Password: this.psd
        }
        let b = await login(data)
        if (b.data.result === '1') {
          this.$toast("登录成功")
          let token = b.data.token
          let loginid = b.data.info.User_Id
          let userMsg = b.data.info
          console.log(1,userMsg)
          if (token) {
            this.$store.commit(TYPES.LOGIN, token)
            this.$store.commit(TYPES.LOGINID, loginid)
            this.$store.commit(TYPES.USERMSG, userMsg)
            console.log(2,userMsg)
            console.log(3,this.$store.getters.userMsg)
            this.$router.push({
              name: "Tab",
              query:0
            })
          }
        } else {
          this.$toast(b.data.info)
        }
      } else {
        this.$toast("手机号和密码必填哦😯")
      }
      }
         }
    }
  }
}
</script>
<style lang="scss">
@import '@/style/var.scss';
.ban-content{
  display: flex;
  flex-direction: column;
  // background:red;
  // justify-content: center;
  .logo {
    text-align: center;
    margin-top: 20px;
  }
  .login{
      margin-top:20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .mtinp{
        margin-top: 10px;
        border:1px solid #f0eded;
        border-top-left-radius: 19px;
        border-radius: 10px;
        width:height(650rem);
      }
      .loginBtn{
        margin-top:30px;
        width:height(650rem);
        height:54px;
        background: $primary;
        // border-radius: 50%;
      }
      .sp{
          margin-top:height(100rem);
          span{
            color: #455565;
            font-size: 20px;
            margin-right: 30px;
          }
      }
  }
}

</style>
