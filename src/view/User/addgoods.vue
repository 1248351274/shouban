<template>
<Srceen>
    <Heads title="添加商品" >
        <router-link to="/user/goods" slot="start">
        返回
            <!-- <mt-button icon="back">返回</mt-button> -->
        </router-link>
    </Heads>
    <div class="addgoo">
        <!-- <mt-header title="添加商品" class="headerColor">
            <router-link to="/user/goods" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header> -->
        <mt-field label="商品名称" placeholder="请输入商品名称" v-model="sname"  style="border:1px solid #ccc"></mt-field>
        <!-- <mt-field label="商品图片" placeholder="" v-model="mob" type="tel" :attr="{ maxlength: 11 }" style="border:1px solid #ccc;border-top:none"></mt-field> -->
        <UpImg v-bind:G_Id="G_Id" v-bind:Imglist="Imglist"></UpImg>
        <mt-field label="价格" placeholder="请输入价格" v-model="price" type="number"  style="border:1px solid #ccc;"></mt-field>
        <mt-field label="数量" placeholder="请输入数量" v-model="num" type="number"  style="border:1px solid #ccc;"></mt-field>
        <div @click="lx"><mt-cell title="类型" is-link :value="type ? type : '请选择类型'" style="border:1px solid #ccc;border-top:none"></mt-cell></div>
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
        <v-touch @tap="sub"><mt-button type="primary" size="large" style="margin-top:30px">保存</mt-button></v-touch>

    </div>
</Srceen>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import * as TYPES from '@/store/type'
import {addGoods,getTypes} from '@/api/User/user'
import { Picker } from 'mint-ui'
import UpImg from '@/components/upimg'
export default{
    components: {
        UpImg
    },
    data (){
        return {
            stime1:'',
            stime2:'',
            price:'',
            sname:'',
            num:'',
            introduction:'',
            popupVisible:false,
            type:"请选择类型",
            //slots:[{values:[]}],
            slots:[],
            G_Id:'0',
            Imglist:[]
        }
    },
    created () {
       this.getTime()
       console.log('stime', this.stime1 + this.stime2)
    },
    methods:{
        getTime() {
           const mydate = new Date()
           this.stime1 = mydate.toLocaleDateString()
           this.stime2 = mydate.toLocaleTimeString()
        },
        lx(){
          this.popupVisible=true;
        },
        onValuesChange(picker, values){
          this.type=values[0];
        },
        async sub(){
            let data = {
                // Goods_Time: this.stime1 + this.stime2,
                Goods_Name: this.sname,
                Goods_Price: this.price,
                Goods_Type: this.type,
                Goods_Num: this.num,
                Goods_Remarks: this.introduction,
                Goods_Imgid: this.$store.getters.imgid,
                // Goods_Time: new Date().toLocaleString()
            };
            //console.log(data)
            let b = await addGoods(data)
            if(b.data.result==1){
                this.$toast('添加成功');
                this.$router.push({
                    path:'/user/goods'
                })
            }else{
                this.$toast('添加失败');
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
        this.gettype()
    }
}
</script>
<style lang="scss">

</style>
