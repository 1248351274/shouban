<template>
    <div class="ban-screen">
        <!-- <transition name="fade"> -->
          <slot></slot>
        <!-- </transition> -->
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
