<template>
    <div class="ban-screen">
       <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'Screen'

}
</script>

<style lang="scss">
.ban-screen{
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    // justify-content: space-between;
}
</style>
