import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import Profile from "../components/Profile.vue";
import createBlog from "../components/createBlog.vue";
import RenderAllBlogs from "../components/RenderAllBlogs.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: RenderAllBlogs },
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/create-blog", component: createBlog },
    { path: "/profile", component: Profile },
  ],
});

export default router;
