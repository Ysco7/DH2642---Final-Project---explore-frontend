import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from "@/router";
import ElementUI from 'element-ui';
import '@/assets/styles/theme.css';
import '@/assets/styles/main.css';
import 'viewerjs/dist/viewer.css';
import Viewer from 'v-viewer';

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(ElementUI);
Vue.use(Viewer);

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
