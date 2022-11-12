<template>
    <section class="w-[100vw]">
        <div class="md:w-[500px] w-[100vw] mx-auto mt-10">
            <img src="https://rbvjgzheadvqlgviwvuv.supabase.co/storage/v1/object/public/blog-imgs/Mateusz%20Kroplewski-Getting%20started%20with%20Vue.png" alt=""
            class="md:w-[500px] w-[90%] mx-auto rounded-md">
            <h1 class="font-bold text-[30px] text-gray-200 text-center">{{blogStore.blogs[1].title}}</h1>
            <p class="text-center text-gray-500 -mt-5 w-[90%] mx-auto md:mx-0 md:w-[auto]">{{blogStore.blogs[1].header}}</p>
            <div class="flex w-[100%] relative">
                <img :src="blogStore.blogs[1].authorAvatarUrl" class="w-[50px] h-[50px] rounded-full">
                <p class="text-gray-500 ml-5">{{blogStore.blogs[1].authorName}}</p>

                <div class="absolute right-5 flex">
                    <p class="text-gray-500 ml-5">{{blogStore.blogs[1].created_at}}</p>
                    <div class="flex">
                        <img src="@/assets/like.png" alt="" class="w-[20px] h-[20px] mr-[5px] mt-[15px] ml-5">
                        <p class="text-gray-400">{{blogStore.blogs[1].likeCount}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="md:w-[700px] w-[90vw] mx-auto">
            <div class="text-gray-100 " v-html="content"></div> 
        </div>

    </section>
</template>

<script>
import {useBlogStore} from '../stores/blogs';
import { computed } from 'vue';
import {marked} from 'marked';

export default{
    
    setup(){
        const blogStore = useBlogStore();

        const content = computed(() => {
                return marked(blogStore.blogs[1].content);
            });

        return{
            blogStore,
            content
        }
    }
}
</script>