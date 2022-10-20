import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authenticated: false,
    authCount: 0,
    users: [
      {
        email: 'test@test.com',
        password: 'test123'
      },
      {
        email: 'admin@test.com',
        password: 'admin'
      }
    ]
  },
  getters: {
    isAuth (state) {
      return state.authenticated
    },
    authCount (state) {
      return state.authCount
    }
  },
  mutations: {
    Auth (state, value) {
      state.authenticated = value
    },
    AuthCountInc (state) {
      state.authCount++
    }
  },
  actions: {
    signIn ({ commit, state }, { email, password }) {
      commit('AuthCountInc')
      state.users.forEach((item) => {
        if (item.email === email && item.password === password) {
          commit('Auth', true)
          router.push({ path: '/index' })
        }
      })
    },
    notAuth () {
      router.push({ path: '/' })
    }
  },
  modules: {
  }
})
