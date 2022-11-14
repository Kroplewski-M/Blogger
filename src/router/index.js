import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import Profile from "../components/Profile.vue";
import createBlog from "../components/createBlog.vue";
import RenderAllBlogs from "../components/RenderAllBlogs.vue";
import blog from "../components/blog.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: RenderAllBlogs },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    {
      path: "/create-blog",
      component: createBlog,
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
      path: '/read/:authorName/:blogName',
      component: blog,
      props: true,
    },
    {
      path: "/profile",
      component: Profile,
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
