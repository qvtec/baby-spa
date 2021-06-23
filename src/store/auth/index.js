import axios from 'axios'

export default {
  namespaced: true,

  state: {
    user: null,
    isAuth: false,
    twoFactor: false
  },

  getters: {
    user (state) {
      return state.user
    },

    isAuth (state) {
      return state.isAuth
    },

    twoFactor (state) {
      return state.twoFactor
    }
  },

  mutations: {
    SET_AUTH_USER (state, user) {
      state.isAuth = true
      state.user = user
    },

    REMOVE_AUTH (state) {
      state.isAuth = false
      state.user = null
    },

    SET_TWO_FACTOR (state, value) {
      state.twoFactor = value
    }
  },

  actions: {
    async register ({}, creds) {
      await axios.get('csrf-cookie')
      await axios.post('register', creds)
    },

    async login ({ dispatch }, creds) {
      await axios.get('csrf-cookie')
      await axios.post('login', creds)
      await dispatch('user')
    },

    async logout ({ commit }) {
      await axios.get('csrf-cookie')
      await axios.post('logout')
      commit('REMOVE_AUTH')
    },

    async user ({ commit }) {
      await axios.get('me')
        .then(response => {
          if (!response.data) {
            commit('REMOVE_AUTH')
            return
          }
          commit('SET_AUTH_USER', response.data)
        })
        .catch(error => {
          commit('REMOVE_AUTH')
          throw error
        })
    }
  }
}
