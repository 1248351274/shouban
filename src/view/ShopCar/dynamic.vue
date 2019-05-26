<template>
    <Content ScrollY ScrollX>
        <div class="banner">
            <mt-swipe :auto="0">
                <mt-swipe-item v-for="(banner,index) in bannerList" :key='index'>
                    <!-- <img :src="icon[0]" :alt="banner.Ban_Name"> -->
                    <img src="@/assets/banner-.png" alt="图">
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <div v-for="(item,index) in dynamic" :key="index" class="dynamices">
                <div class="dy-Head">
                    <div class="dy-Head-Mes">
                        <!-- <img :src="item.ImgSrc" :alt="item.name"> -->
                        <Avatar src="http://pic2.cxtuku.com/00/13/02/b709333c25d5.jpg" :size="1.2"/>
                        <!-- <Icon iconName="icon-xiangxia" :size=10 color="$subtitle" style="width:30px;heigth:30px"/> -->
                        <div class="dy-Head-Mes-Name">
                            <span class="N-name">{{item.name}}</span>
                            <span class="N-date">{{item.date}}</span>
                        </div>
                        <!-- <button >发布我的动态<button> -->
                    </div>
                    <Icon iconName="icon-xiangxia" :size=10 color="$subtitle" />
                </div>
                <div class="dy-Content">
                    {{item.dyContent}}
                </div>
                <v-touch @tap="tap">
                <div class="dy-Imgs">
                    <div class="dy-img-items" v-for="(imgItem,index) in item.imgList" :key="index">
                        <img :src="imgItem" alt="图片" class="dy-img-item">
                    </div>
                </div>
                </v-touch>
                <div class="dy-Statistics">
                    <div class="dy-Statistics-count">
                        <span>{{item.zanCount}}赞</span>
                        <span>{{item.evCount}}评论</span>
                    </div>
                    <div class="dy-Statistics-img">
                        <img src="@/assets/img/eva.png" alt="">
                        <img src="@/assets/img/like.png" alt="">
                        <img src="@/assets/img/eva.png" alt="">
                    </div>
                </div>

        </div> 
        <!-- </div> -->
    </Content>
</template>
<script>

export default {

    data() {
        return {
            dynamic:[
                {
                ImgSrc: require('@/assets/ban-img/d-home.png'),
                name: '桔中带核',
                date: '今天 9:55',
                dyContent: '这次出去玩的真开心',
                imgList: [
                    require('@/assets/img/user_png.png'),
                    require('@/assets/img/user_png.png'),
                    require('@/assets/img/user_png.png'),
                    require('@/assets/img/user_png.png'),
                    require('@/assets/img/user_png.png'),
                    require('@/assets/img/user_png.png'),
                    require('@/assets/img/user_png.png'),
                    require('@/assets/img/user_png.png'),
                    require('@/assets/img/user_png.png'),
                    require('@/assets/img/user_png.png'),
                    require('@/assets/img/user_png.png'),
                    require('@/assets/img/user_png.png')
                ],
                zanCount: 3,
                evCount: 6
                },
                {
                ImgSrc: require('@/assets/ban-img/d-home.png'),
                name: '桔中带核',
                date: '今天 9:55',
                content: '这次出去玩的真开心',
                imgList: [
                    require('@/assets/img/user_png.png'),
                    require('@/assets/img/user_png.png'),
                    require('@/assets/img/user_png.png'),
                    require('@/assets/img/user_png.png'),
                    require('@/assets/img/user_png.png'),
                    require('@/assets/img/user_png.png')
                ],
                zanCount: 3,
                evCount: 6
                },
                {
                ImgSrc: require('@/assets/ban-img/d-home.png'),
                name: '桔中带核',
                date: '今天 9:55',
                content: '这次出去玩的真开心',
                imgList: [
                    require('@/assets/img/user_png.png'),
                    require('@/assets/img/user_png.png'),
                    require('@/assets/img/user_png.png'),
                    require('@/assets/img/user_png.png'),
                    require('@/assets/img/user_png.png'),
                    require('@/assets/img/user_png.png')
                ],
                zanCount: 3,
                evCount: 6
                }
                
            ],
            bannerList:[
                {
                Ban_Name:'首页',
                icon:[
                    require('@/assets/img/user_png.png'),
                    require('@/assets/ban-img/c-home.png')
                    ]
                },
                {
                label:'动态',
                icon:[
                    require('@/assets/ban-img/d-dy.png'),
                    require('@/assets/ban-img/c-dy.png')
                    ]
                },
                {
                label:'手办库',
                icon:[
                    require('@/assets/ban-img/d-shopcar.png'),
                    require('@/assets/ban-img/c-shopcar.png')
                    ]
                },
                {
                label:'个人中心',
                icon:[
                    require('@/assets/ban-img/d-mine.png'),
                    require('@/assets/ban-img/c-mine.png')
                    ]
                },
            ]
        }
    },
    methods: {
        tap() {
            console.log(123)
        }
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
.dynamices{
    margin:height(10rem);
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
                  font-size: fontSize(6em);  
                }
                .N-date{
                    color: $subtitle;
                    font-size: fontSize(3em);
                }
            }
        }
    }
    .dy-Content {
    font-size: fontSize(5em);
    }
    .dy-Imgs {
        height: 6.2rem;
        overflow: hidden;
        .dy-img-items {
           float: left;
        //    box-sizing:border-box;
        //    text-align: center;
           .dy-img-item {
               height: 3.1rem;
               width:3.1rem;
               margin: 2px 0 0 2px;
               border-radius:5px;
           }
        }
    }
    .dy-Statistics{
        margin-top: height(20rem);
        padding-top:height(20rem);
        border-top: $subtitle solid 1px;
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

