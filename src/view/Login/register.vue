<template>
    <div>
        <mt-header title="注册" style="background:#35495e"></mt-header>
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
            <mt-button type="primary" size="large" style="margin-top:30px" @click="register">注册并登陆</mt-button>
            
        </div>
    </div>
    
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
.login{
    margin-top:20px;
    .mtinp{
        border:1px solid #d9d9d9;
    }
}
</style>
