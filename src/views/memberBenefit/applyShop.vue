<style lang="scss" src="./css/applyShop.scss" scoped></style>
<template>
<div class="new">
    <div class="freedom-top">
        <div class="interestsPic"><img :src="power.pic"/></div>
        <div class="freedom-name">
              {{power.title}}
            <div class="freedom-text">
              <div v-for="item in power.viceTitle">{{item}}</div><br/>
            </div>
        </div>
    </div>
    <ul class="fit-store" @click="getCity">
        <li>{{province}}<i class="iconfont arrow-back"></i></li>
        <li>{{city}}<i class="iconfont arrow-back"></i></li>
        <li>{{area}}<i class="iconfont arrow-back"></i></li>
    </ul>
    <div  v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <ul class="fit-store-list corner">
      <li class="corner"
        id="">
        <img class="fit-store-img" src=""/>

        <div class="fit-store-text">
            <p class="fit-store-name"></p>

            <p>电话：</p>

            <p>地址：</p>
        </div>
        <div class="fit-store-logo">
            <p class="font-color-ash3 font-size-miner"></p>
            <div id="">
            <img src=""></div>
            <p class="logo-store">已借光了</p>
            <p class="logo-store">还剩 把</p>
            <p class="logo-store store-park" id="">查看停车</p>
        </div>
      </li>
      </ul>
    </div>
    <div class="empty storeEmpty store-margin" v-if="noShop">
        暂无相关店铺
    </div>
</div>
</template>

<script>
import api from './api'
import utils from 'src/utils'
export default {

  name: 'applyShop',

  data () {
    return {
      power: {},
      type: 13,
      busy: false,
      province: '上海市',
      city: '市辖区',
      area: '黄浦区',
      noShop: false,
      storeList: [],
      longitude: '',
      latitude: '',
      district: {name: '普陀区', id: '', adCode: ''}
    };
  },
  created() {
    this.$loading.close()
    if (decodeURIComponent(this.$route.params.power)) {
      this.power = JSON.parse(decodeURIComponent(this.$route.params.power))
    }
    switch (this.power.rightCode) {
      case '002':
          this.type = 13;
          break;
      case '004':
          this.type = 6;
          break;
      case '007':
          this.type = 15;
          break;
      case '008':
          this.type = 14;
          break;
    }
    this.getPostion()
  },
  mounted() {
    this.$nextTick(() => {
      $(".freedom-top").css("background", this.power.backColor)
    })
  },
  methods: {
    getPostion() {
      let u = navigator.userAgent;
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; // android终端
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
      if (isAndroid) {
          window.CTJSBridge.LoadMethod('Location', 'getLocation', {
          success: data => {
            console.log("565656565" + data)
            let obj = JSON.parse(data)
            this.longitude = obj.longitude
            this.latitude = obj.latitude
            this.distirct.adCode = obj.adCode
          },
          fail: data => {
            console.log(data)
          },
          progress: data => { console.log(data) }
        })
      } else if (isiOS) {
        window.CTJSBridge.LoadMethod('Location', 'getLocation', '', {
        success: data => {
          let obj = JSON.parse(data)
          this.longitude = obj.longitude
          this.latitude = obj.latitude
          this.getCurDistrictForIOS()
        },
        fail: data => {
          console.log(data)
        },
        progress: data => { console.log(data) }
      })
      } else {
        this.getDetail()
      }
    },
    getCurDistrictForIOS() {
      api.selectForIos(JSON.stringify({
        location: this.longitude + ',' + this.latitude
      })).then(data => {
        this.$loading.close()
        console.log("#####selectForIos" + data.body.obj)
        if (data.body.obj) {
          let obj = JSON.parse(data.body.obj)
          if (obj && obj.regeocode && obj.regeocode.addressComponent) {
            this.district.adCode = obj.regeocode.addressComponent.adcode
          }
        }
        this.getAllJson()
      }, err => {
        console.log(err)
        this.getAllJson()
      })
    },
    getDetail() {
      api.selectShop(JSON.stringify({area: this.district.id,
        o2oKey: this.type,
        longitude: this.longitude,
        lantitude: this.latitude,
        range: "6000",
        pageSize: 10,
        curPage: 1})).then(data => {
        this.$loading.close()
        console.log("getDetail-#####", data.body.obj)
        if (data.body.obj) {
        //  let obj = JSON.parse(data.body.obj)
        } else {
          this.$toast(data.body.msg)
        }
      }, err => {
        console.log(err)
      })
    },
    getCity() {
      window.CTJSBridge.LoadMethod('AddressSelectPickerView', 'show', {
        title: "请选择地区",
        limitedProvinceIds: ["866"]
      }, {
        success: data => {
          console.log("zpzpzpz" + data)
          this.province = JSON.parse(data).kBLAddressSelectPickerViewProvince.nm
          this.city = JSON.parse(data).kBLAddressSelectPickerViewCity.nm
          this.area = JSON.parse(data).kBLAddressSelectPickerViewDistrict.nm
          this.distirct.id = JSON.parse(data).kBLAddressSelectPickerViewDistrict.id
          this.storeList = []
          this.getDetail()
        },
        fail: data => {
          console.log(data)
        },
        progress: data => { console.log(data) }
      })
    },
    getAll() {
      api.selectCity(JSON.stringify({
        'type': '1',
        'timestamp': utils.getTimeFormatToday(),
        'sysid': '1103'
      })).then(data => {
        this.$loading.close()
        console.log("pppppp", data.body.obj)
      }, err => {
        console.log(err)
      })
    },
    getAllJson() {
      try {
        api.queryAllProvince().then(data => {
          if (data.body) {
            console.log("cp", data.body)
            let obj = data.body
            for (let i = 0; i < obj[0].cl.length; i++) {
                for (let j = 0; j < obj[0].cl[i].dl.length; j++) {
                    if (obj[0].cl[i].dl[j].cd == this.district.adCode) {
                        this.district.id = obj[0].cl[i].dl[j].id;
                        this.district.name = obj[0].cl[i].dl[j].nm;
                    }
                }
            }
            this.getDetail()
          }
        }, err => {
          console.log(err)
        })
        } catch (err) {
          console.log(err)
      }
    }
  }
};
</script>

<style lang="css" scoped>
</style>
