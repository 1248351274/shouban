<template>
<Srceen>
    <Heads title="我的钱包" >
        <router-link to="/user/goods" slot="start">
        返回
            <!-- <mt-button icon="back">返回</mt-button> -->
        </router-link>
    </Heads>
    <div class="qianbao">
        <!-- <mt-header title="我的钱包" class="headerColor">
            <router-link to="/user" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header> -->
        <mt-cell title="余额" style='border:1px solid #ccc;' :value="$route.query.ye" >
            <img slot="icon" width="20"  src="@/assets/账户余额.png">
        </mt-cell>
        <mt-cell title="充值" style='border:1px solid #ccc;' is-link @click.native="recharge" >
            <img slot="icon" width="20"  src="@/assets/充值.png">
        </mt-cell>
    </div>
</Srceen>
</template>
<script>
import {recharge} from '@/api/User/user'
import { MessageBox } from 'mint-ui';
export default{
    data (){
        return {
            price:[]
        }
    },
    methods:{
        async recharge(){
            MessageBox.prompt('请输入充值金额').then(async ({ value, action }) => {
                let regPos = /^\d+(\.\d+)?$/;
                if(regPos.test(value)){
                    let dataa = {
                        price : value
                    }
                    let a = await recharge(dataa);
                    this.$toast(a.data.info)
                    this.$router.push({
                        path:'/user'
                    })
                }else{
                    this.$toast('输入数据不合法')
                }

            });

        },

    }
}
</script>
<style lang="scss">


</style>
