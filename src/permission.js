import router from '@/router'
import store from '@/store'
// import getUserInfo from '@/api/user'
const WhiteList = ['/login', '/404']
router.beforeEach(async(to, from, next) => {
  //  console.log(to)
  // console.log(from)
  // next(true)
  if (store.getters.token) { // 处于登陆状态
    if (!store.getters.userId) {
      await store.dispatch('user/getUserInfo')
    }
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
