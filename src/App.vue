<template>
  <div v-if="this.$route.path != '/register'">
    <Nav v-if="this.$route.path != '/login'"></Nav>
  </div>
  <router-view></router-view>
</template>

<script>
import Nav from './components/Nav.vue';
import {useProfileStore} from './stores/profile';
import {useBlogStore} from './stores/blogs';
import {supabase} from './includes/supabase';


export default{
  components:{
    Nav,
  },
  setup(){
    const profileStore = useProfileStore();
    const blogStore = useBlogStore();

    async function getBlogs(){
      try{
          const { data: blogs, error } = await supabase.from('Blogs').select('id, title,authorID,authorAvatarUrl,authorName,header, content, imageUrl, created_at');
          if(error) throw error;
          else{
             blogStore.blogs = blogs;
            }
        }catch(error){
            console.log(error);
        }
        }
      getBlogs();

    //SIGN USER IN IF LOGGED IN ON PREV SESSION
    function getToken(){
      if(profileStore.user.id == undefined){
        let token = localStorage.getItem('sb-rbvjgzheadvqlgviwvuv-auth-token');
        if(token != null){
          let user = JSON.parse(token);
          let id = user.user.id;
          getUser(id);
        }
      }
    }
    getToken();

    async function getUser(id){
      try{
        const { data: profile, error } = await supabase.from('Users').select('id, Name, Email, created_at, AvatarUrl').eq('id',id);
        if(error) throw error;
        else{
          profileStore.user.id = profile[0].id;
          profileStore.user.name = profile[0].Name;
          profileStore.user.email = profile[0].Email;
          profileStore.user.createdAt = profile[0].created_at;
          profileStore.user.avatarUrl = profile[0].AvatarUrl;
        }
      }catch(error){
        console.log(error);
      }
    }

   }
}
</script>
