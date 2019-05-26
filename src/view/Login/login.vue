<template>
<Screen>
    <div>
      <heads title="登录" />
        <!-- <mt-header title="登录" style="background:#35495e"></mt-header> -->
        <div class="login">
            <mt-field label="手机号" placeholder="请输入手机号" v-model="mob" :attr="{ maxlength: 11 }" class='mtinp'>
                <img src="@/assets/mob.png" style="padding-right:.625rem /* 10/16 */;display:block;float:left" height="30px" width="22px">
            </mt-field>
            <mt-field label="密码" placeholder="请输入密码(6-10位)" v-model="psd" :attr="{ maxlength: 10 }" type="password"  class='mtinp'>
                <img src="@/assets/pas.png" style="padding-right:.625rem /* 10/16 */;display:block;float:left" height="30px" width="22px">
            </mt-field>
            <v-touch  @tap="login"><mt-button type="primary" size="large" style="margin-top:30px" >登录</mt-button></v-touch>
            <div class="sp">
                <router-link to="/goods"><span>忘记密码</span></router-link>
                <router-link to="/zc"><span>免费注册</span></router-link>
            </div>
        </div>
    </div>
</Screen>
</template>
<script>
import * as TYPES from '@/store/type'
import {login} from '@/api/Login/login'
export default {
  data () {
    return {
      mob: "15230168328",
      psd: "123456"
    }
  },
  methods: {
    async login () {
      console.log('taplogin')
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
          console.log(token)
          if (token) {
            this.$store.commit(TYPES.LOGIN, token)
            this.$store.commit(TYPES.LOGINID, loginid)
            this.$router.push({
              path:'/'
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
</script>
<style lang="scss">
.login{
    margin-top:20px;
    .mtinp{
        border:1px solid #d9d9d9;
    }
    .sp{
        margin-top:10px;
        span{
            float: right;
            margin-right: 20px;
        }
    }
}
</style>
