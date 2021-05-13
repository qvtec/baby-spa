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
    async register ({ dispatch }, creds) {
      await axios.get('csrf-cookie')
      await axios.post('register', creds)
      await dispatch('user')
      await axios.post('email/verification-notification')
    },

    async login ({ dispatch, commit }, creds) {
      await axios.get('csrf-cookie')
      await axios.post('login', creds)
        .then((response) => {
          commit('SET_TWO_FACTOR', response.data.two_factor)
        })
      await dispatch('user')
    },

    async logout ({ commit }) {
      await axios.get('csrf-cookie')
      await axios.post('logout')
      commit('REMOVE_AUTH')
    },

    async remember ({ dispatch }, creds) {
      await axios.get('csrf-cookie')
      await dispatch('user')
    },

    async user ({ commit }) {
      await axios.post('user')
        .then((response) => {
          commit('SET_AUTH_USER', response.data.data)
        })
        .catch((error) => {
          commit('REMOVE_AUTH')
          throw error
        })
    }
  }
}
