<template>
    <div class="ban-head">
      <div class="head-start">
          {{start}}
          <slot v-if="start" name="start"></slot>
      </div>
      <div class="head-title">
        {{title}}
          <slot v-if="title" name="title"></slot>
      </div>
      <div class="head-end">
        {{end}}
          <slot v-if="end" name="end"></slot>
      </div>  
    </div>
</template>

<script>
export default {
   name: 'Heads',
   props: ['title','start','end']
}
</script>
<style lang="scss">
@import '@/style/var.scss';
.ban-head {
  height: 40px; 
  width: 100%;
  background: $primary;
  color: $head-title-color;
  display: flex;
  justify-content:space-between;
  align-items: center;
  font-size: 12px;
  .head-start,.head-title,.head-end{
     font-size: fontSize(18em);
  }
  .head-start,.head-end {
      width:2rem;
      text-align: center;
  }
}
</style>



