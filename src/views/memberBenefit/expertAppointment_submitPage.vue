<template>
  <div class="expert-submit">
    <div class="submit-title">
      <div class="title-item">
        <span class="title-left">就诊医院：</span>
        <span class="title-name">{{ datas.hospital }}</span>
      </div>
      <div class="title-item">
        <span class="title-left">就诊科室：</span>
        <span class="title-name">{{ datas.departmentname }}</span>
      </div>
      <div class="title-item">
        <span class="title-left">就诊时间：</span>
        <span>{{ datas.appointTime }}</span>
      </div>
    </div>
    <div class="submit-space">就诊人信息</div>
    <div class="submit-box">
      <bl-cell title="就诊人姓名" :showArrowRight="false">
        <input slot="cell-main" type="text" v-model="nickName" placeholder="请输入您的真实姓名">
      </bl-cell>
      <bl-cell title="身份证号" :showArrowRight="false">
        <input slot="cell-main" type="tel" v-model="identityCardNumber" placeholder="请输入您的身份证号">
      </bl-cell>
      <bl-cell title="联系电话" :showArrowRight="false">
        <input slot="cell-main" type="tel" v-model="phone" placeholder="请输入您的联系电话">
      </bl-cell>
      <div class="first-box flex-m flex-space">
        <div class="box-title">是否第一次到该医院就诊</div>
        <div class="box-main">
          <label>
            <input type="radio" name="first" value="1" v-model="first">
            <span class="time-btn">是</span>
          </label>
          <label>
            <input type="radio" name="first" value="0" v-model="first">
            <span class="time-btn">否</span>
          </label>
        </div>
      </div>
    </div>
    <bl-button type="expert-btn" @click="confirm">提交</bl-button>
  </div>
</template>

<script>
import api from './api/expertReserve'
import utils from 'src/utils'
export default {

  name: 'expertAppointment_submitPage',

  data () {
    return {
      week: ["日", "一", "二", "三", "四", "五", "六"],
      datas: {},
      nickName: '',
      identityCardNumber: '',
      phone: '',
      first: '1'
    };
  },
  created() {
    try {
      this.datas = JSON.parse(this.$route.query.data)
      this.datas.appointTime = this.datas.date + '（周' + this.week[new Date(String(this.datas.date).replace(/-/g, "/")).getDay()] + '）' + (this.datas.visittimeshow == 1 ? '上午' : '下午')
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    confirm() {
      let partn = /^[\u4E00-\u9FA5]{2,4}$/;
      if (!this.nickName || !partn.exec(this.nickName)) {
        this.$toast('请输入真实姓名')
        return false
      }
      let regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(((^[1-9]\d{5}(1[89]|20)\d{2})(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])(\d{4})|\d{3}[Xx])$)$/;
      if (!this.identityCardNumber || !this.identityCardNumber.match(regIdCard)) {
        this.$toast('请输入正确的身份证号码')
        return false;
      }

      let phonePatrn = /^1\d{2}(-?\d{4}){2}$/;
      if (!this.phone || !phonePatrn.exec(this.phone)) {
        this.$toast('请输入正确的手机号码')
        return false;
      }
      if (this.identityCardNumber.length == 18) {
        var idCardWi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; // 将前17位加权因子保存在数组里
        var idCardY = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 这是除以11后，可能产生的11位余数、验证码，也保存成数组
        var idCardWiSum = 0;
        for (var i = 0; i < 17; i++) {
          idCardWiSum += this.identityCardNumber.substring(i, i + 1) * idCardWi[i];
        }
        var idCardMod = idCardWiSum % 11; // 计算出校验码所在数组的位置
        var idCardLast = this.identityCardNumber.substring(17); // 得到最后一位身份证号码
        if (idCardMod == 2) {
          if (idCardLast != "X" && idCardLast != "x") {
            this.$toast('请输入正确的身份证号码')
            return false;
          }
        } else {
          // 用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
          if (idCardLast != idCardY[idCardMod]) {
            this.$toast('请输入正确的身份证号码')
            return false;
          }
        }
      }
      let splitDate = this.datas.visitdate.split('-')
      let submitData = {
        ruleCode: '20160624152997',
        supplierCode: '001',
        supplierName: this.datas.hospital,
        deptCatCode: this.datas.deptCatCode,
        deptCat: this.datas.departmentname,
        bookDate: splitDate[0] + splitDate[1] + splitDate[2],
        morningAfternoon: String(this.datas.visittimeshow),
        patientName: this.nickName,
        patientIdCard: this.identityCardNumber,
        patientMobile: this.phone,
        isFirst: String(this.first),
        memberId: utils.dbGet('userInfo').member_id,
        channelId: 1,
        memberMobile: utils.dbGet('userInfo').mobile
      }
      console.log('提交申请上送报文', submitData)
      api.submitHospitalBookInf(submitData).then(res => {
        if (res.body.obj) {
          let resData = JSON.pare(res.body.obj)
          console.log('提交返回', resData)
          this.$router.replace({
            path: '/expertAppointment_successPage'
          })
        } else {
          this.$toast(res.body.msg)
        }
      })
    }
  }
};
</script>

<style lang="scss">
  @import "src/sass/tobe/function";
  .expert-submit{
    .submit-box{
      .bl-cell .bl-cell-title{
        width: rem(160);
      }
    }
  }
</style>
<style lang="scss" scoped>
  @import "src/sass/tobe/function";
  .expert-submit{
    background-color: #efeff4;
    .submit-title{
      background-color: #fff;
      padding: rem(20) rem(30);
      font-size: rem(28);
      .title-item{
        line-height: rem(60);
        .title-left{
          color: #999;
        }
        span{
          color: #000;
          &.title-name{
            color: #2ecc71;
          }
        }
      }
    }
    .submit-space{
      line-height: rem(90);
      padding: 0 rem(30);
      font-size: rem(32);
      color: #999;
    }
    .submit-box{
      background-color: #fff;
    }
    .first-box{
      min-height: rem(88);
      font-size: rem(28);
      border-bottom: 1px solid #ddd;
      margin: 0 rem(20);
      .box-main{
        label{
          float: left;
          position: relative;
          margin-left: rem(20);
        }
        .time-btn{
          padding: 0 rem(30);
          line-height: rem(55);
          border: 1px solid #efefef;
          border-radius: rem(8);
          background-color: #fff;
          display: block;
        }
        input{
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
          &:checked + .time-btn{
            color: #fff;
            background-color: #2ecc71;
          }
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
  }
</style>
