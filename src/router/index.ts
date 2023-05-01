import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import LoginPage from "@/pages/LoginPage.vue";
import RegisterPage from "@/pages/RegisterPage.vue";

const routes = [
  {
    name: "home",
    path: "/",
    component: HomePage,
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
