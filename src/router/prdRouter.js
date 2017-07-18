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
  // {
  //   path: '/rankMainPage',
  //   meta: {
  //     title: '大家都在买'
  //   },
  //   component: r => require.ensure([], () => r(require('../views/rank/mainView')), 'rankMainPage')
  // },
  /* 陈鹏 值得买分类页 */
  // {
  //   path: '/rankSortPage/:blackId',
  //   component: r => require.ensure([], () => r(require('../views/rank/sortView')), 'rankSortView')
  // },
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
    path: '/sign/daysign',
      meta: {
        title: '每日福利'
      },
    component: r => require.ensure([], () => r(require('../views/sign/daysign')), 'daysign')
  },
  /* 神马 百联财礼 */
  // {
  //   path: '/blgift',
  //   meta: {
  //     title: '百联财礼'
  //   },
  //   component: r => require.ensure([], () => r(require('../views/bl-gift/bl-gift')), 'blgift')
  // },
  /* 神马 百联财礼 */
  // {
  //   path: '/blgift/goods/:jumpId/',
  //   component: r => require.ensure([], () => r(require('../views/bl-gift/goods')), 'giftgoods')
  // },
  /* 神马 百联财礼  我的礼物中心 */
  // {
  //   path: '/blgift/mygift',
  //   component: r => require.ensure([], () => r(require('../views/bl-gift/bl-mygift')), 'blmygift')
  // },
  /* 神马 充值缴费 首页 */
  {
    path: '/recharge',
    meta: {
      title: '充值缴费'
    },
    component: r => require.ensure([], () => r(require('../views/recharge/index')), 'index')
  },
  /* 陈鹏 充值缴费 手机充值 type=1 */
  {
    path: '/recharge/iphone/:type',
    component: r => require.ensure([], () => r(require('../views/recharge/iphone')), 'iphone')
  },
  /* 陈鹏 充值缴费 固话充值 */
  {
    path: '/recharge/fixedphone',
    meta: {
      title: '固话/宽带充值'
    },
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
    component: r => require.ensure([], () => r(require('../views/recharge/bill')), 'bill'),
    children: [
      {path: 'category', component: r => require.ensure([], () => r(require('../views/recharge/_category')), '_category')}
    ]
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
  /* 神马 充值缴费 添加缴费账号 */
  {
    path: '/recharge/addAccount',
      component: r => require.ensure([], () => r(require('../views/recharge/addAccount')), 'addAccount'),
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
  /* 神马 充值缴费 支付成功页面 */
  {
    path: '/recharge/paysuccess',
      component: r => require.ensure([], () => r(require('../views/recharge/paysuccess')), 'paysuccess')
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
  /* 陈鹏 充值缴费 游戏充值 */
  {
    path: '/recharge/game',
    meta: {
      title: '游戏充值'
    },
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
    name: 'messageList',
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
  /* 薛天玲 设置 */
  {
    path: '/userCenter/myInfo',
    meta: {
      title: '设置',
      notLoading: true
    },
    component: r => require.ensure([], () => r(require('../views/userCenter/myInfo')), 'myInfo'),
  },
  /* 薛天玲 设置 会员资料 所属地址 */
  {
    path: '/userCenter/changeAddress',
    meta: {
      title: '修改地址'
    },
    component: r => require.ensure([], () => r(require('../views/userCenter/changeAddress')), 'changeAddress'),
  },
  /* 薛天玲 设置 其他个人资料 */
  {
    path: '/userCenter/otherInfo',
    meta: {
      title: '会员资料'
    },
    component: r => require.ensure([], () => r(require('../views/userCenter/otherInfo')), 'otherInfo'),
  },
  /* 薛天玲 设置 昵称 */
  {
    path: '/userCenter/nickName',
    meta: {
      title: '我的昵称'
    },
    component: r => require.ensure([], () => r(require('../views/userCenter/nickName')), 'nickName'),
  },
  /* 薛天玲 设置 我的车牌 */
  {
    path: '/userCenter/mycar',
    meta: {
      title: '我的车辆'
    },
    component: r => require.ensure([], () => r(require('../views/userCenter/myCar')), 'myCar'),
  },
  /* 薛天玲 安全中心 */
  {
    path: '/userCenter/securityCenter',
    meta: {
      title: '安全中心',
      notLoading: true
    },
    component: r => require.ensure([], () => r(require('../views/userCenter/securityCenter')), 'securityCenter'),
  },
  /* 薛天玲 安全中心 邮箱 */
  {
    path: '/userCenter/myEmail',
    meta: {
      title: '我的邮箱'
    },
    component: r => require.ensure([], () => r(require('../views/userCenter/myEmail')), 'myEmail')
  },
  /* 薛天玲 安全中心 登录密码 */
  {
    path: '/userCenter/enterPw',
    meta: {
      title: '我的密码'
    },
    component: r => require.ensure([], () => r(require('../views/userCenter/enterPw')), 'enterPw')
  },
  /* 薛天玲 安全中心 验证支付密码 */
  {
    path: '/userCenter/payPw',
    meta: {
      title: '我的支付密码'
    },
    component: r => require.ensure([], () => r(require('../views/userCenter/payPw')), 'payPw')
  },
  /* 薛天玲 安全中心 提交支付密码 */
  {
    path: '/userCenter/submitPw',
    meta: {
      title: '我的密码'
    },
    component: r => require.ensure([], () => r(require('../views/userCenter/submitPw')), 'submitPw')
  },
    /* 薛天玲 安全中心 验证身份 */
  {
    path: '/userCenter/checkPhone',
    meta: {
      title: '验证身份'
    },
    component: r => require.ensure([], () => r(require('../views/userCenter/checkPhone')), 'checkPhone')
  },
  /* 薛天玲 虚拟会员卡 */
  {
    path: '/memberCard',
    meta: {
      title: '百联通会员卡二维码'
    },
    component: r => require.ensure([], () => r(require('../views/memberCard/memberCard')), 'memberCard')
  },
    /* 薛天玲 安全中心 支付密码 未实名认证 */
  {
    path: '/userCenter/payPwAuth',
    meta: {
      title: '我的支付密码'
    },
    component: r => require.ensure([], () => r(require('../views/userCenter/payPwAuth')), 'payPwAuth')
  },
  /* 曾攀 我的评价 */
  {
    path: '/myEvaluation',
    meta: {
      title: '我的评价'
    },
    component: r => require.ensure([], () => r(require('../views/myEvaluation/evaluation')), 'myEvaluation')
  },
  /* 陈鹏 商品评价 */
  {
    path: '/addComment',
    meta: {
      title: '商品评价'
    },
    component: r => require.ensure([], () => r(require('../views/myEvaluation/addComment')), 'addComment')
  },
  /* 陈鹏 追加晒单 */
  {
    path: '/commentAfter',
    meta: {
      title: '追加晒单'
    },
    component: r => require.ensure([], () => r(require('../views/myEvaluation/commentAfter')), 'commentAfter')
  },
  /* 陈鹏 商品追评 */
  {
    path: '/addCommentAgain',
    meta: {
      title: '追加晒单'
    },
    component: r => require.ensure([], () => r(require('../views/myEvaluation/addCommentAgain')), 'addCommentAgain')
  },
  /* 陈鹏 查看评价 */
  {
    path: '/seeComment',
    meta: {
      title: '追加晒单'
    },
    component: r => require.ensure([], () => r(require('../views/myEvaluation/seeComment')), 'seeComment')
  },
  /* 郭健 联通专区 */
  {
    path: '/unicom',
    meta: {
      title: '联通专区'
    },
    component: r => require.ensure([], () => r(require('../views/unicom/unicom')), 'unicom')
  },
  /* 郭健 我的钱包 */
  {
    path: '/myWallet',
    meta: {
      title: '我的钱包'
    },
    component: r => require.ensure([], () => r(require('../views/myWallet/myWallet')), 'myWallet')
  },
  /* 郭健 我的钱包 我的余额 */
  {
    path: '/balance',
    component: r => require.ensure([], () => r(require('../views/myWallet/balance')), 'balance')
  },
  /* 郭健 我的钱包 我的余额 余额明细 */
  {
    path: '/balanceList',
    component: r => require.ensure([], () => r(require('../views/myWallet/balanceList')), 'balanceList')
  },
  /* 郭健 我的钱包 我的积分 */
  {
    path: '/points',
    component: r => require.ensure([], () => r(require('../views/myWallet/points')), 'points')
  },
  /* 郭健 我的钱包 我的ECP */
  {
    path: '/ECP',
    component: r => require.ensure([], () => r(require('../views/myWallet/ECP')), 'ECP')
  },
  /* 曾攀 会员权益 */
  {
    path: '/powerDetail',
    meta: {
      title: '会员权益'
    },
    component: r => require.ensure([], () => r(require('../views/memberBenefit/powerDetail')), 'powerDetail')
  },
  /* 曾攀 更多权益 */
  {
    path: '/blprivilegeClub',
    meta: {
      title: '更多权益',
    },
    component: r => require.ensure([], () => r(require('../views/memberBenefit/blprivilegeClub')), 'blprivilegeClub')
  },
  /* 曾攀  */
  {
    path: '/applyShop/:power',
    meta: {
      title: '适用门店',
    },
    component: r => require.ensure([], () => r(require('../views/memberBenefit/applyShop')), 'applyShop')
  },
  /* 神马 ecp 登录 */
  {
    path: '/login',
      meta: {
    title: '登录页面'
  },
    component: r => require.ensure([], () => r(require('../views/login/login')), 'login')
  },
  /* 神马 ecp 联合登录 */
  {
    path: '/bindLogin',
      meta: {
      title: '联合登录'
    },
    component: r => require.ensure([], () => r(require('../views/login/bindlogin')), 'bindLogin')
  },
  /* 神马 找回密码 */
  {
    path: '/findpass/:step',
      meta: {
      title: '找回密码'
    },
    component: r => require.ensure([], () => r(require('../views/login/findpass')), 'findpass')
  },
  /* 神马 ecp 注册 */
  {
    path: '/register',
      meta: {
    title: '注册'
  },
  component: r => require.ensure([], () => r(require('../views/login/register')), 'register')
},
  /* 郭健 转一转 */
  {
    path: '/lucky/:coupon/:ruleId/:isSigninFlag',
    meta: {
      title: '转一转'
    },
    component: r => require.ensure([], () => r(require('../views/lucky/lucky')), 'lucky')
  },
]
