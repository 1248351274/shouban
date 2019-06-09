<template>
    <div class="ban-content" :class="{
            'ban-content-scroll-x':ScrollX,
            'ban-content-scroll-y':ScrollY
        }">
       <slot></slot>
       <!-- <div style="background:blue;flex:1"></div>
       <div style="background:pink;flex:1"></div>
       <div style="background:green;flex:1"></div> -->
    </div>
</template>

<script>
export default {
    name:'Content',
    props:{
        ScrollX:Boolean,
        ScrollY:Boolean
    }
}
</script>

<style lang="scss">
@import '@/style/var.scss';
.ban-content{
    flex: 1;
    width: 10rem;
    overflow: hidden;
    &.ban-content-scroll-x{
        overflow-x:auto
    }
    &.ban-content-scroll-y{
        overflow-y:auto
    }
    // background: red;
    // z-index: 10;
    // width: 2rem;
}

</style>
