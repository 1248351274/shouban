<template>
    <div class="sh">
        <mt-header title="店铺信息" class="headerColor">
            <router-link to="/user" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header>
        <!-- <mt-cell title="头像" style='border:0.5px solid #ccc;height:100px' is-link >
            <img src="@/assets/图.png">
        </mt-cell> -->
        <mt-field label="店铺名称" placeholder="请输入店铺名称" v-model="sname"  style="border:1px solid #ccc"></mt-field>
        <div @click="xz"><mt-cell title="添加商品" is-link :value="add ? add : '请选择商品'" style="border:1px solid #ccc;border-top:none;width:80%;float:left;"></mt-cell></div>
        <mt-button type="primary" size="large" @click="addd"  style="float:left;width:20%;height:48px">添加</mt-button>
        <div style="clear:both"></div>
        <!-- <mt-field label="商品列表" placeholder="请输入手机号" v-model="mob" type="tel" :attr="{ maxlength: 11 }" style="border:1px solid #ccc"></mt-field> -->
        <mt-cell title="商品列表:"  style="border:1px solid #ccc;border-top:none">
        </mt-cell>
        <ul class="goods-list">
            <li v-for="(item,index) in shopgoods" :key='index'>
                <img :src="ip+item.img" alt="">
                <p class="name">{{item.Goods_Name}}</p>
                <div class="price">
                    <p class="single">单价:{{item.Goods_Price}}</p>
                    <p class="single">库存:{{item.Goods_Num}}</p>
                </div>
                <div class="remove" @click="remove(item.Goods_Id,index)">下架</div>
            </li>
        </ul>
        <mt-button type="primary" size="large" @click="sub" style="margin-top:30px">保存</mt-button>
        <mt-popup
          v-model="popupVisible"
          position="bottom"
          style="width:100%">
          <mt-picker :slots="slots" type="time" @change="onValuesChange"></mt-picker>
        </mt-popup>
    </div>
</template>
<script>
import {getShopMsg,getAddGoods,addShop,removeShop,editShop} from '@/api/Shop/shop'
export default{
    data (){
        return {
            ip:[],
            shopmsg:[],
            sname:[],
            add:[],
            addgoo:[],
            popupVisible:false,
            slots:[],
            shopgoods:[],
            addgid:[]
        }
    },
    created () {

    },
    methods:{
        //选择
        xz(){
          this.getAdg();
          this.popupVisible=true;
        },
        onValuesChange(picker, values){
            this.add=values[0];
            this.addgoo.forEach((item,index) => {
                if(item.Goods_Name==this.add){
                    this.addgid = item.Goods_Id;
                }
            });
        },
        //上架
        async addd(){
            if(this.addgid==''){
                this.$toast('请选择商品')
                return
            }
            if(this.shopmsg==''){
              this.$toast('请先注册店铺')
              return
            }
            let data = {
                sid : this.shopmsg.Shop_Id,
                gid : this.addgid
            }
            let a = await addShop(data);
            if(a.data.result==1){
                this.addgoo.forEach((item,index)=>{
                    if(item.Goods_Id==this.addgid){
                        this.addgoo.splice(index,1);
                        this.shopgoods.push(item);
                        this.add = '';
                        this.$toast('上架成功')
                    }
                })
            }else{
                this.$toast('上架失败')
            }
        },
        async getShopMsg(){
            let a = await getShopMsg();
            if(a.data.result==1){
                console.log(a.data.info)
                this.sname = a.data.info[0].Shop_Name;
                this.shopgoods = a.data.info[0]['goods'];
                this.shopmsg = a.data.info[0];
                console.log(this.shopgoods)
                // this.mob = a.data.info.User_Tel;
                // this.addr = a.data.info.User_Address;
            }else{
                this.$toast(a.data.info);
            }
        },
        async remove(id,index) {
            let data = {
                sid : this.shopmsg.Shop_Id,
                gid : id
            }
            let a = await removeShop(data);
            if(a.data.result==1){
                this.shopgoods.splice(index,1);
                this.$toast('下架成功')
            }else{
                this.$toast('下架失败')
            }

        },
        async getAdg(){
            let data = {
                sid : this.shopmsg!='' ? this.shopmsg.Shop_Id : 0
            }
            let a = await getAddGoods(data);
            if(a.data.result==1){
                this.addgoo = a.data.info;
                let b = Array();
                this.addgoo.forEach((item,index) => {
                    b.push(item.Goods_Name)
                });
                let c = {values : b};
                this.$set(this.slots,0,c)
            }else{
                this.$toast(a.data.info);
            }
        },
        async sub(){
            let data = {
                sname : this.sname,
                sid : this.shopmsg!='' ? this.shopmsg.Shop_Id : 0
            };
            let a = await editShop(data);
            if(a.data.result==1){
                this.$toast(a.data.info);
                this.$router.push({
                    path:'/user'
                })
            }else if(a.data.result==2){
                this.getShopMsg();
                this.$toast(a.data.info)
            }else{
                this.$toast(a.data.info);
            }
        }
    },
    mounted(){
      this.ip = this.config.ip;
      this.getShopMsg();

    }
}
</script>
<style lang="scss">
.sh{
    padding-bottom: 150px;
}
.goods-list {
      li {
        font-size: 12px;
        position: relative;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        width: 100%;
        border-bottom: 1px solid #ddd;
        span {
          padding: 0 6px;
          color: #1296db;
        }
        .icon {
          margin-left: 6px;
          padding: 0;
          display: inline-block;
          width: 16px;
          height: 16px;
          background: url("../../assets/选择.png") no-repeat;
          background-size: cover;
        }
        img {
          margin: 4px 10px;
          width: 40px;
          height: 41px;
          border-radius: 50%;
        }
        .name {
          width: 80px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .price {
          margin-left: 10px;
          color: #e8380d;
          .single {
            margin-top: 8px;
          }

        }


        .remove {
          position: absolute;
          top: 0;
          bottom: 1px;
          right: 0;
          width: 50px;
          line-height: 50px;
          text-align: center;
          color: #fff;
          background-color: #e8380d;
        }
      }
    }
</style>
