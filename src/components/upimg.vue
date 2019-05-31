<template>
  <!-- <div class='finish_room'> -->
  	   <div class='finish_room2'>
       	   <div v-for='(item ,index ) in imgs' class='room_img' :key='index'>
       	   	  <img :src="item">
       	   	  <span @click='delete_img(index)' class="del-img">-</span>
       	   </div>
           <div class='room_add_img'>
           	    <span class="add-img"><img src="@/assets/add_img.png"></span>
           	    <span class="add-name">图片/视频</span>
           	    <input @change='add_img'  type="file">
                 <!-- <file @change='add_img' ></file> -->
           </div>
       </div>
  <!-- </div> -->
</template>

<script >
import {mapGetters, mapActions} from 'vuex'
import * as TYPES from '../store/type'
import {upimg,delimg} from '@/api/User/user'
export default{
    name:'upimg',
    data:function(){
        return{
              imgs:[],
              ip:[]
        }
    },
    props:{
      G_Id:{
        type:String
      },
      Imglist:{
        type:Array
      }
    },
    methods:{
        async delete_img(item){
          console.log('jian')
          let l = this.ip.length;
          let data = {
            G_Id : this.G_Id,
            Image_Location : this.imgs[item].substr(21)
          }
          let a = await delimg(data);
          if(a.data.result==1){
            this.$toast('删除成功');
            this.$store.commit(TYPES.DELIMG,a.data.id);
            this.imgs.splice(item,1);

          }else{
            this.$toast('删除失败');
          }


        },
        add_img(event){
            console.log('event',event)
            var reader =new FileReader();
            var img1=event.target.files[0];
            reader.readAsDataURL(img1);
            var that=this;

            reader.onloadend=async function(){
                
                let data = {
                  uploadedfile : reader.result,
                  G_Id : that.G_Id
                }
                console.log('data',data);
                let a = await upimg(data);
                if(a.data.result==1){
                  // that.$toast('上传成功');
                  that.imgs.push(that.ip+a.data.info);
                  that.$store.commit(TYPES.ADDIMG,a.data.id);
                }else{
                  that.$toast(a.data.info);
                }

            }
        }
    },
    mounted(){
      this.imgs = this.Imglist;
      this.$store.commit(TYPES.RESETIMG);
      this.ip = this.config.ip;
    }


}

</script>
<style scoped lang="scss">
@import '@/style/var.scss';

    .finish_room2{
      width: 100%;
      height: height(570rem);
      padding-top: 15px;
      padding-bottom: 15px;
      display: flex;
      flex-flow: row wrap;
      margin-left:10px;
      // background: red;
      /* border:1px red solid; */
      .room_img{
        flex: 1;
        width: width(200rem);
        height: height(200rem);
        margin-right: 10px;
        position: relative;
        // float:left;
        // overflow: hidden;
        .del-img{
          position: absolute;
          width: auto;
          height: auto;
          right: 10px;
          bottom:10px;
          width: 10px;
          height: 10px;
          border: #e1e1e1 1px solid;
          border-radius: 50%;
        }
        img{
          width: 100%;
          height: 100%;
        }
      }
   .room_add_img{
   	 width: width(190rem);
   	 height: width(190rem);
     border:1px solid #e1e1e1;
   	 display: flex;
      flex-direction: column;
      flex-flow: column wrap;
      align-items: center;      
      justify-content: space-between;
      // background: red;
      position: relative;
      .add-img{
        margin-top: 20px;
        width: 40px;
        height: 40px;
        overflow: hidden;
      }
      .add-name{
        margin-bottom: 10px;
        font-size:15px;
      }
      input{
        position: absolute;
        // border: solid 1px red;
        // background: red;
        width: 100px;
        height:100px;
        // top: 0px;
        // left: 0px;
        width: 100%;
        height: 100%;
        // // z-index: 99999;
        opacity: 0;
      }
   }
}
</style>
