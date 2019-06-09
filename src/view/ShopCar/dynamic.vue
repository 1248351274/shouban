<template>
    <Content ScrollY ScrollX>
        <div class="banner">
            <!-- <mt-swipe :auto="4000">
                <mt-swipe-item >
                    <img :src="icon[0]" :alt="banner.Ban_Name">
                    <img src="@/assets/banner-.png" alt="图">
                </mt-swipe-item>
            </mt-swipe> -->
        </div>
        <div v-for="(item,index) in dynamic" :key="index" class="dynamices">
                <div class="dy-Head">
                    <div class="dy-Head-Mes">
                        <!-- <img :src="item.ImgSrc" :alt="item.name"> -->
                        <Avatar :src="item.ImgSrc" :size="1.2"/>
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
                ImgSrc: 'http://pic2.cxtuku.com/00/13/02/b709333c25d5.jpg',
                name: '桔中带核',
                date: '今天 9:55',
                dyContent: '珠亿和风穹语手办缘之动漫',
                imgList: [
                    'https://img.alicdn.com/imgextra/i1/1852234404/O1CN0171eHOO1iP4nlcCv6O_!!0-item_pic.jpg_430x430q90.jpg',
                    'https://img.alicdn.com/imgextra/i4/1852234404/O1CN012hORQJ1iP4n8jumdu_!!1852234404.jpg',
                    'https://img.alicdn.com/imgextra/i3/1852234404/O1CN01sVEk151iP4krNrYHM_!!1852234404.jpg',
                    'https://img.alicdn.com/imgextra/i3/1852234404/O1CN01sVEk151iP4krNrYHM_!!1852234404.jpg',
                    'https://gd4.alicdn.com/imgextra/i1/112370232/O1CN01qZuHAY1DaIOTwIFoi_!!112370232.jpg',
                    'https://img.alicdn.com/imgextra/i3/1852234404/O1CN01sVEk151iP4krNrYHM_!!1852234404.jpg',

                ],
                zanCount: 3,
                evCount: 6
                },
                {
                ImgSrc: 'http://pic1.sc.chinaz.com/Files/pic/pic9/201905/bpic11984_s.jpg',
                name: '卡通人物',
                date: '今天 9:51',
                dyContent: '皮卡丘',
                imgList: [
                    'https://gd2.alicdn.com/imgextra/i3/762126172/O1CN01AnZuef1vSp32AFfi1_!!762126172.jpg',
                    'https://gd1.alicdn.com/imgextra/i1/762126172/O1CN01OKpgDD1vSp2u1nV2f_!!762126172.jpg',
                    'https://gd3.alicdn.com/imgextra/i3/762126172/O1CN01M4OYKX1vSp2wS3QMt_!!762126172.jpg ',
                    'https://gd3.alicdn.com/imgextra/i3/762126172/O1CN01OAO5VG1vSp1hWylh7_!!762126172.jpg',
                    'https://gd2.alicdn.com/imgextra/i3/762126172/O1CN01AnZuef1vSp32AFfi1_!!762126172.jpg',
                    'https://gd2.alicdn.com/imgextra/i3/762126172/O1CN01AnZuef1vSp32AFfi1_!!762126172.jpg',
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
                  font-size: fontSize(8em);  
                }
                .N-date{
                    color: $subtitle;
                    font-size: fontSize(5em);
                }
            }
        }
    }
    .dy-Content {
    font-size: fontSize(8em);
    }
    .dy-Imgs {
        height: 6.2rem;
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

