<template>
  <div v-if="this.$route.path != '/register'">
    <Nav v-if="this.$route.path != '/login'"></Nav>
  </div>
  <router-view></router-view>

</template>

<script>
import Nav from './components/Nav.vue';
import {useProfileStore} from './stores/profile';
import {supabase} from './includes/supabase';

export default{
  components:{
    Nav,
  },
  setup(){
    const profileStore = useProfileStore();


    function getToken(){
      let token = localStorage.getItem('sb-rbvjgzheadvqlgviwvuv-auth-token');
      if(token != null){
        let user = JSON.parse(token);
        let id = user.user.id;
        getUser(id);
      }
    }
    getToken();

    async function getUser(id){
      try{
        const { data: profile, error } = await supabase.from('Users').select('id, Name, Email, created_at').eq('id',id);
        if(error) throw error;
        else{
          profileStore.user.id = profile[0].id;
          profileStore.user.name = profile[0].Name;
          profileStore.user.email = profile[0].Email;
          profileStore.user.createdAt = profile[0].created_at;
        }
      }catch(error){
        console.log(error);
      }
    }

    // async function signOut(){
    //   const { error } = await supabase.auth.signOut();
    // }
    // //signOut();

    // async function signIn(){
    //   try{
    //     const {data, error} = await supabase.auth.signInWithPassword({email: 'kroplewskimateusz@gmail.com', password: 'bramkarz555'});
    //     if(error) throw error;
    //   }catch(error){
    //     console.log(error);
    //   }
    
    // }
    //signIn();
    
  }
}
</script>
