import Vue from 'vue'
import Vuex from 'vuex'
import memorandum from './modules/memorandum'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    memorandum
  },
  state: {
    toast: '',
    userId: 'miguel'
  },
  mutations: {
    setToast(state, msg){
      state.toast = msg
    }
  }
})
