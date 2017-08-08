<template>
  <div class="success-content">
    <div class="success-icon"></div>
    <div class="success-greyfont">您已成功提交预约信息</div>
    <div class="success-timefont">我们将会以短信的形式确认您的预约<br/>就诊人在预约当日凭本人身份证原件（儿童携带户口本）<br/>到医院现场取号。<br/>返回“<a href="javascript:;" class="msg-blue">我的百联通</a>”可以查看预约单信息。</div>
    <div class="return-btn">
     <div class="return-contain">返回我的百联通</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'expertAppointment_successPage',
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
      line-height: rem(96);
      padding: 0 rem(30);
      font-size: rem(32);
      color: #333333;
      text-align: center;
  }

  .success-timefont {
      width: 100%;
      line-height: rem(38);
      padding: 0 rem(20);
      font-size: rem(28);
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
      line-height:rem(88);
      color:#fff;
      border-radius:rem(12);
      font-size:rem(32);
      text-align:center;
      margin-top:rem(120);
      border:1px solid #2ecc71;
      background: #2ecc71;
  }
  .msg-blue{
    color: #2ecc71;
  }
</style>
