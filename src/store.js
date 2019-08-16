import Vue from 'vue'
import Vuex from 'vuex'
import memorandum from './modules/memorandum'
import tea from './modules/tea'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    memorandum,
    tea
  },
  state: {
    toast: '',
    userId: 'miguel',
    role: 'admin',
    JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJtaWd1ZWwiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1NjU5NjIxNTV9.x5ypbkOrBEgNno2dvpMQPwzwSW3wr7Q1y9k9W7lq4D0'
  },
  mutations: {
    setToast(state, msg){
      state.toast = msg
    }
  }
})
