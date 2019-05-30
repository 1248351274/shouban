<template>
<Srceen >
        <mt-header title="添加动态" class="headerColor">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <Content ScrollY>
        <mt-field  placeholder="这一刻的想法..." type="textarea" rows="5" v-model="introduction" style="margin-bottom:10px"></mt-field>
        <UpImg v-bind:G_Id="G_Id" v-bind:Imglist="Imglist"></UpImg>
      
        <!-- <mt-picker :slots="slots" @change="onValuesChange"></mt-picker> -->
        <!-- <div @click="sub"><mt-button class="subButton" size="large">保存</mt-button></div> -->
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
