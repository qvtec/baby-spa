import axios from 'axios'

export default {
  namespaced: true,

  state: {
    user: null,
    isAuth: false
  },

  getters: {
    user (state) {
      return state.user
    },

    isAuth (state) {
      return state.isAuth
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
    }
  },

  actions: {
    async register ({ dispatch }, creds) {
      await axios.get('csrf-cookie')
      await axios.post('register', creds)
      await dispatch('user')
      await axios.post('email/verification-notification')
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
      await axios.post('user')
        .then((response) => {
          console.log(response.data)
          commit('SET_AUTH_USER', response.data.data)
        })
        .catch((error) => {
          commit('REMOVE_AUTH')
          throw error
        })
    }
  }
}
