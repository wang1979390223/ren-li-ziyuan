import { login } from '@/api/login'
export default {
  namespaced: true,
  state: {
    token: null
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    }
  },
  actions: {
    async loginAction({ commit }, payload) {
      // 接口
      const data = await login(payload)
      // console.log(data)
      commit('SET_TOKEN', data)
    }
  },
  getters: {

  }
}
