<template>
    <div class="max-w-[1000px] h-[500px] mx-auto mt-16 text-center flex flex-col">
        <button class="w-[150px] min-h-[40px] rounded-lg bg-purple-500 font-bold mb-10 hover:bg-purple-700">Add Cover Img</button>
        <input type="text" name="title" placeholder="Title" v-model="title"
         class="bg-[#222222] focus:outline-none text-[#EEEEEE] w-[80%] h-[50px] pl-[10px] font-bold text-[30px] rounded-md">
        <hr class="mt-10 border-[1px] border-solid border-[#333333]">
        <div class="flex pt-[10px]">
            <button class="w-[70px] h-[30px] rounded-lg font-semibold text-purple-300 hover:bg-gray-200 hover:text-[#222222] text-[20px]">Write</button>
            <button class="w-[90px] h-[30px] rounded-lg font-semibold text-gray-300 hover:bg-gray-200 hover:text-[#222222] text-[20px] ml-5">Preview</button>
            <div class="flex ml-[30px] mt-[3px] text-gray-300 space-x-4">
                <p class="p-0 m-0 font-bold">Key:</p>
                <p class="p-0 m-0 bg-[#222222] px-2 rounded-lg"># : h1</p>
                <p class="p-0 m-0 bg-[#222222] px-2 rounded-lg">*example* : italic</p>
                <p class="p-0 m-0 bg-[#222222] px-2 rounded-lg">**example** : bold</p>
                <p class="p-0 m-0 bg-[#222222] px-2 rounded-lg">- example : unordered list</p>
                <p class="p-0 m-0 bg-[#222222] px-2 rounded-lg">1. : ordered list</p>

            </div>
        </div>
        <hr class="mt-[15px] border-[1px] border-solid border-[#333333]">
        <textarea name="content" placeholder="Your story starts here..." v-model="content"
        class="bg-[#222222] rounded-lg mt-10 min-h-[300px] focus:outline-none text-gray-200 pl-[10px] pt-[10px] font-semibold"></textarea>

    </div>
    <div class="text-gray-100" v-html="markdown"></div> 
</template>

<script>
import {ref, computed } from 'vue';
import {marked} from 'marked';

    let title = ref('');
    let content = ref('');

    export default{
        setup(){

            const markdown = computed(() => {
                return marked(content.value);
            });


            return{
                title,
                content,
                markdown
            }
    }
}
</script>

<style>
p{
    all:revert;
}
h1{
    all:revert;
}
h2{
    all:revert;
}
h3{
    all:revert;
}
h4{
    all:revert;
}
h5{
    all:revert;
}
h6{
    all:revert;
}
ul{
    all:revert;
}
li{
    all:revert;
}
ol{
    all:revert;
}
a{
    all:revert;
}

</style>