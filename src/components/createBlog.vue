
<template>
    <div v-if="blogUploading" class="w-[100%] h-[100%] absolute z-50 backdrop-blur-sm ">
        <div class="md:w-[600px] h-[400px] bg-[#222222] rounded-md mx-auto mt-[30vh]">
            <div v-if="blogUploadState == 'uploading'">
                <h1 class="text-gray-200 text-center mt-16">Your Blog is being uploaded</h1>
                <h1 class="text-gray-400 text-center pt-5">Please wait...</h1>
                <img src="@/assets/hammer.png" alt="" class="w-[70px] mx-auto">
            </div>
            <div v-if="blogUploadState == 'success'">
                <h1 class="text-green-700 text-center mt-16">Success!!</h1>
                <h1 class="text-gray-400 text-center pt-5">Your blog has been uploaded!</h1>
                <div class="w-[120px] mx-auto mt-10">
                    <button class="w-[120px] h-[25px] rounded-md bg-green-500 font-bold" @click.prevent="this.$router.push('/')">Return home</button>
                </div>
            </div>
            <div v-if="blogUploadState == 'error'">
                <h1 class="text-red-700 text-center mt-16">An Error Occured!!</h1>
                <h1 class="text-gray-400 text-center pt-5">Your blog has not been uploaded!</h1>
                <div class="w-[120px] mx-auto mt-10">
                    <button class="w-[120px] h-[25px] rounded-md bg-red-500 font-bold" @click.prevent="blogUploading = false">try again</button>
                </div>
            </div>
        </div>
    </div>
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

        <vee-field type="text" name="heading" placeholder="heading"
         class="bg-[#222222] focus:outline-none text-[#EEEEEE] w-[60%] min-h-[40px] pl-[10px] font-semibold text-[20px] rounded-md ml-[10px] md:ml-0 block mt-10" />

         <div class="absolute w-[100%] h-[30px] text-left mt-[5px]">
            <ErrorMessage name="heading" class="text-red-500"/>
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
import {useProfileStore} from '../stores/profile';
import {useBlogStore} from '../stores/blogs';

    export default{
        setup(){
            const profileStore = useProfileStore();
            const blogStore = useBlogStore();

            let blogUploading = ref(false);
            let blogUploadState = ref('uploading');


            let title = ref('');
            let content = ref('');
            let preview = ref(false);
            let selected = ref('text-purple-400');
            
            let schema= ref({
                image: "required",
                title: "required",
                content: "required|min:200",
                heading: "required|min:20",
            });

            const markdown = computed(() => {
                return marked(content.value);
            });
            let imgUrl = ref('');
            async function publishBlog(values){
                blogUploading.value = true;
                blogUploadState.value = 'uploading';
                imgUrl.value = `https://rbvjgzheadvqlgviwvuv.supabase.co/storage/v1/object/public/blog-imgs/${profileStore.user.name}-${values.title}.png`;

                try{
                    const {data,error} = await supabase.from('Blogs')
                    .insert({title:values.title, authorID: profileStore.user.id,authorAvatarUrl: profileStore.user.avatarUrl,authorName: profileStore.user.name,header: values.heading, content: values.content, imageUrl: imgUrl.value})
                    .select();
                    if(error)throw error;
                    else{
                        uploadBlogImg(profileStore.user.name,values.title,values.image,data);
                    }
                }catch(error){
                    console.log(error);
                    blogUploadState.value = "error";
                }

            }


            async function uploadBlogImg(authorName,title,img,blogInfo){
                try{
                    const { data, error } = await supabase.storage.from('blog-imgs').upload(`${authorName}-${title}.png`, img, {cacheControl: '3600',upsert: true});
                    if(error) throw error;
                    else{
                        blogStore.blogs.push({authorAvatarUrl: blogInfo[0].authorAvatarUrl, authorID: blogInfo[0].authorID, authorName: blogInfo[0].authorName,
                        content:blogInfo[0].content, created_at: blogInfo[0].created_at, header: blogInfo[0].header, id: blogInfo[0].id, likes:0,
                         title: blogInfo[0].title, imageUrl: imgUrl.value});

                        blogUploadState.value = "success";
                    }
                }catch(error){
                    console.log(error);
                    blogUploadState.value = "error";
                }
            }
           

            return{
                title,
                content,
                markdown,
                preview,
                selected,
                schema,
                publishBlog,
                blogUploading,
                blogUploadState
            }
    }
}
</script>

