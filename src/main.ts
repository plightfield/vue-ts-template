import Vue from "vue";
import App from "./App";
import "./registerServiceWorker";
import router from "./router";
import VueRx from "vue-rx";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

Vue.config.productionTip = false;
Vue.use(VueRx);
Vue.use(Antd);
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
