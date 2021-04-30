import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = process.env.API_URL
axios.defaults.headers.Accept = 'application/json'
axios.defaults.withCredentials = true

Vue.prototype.$axios = axios
