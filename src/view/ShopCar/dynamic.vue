<template>
    <Content ScrollY ScrollX class="content">
        <div v-for="(item,index) in dynamicslist" :key="index" class="dynamices">
                <div class="dy-Head">
                    <div class="dy-Head-Mes">
                        <Avatar :src="ip+item.user[0].User_Image" :size="1.2"/>
                        <div class="dy-Head-Mes-Name">
                            <span class="N-name">{{item.user[0].User_Name}}</span>
                        </div>
                    </div>
                    <!-- <Icon iconName="icon-xiangxia" :size=10 color="$subtitle" /> -->
                </div>
                <div class="dy-Content">
                    {{item.Dynamic_Content}}
                </div>
                <v-touch @tap="tap">
                    <div class="dy-Imgs">
                        <div class="dy-img-items" v-for="(imgItem,index) in item.img" :key="index">
                            <img :src="ip+imgItem.dy_imgLocation" alt="图片" class="dy-img-item">
                        </div>
                    </div>
                </v-touch> 
                <div class="dy-Statistics">
                    <div class="dy-Statistics-count">
                        <!-- <span>{{item.zanCount}}赞</span> -->
                        <!-- <span>{{item.evCount}}评论</span> -->
                    </div>
                    <!-- <div class="dy-Statistics-img">
                        <img src="@/assets/img/eva.png" alt="">
                        <img src="@/assets/img/like.png" alt="">
                        <img src="@/assets/img/eva.png" alt="">
                    </div> -->
                </div>

        </div> 
        <!-- </div> -->
    </Content>
</template>
<script>
import { mapGetters } from "vuex"
import {getdynamics} from '@/api/User/user'
export default {
    data() {
        return {
            dynamicslist: [],
            ip:[],
        }
    },
    created () {
        this.getdynamiclist()
        this.a()
    },
    methods: {
        tap() {
            console.log(123)
            // console.log(321,this.$store.getters.userMsg)
        },
        a(){
            this.ip = this.config.ip;
        },
        async getdynamiclist(){
            this.dynamicsImg=[]
          let a = await getdynamics();
          if(a.data.result==1){
              console.log('this.getdynamics',a.data.info)
              this.dynamicslist=a.data.info;
          }
          console.log(this.goodsImg)
        },
        
    },
    computed: {
        ...mapGetters([
            'footer',
            'userMsg'
        ]),
    },
}
</script>

<style lang="scss">
@import '@/style/var.scss';
.banner{
    .mint-swipe{
        height:height(180rem);
        .mint-swipe-indicators {
            bottom: 2px;
            .mint-swipe-indicator{
                height: height(20rem);
                width: width(20rem);
            }
        }
    }
}
.content{
    background: rgb(237, 240, 239);
}
.dynamices{
    background: #fff;
    padding:height(10rem);
    margin-bottom: 14px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    // align-items: center;
    .dy-Head{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        // border: 1px red solid;
        
        .dy-Head-Mes {
            display: flex;
            flex-direction: row;
            justify-content: start;
            align-items: center;
            .dy-Head-Mes-Name {
                display: flex;
                flex-direction: column;
                margin-left: height(20rem);
                .N-name{
                  font-size: 20px;  
                }
                .N-date{
                    color: $subtitle;
                    font-size: fontSize(5em);
                }
            }
        }
    }
    .dy-Content {
    font-size: 20px;
    }
    .dy-Imgs {
        // height: 6.2rem;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;
        .dy-img-items {
            flex: 1;
            display: flex;
            flex-wrap: wrap;
           .dy-img-item {
               height: 3.1rem;
               width:3.1rem;
               margin: 2px 0 0 2px;
            //    border-radius:5px;
           }
        }
    }
    .dy-Statistics{
        margin-top: height(20rem);
        padding-top:height(20rem);
        // border-top: $subtitle solid 1px;
        display: flex;
        justify-content:space-between;
        align-items: center;
        .dy-Statistics-count{
           font-size: fontSize(6em);  
           color: $subtitle;
        }
        .dy-Statistics-img{
        //    background: $subtitle;
           width:4rem;
           display: flex;
           justify-content:space-around;
           img{
               height: height(40rem);
               width: width(40rem);
               background: $subtitle;
               border-radius: 50%;
               margin-left: heigth(50rem); 
           }
        }
    }
}
</style>

