<template>
  <ul class="gift-list">
    <li v-for="(data, index) in datas">
      <div class="gift-time">{{data.date}}</div>
      <div>
        <h3>{{data.title}} - {{index}}</h3>
        <div class="gift-description">{{data.description}}</div>
        <div>
          <label>用户ID号：</label>{{data.id}}
          <br />
          <label>兑换时间：</label>{{data.time}}
          <br />
          <label>礼券状态：</label>已销核
        </div>
      </div>
    </li>
  </ul>
</template>
<script>
export default {

  name: 'voucher',

  data () {
    return {
      datas: [
        {"date": "12-11", "title": "星爸爸礼品券", "description": "券描述券描述券描述券描述券描述券描述券描述券描述", "id": "14738908909", "time": "2016-12-10 12:32:10"}
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
@import "src/sass/tobe/function";
.gift-list {
  margin-top: rem(20);
  background: #fff;
  li {
    @include display(flex);
    box-shadow: inset 0 0 0 0 #E9E9E9;
    padding: rem(36) rem(30);
    font-size: rem(28);
    color: #2A2A2A;
    .gift-time {
      font-size: rem(34);
      color: #E6133C;
      line-height: rem(36);
      margin: rem(8) rem(30) 0 0;
    }
    h3 {
      color: #222;
      font-size: rem(34);
      font-weight: normal;
    }
    .gift-description {
      color: #aaa;
      font-size: rem(24);
      margin-bottom: rem(12);
      width: rem(452);
      height: rem(30);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    label {
      color: #999;
    }
  }
}
</style>

