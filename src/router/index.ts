import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/views/Home";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [{ path: "/", component: Home }];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// 统一处理路由守卫
router.beforeEach((to, from, next) => {
  next();
});

export default router;
