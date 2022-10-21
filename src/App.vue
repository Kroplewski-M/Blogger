<template>
  <Nav></Nav>
  <!-- <Profile></Profile> -->
  <!-- <Login></Login> -->
  <!-- <Register></Register> -->
  <!-- <createBlog></createBlog> -->
  <RenderAllBlogs></RenderAllBlogs>
</template>

<script>
import Nav from './components/Nav.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Profile from './components/Profile.vue';
import createBlog from './components/createBlog.vue';
import RenderAllBlogs from './components/RenderAllBlogs.vue';


export default{
  components:{
    Nav,
    Login,
    Register,
    Profile,
    createBlog,
    RenderAllBlogs,
  },
}
</script>

<style>


</style>