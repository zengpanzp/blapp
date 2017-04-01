# LoadAPI(apiName, data, callback)

apiName | 参数 | 动作 | 中间件
---|---|---|---
BLAPPSiteQueryAdDeployAPIManager | {resourceId: ''} | 调接口 | site/queryAdDeploy.htm
BLPromotionQueryFlashCategoryAPIManager | {channelld: ''} | 调接口 | promotion/queryFlashCatetory.htm
BLPromotionQueryFlashListAPIManager | {channelid: '',type: '', pageNum: '', pageSize: '', parameter: '', flashCategories: ''} | 调接口 | promotion/queryFlashList.htm
BLPromotionQueryFlashGoodsAPIManager | {channelid: '', flashId: ''} | 调接口 | promotion/queryFlashGoods.htm
BLQueryBrandDetailSearchActivityAPIManager | {actCode: '', sorCol: '',sorTye:'',pageSize:'',pageNo:'',isava:'',brandSid:''} | 调接口 | search/queryActivityProduct.htm
BLSearchByKeyWordAPIManager | {channelSid: '', c: '', searchInfo:{sorCol:'', sorTye:'',pageModel:{pageNo:'',pageSize:''}}} | 调接口 | search/searchByKeyWord.htm
BLAPPSiteQueryAdDeployAPIManager | {resourceId:''} | 调接口 | site/queryAdDeploy.htm
BLQueryProductListAPIManager | {fkRankid: ''} | 调接口 | content/queryrankProductList.htm
BLQueryRankListAPIManager | {rankType: ''} | 调接口 | content/queryRankList.htm

暂时用到这些

# LoadMethod(targetName, actionName, data, callback)

targetName | actionName | 参数 | 动作
---|---|---|---
BLGoodsDetail | BLGoodsDetailViewController | {goodsid:'',goodsName:'',goodsPrice:'',goodsImageUrl:'',isGiftGoods:Boolean} | h5跳native商品详情页
SearchList | SearchList | {searchkey:''} | h5跳native搜索列表页
BLAdvertResource | BLAdvertResourceController | {} | 资源位跳转
BLCategory | BLCategoryViewController | { categoryId: '' } | 跳native分类

# 其他native方法

```js
// 设置title
window._setNativeTitle('')
// 分享,native会调window下的commShare方法
window.commShare = function() {
    window.CTJSBridge.LoadMethod('BLShare', 'H5BLShareParams', {
        url: '',
        title: '',
        content: ''
    })
}
```


