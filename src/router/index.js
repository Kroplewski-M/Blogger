import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import homeView from "@/views/homeView.vue";
import profileView from "@/views/profileView.vue";
import createBlogView from "@/views/createBlogView.vue";
import blog from "../components/blog.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: homeView },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    {
      path: "/create-blog",
      component: createBlogView,
      beforeEnter: (to, from, next) => {
        let token = localStorage.getItem("sb-rbvjgzheadvqlgviwvuv-auth-token");
        if (token == null) {
          next({ path: "/login" });
        } else {
          next();
        }
      },
    },
    {
      path: "/read/:authorName/:blogName",
      component: blog,
      props: true,
    },
    {
      path: "/profile",
      name: "profile",
      component: profileView,
      beforeEnter: (to, from, next) => {
        let token = localStorage.getItem("sb-rbvjgzheadvqlgviwvuv-auth-token");
        if (token == null) {
          next({ path: "/login" });
        } else {
          next();
        }
      },
    },
  ],
});

export default router;
