export const h5Router = [
  {
    path: '/h5Home',
    meta: {
      title: '首页',
      isWeb: true,
      notLoading: true
    },
    component: r => require.ensure([], () => r(require('../views/H5/h5Demo')), 'h5Demo')
  }
]
