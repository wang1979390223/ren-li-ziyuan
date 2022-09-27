import { login } from '@/api/login'
import { getUserInfo, getUserDetailById } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: null,
    userInfo: {},
    hrsaastime: 0
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    },
    REMOVE_TOKEN(state) {
      state.token = null
    },
    REMOVEUSER_INFO(state) {
      state.userInfo = {}
    },
    SET_HRSAASTIME(state, hrsaastime) {
      state.hrsaastime = hrsaastime
    }
  },
  actions: {
    async loginAction({ commit }, payload) {
      // 接口
      const data = await login(payload)
      // console.log(data)
      commit('SET_TOKEN', data)
      // 首次登录时间相对时间+new Date()
      commit('SET_HRSAASTIME', +new Date())
    },
    async getUserInfo({ commit }) {
      const res = await getUserInfo()
      const res1 = await getUserDetailById(res.userId)
      console.log(res1)
      const result = { ...res, ...res1 }
      commit('SET_USER_INFO', result)

      // return res
      return JSON.parse(JSON.stringify(result))
    },
    // 清除tokentui
    logout({ commit }) {
      commit('REMOVE_TOKEN')
      commit('REMOVEUSER_INFO')
    }
  },
  getters: {

  }
}
