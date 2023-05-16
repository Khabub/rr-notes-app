import { createRouter, createWebHistory } from "vue-router";
import AuthPage from "@/pages/AuthPage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import RegisterPage from "@/pages/RegisterPage.vue";
import MainPage from "@/pages/MainPage.vue";

const routes = [
  {
    name: "mainPage",
    path: "/",
    // meta: { needsAuth: true },
    component: MainPage,
  },
  {
    name: "authWindow",
    path: "/auth",
    component: AuthPage,
  },
  {
    name: "login",
    path: "/login",
    component: LoginPage,
  },
  {
    name: "register",
    path: "/register",
    component: RegisterPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
