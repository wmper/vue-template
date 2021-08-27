import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {},
	getters: {},
	mutations: {},
	modules: {},
	strict: process.env.NODE_ENV !== "production"
})

export default store
