<template>
  <div class='finish_room'>
  	   <div class='finish_room2'>
       	   <div v-for='(item ,index ) in imgs' class='room_img' :key='index'>
       	   	  <img :src="item">
       	   	  <span @click='delete_img(index)'><img src="@/assets/delete.png"></span>
       	   </div>
           <div class='room_add_img'>
           	    <span><img src="@/assets/add_img.png"></span>
           	    <span>图片/视频</span>
           	    <input @change='add_img'  type="file">
                 <!-- <file @change='add_img' ></file> -->
           </div>
       </div>
  </div>
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
<style scoped >
	 .finish_room{
		  width: 100%;
		  height: auto;
	  }

    .finish_room2{
      width: 100%;
      height: auto;
      padding-top: 15px;
      padding-bottom: 15px;
      display: flex;
      align-items: center;
    }

    .finish_room2 .room_img{
      width: 100px;
      height: 100px;
      margin-right: 10px;
      position: relative;
      float:left;
      overflow: hidden;
    }
    .finish_room2 .room_img img{
      width: 100%;
      height: 100%;
    }
    .finish_room2>.room_img span{
   	  position: absolute;
   	  width: auto;
   	  height: auto;
   	  right: 5px;
   	  bottom:3px;
    }



   .room_add_img{
   	 width: 98px;
   	 height: 98px;
   	 border:1px solid #e1e1e1;
   	 display: flex;
   	 flex-direction: column;
   	 align-items: center;
   	 justify-content: space-between;
   	 position: relative;
   }
   .room_add_img >span:nth-child(1){
   	 margin-top: 20px;
   	 width: 40px;
   	 height: 40px;
   	 overflow: hidden;
   }
   .room_add_img >span:nth-child(2){
       margin-bottom: 10px;
       font-size:15px;
   }

  .room_add_img input{
  	  position: absolute;
  	  top: 0px;
  	  left: 0px;
  	  width: 100%;
  	  height: 100%;
  	  z-index: 99999;
  	  opacity: 0;
  }
</style>
