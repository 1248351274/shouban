<template>
<Srceen>
    <mt-header  title="注册" class="headerColor">
        <router-link to="/login" slot="left">
            <mt-button @click="goBack">返回</mt-button>
        </router-link>
    </mt-header>
    <Content>
        <div class="logo">
            <img src="@/assets/ban-img/logo.png" alt="logo">
        </div>
        <div class="login">
            <mt-field label="手机号" placeholder="请输入手机号" v-model="mob" :attr="{ maxlength: 11 }"  class='mtinp'>
                <img src="@/assets/mob.png" style="padding-right:.625rem /* 10/16 */;display:block;float:left" height="30px" width="22px">
            </mt-field>
            <mt-field label="密码" placeholder="请输入密码" type="password" v-model="psd" :attr="{ maxlength: 10 }" class='mtinp'>
                <img src="@/assets/pas.png" style="padding-right:.625rem /* 10/16 */;display:block;float:left" height="30px" width="22px">
            </mt-field>
            <mt-field label="确认密码" placeholder="请重新输入密码" type="password" v-model="psdd" :attr="{ maxlength: 10 }" class='mtinp'>
                <img src="@/assets/pas.png" style="padding-right:.625rem /* 10/16 */;display:block;float:left" height="30px" width="22px">
            </mt-field>

            <!-- <v-touch @tap="register" > -->
                <mt-button type="primary" size="large" class="loginBtn">注册并登陆</mt-button>
            <!-- </v-touch> -->
        </div>
    <!-- </div> -->
    </Content>
</Srceen>  
</template>
<script>
import * as TYPES from '@/store/type'
import {register} from '@/api/Login/login'
export default {
    data () {
        return {
            mob: "",
            psd: "",
            psdd: ""
        }
    },
    methods: {
        async register () {
            if (this.mob && this.psd && this.psdd) {
                if(this.psd==this.psdd){
                    let data = {
                        User_Tel: this.mob,
                        User_Password: this.psd
                    }
                    let b = await register(data)
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
                }else{
                    this.$toast("两次密码输入不一致")
                }
                
            } else {
                this.$toast("手机号和密码必填哦😯")
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
}
</style>
