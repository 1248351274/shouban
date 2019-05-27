<template>
<Screen>
    <Heads title="我的手办" start="返回">
        <start >
            <router-link to="/" slot="left">
            <!-- {{"返回"}}
                <mt-button icon="back">返回</mt-button> -->
            </router-link>
        </start>
    </Heads>
    <div class="mygoods">
        <!-- <mt-header title="我的商品" style="background:#35495e">
            <router-link to="/user/goods" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header> -->
        <mt-field label="商品名称" placeholder="请输入商品名称" v-model="sname"  style="border:1px solid #ccc"></mt-field>
        <!-- <mt-field label="商品图片" placeholder="" v-model="mob" type="tel" :attr="{ maxlength: 11 }" style="border:1px solid #ccc;border-top:none"></mt-field> -->
        <UpImg v-bind:G_Id="G_Id" v-bind:Imglist="Imglist"></UpImg>
        <mt-field label="价格" placeholder="请输入价格" v-model="price" type="number"  style="border:1px solid #ccc;"></mt-field>
        <mt-field label="数量" placeholder="请输入数量" v-model="num" type="number"  style="border:1px solid #ccc;border-top:none"></mt-field>
        <div @click="lx"><mt-cell title="类型" is-link :value="type" style="border:1px solid #ccc;border-top:none"></mt-cell></div>
        <mt-field label="简介" placeholder="请输入简介" type="textarea" rows="3" v-model="introduction"></mt-field>
        <mt-popup
          v-model="popupVisible"
          position="bottom"
          style="width:100%">
          <mt-picker :slots="slots" type="time" @change="onValuesChange"></mt-picker>
        </mt-popup>
        <!-- <mt-cell title="类型" value="请选择类型" is-link > -->
        <!-- </mt-cell> -->
        <!-- <mt-picker :slots="slots" @change="onValuesChange"></mt-picker> -->
        <v-touch @tap="sub"><mt-button type="primary" size="large" style="margin-top:30px">保存</mt-button> </v-touch>

    </div>
</Screen>
</template>
<script>
import {getGoodsMsg,getTypes,editGoods} from '@/api/User/user'
import { Picker } from 'mint-ui'
import UpImg from '@/components/upimg'
export default{
    components: {
        UpImg
    },
    data (){
        return {
            ip:[],
            price:[],
            sname:[],
            num:[],
            introduction:[],
            goodmsg:{},
            popupVisible:false,
            type:"请选择类型",
            //slots:[{values:[]}],
            slots:[],
            G_Id:'',
            Imglist:[]
        }
    },
    created () {

    },
    methods:{
        lx(){
          this.popupVisible=true;
        },
        async getgoodsmsg(){
            let id = this.$route.query.id;
            let data = {
                Goods_Id:id
            }
            let a = await getGoodsMsg(data);
            if(a.data.result==1){
                this.goodmsg = a.data.info;
                this.sname = this.goodmsg.Goods_Name;
                this.price = this.goodmsg.Goods_Price;
                this.type = this.goodmsg.GT_Type;
                this.num = this.goodmsg.Goods_Num;
                this.introduction = this.goodmsg.Goods_Remarks;
                this.G_Id = this.goodmsg.Goods_Id.toString();
                this.goodmsg.img.forEach((item, index) => {
                    this.Imglist.push(this.ip+item.Image_Location)
                });

            }else{
                this.$toast(a.data.info);
            }
        },
        onValuesChange(picker, values){
          this.type=values[0];
        },
        async sub(){
            let data = {
                Goods_Id: this.G_Id,
                Goods_Name: this.sname,
                Goods_Price: this.price,
                Goods_Num: this.num,
                Goods_Type: this.type,
                Goods_Remarks: this.introduction
            };
            //console.log(data)
            let b = await editGoods(data)
            if(b.data.result==1){
                this.$toast('修改成功');
                this.$router.push({
                    path:'/user/goods'
                })
            }else{
                this.$toast(b.data.info);
            }
        },
        async gettype(){
          let a = await getTypes();
          //this.slots[0].values = a.data.info;
          let obj = {values : a.data.info};
          this.$set(this.slots,0,obj);
        }
    },
    mounted(){
        this.getgoodsmsg();
        this.gettype();
        this.ip = this.config.ip;
    }
}
</script>
<style lang="scss">

</style>
