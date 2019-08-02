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
    rol: 'terapeuta'
  },
  mutations: {
    setToast(state, msg){
      state.toast = msg
    }
  }
})
