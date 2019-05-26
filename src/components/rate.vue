<template>
  <div class="rating">
    <ul class="list">
      <li class="star" v-for="(star,index) in maxStars" :class="{'active': star <= maxStars}" @click="rate(star)" :key="index">
        <icon :name="star<=stars?'star':'star-o'"/>
      </li>

    </ul>
    <span v-if="hasCounters" >{{stars}}星</span>
    <span v-else > 待评价 </span>
  </div>
</template>

<script>
  import 'vue-awesome/icons/star'
  import 'vue-awesome/icons/star-o'
  import Icon from 'vue-awesome/components/Icon'
  import {subeva} from '@/api/User/user'
  export default {
    name: "rate",
    // props:['grade','maxStars','hasCounter'],
    props:{
      grade:{
        type:Number,
        required:true
      },
      maxStars:{
        type:Number,
        default:5
      },
      hasCounter:{
        type:Boolean,
        require:true
      },
      ordermsg:{
        type:Object,
        required:true
      }
    },
    components: {Icon},
    data() {
      return {
        stars: this.grade,
        // maxStars: 5,
        hasCounters:this.hasCounter
      }
    },
    computed:{
      counter(){
        return `${this.stars} of ${this.maxStars}`
      }
    },
    methods:{
      async rate(star){
        //if(typeof star==='number' && star<=this.maxStars && star>=0)

        this.ordermsg.eva=star
        let data = this.ordermsg
        let a = await subeva(data);
        if(a.data.result==1){
          this.stars=this.stars===star?star-1:star
          this.hasCounters = true
          this.$toast('评价成功')
        }else{
          this.$toast('评价失败')
        }
      }
    }
  }
</script>

<style scoped  lang="scss">
  .rating {
    font-size: 14px;
    color: #a7a8a8;
    width:100%;
    ul{
      float:left
    }
    span{
      float:right;
      margin-right:10px;
    }
  }

  .list {
    margin: 0;
    padding: 0;
    line-height:32px;
    list-style-type: none;
  }

  .list:hover .star {
    color: #f3d23e;
  }

  .star {
    display: inline-block;
    cursor: pointer;
  }

  .star:hover~.star:not(.active){
  color: inherit;
  }
  .active {
    color: #f3d23e;
  }
</style>
