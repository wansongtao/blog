import { createStore } from 'vuex'
import { getUserInfo } from '@/api/user'

export default createStore({
  state: {
    user: {}
  },
  mutations: {
    SETUSERINFO(state, user) {
      state.user = user
    }
  },
  actions: {
    getUserInfo({ commit }) {
      return new Promise((resolve) => {
        getUserInfo().then((data) => {
          commit('SETUSERINFO', data)
          const { name, lifeMotto, weChat, qqAcc, email } = data
          resolve({ name, lifeMotto, weChat, qqAcc, email })
        })
      })
    }
  },
  modules: {
  }
})
