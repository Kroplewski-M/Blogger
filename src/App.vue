<template>
  <div v-if="this.$route.path != '/register'">
    <Nav v-if="this.$route.path != '/login'"></Nav>
  </div>
  <router-view></router-view>

</template>

<script>
import Nav from './components/Nav.vue';



export default{
  components:{
    Nav,
  },
  setup(){
  }
}
</script>
