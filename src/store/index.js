import Vue from 'vue';
import Vuex from 'vuex';
// import { permissionRoutes } from '@/router';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
// import moduleA from './modules/module-a';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    // menulist: permissionRoutes,
    menuCollapse: false,
    breadcrumbList: [],
  },
  modules: {
    // moduleA
  },
  getters,
  actions,
  mutations
});

export default store;
