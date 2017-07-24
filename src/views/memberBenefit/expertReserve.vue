<template>
  <div class="expert-reserve">
    <bl-cell title="地区">
      <input class="select-main" slot="cell-main" type="text" placeholder="请选择就诊地区" readonly>
    </bl-cell>
    <bl-cell title="医院">
      <input class="select-main" slot="cell-main" type="text" placeholder="请选择就诊医院" readonly>
    </bl-cell>
    <bl-cell title="科室">
      <input class="select-main" slot="cell-main" type="text" placeholder="请选择就诊科室" readonly>
    </bl-cell>
    <bl-cell title="日期">
      <input class="select-main" slot="cell-main" type="text" placeholder="请选择就诊日期" readonly>
    </bl-cell>
    <bl-cell title="时间">
      <input class="select-main" slot="cell-main" type="text" placeholder="请选择就诊时间" readonly>
    </bl-cell>
    <bl-button type="expert-btn" :disabled="true">立即预约</bl-button>
  </div>
</template>

<script>
export default {

  name: 'expertReserve',

  data () {
    return {

    };
  }
};
</script>

<style lang="scss" scoped>
  @import "src/sass/tobe/function";
  .expert-reserve{
    background-color: #fff;
    .select-main{
      text-align: right;
      &::-webkit-input-placeholder{
        color: #a5a5a5;
      }
    }
  }
  .expert-btn{
    background-color: #39ca74;
    color: #fff;
    border: 0;
    margin: rem(120) rem(30) 0;
    width: auto;
    &.disabled{
      color: #fff;
      background-color: #d6d6d6;
    }
  }
</style>
