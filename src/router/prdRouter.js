export const prdRouter = [
  /* 陈鹏 精品闪购首页 */
  {
    path: '/flashSales',
    meta: {
      title: '精品闪购'
    },
    component: r => require.ensure([], () => r(require('../views/flashSale/flashSales')), 'flashSales')
  },
  /* 陈鹏 精品闪购活动列表页 */
  {
    path: '/flashsaleproductspage/:flashId/:isStart',
    component: r => require.ensure([], () => r(require('../views/flashSale/productsListView')), 'flashsaleproductspage')
  },
  /* 陈鹏 电器城首页 */
  {
    path: '/electricMainPage',
    meta: {
      title: '电器城'
    },
    component: r => require.ensure([], () => r(require('../views/electricCity/electricHome')), 'electricMainPage')
  },
  /* 陈鹏 值得买首页 */
  {
    path: '/rankMainPage',
    meta: {
      title: '大家都在买'
    },
    component: r => require.ensure([], () => r(require('../views/rank/mainView')), 'rankMainPage')
  },
  /* 陈鹏 值得买分类页 */
  {
    path: '/rankSortPage/:blackId',
    component: r => require.ensure([], () => r(require('../views/rank/sortView')), 'rankSortView')
  },
  /* 神马 领券中心 cid 为优惠券id */
  {
    path: '/banknote',
    meta: {
      title: '领券中心'
    },
    component: r => require.ensure([], () => r(require('../views/coupon/banknote')), 'banknote')
  },
  /* 神马 百联财礼 */
  {
    path: '/blgift',
    meta: {
      title: '百联财礼'
    },
    component: r => require.ensure([], () => r(require('../views/bl-gift/bl-gift')), 'blgift')
  },
  /* 神马 百联财礼 */
  {

    path: '/blgift/goods/:jumpId/',
    component: r => require.ensure([], () => r(require('../views/bl-gift/goods')), 'giftgoods')
  },
  /* 神马 百联财礼  我的礼物中心 */
  {
    path: '/blgift/mygift',
    component: r => require.ensure([], () => r(require('../views/bl-gift/bl-mygift')), 'blmygift')
  },
  /* 神马 充值缴费 首页 */
  {
    path: '/recharge',
    meta: {
      title: '充值缴费'
    },
    component: r => require.ensure([], () => r(require('../views/recharge/index')), 'index')
  },
  /* 神马 充值缴费 手机充值 */
  {
    path: '/recharge/iphone',
    component: r => require.ensure([], () => r(require('../views/recharge/iphone')), 'iphone')
  },
  /* 神马 充值缴费 固话充值 */
  {
    path: '/recharge/fixedphone',
    component: r => require.ensure([], () => r(require('../views/recharge/fixedphone')), 'fixedphone')
  },
  /* 神马 充值缴费 付账单 */
  {
    path: '/recharge/bill',
    component: r => require.ensure([], () => r(require('../views/recharge/bill')), 'bill')
  },
  /* 陈鹏 礼品卡首页 */
  {
    path: '/giftCardHome',
    meta: {
      title: '礼品卡'
    },
    component: r => require.ensure([], () => r(require('../views/giftcard/giftcard-home')), 'giftCardHome')
  },
  /* 陈鹏 礼品卡分类页 */
  {
    path: '/giftCardTheme/:jumpId/:themeName',
    component: r => require.ensure([], () => r(require('../views/giftcard/giftcard-theme')), 'giftCardTheme')
  },
  /* 陈鹏 礼品卡查看更多 */
  {
    path: '/giftCardMore/:jumpId/:themeName',
    component: r => require.ensure([], () => r(require('../views/giftcard/giftcard-more')), 'giftCardMore')
  },
  /* 陈鹏 电子卡详情 */
  {
    path: '/eCardList',
    meta: {
      title: '电子卡详情'
    },
    component: r => require.ensure([], () => r(require('../views/E-card/ecardList')), 'eCardList')
  }
]
