import router from '@/router'
import store from '@/store'

const WhiteList = ['/login', '/404']
router.beforeEach((to, from, next) => {
  //  console.log(to)
  // console.log(from)
  // next(true)
  if (store.getters.token) { // 处于登陆状态
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else { // 没有登陆
    if (WhiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
