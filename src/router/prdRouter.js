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
    // meta: {
    //   title: '领券中心'
    // },
    component: r => require.ensure([], () => r(require('../views/coupon/banknote')), 'banknote')
  },
  /* 神马 签到 日签 */
  {
    path: '/daysign',
      meta: {
    title: '签到'
  },
    component: r => require.ensure([], () => r(require('../views/sign/daysign')), 'daysign')
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
  /* 神马 充值缴费 手机充值 type=1 */
  {
    path: '/recharge/iphone/:type',
    component: r => require.ensure([], () => r(require('../views/recharge/iphone')), 'iphone')
  },
  /* 神马 充值缴费 固话充值 */
  {
    path: '/recharge/fixedphone',
    component: r => require.ensure([], () => r(require('../views/recharge/fixedphone')), 'fixedphone')
  },
  /* 神马 充值缴费 付账单 */
  {
    path: '/recharge/orderlist',
      component: r => require.ensure([], () => r(require('../views/recharge/orderlist.vue')), 'orderlist')
  },
  /* 神马 充值缴费 付账单 */
  {
    path: '/recharge/bill',
    component: r => require.ensure([], () => r(require('../views/recharge/bill')), 'bill')
  },
  /* 神马 充值缴费 未支付账单 */
  {
    path: '/recharge/billempty',
    component: r => require.ensure([], () => r(require('../views/recharge/billempty')), 'billempty')
  },
  /* 神马 充值缴费 订单详情 */
  {
    path: '/recharge/orderdetail/:type/:orderNo',
    component: r => require.ensure([], () => r(require('../views/recharge/orderdetail')), 'orderdetail')
  },
  /* 神马 充值缴费 水费 type=1 电费 2 煤气3 */
  {
    path: '/recharge/rates/:type',
    component: r => require.ensure([], () => r(require('../views/recharge/rates')), 'rates'),
    children: [
      {path: 'category', component: r => require.ensure([], () => r(require('../views/recharge/_category')), '_category')},
      {path: 'company'}
    ]
  },
  /* 神马 充值缴费 支付页面  type=1 水费  2 电费  3煤气 */
  {
    path: '/recharge/pay/:type',
      component: r => require.ensure([], () => r(require('../views/recharge/pay')), 'pay')
  },
  /* 神马 充值缴费 缴费记录  type=1 水费  2 电费  3煤气 */
  {
    path: '/recharge/records/:type',
      component: r => require.ensure([], () => r(require('../views/recharge/records')), 'records')
  },
  /* 神马 充值缴费 有线电视和铁通 */
  {
    path: '/recharge/linetv/',
    component: r => require.ensure([], () => r(require('../views/recharge/linetv')), 'linetv'),
    children: [
      {path: 'company'}
    ]
  },
  /* 神马 充值缴费 游戏充值 */
  {
    path: '/recharge/game',
    component: r => require.ensure([], () => r(require('../views/recharge/game')), 'game')
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
    path: '/giftCardMore',
    meta: {
      notLoading: true
    },
    component: r => require.ensure([], () => r(require('../views/giftcard/giftcard-more')), 'giftCardMore')
  },
  /* 陈鹏 电子卡详情 */
  {
    path: '/eCardList/:orderNo/:orderTime',
    meta: {
      title: '电子卡详情'
    },
    component: r => require.ensure([], () => r(require('../views/E-card/ecardList')), 'eCardList')
  },
  /* 郭健 消息中心 */
  {
    path: '/messageCenter',
    meta: {
      title: '消息中心'
    },
    component: r => require.ensure([], () => r(require('../views/messageCenter/messageCenter')), 'messageCenter')
  },
  /* 郭健 消息中心 消息内容 */
  {
    path: '/messageList/:typeId/:title',
    component: r => require.ensure([], () => r(require('../views/messageCenter/messageList')), 'messageList')
  },
  /* 薛天玲 我的收藏 */
  {
    path: '/myCollection',
    meta: {
      title: '我的收藏'
    },
    component: r => require.ensure([], () => r(require('../views/myCollection/collection')), 'myCollection')
  },
  /* 薛天玲 安全中心 */
  {
    path: '/securityCenter',
    meta: {
      title: '安全中心',
      notLoading: true
    },
    component: r => require.ensure([], () => r(require('../views/securityCenter/securityCenter')), 'securityCenter'),
  },
  /* 薛天玲 安全中心 邮箱 */
  {
    path: '/securityCenter/myEmail',
    meta: {
      title: '我的邮箱'
    },
    component: r => require.ensure([], () => r(require('../views/securityCenter/myEmail')), 'myEmail')
  },
  /* 陈鹏 我的评价 */
  {
    path: '/myEvaluation',
    meta: {
      title: '我的评价'
    },
    component: r => require.ensure([], () => r(require('../views/myEvaluation/evaluation')), 'myEvaluation')
  },
  /* 曾攀 查看评价 */
  {
    path: '/seeComment/:comId/:type/:product',
    name: 'seeComment',
    meta: {
      title: '查看评价'
    },
    component: r => require.ensure([], () => r(require('../views/myEvaluation/seeComment')), 'seeComment')
  },
  /* 曾攀 商品评价 */
  {
    path: '/goodComment/:order/:product',
    name: 'goodComment',
    meta: {
      title: '商品评价'
    },
    component: r => require.ensure([], () => r(require('../views/myEvaluation/goodComment')), 'goodComment')
  }
]
