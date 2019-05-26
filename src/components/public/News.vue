<template>
    <div class="ban-news">
       <div class="ban-news-item">
           <div class="ban-news-item-header">
                <Avatar src="http://pic2.cxtuku.com/00/13/02/b709333c25d5.jpg" :size="2"/>
                <div class="ban-news-item-header-info">
                    <h3>xxxx</h3>
                    <small>xxxxx</small>
                </div>
                <div class="ban-news-item-header-icon">
                    <Icon iconName="icon-xiangxia" :size=10 color="$subtitle" style="width:30px;heigth:30px"/>
                </div>
           </div>
           <!-- <div class="ban-news-item-content"> -->
            <p>
                这次出去很舒服！
            </p>
            <div class="images">
                
            </div>
           <!-- </div> -->
           <div class="ban-news-item-footer">

           </div>
       </div>
    </div>
</template>

<script>
    export default {

    }
</script>

<style lang="scss">
     .ban-news{
         display: flex;
         flex-direction: column;
         font-size:18px;
         .ban-news-item{
             width: 100%;
             display: flex;
             flex-direction: column;
             .ban-news-item-header{
                
                width: 100%;
                display: flex;
                flex-direction: row;
                .ban-news-item-header-info{
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    h3{
                        margin:0;
                    }
                }
             }

         }
     }

</style>