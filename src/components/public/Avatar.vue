<template>
    <div class="ban-avatar" :style="{width:size+'rem',height:size+'rem',borderRadius:percent+'%'}">
        <img :src="src" alt="wu">
    </div>
</template>

<script>
    export default {
        name:'Avatar',
        props:{
            src:String,
            size:{
                type:Number,
                default:1
            },
            percent:{
                type:Number,
                default: 50
            }
        }
    }
</script>

<style lang="scss">
.ban-avatar {
    background: #ccc;
    // border-radius: 50%;
    overflow: hidden;
    img {
        width:100%;
        height:100%;
    }

}
</style>