import Vue from 'vue'
import Router from 'vue-router'
import map from './map'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: map
})
