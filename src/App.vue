<template>
  <Nav></Nav>
  <!-- <Profile></Profile> -->
  <!--<Login></Login>-->
  <!--<Register></Register>-->
  <createBlog></createBlog>
</template>

<script>
import Nav from './components/Nav.vue';
import Login from './components/Login.vue';
import Register from './components/Register.vue';
import Profile from './components/Profile.vue';
import createBlog from './components/createBlog.vue';

export default{
  components:{
    Nav,
    Login,
    Register,
    Profile,
    createBlog,
  },
}
</script>
