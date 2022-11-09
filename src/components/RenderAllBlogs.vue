<template>
    <p class="text-center text-[50px] font-bold text-purple-400">View Blogs</p>
    <section class="max-w-[1000px] w-[100vw] min-h-[100vh] mx-auto mt-16 flex md:space-x-10 md:flex-wrap flex-col md:flex-row space-y-10 md:space-y-0 mb-10">
        <div v-for="blog in blogs">
            <div class="w-[300px] md:w-[350px] h-[400px] bg-[#222222] hover:bg-[#333333] rounded-md relative overflow-hidden hover:cursor-pointer mx-auto md:mx-0">
                <div class="md:w-[300px] w-[250px] mx-auto">
                    <img src='@/assets/blog-standard.jpg' alt="" class="rounded-md mt-[10px]">
                </div>
                <h1 class="text-center -mt-[1px] text-gray-200 ">{{blog.title}}</h1>
                <p class="text-center text-gray-500 -mt-[10px]">{{blog.overView}}</p>

                <div class="absolute -bottom-3">
                    <div class="flex">
                        <img src="@/assets/user.png" alt="" class="w-[50px] h-[50px]">
                        <p class="text-gray-300 ml-[5px] font-semibold">Mateusz Kroplwski</p>
                    </div>
                    <p class="-mt-[4px] ml-[5px] text-gray-500">{{blog.date}}</p>
                </div>

                <div class="flex absolute right-5 bottom-1">
                    <img src="@/assets/comments.png" alt="" class="w-[20px] h-[20px] mr-[5px]">
                    <p class="text-gray-500 mr-5 -mt-[1px]">5</p>
                    <img src="@/assets/like.png" alt="" class="w-[20px] h-[20px] mr-[5px]">
                    <p class="text-gray-500 -mt-[1px]">12</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import {ref} from 'vue';

    export default{
        setup(){
            let blogs = ref({
            0:{title: "Begginer JS", 
            date: "Sun Jun 14 2020",
            overView: "This is a begginer guide to JavaScript!",
            content: "",
            imgRef: "blog-Standard.png",
            userID: "",},

            1:{title: "Advanced JS", 
            date: "Mon Jun 15 2020",
            overView: "This is a advanced guide to JavaScript!",
            content: "",
            imgRef: "blog-Standard.png",
            userID: "",}

            });
            return{
                blogs
            }
        }
    }
</script>
<style>
* {
	overflow-x: hidden;
}
</style>