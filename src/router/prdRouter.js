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
  /* 陈鹏 领券中心 */
  {
    path: '/banknote',
    meta: {
      title: '领券中心'
    },
    component: r => require.ensure([], () => r(require('../views/coupon/banknote')), 'banknote')
  },
  /* 陈鹏 礼品卡首页 */
  {
    path: '/giftCardHome',
    meta: {
      title: '礼品卡',
      class: 'giftcard-home'
    },
    component: r => require.ensure([], () => r(require('../views/giftcard/giftcard-home')), 'giftCardHome')
  },
  /* 陈鹏 礼品卡分类页 */
  {
    path: '/giftCardTheme',
    meta: {
      title: '主题',
      class: 'giftcard-theme'
    },
    component: r => require.ensure([], () => r(require('../views/giftcard/giftcard-theme')), 'giftCardTheme')
  }
]
