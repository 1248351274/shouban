<template>

    <i class="iconfont" :class="[iconName]" :style="{fontSize:size+'px',color:color}" />
</template>

<script>
import '../fonts/iconfont.css'
    export default {
        name:'Icon',
        props: {
            iconName:String,
            size:Number,
            color:String
        }
    }
</script>

<style lang="scss">

</style>

