<template>
<Srceen>
    <mt-header title="修改信息" class="headerColor">
        <router-link to="/" slot="left">
            <mt-button icon="back">返回</mt-button>
        </router-link>
    </mt-header>
    <Content ScrollY>
    <div class="zl">
        <mt-cell title="头像" style='border-bottom:1px solid #ddd;height:100px' is-link >
            <img :src="ip+img">
            <input class="upimg" @change='add_img'  type="file">
        </mt-cell>
        <mt-field label="用户名" placeholder="请输入用户名" v-model="name"  style="border-bottom:1px solid #ddd;"></mt-field>
        <mt-field label="电话" placeholder="请输入手机号" v-model="mob" type="tel" :attr="{ maxlength: 11 }" style="border-bottom:1px solid #ddd;"></mt-field>
        <mt-field label="地址" placeholder="请输入地址" v-model="addr" type="address"  style="border-bottom:1px solid #ddd;"></mt-field>
        <v-touch @tap="sub">
            <mt-button type="primary" size="large" @click="sub" class="loginBtn">保存</mt-button>
        </v-touch>
    </div>
        </Content>
</Srceen>
</template>
<script>
import {getUserMsg,editMsg,upuserimg} from '@/api/User/user'
export default{
    data (){
        return {
            ip:[],
            name:[],
            mob:[],
            addr:[],
            img:[]
        }
    },
    created () {
        this.getUserMsg()
    },
    methods:{
        async getUserMsg(){
            let a = await getUserMsg();
            if(a.data.result==1){
                this.name = a.data.info.User_Name;
                this.mob = a.data.info.User_Tel;
                this.addr = a.data.info.User_Address;
                this.img = a.data.info.User_Image;
            }else{
                this.$toast(a.data.info);
            }
        },
        add_img(event){
            var reader =new FileReader();
            var img1=event.target.files[0];
            reader.readAsDataURL(img1);
            var that=this;
            reader.onloadend=async function(){
                let data = {
                  uploadedfile : reader.result
                }
                let a = await upuserimg(data);
                if(a.data.result==1){
                  that.$toast('上传成功');
                  that.img = a.data.info;
                }else{
                  that.$toast('上传失败');
                }

            }
        },
        async sub(){
            let data = {
                User_Name: this.name,
                User_Tel: this.mob,
                User_Address: this.addr
            };
            //console.log(data)
            let b = await editMsg(data)
            if(b.data.result==1){
                this.$toast(b.data.info);
                this.$router.push({
                    path:'/user'
                })
            }else{
                this.$toast(b.data.info);
            }
        }
    },
    mounted(){
        this.ip = this.config.ip;
    }
}
</script>
<style lang="scss">
@import '@/style/var.scss';
.zl{
    img{
        border-radius:50%;
        height: 100px;
        width: 100px;
    }
    .upimg{
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        z-index: 99999;
        opacity: 0;
    }
}

</style>
