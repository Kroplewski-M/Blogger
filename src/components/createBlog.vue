
<template>
    <!-- Edit blog -->
    <div class="max-w-[1000px] h-[500px] mx-auto mt-16 text-center flex flex-col">
        <button class="w-[150px] min-h-[40px] rounded-lg bg-purple-500 font-bold mb-10 hover:bg-purple-700 ml-[10px] md:ml-0">Add Cover Img</button>
        <input type="text" name="title" placeholder="Title" v-model="title"
         class="bg-[#222222] focus:outline-none text-[#EEEEEE] w-[80%] min-h-[50px] pl-[10px] font-bold text-[30px] rounded-md ml-[10px] md:ml-0">
        <hr class="mt-10 border-[1px] border-solid border-[#333333]">
        <div class="flex pt-[10px] mx-auto">
            <button @click.prevent="preview = false" class="w-[70px] h-[30px] rounded-lg font-semibold text-purple-300 hover:bg-gray-200 hover:text-[#222222] text-[20px]">Write</button>
            <button @click.prevent="preview = true" class="w-[90px] h-[30px] rounded-lg font-semibold text-gray-300 hover:bg-gray-200 hover:text-[#222222] text-[20px] ml-5">Preview</button>
        </div>
        <hr class="mt-[15px] border-[1px] border-solid border-[#333333]">
        <div v-if="!preview" class="w-[100%] ">
            <div class="flex md:flex-row  mt-5 text-gray-300 md:space-x-4 space-y-2 md:space-y-0 flex-wrap place-content-center">
                <p class="p-0 m-0 font-bold mr-[10px]">Key:</p>
                <p class="p-0 m-0 bg-[#222222] px-2 rounded-lg w-[50px] md:w-[auto] mr-[10px] min-h-[30px]"># : h1</p>
                <p class="p-0 m-0 bg-[#222222] px-2 rounded-lg w-[80px] mr-[10px] md:w-[auto]">*example* : italic</p>
                <p class="p-0 m-0 bg-[#222222] px-2 rounded-lg w-[90px] mr-[10px] md:w-[auto]">**example** : bold</p>
                <p class="p-0 m-0 bg-[#222222] px-2 rounded-lg w-[100px] mr-[10px] md:w-[auto]">- example : unordered list</p>
                <p class="p-0 m-0 bg-[#222222] px-2 rounded-lg w-[100px] mr-[10px] md:w-[auto]">1. : ordered list</p>
            </div>
            <textarea name="content" placeholder="Your story starts here..." v-model="content"
            class="bg-[#222222] rounded-lg mt-10 min-h-[300px] md:w-[1000px] min-w-[350px] focus:outline-none text-gray-200 pl-[10px] pt-[10px] font-semibold"></textarea>
        </div>
        <!-- Preview Blog -->
        <div v-else class="text-left">
            <div class="text-gray-100" v-html="markdown"></div> 
        </div>

    </div>
</template>

<script>
import {ref, computed } from 'vue';
import {marked} from 'marked';

    let title = ref('');
    let content = ref('');
    let preview = ref(false);
    export default{
        setup(){

            const markdown = computed(() => {
                return marked(content.value);
            });


            return{
                title,
                content,
                markdown,
                preview
            }
    }
}
</script>

