<template>
    <p class="text-center text-[50px] font-bold text-purple-400">View Blogs</p>
    <section class="max-w-[1000px] w-[100vw] min-h-[100vh] mx-auto mt-16 flex md:flex-wrap flex-col md:flex-row space-y-10 md:space-y-0 mb-10">
        <div v-for="blog in blogStore.blogs">
            <div class="w-[300px] md:w-[310px] h-[400px] bg-[#222222] hover:bg-[#333333] rounded-md relative overflow-hidden hover:cursor-pointer mx-auto md:mr-5 mb-5">
                <div class="w-[90%] mx-auto">
                    <img :src='blog.imageUrl' alt="" class="rounded-md mt-[10px] w-[100%] h-[150px]">
                </div>
                <h1 class="text-center text-gray-200 ">{{blog.title}}</h1>
                <p class="text-center text-gray-500 -mt-[10px]">{{blog.header}}</p>

                <div class="absolute -bottom-2 w-[100%]">
                    <div class="flex ">
                        <img :src='blog.authorAvatarUrl' alt="" class="w-[50px] h-[50px] rounded-full ml-[10px]">
                        <p class="text-gray-300 ml-[10px] font-semibold">{{blog.authorName}}</p>
                    </div>
                    <div class="flex">
                        <p class="mt-[4px] ml-[10px] text-gray-500">{{blog.created_at}}</p>
                        <div class="flex absolute right-5 bottom-1">
                            <img src="@/assets/like.png" alt="" class="w-[20px] h-[20px] mr-[5px]">
                            <p class="text-gray-500 -mt-[1px]">{{blog.likeCount}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import {useBlogStore} from '../stores/blogs';

export default{
    setup(){
    const blogStore = useBlogStore();

    return{
        blogStore,
        }
    }
    }
</script>
<style>
* {
	overflow-x: hidden;
}
</style>