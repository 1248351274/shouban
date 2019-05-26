<template>
<Content ScrollY>
    <div class="shop-car">
        <!-- <mt-header title="购物车" class="header-back headerColor">
            <router-link to="/user" slot="left">
                <mt-button icon="back">返回</mt-button>
            </router-link>
        </mt-header> -->
        <!-- <div class="buju">  -->
        <div class="shop-car-main" >
            <p v-if="orderList.length===0" style="text-align:center;margin-top:50px">
                <img
                    src="@/assets/kong.png"
                    style = 'width:40%;'
                    alt="购物车为空">
            </p>
            <ul class="goods-list">
                <li v-for="(item,index) in orderList" :key='index'>
                  <div class="good-detail">
                    <span class="icon" @click="select(item,index)" :class="item.choose==1?'active':'none'"></span>
                    <img :src="ip+item.Image_Location" alt="">
                    <div class="g-intro">
                      <p class="name">{{item.Goods_Name}}</p>
                      <p class="remarks">{{item.Goods_Remarks}}</p>
                    </div>
                    <div class="remove" @click="remove(item.SC_Id,index)">删除</div>
                  </div>
                  <div class="good-price">
                    <div class="price">
                        单价:<span class="single">{{item.Goods_Price}}</span>
                        总价:<span class="all">{{item.Goods_Price*item.G_Num}}</span>
                        <!-- <p class="all">库存:{{item.Goods_Num}}</p> -->
                    </div>
                        <div class="add">
                            <span class="jian" @click.stop="reduce(item.G_Id)" :class="item.G_Num==1?'none':'active'">-</span>
                            <span class="num">{{item.G_Num}}</span>
                            <span class="jia" @click.stop="increase(item.G_Id)">+</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="total">
            <div class="g-select">
              <span class="icon" @click="selectAll" :class="{'icon-active':chooseAll}"></span>
              <span class="allgood">全选</span>
            </div>
            <div class="content">
                合计:<span class="price">¥ {{totalNum}}</span>
            </div>
            <span class="order" @click="confirmOrder">结算</span>
        </div>  
    </div> 
</Content>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import * as TYPES from "@/store/type";
import { MessageBox } from "mint-ui";
import { getUserMsg } from "@/api/User/user";
import { showCart, editCart, delCart, order } from "@/api/Shopcart/shopcart";
export default {
  name: "shop-car",
  data() {
    return {
      orderList: [],

      ip: [],
      ye: []
    };
  },
  computed: {
    //...mapGetters(["shop_car_status", "shop_msg"]),
    buyList() {
      let buyList = [];
      this.orderList.forEach(item => {
        if (item.choose==1) {
          buyList.push(item);
        }
      });
      return buyList;
    },
    totalNum() {
      let num = 0;
      this.buyList.forEach((item, index) => {
        num += item.G_Num * item.Goods_Price;
      });
      return num;
    },
    chooseAll() {
      if (this.orderList.length == 0) {
        return;
      }
      for (let i = 0; i < this.orderList.length; i++) {
        if (this.orderList[i].choose==0) {
          return false;
        }
      }
      return true;
    }
  },
  methods: {
    ...mapActions(["reduce", "increase"]),
    // getList() {
    //   this.$store.getters.shop_num.forEach(item => {
    //     if (item.num > 0) {
    //       this.orderList.push(item);
    //     }
    //   });
    // },
    async getList() {
      let a = await showCart();
      if(a.data.result==1){
        this.orderList = a.data.info;
        console.log('showCart',this.orderList)
        this.orderList.forEach(item => {
          item.choose = 0;
        })
      }
    },
    a() {
      this.ip = this.config.ip;
    },
    increase(id) {
      // this.$store.commit(TYPES.INCREASE_NUM, item.Goods_Id);
      // this.$set(this.orderList, index, item);
      this.orderList.forEach(async(item, index) => {
        if(item.G_Id==id){

          let data = {
            G_Id:id,
            G_Num:item.G_Num+1
          };
          let a = await editCart(data);
          if(a.data.result==1){
            this.orderList[index].G_Num++;
          }
        }
      })
    },
    async getye() {
      let msg = await getUserMsg();
      this.ye = msg.data.info.User_Balance;
      //console.log(this.ye);
    },
    reduce(id) {
      // if (item.num === 1) {
      //   return;
      // }
      // this.$store.commit(TYPES.REDUCE_NUM, item.Goods_Id);
      // this.$set(this.orderList, index, item);
      this.orderList.forEach(async(item, index) => {
        if(item.G_Id==id){
          if (item.G_Num === 1) {
            return;
          }else{
            let data = {
              G_Id:id,
              G_Num:item.G_Num-1
            };
            let a = await editCart(data);
            if(a.data.result==1){
              this.orderList[index].G_Num--;
            }
          }
        }
      })
    },
    select(item, index) {
      item.choose = 1-item.choose;
      this.$set(this.orderList, index, item);
      console.log(222, this.orderList)
      console.log('item', item);
      console.log(1111, index)
      console.log(333,item.choose)
    },
    selectAll() {
      if (this.chooseAll) {
        this.orderList.forEach((item, index) => {
          item.choose = 0;
          //  this.$set(this.student,"age", 24)
          this.$set(this.orderList, index, item);
        });
      } else {
        this.orderList.forEach((item, index) => {
          item.choose = 1;
          this.$set(this.orderList, index, item);
        });
      }
    },
    async remove(id,index) {
      // this.orderList.splice(item, 1);
      // this.$set(this.orderList);
      let data = {
        SC_Id:id
      }
      let a = await delCart(data);
      if(a.data.result==1){
        this.orderList.splice(index,1);
      }
    },
    confirmOrder() {
      if (this.buyList.length === 0) {
        MessageBox("提示", "请先选择购买商品");
        return;
      }
      MessageBox.confirm(`确认购买共:${this.totalNum}元`).then(async res => {
        if (this.totalNum > this.ye) {
          MessageBox.alert("余额不足");
        } else {
          let str = '';
          this.buyList.forEach((item,index) => {
            str += item.SC_Id+','
          });
          str = str.substr(0,str.length-1);
          let dataa = {
            SC_Id: str
          };
          let a = await order(dataa);
          if(a.data.result==1){

            let d = str.split(',');
            for(let i=0;i<d.length;i++){
              this.orderList.forEach((item,index) => {
                if(d[i]==item.SC_Id){
                  this.orderList.splice(index,1)
                }
              })
            }
            MessageBox.alert("购买成功");
          }else{
            MessageBox.alert("购买失败");
          }

        }
      });
    }
  },
  mounted() {
    this.getList();
    this.a();
    this.getye();
  }
};
</script>

<style lang="scss">
// .buju {
//   display: flex;
//   flex-flow: column nowrap;
//   justify-content: flex-end;
// }
.shop-car {
  display:flex;
  flex-direction: column;
  justify-content:space-between;
  // border:#e8380d 1px solid;
  // position: fixed;
  // top: 0;
  // bottom: 60px;
  // width: 100%;
 .header-back {
    //  position: relative;
     top:0;
     left:0;
  }
  .shop-car-main {
    display: flex;
    // border:solid 1px salmon;
    .shop-car-title {
      padding-left: 10px;
      font-size: 14px;
      line-height: 40px;
      color: #fff;
      background-color: #1296db;
    }
    .goods-list {
      li {
        font-size: 12px;
        // position: relative;
        display: -ms-flexbox;
        display: flex;
        flex-flow: column nowrap;
        // justify-content: flex-end;
        -ms-flex-align: center;
        align-items: center;
        width: 100%;
        border-bottom: 1px solid #ddd;
        padding-bottom: 10px;
        // border: solid 1px rebeccapurple;
        .good-detail{
          display: flex;
          justify-content: space-around;
          width: 100%; 
          margin-top: 10px;
          span {
            padding: 0 6px;
            color: #1296db;
          }
          .icon {
            margin-left: 6px;
            margin: auto 0;
            padding: 0;
            display: inline-block;
            width: 16px;
            height: 16px;
            background: url("../../assets/选择.png") no-repeat;
            background-size: cover;
          }
          .active {
            background: url("../../assets/选择按钮.png") no-repeat;
          }
          img {
            margin: 0 3px 0 0;
            width: 25%;
            height: 100%;
          }
          .g-intro {
            width: 40%;
            .name {
              width: 80px;
              white-space: nowrap;
              overflow: hidden;
              font-size: 15px;
              text-overflow: ellipsis;
            }
            .remarks {
              height: 20px;
              overflow: hidden;
              font-size: 12x;
            }
          }
          .remove {
            width: 12%;
            line-height: 24px;
            text-align: center;
            font-size: 10px;
            margin:auto 0;
            color: #fff;
            background-color: #e8380d;
          }
        }
        .good-price {
          display: flex;
          flex-flow: row nowrap;
          justify-content:space-around;
          width: 100%;
   
          .price {
            margin-left: 10px;
            line-height: 20px;
            font-size: 12px;
              .single {
                color: #e8380d;
                margin-right: 10px;
                margin-left:5px;
              }
              .all {
                color: #e8380d;
                margin-left:5px;
              }
          }
           .add {
              display: flex;
              .num {
                color: #000;
                margin: auto 6px;
              }
              .jia {
                width: 20px;
                height: 20px;
                text-align: center;
                background: rgb(18, 150, 219);
                border-radius: 50%;
                color: #fff;
                margin: auto 0;
              }
              .jian {
                width: 20px;
                height: 20px;
                text-align: center;
                border-radius: 50%;
                color: #fff;
                background: rgb(190, 188, 188);
                margin: auto 0;
              }
              .active {
                background: rgb(18, 150, 219);
              }
           }
          // }
        }

        .name {
          width: 80px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        
        .remove {
          // position: absolute;
          // top: 0;
          // bottom: -1px;
          // right: 0;
          width: 50px;
          line-height: 50px;
          text-align: center;
          color: #fff;
          background-color: #e8380d;
        }
      }
    }
  }
  .total {
    // position: absolute;
    // z-index: 2;
    // display: -ms-flexbox;
    // display: flex;
    // -ms-flex-align: center;
    // align-items: center;
    // bottom: 0;
    // width: 100%;
    // height: 50px;
    // background-color: #fff;
    // border-top: 1px solid #ddd;
      // position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      display: flex;
      flex-flow: row nowrap;
      justify-content:space-around;
      // padding:6px;
      background-color:#fff;
      line-height: 60px;
      border-top: 1px solid #ddd;
      .g-select {
        .icon {
          display: inline-block;
          width: 16px;
          height: 16px;
          margin: auto 0;
          margin-bottom: -4px;
          text-align: center;
          color: #1296db;
          background: url("../../assets/选择.png") no-repeat;
        }
        .icon-active {
          // line-height: 80px;
          background: url("../../assets/选择按钮.png") no-repeat;
        }
        .allgood {
          font-size: 10px;
        }
      }

      .content {
        // border:rgb(18, 150, 219) solid 1px;
        // margin-right: 10px;
        margin-left: 20px;
        width: 50%;
        height: 100%;
        // line-height: 40px;
        .price {
          height: 100%;
          margin-left: 10px;
          font-size: 14px;
          color: #e8380d;
        }
      }
      .order {
        // float: right;
        // border: solid 1px rebeccapurple;
        width: 20%;
        font-size: 16px;
        line-height: 30px;
        height: 30px;
        margin:auto 0;
        text-align: center;
        color: #fff;
        background-color: #e8380d;
      }
  }
}
</style>
