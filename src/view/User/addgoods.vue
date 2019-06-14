<template>
<Srceen >
        <mt-header title="添加手办" class="headerColor">
            <router-link to="/user/goods" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <Content ScrollY>
        <mt-field  placeholder="名称  类型型号都是喜欢搜索的" v-model="Mname" class="manualName"></mt-field>
        <!-- <mt-field label="手办图片" placeholder="" v-model="mob" type="tel" :attr="{ maxlength: 11 }" style="border:1px solid #ccc;border-top:none"></mt-field> -->
        <mt-field  placeholder="介绍该手办的详情，能让更多的人记住它" type="textarea" rows="3" v-model="introduction"></mt-field>
        <mt-field label="价格" placeholder="手办价格" v-model="price" type="number"  class="manualName"></mt-field>
        <mt-field label="数量" placeholder="手办数量" v-model="num" type="number"  class="manualName"></mt-field>
        <div @click="lx">
           <mt-cell title="类型" is-link :value="type ? type : '请选择类型'" style="" class="manualName"></mt-cell>
        </div>
        <mt-popup
          v-model="popupVisible"
          position="bottom"
          style="width:100%">
            <mt-cell title="类型" value="请选择类型" is-link >
        </mt-cell>
          <mt-picker :slots="slots" type="time" @change="onValuesChange"></mt-picker>
        </mt-popup>
        <UpImg v-bind:G_Id="G_Id" v-bind:Imglist="Imglist"></UpImg>
      
        <!-- <mt-picker :slots="slots" @change="onValuesChange"></mt-picker> -->
        <div @click="sub"><mt-button class="subButton" size="large">保存</mt-button></div>
<!-- 
    </div> -->
    </Content>
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
            Mname:'',
            introduction:'',
            price:'',
            num:'',
            type:"请选择类型",
            popupVisible:false,
            Imglist:[],
            stime1:'',
            stime2:'',
            //slots:[{values:[]}],
            slots:[],
            G_Id:'0',
        }
    },
    created () {
       this.getTime()
       console.log(2121,this.stime1)
       console.log(21444,this.stime2)
    },
    methods:{
        getTime() {
           const mydate = new Date()
           this.stime1 = mydate.toLocaleDateString()
           this.stime2 = mydate.toLocaleTimeString()
        },
        lx(){
            
          this.popupVisible=true;
          console.log(221,this.popupVisible)
        },
        onValuesChange(picker, values){
          this.type=values[0];
        },
        async sub(){
            let data = {
                // Goods_Time: this.stime1 + this.stime2,
                Goods_Name: this.Mname,
                Goods_Price: this.price,
                Goods_Type: this.type,
                Goods_Num: this.num,
                Goods_Remarks: this.introduction,
                Goods_Imgid: this.$store.getters.imgid,
                Goods_Time: new Date().getTime()
            };
            //console.log(data)
            let b = await addGoods(data)
            if(b.status==200){
                this.$toast('添加成功')
                this.$router.push({
                    path:'/'
                })
            }else{
                this.$toast('添加失败')
            }
        },
        async gettype(){
          let a = await getTypes();
          //this.slots[0].values = a.data.info;
        //   this.slots = a.data.info
          let obj = {values : a.data.info};
          this.$set(this.slots,0,obj);
          console.log(222,this.$set(this.slots,0,obj))
        }
    },
    mounted(){
        this.gettype()
    }
}
</script>
<style lang="scss">
@import '@/style/var.scss';
.manualName{ 
border-bottom:1px solid #ddd;
}
</style>
