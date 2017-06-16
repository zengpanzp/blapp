/* creat by chenpeng */

/**
 * 有时候我们需要从 store 中的 state 中派生出一些状态，例如对列表进行过滤并计数,可以认为是 store 的计算属性,
*  getters: {
      doneTodos: state => {
        return state.todos.filter(item => item.done)
      }
    }
 */

export const checkoutStatus = state => state.cart.checkoutStatus

export const cartProducts = state => {
  return state.cart.added.map(({ id, quantity }) => {
    const product = state.products.all.find(p => p.id === id)
    return {
      title: product.title,
      price: product.price,
      quantity
    }
  })
}

export const allProducts = state => state.cart.products
