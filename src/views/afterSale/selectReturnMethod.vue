<style lang="scss" src="./css/selectReturnMethod.scss" scoped></style>
<template>
  <div class="goods-box">
    <div class="goods-item">
      <div class="goods-name">商品返回方式 <span class="mixin">*</span></div>
      <div class="item-li">
        <ul class="return-type">
          <li v-for="(item, index) in returnType" :class="{ disabled: item.isDisabled }" @click="!item.isDisabled && item.onClick && item.onClick()">
          {{ item.label }}
          </li>
        </ul>
      </div>
      <div class="item-li">商品返回地址将在服务单审核通过后以<span class="message-way">短信方式</span>告知<br>
      或者在<span class="after-sale-recode">售后记录</span>中查询。<br>
      不支持平邮、快递到付，给您带来的不便请您谅解！
      </div>
    </div>
    <div class="goods-item">
      <div class="goods-name">取件信息</div>
      <div class="item-li address-box" @click="chooseAdd()">
        <div class="address-inner">
          <div class="address-head">
            <span class="address-name">{{address.receiver}}</span>
            <span class="address-phone">{{address.phone}}</span>
          </div>
          <div class="address-info">{{address.address}}</div>
        </div>
      </div>
    </div>
    <div class="goods-item" v-show="selectTime">
      <div class="goods-name">取件时间</div>
      <div class="item-li select-time">
        <span @click="year()">{{defaultValue}}</span>
        <span @click="timeChoose()">{{time}}</span>
      </div>
    </div>
    <bl-slide-bar :showModal="chooseYear"
            @modalChange="chooseYear = $event"
            :list="yearList"
            v-model="defaultValue"
            title="年份"></bl-slide-bar>
    <bl-slide-bar :showModal="choosetime"
            @modalChange="choosetime = $event"
            :list="period"
            v-model="time"
            title="时间"></bl-slide-bar>
    <div class="goods-item">
      <div class="item-li">
        <div class="flex-m"><input type="checkbox" class="ni-ming" name="" v-model="niMing">我已阅读<a href="http://m.bl.com/h5-web/cms/viewHelpCmsContent.html?pageId=782" class="after-sale-recode">《退换货条款》</a></div>
      </div>
    </div>
    <div class="btn-box">
      <bl-button :disabled="!niMing" @click="submitOrder">提交</bl-button>
    </div>
  </div>
</template>

<script>
import api from './api'
export default {

  name: 'selectReturnMethod',

  data () {
    return {
      obj: {},
      hasFreight: '',
      deliveryList: [],
      address: null,
      methodCode: '',
      provinceCode: '866',
      max: 7,
      yearList: [],
      period: [],
      defaultValue: '',
      time: '',
      returnType: [{
        label: '自行寄回',
        isDisabled: true,
        onClick: () => {
          this.selectTime = false
        }
      }, {
        label: '上门取件',
        isDisabled: true,
        onClick: () => {
          this.selectTime = true
        }
      }, {
        label: '用户送回',
        isDisabled: true
      }],
      chooseYear: false,
      choosetime: false,
      niMing: false,
      selectTime: false,
      deliveryMethodCode: '',
      deliveryMethodName: ''
    };
  },
  created() {
  	this.$loading.close()
    if (this.$route.params.obj) {
      this.obj = JSON.parse(decodeURIComponent(this.$route.params.obj))
      console.log("qqq", JSON.stringify(this.obj))
      this.deliveryList = this.obj.deliveryMethodList
      this.hasFreight = this.obj.hasFreight
      this.address = this.obj.address
      this.methodCode = this.obj.deliveryMethodList[0]
      console.log(this.methodCode)
    }
    this.updataPage()
  },
  methods: {
    submitOrder() {
      if (this.hasFreight == 1) {
        this.$modal({
          title: '提示',
          content: '本商品已退过一次运费,本次不予退回',
          buttons: [{
            text: '取消',
            onClick: () => {
              this.$toast('取消')
            }
          }, {
            text: '确定',
            onClick: () => {
              this.submitRen()
            }
          }]
        })
      } else {
        this.submitRen()
      }
    },
    // 选择年份
    year() {
      this.chooseYear = true
    },
    // 选择时间
    timeChoose() {
      this.choosetime = true
    },
    // 选择地址
    chooseAdd() {
      window.CTJSBridge.LoadMethod('BLAddressCRUD', 'addressViewController', {
      }, {
        success: data => {
          console.log("zpzpzpzzzzzz" + data)
          if (data) {
            let obj = JSON.parse(data)
            this.address.receiver = obj.receiverName
            this.address.phone = obj.receiverMphone
            this.address.address = obj.address
            this.provinceCode = obj.province
            if (this.provinceCode != '866') {
              this.$modal({
                title: '提示',
                content: '请重新选择取件地址,该地址超出取件范围!',
                buttons: [{
                  text: '取消',
                  onClick: () => {
                   this.$toast('取消')
                  }
                }, {
                  text: '修改取件地址',
                  onClick: () => {
                    this.chooseAdd()
                  }
                }]
              })
            }
          }
        },
        fail: data => {
          console.log(data)
        },
        progress: data => { console.log(data) }
      })
    },
    updataPage() {
      for (let i of this.deliveryList) {
        if (i == 2) {
          this.getPick()
        }
        this.returnType[i - 1].isDisabled = false
      }
      this.returnType.forEach((item, index) => {
        if (!item.isDisabled) {
          this.deliveryMethodCode = index + 1
          this.deliveryMethodName = item.label
        }
      })
      console.log("code", this.deliveryMethodCode + "name" + this.deliveryMethodName)
    },
    getFormatDate(num) {
      let now = new Date()
      now.setDate(now.getDate() + num)
      let week = ['日', '一', '二', '三', '四', '五', '六']
      return now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' ( 周' + week[now.getDay()] + ')'
    },
    getPick() {
      api.getPicker({
        'type': 'return_sendback_time'
      }).then(data => {
        this.$loading.close()
        console.log("getPick", data.body.obj)
        if (data.body.obj) {
          let obj = JSON.parse(data.body.obj)
          for (let i = 0; i < obj.list.length; i++) {
            if (parseInt(obj.list[i].value) == 9999) {
                this.max = parseInt(obj.list[i].label)
            } else {
              this.period.push({
                value: obj.list[i].label,
                label: obj.list[i].label
              })
            }
          }
          console.log("zp", JSON.stringify(this.period))
          this.time = this.period[0].value
          for (let i = 0; i <= this.max; i++) {
            this.yearList.push({
              label: this.getFormatDate(i),
              value: this.getFormatDate(i)
            })
          }
          this.defaultValue = this.yearList[0].value
          console.log("####", JSON.stringify(this.yearList))
        } else {
          this.$toast(data.body.msg)
        }
      }, err => {
        console.log(err)
      })
    },
    submitRen() {
      if (this.provinceCode != '866') {
        this.niMing = false
        return
      }
      let req = {
        orderNo: this.obj.orderNo,
        orderDetailNo: this.obj.orderDetailNo,
        memberId: this.obj.memberId,
        returnQuantity: this.obj.returnQuantity,
        applyCertificate: this.obj.applyCertificate,
        testReport: this.obj.testReport,
        serviceType: this.obj.serviceType,
        refundMethodCode: this.obj.refundMethodCode,
        refundMethodName: this.obj.refundMethodName,
        reasonCode: this.obj.reasonCode,
        reasonName: this.obj.reasonName,
        reasonDesc: this.obj.reasonDesc,
        reasonImageList: this.obj.reasonImageList,
        reasonImageListCephUrl: this.obj.reasonImageListCephUrl,
        deliveryMethodCode: this.deliveryMethodCode,
        deliveryMethodName: this.deliveryMethodName,
        refundApplySource: 1,
        contactPhone: this.address.phone,
        contactPeople: this.address.receiver,
        state: this.provinceCode,
        city: this.address.cityCode,
        district: this.address.districtCode,
        detailAddr: this.address.address,
        pickupDate: this.defaultValue.split("(")[0].trim(),
        pickupStartTime: this.time.split("-")[0].trim(),
        pickupEndTime: this.time.split("-")[1].trim()
      }
      api.submitOdr(req).then(data => {
        this.$loading.close()
        console.log("submit", data.body.obj)
        if (data.body.obj) {
          let obj = JSON.parse(data.body.obj)
          obj.serviceType = this.obj.serviceType
          this.$router.push({
            name: 'saleSuccess',
            params: {
              data: encodeURIComponent(JSON.stringify(obj))
            }
          })
        } else {
          this.$toast(data.body.msg)
        }
      })
    }
  }
};
</script>
