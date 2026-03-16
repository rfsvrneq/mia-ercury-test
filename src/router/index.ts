import { createRouter, createWebHistory } from "vue-router";

// 定義路由
const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../components/Login.vue"),
  },
  {
    path: "/",
    name: "Dashboard",
    component: () => import("../components/Dashboard.vue"),
    meta: { requiresAuth: true }, // 需登入
  },
];

// 建立路由實體
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // 防止沒權限的人看到 Dashboard
  const token = localStorage.getItem("accessToken"); // 從 localStorage 取出 Token

  // 頁面需要登入 (requiresAuth: true ) 且沒有 Token
  if (to.meta.requiresAuth && !token) {
    next("/login"); // 強制踢回登入頁
  } else {
    next(); // 准許通行
  }
});

export default router;
