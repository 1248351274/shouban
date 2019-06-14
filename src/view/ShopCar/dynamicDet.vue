<template>
<Srceen >
        <mt-header title="添加动态" class="headerColor">
            <router-link to="/" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <Content ScrollY>
        <mt-field  placeholder="这一刻的想法..." type="textarea" rows="5" v-model="introduction" style="margin-bottom:10px"></mt-field>
        <dyUpImg v-bind:dy_Id="dy_Id" v-bind:Imglist="Imglist"></dyUpImg>
        <!-- <mt-picker :slots="slots" @change="onValuesChange"></mt-picker> -->
        <div @click="sub"><mt-button class="subButton" size="large">发布</mt-button></div>
        <!-- <div v-for="item in userMsg" :key="item">
          item {{item}}
        </div> -->
    </Content>
</Srceen>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import * as TYPES from '@/store/type'
import {addDynamics,getTypes} from '@/api/User/user'
import { Picker } from 'mint-ui'
import dyUpImg from '@/components/dyUpimg'
export default{
    components: {
        dyUpImg
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
            dy_Id:'0',
        }
    },
    created () {
       this.getTime()
    },
    computed: {
        ...mapGetters([
            'footer',
            'userMsg'
        ]),
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
                Dynamic_Content: this.introduction,
                Dy_Imgid: this.$store.getters.dyimgid,
            };
            let b = await addDynamics(data)
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
