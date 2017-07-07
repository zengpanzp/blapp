<template>
<div>
    <div class="code-box">
      <div class="box-container">
        <div class="member-detail">
          <div class="member-pic">
            <img src="./i/user_p01.png">
          </div>
          <div>
            <div class="member-name">
              少女爱吃橙
            </div>
            <div class="member-level">
              <div class="log">
                <img src="./i/bailianlogo2.png">
              </div>
              <div class="level">
                银卡会员
              </div>
            </div>
          </div>
        </div>
        <div class="line-code">
          <img src="http://placeholder.qiniudn.com/450x133"/>
        </div>
        <div class="square-code">
          <img src="http://placeholder.qiniudn.com/370x370"/>
        </div>
        <div class="cover-pic">
          <img src="./i/tx-img10.png"> 
        </div>
        
      </div>
    </div>
    <div class="operate-text">
          点击卡片，查看二维码
    </div>
</div>
</template>

<script>
export default {

  name: 'memberCard',

  data () {
    return {

    };
  },
  created () {
    this.$loading.close()
  }
};
</script>

<style lang="scss" src="./css/memberCard.scss" scoped>
</style>
