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
    <div  v-infinite-scroll="getDetail" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <ul class="fit-store-list corner">
      <li class="corner"
       v-if="storeList.length>0" v-for="item in storeList" @click="go(item)">
        <img class="fit-store-img" src="./i/scene_01.png"/>
        <div class="fit-store-text">
            <p class="fit-store-name">{{item.storeName}}</p>
            <p>电话：{{item.phone}}</p>
            <p>地址：{{item.addr}}</p>
        </div>
        <div class="fit-store-logo">
            <p class="font-color-ash3 font-size-miner">{{getDistance(item.distance)}}</p>
            <div :id="item.storeCode + '/'+ item.storeType">
            <img src="./i/doorlist-adress.png"></div>
            <p class="logo-store" v-if="item.curUsableStock && item.curUsableStock == 0">已借光了</p>
            <p class="logo-store" v-if="item.curUsableStock && item.curUsableStock != 0">还剩{{item.curUsableStock}}把</p>
            <p class="logo-store store-park"  @click="goPacking($event, item.index)" v-if="type == '6'">查看停车</p>
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
      busy: true,
      province: '上海市',
      city: '市辖区',
      area: '黄浦区',
      noShop: false,
      storeList: [],
      index: 0,
      longitude: '',
      latitude: '',
      district: {name: '普陀区', id: '', adCode: ''}
    }
  },
  created() {
    this.$loading.close()
    if (decodeURIComponent(this.$route.params.power)) {
      this.power = JSON.parse(decodeURIComponent(this.$route.params.power))
    }
    switch (this.power.rightCode) {
      case '002':
          this.type = 13
          break
      case '004':
          this.type = 6
          break
      case '007':
          this.type = 15
          break
      case '008':
          this.type = 14
          break
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
      let u = navigator.userAgent
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
      let isiOS = !!u.match(/\(i[^]+( U)? CPU.+Mac OS X/) // ios终端
      if (isAndroid) {
          window.CTJSBridge.LoadMethod('Location', 'getLocation', {
          success: data => {
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
      this.busy = true
      this.noShop = false
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
          let obj = JSON.parse(data.body.obj)
          if (obj && obj.list) {
            this.busy = false
            for (let i = 0; i < obj.list.length; i++) {
                if (!obj.list[i].logo) {
                    if (obj.list[i].storeType == '1010') {
                        // 百货
                        obj.list[i].logoUrl = './i/common_shore_mall.png'
                    } else if (obj.list[i].storeType == '1020') {
                        // 购物中心
                        obj.list[i].logoUrl = './i/common_shore_mall.png'
                    } else if (obj.list[i].storeType == '1030') {
                        // 奥特莱斯
                        obj.list[i].logoUrl = './i/common_shore_mall.png'
                    } else if (obj.list[i].storeType == '2010') {
                        // 大卖场
                        obj.list[i].logoUrl = './i/common_shore_supermarket.png'
                    } else if (obj.list[i].storeType == '2020') {
                        // 标超
                        obj.list[i].logoUrl = './i/common_shore_supermarket.png'
                    } else if (obj.list[i].storeType == '2030') {
                        // 便利店
                        obj.list[i].logoUrl = './i/common_shore_supermarket.png'
                    }
                } else {
                    obj.list[i].logoUrl = obj.list[i].logo
                }

                if (obj.list[i].memberStatus == '1') {
                    obj.list[i].attention = 1
                }
                // o2o (-1,自提-2, WiFi-3,室内导航-4, 美食等位-5,停车场-6,-7,-8,百联到家-11, 电影票-12)
                let currentIndex = 0
                let o2oArray = []
                if (obj.list[i].o2oArray) {
                    let o2oArrayAll = []
                    let o2oArrayStr = obj.list[i].o2oArray.split(',')
                    for (let j = 0; j < o2oArrayStr.length; j++) {
                        let o2o = o2oArrayStr[j]
                        if (o2o == '2' || o2o == '11' || o2o == '3' || o2o == '12' || o2o == '6' || o2o == '4' || o2o == '5') {
                            o2oArrayAll[currentIndex] = o2o
                            currentIndex++
                            if (o2o == '3') {
                                obj.list[i].hasWifi = '1'
                            } else if (o2o == '4') {
                                obj.list[i].hasLocation = '1'
                            } else if (o2o == '6') {
                                obj.list[i].hasPark = '1'
                            } else if (o2o == '2') {
                                obj.list[i].hasSelfReceive = '1'
                            }
                        }
                    }
                    obj.list[i].hasPark = '0'
                    // select top 4 by priority
                    currentIndex = 0
                    let o2oLabel = ['', '', '自提', 'WiFi', '室内导航', '美食等位', '停车场', '', '', '', '', '百联到家', '电影票']
                    let o2oPriority = ['2', '11', '3', '12', '6', '4', '5']
                    for (let j = 0; j < o2oPriority.length; j++) {
                        for (let k = 0; k < o2oArrayAll.length; k++) {
                            if (o2oPriority[j] == o2oArrayAll[k]) {
                                o2oArray[currentIndex] = o2oLabel[o2oArrayAll[k]]
                                currentIndex++
                                if (currentIndex == 4) {
                                    break
                                }
                            }
                        }
                        if (currentIndex == 4) {
                            break
                        }
                    }
                }

                if (!obj.list[i].listImage) {
                    obj.list[i].listImage = obj.list[i].detailImage
                }

                obj.list[i].o2oArray = o2oArray
                obj.list[i].index = this.index
                this.index++
                this.storeList = this.storeList.concat(obj.list[i])
            }
            if (obj.list.length < 10) {
              this.busy = true
            }
          } else {
            this.noShop = true
          }
        } else {
          this.noShop = true
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
          let obj = JSON.parse(data)
          this.province = obj.kBLAddressSelectPickerViewProvince.nm
          this.city = obj.kBLAddressSelectPickerViewCity.nm
          this.area = obj.kBLAddressSelectPickerViewDistrict.nm
          this.district.id = obj.kBLAddressSelectPickerViewDistrict.id
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
            let obj = data.body
            for (let i = 0; i < obj[0].cl.length; i++) {
                for (let j = 0; j < obj[0].cl[i].dl.length; j++) {
                    if (obj[0].cl[i].dl[j].cd == this.district.adCode) {
                        this.district.id = obj[0].cl[i].dl[j].id
                        this.district.name = obj[0].cl[i].dl[j].nm
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
    },
    go(item) {
      let reqData = {
            message: item.storeCode,
            storeType: item.storeType,
            storeId: item.storeId
      }
      switch (item.storeType) {
        case '1010':
          // routerName = 'shoppingCenterPage'
          window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
            pageId: 'shoppingCenter',
            params: JSON.stringify(reqData)
          })
          break;
        case '1020':
          // routerName = 'shoppingCenterPage'
          window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
            pageId: 'shoppingCenter',
            params: JSON.stringify(reqData)
          })
          break;
        case '1030':
          // routerName = 'orseletPage'
          window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
            pageId: 'orselet',
            params: JSON.stringify(reqData)
          })
          break;
        case '2010':
          // routerName = 'standardSuperMarketPage'
          window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
            pageId: 'standardSuperMarket',
            params: JSON.stringify(reqData)
          })
          break;
        case '2020':
          // routerName = 'standardSuperMarketPage'
          window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
            pageId: 'standardSuperMarket',
            params: JSON.stringify(reqData)
          })
          break;
        case '2030':
          // routerName = 'convenienceStoresPage'
          window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
            pageId: 'convenienceStores',
            params: JSON.stringify(reqData)
          })
          break;
        default:
          // routerName = 'shoppingCenterPage'
          window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
            pageId: 'shoppingCenter',
            params: JSON.stringify(reqData)
          })
          break;
      }
      // this.$router.push({path: routerName + '/' + item.storeCode + '/' + item.storeType + '/' + item.storeId})
    },
    getDistance(distance) {
      if (distance) {
          let distanc = parseInt(distance)
          if (distanc < 100) {
              distance = '<100m'
          } else if (distanc < 1000) {
              distance = distanc + 'm'
          } else {
              distance = parseFloat(distanc / 1000).toFixed(1) + 'km'
          }
          return distance
      }
    },
    goPacking($event, index) {
      $event.stopPropagation()
      let store = this.storeList[index]
      store.varCharge = '暂无';
      if (store.charge != null && store.charge != '') {
          store.varCharge = store.charge;
      }
      let arr = store.o2oList.split(' ');
      store.hasFindCar = 0;
      store.hasPayCarFee = 0;
      if (arr.indexOf('7') > -1) {
          store.hasFindCar = 1;
      }
      if (arr.indexOf('8') > -1) {
          store.hasPayCarFee = 1;
      }
      console.log("dfadfd", JSON.stringify(store))
      window.CTJSBridge.LoadMethod('BLPageManager', 'NavigateWithStringParams', {
        pageId: 'parkinglotInfo',
        params: JSON.stringify(store)
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
