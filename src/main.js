// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'assets/theme.less'
Vue.use(MuseUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
