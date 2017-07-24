<template>
  <div class="success-content">
    <div class="success-icon"></div>
    <div class="success-greenfont">谢谢</div>
    <div class="success-greyfont">您的预约已成功提交<br>请等待反馈结果</div>
    <div class="success-timefont">预约时间<br><div>{{ $route.query.time }}</div></div>
    <div class="return-btn">
     <div class="return-contain">返回我的百联通</div>
    </div>
  </div>
</template>

<script>
export default {

  name: 'LtVipSuccess',

  data () {
    return {

    };
  }
};
</script>

<style lang="scss" scoped>
  @import "src/sass/tobe/function";
  .success-content {
      background: #ffffff;
  }

  .success-icon {
      width: 100%;
      height: rem(310);
      @include display(flex);
      @include align-items(center);
      @include justify-content(center);
      padding: rem(150) rem(30) 0 rem(30);
      background: url('./i/right_icon.png') no-repeat center bottom;
      background-size: rem(160);

  }

  .success-greenfont {
      width: 100%;
      height: rem(70);
      padding: 0 rem(30);
      margin-top: rem(15);
      font-size: rem(36);
      color: #2ecc71;
      text-align: center;
  }

  .success-greyfont {
      width: 100%;
      height: rem(96);
      line-height: rem(48);
      padding: 0 rem(30);
      font-size: rem(32);
      color: #333333;
      text-align: center;
  }

  .success-timefont {
      width: 100%;
      height: rem(72);
      line-height: rem(36);
      padding: 0 rem(30);
      font-size: rem(24);
      margin-top: rem(15);
      color: #999999;
      text-align: center;
  }

  .return-btn{
      width:100%;
      padding:0 rem(30);
  }

  .return-contain{
      width:100%;
      height:rem(88);
      line-height:rem(88);
      color:#666666;
      border-radius:rem(12);
      font-size:rem(32);
      text-align:center;
      margin-top:rem(60);
      border:1px solid #cccccc;
      background:#ffffff;
  }
</style>
