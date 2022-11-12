<template>
    <section class="w-[100vw]">
        <div class="md:w-[500px] w-[100vw] mx-auto mt-10">
            <img :src="blogInfo[0].imageUrl"
            class="md:w-[500px] w-[90%] mx-auto rounded-md">
            <h1 class="font-bold text-[30px] text-gray-200 text-center">{{blogTitle}}</h1>
            <p class="text-center text-gray-500 -mt-5 w-[90%] mx-auto md:mx-0 md:w-[auto]">{{blogInfo[0].header}}</p>
            <div class="flex w-[100%] relative">
                <img :src="blogInfo[0].authorAvatarUrl" class="w-[50px] h-[50px] rounded-full">
                <p class="text-gray-500 ml-5">{{authorName}}</p>

                <div class="absolute right-5 flex">
                    <p class="text-gray-500 ml-5">{{blogInfo[0].created_at}}</p>
                    <div class="flex">
                        <img src="@/assets/like.png" alt="" class="w-[20px] h-[20px] mr-[5px] mt-[15px] ml-5">
                        <p class="text-gray-400">{{blogInfo[0].likeCount}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="md:w-[700px] w-[90vw] mx-auto">
            <div class="text-gray-100" v-html="getMarked(blogInfo[0].content)"></div> 
        </div>

    </section>
</template>

<script>
import {useBlogStore} from '../stores/blogs';
import { computed } from 'vue';
import {marked} from 'marked';
import {supabase} from '../includes/supabase';
import { ref } from 'vue';

export default{
    props:['blogName', 'authorName'],
    setup(props){
        const blogStore = useBlogStore();
 
        function getMarked(content){
            return marked(content);
        };

        let blogTitle = ref(props.blogName);
        let authorName = ref(props.authorName);
        let blogInfo = ref([{
            imageUrl: '',
            content: '',
        }]);
        async function getBlog(){
            try{
                let { data: Blog, error } = await supabase.from('Blogs')
                .select('id,authorAvatarUrl,content,imageUrl,likeCount,created_at,header').eq('title', String(props.blogName)).eq('authorName', props.authorName);
                if(error) throw error;
                else{
                    blogInfo.value= Blog; 
                }
            }catch(error){
                console.log(error);
            }
        }
        getBlog();
        return{
            blogStore,
            blogTitle,
            authorName,
            blogInfo,
            getMarked
        }
    }
}
</script>