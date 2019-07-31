import Vue from 'vue'
import Vuex from 'vuex'
import memorandum from './modules/memorandum'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    memorandum
  }
})
