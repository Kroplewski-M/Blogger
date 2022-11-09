
<template>
    <!-- Edit blog -->
    <div class="max-w-[1000px] mx-auto mt-16 text-center flex flex-col relative">
        <vee-form :validation-schema="schema" @submit="publishBlog">
        <p class="inline text-gray-200 font-bold text-[20px] mr-5">Blog Image:</p>
        <vee-field type="file" name="image" class="w-[250px] min-h-[40px] rounded-lg bg-purple-500 font-bold mb-10 hover:bg-purple-700 ml-[10px] md:ml-0 pl-5 pt-[5px] hover:cursor-pointer" />

        <div class="absolute w-[100%] h-[30px] -mt-[35px]">
            <ErrorMessage name="image" class="text-red-500 text-center"/>
        </div>
        
        <vee-field type="text" name="title" placeholder="Title" v-model="title"
         class="bg-[#222222] focus:outline-none text-[#EEEEEE] w-[80%] min-h-[50px] pl-[10px] font-bold text-[30px] rounded-md ml-[10px] md:ml-0 block" />

         <div class="absolute w-[100%] h-[30px] text-left mt-[5px]">
            <ErrorMessage name="title" class="text-red-500"/>
        </div>
        <hr class="mt-10 border-[1px] border-solid border-[#333333]">
        <div class="flex pt-[10px] mx-auto h-[55px] text-gray-300 relative place-content-center w-[100%]">
            <button @click.prevent="preview = false" class="w-[70px] h-[30px] rounded-lg font-semibold hover:bg-gray-200 hover:text-[#222222] text-[20px]" :class="(preview == false ? 'text-purple-400' : '')">
                Write</button>
            <button @click.prevent="preview = true" class="w-[90px] h-[30px] rounded-lg font-semibold hover:bg-gray-200 hover:text-[#222222] text-[20px] ml-5" :class="(preview == true ? 'text-purple-400' : '')">
                Preview</button>
                <button v-if="preview" value="submit" class="w-[90px] h-[30px] rounded-lg font-semibold hover:bg-gray-200 bg-purple-500 hover:text-[#222222] text-[20px] ml-5 md:ml-0 md:absolute md:right-0">
                Publish</button>
            </div>
        <hr class=" border-[1px] border-solid border-[#333333]">
        <div v-if="!preview" class="w-[100%] overflow-hidden">
            <div class="flex md:flex-row  mt-5 text-gray-300 md:space-x-4 space-y-2 md:space-y-0 flex-wrap place-content-center">
                <p class="p-0 m-0 font-bold mr-[10px]">Key:</p>
                <p class="p-0 m-0 bg-[#222222] px-2 rounded-lg w-[50px] md:w-[auto] mr-[10px] min-h-[30px]"># : h1</p>
                <p class="p-0 m-0 bg-[#222222] px-2 rounded-lg w-[80px] mr-[10px] md:w-[auto]">*example* : italic</p>
                <p class="p-0 m-0 bg-[#222222] px-2 rounded-lg w-[90px] mr-[10px] md:w-[auto]">**example** : bold</p>
                <p class="p-0 m-0 bg-[#222222] px-2 rounded-lg w-[100px] mr-[10px] md:w-[auto]">- example : unordered list</p>
                <p class="p-0 m-0 bg-[#222222] px-2 rounded-lg w-[100px] mr-[10px] md:w-[auto]">1. : ordered list</p>
            </div>
        </div>
        <vee-field v-show="!preview" as="textarea" type="textarea" name="content" placeholder="Your story starts here..." v-model="content"
        class="bg-[#222222] rounded-lg mt-10 h-[300px] md:w-[1000px] min-w-[350px] focus:outline-none text-gray-200 pl-[10px] pt-[10px] font-semibold" />

        <div class="w-[100%] h-[30px] text-left mt-[5px]">
        <ErrorMessage name="content" class="text-red-500"/>
        </div>
    </vee-form>
        <!-- Preview Blog -->
        <div v-if="preview" class="text-left">
            <div class="text-gray-100 w-[90%] md:w-[auto] ml-[10px]" v-html="markdown"></div> 
        </div>
    </div>
</template>

<script>
import {ref, computed } from 'vue';
import {marked} from 'marked';
import {supabase} from '../includes/supabase';

    export default{
        setup(){

            // async function getBlogs(){
            //     try{
            //         const { data: blogs, error } = await supabase.from('Blogs').select('id, author, title, content, imageUrl, likeCount, created_at');
            //         if(error) throw error;
            //         else{
            //             console.log(blogs[0]);
            //         }
            //     }catch(error){
            //         console.log(error);
            //     }
            // }
            // getBlogs();

            let title = ref('');
            let content = ref('');
            let preview = ref(false);
            let selected = ref('text-purple-400');
            
            let schema= ref({
                image: "required",
                title: "required",
                content: "required|min:200",
            });

            const markdown = computed(() => {
                return marked(content.value);
            });

            function publishBlog(values){
                console.log(values);
            }
            return{
                title,
                content,
                markdown,
                preview,
                selected,
                schema,
                publishBlog
            }
    }
}
</script>

