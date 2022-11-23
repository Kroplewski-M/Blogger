<template>
<RenderAllBlogs></RenderAllBlogs>
</template>

<script>
import RenderAllBlogs from "../components/RenderAllBlogs.vue";
import {useBlogStore} from '../stores/blogs';
import {supabase} from '../includes/supabase';



export default{
    components:{
        RenderAllBlogs,
    },
    setup(){
        const blogStore = useBlogStore();

        async function getBlogs(){
        try{
            const { data: blogs, error } = await supabase.from('Blogs').select('id, title,authorID,authorAvatarUrl,authorName,header, content, imageUrl, created_at');
            if(error) throw error;
            else{
                blogStore.blogs = blogs;
                blogStore.blogs.forEach(el => getLikes(el));
            }
            }catch(error){
                console.log(error);
            }
        }
        getBlogs();

        async function getLikes(el){
        try{
            let { data, error } = await supabase.from('blogLikes').select('id,blogID,userid').eq('blogID', el.id);
            if(error) throw error;
            else{
                el.likes = data.length;
            }
        }catch(error){
            console.log(error);
        }

    }
    }
}
</script>