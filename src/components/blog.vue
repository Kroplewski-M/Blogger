<template>
    <div v-if="loading" class=" w-[100vw] h-[100vh] grid grid-cols-1 place-content-center">
        <p class="text-center text-gray-100 font-bold text-[30px]">loading...</p>
    </div>
    <section v-else>
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
                        <div class="flex hover:cursor-pointer" @click.prevent="likeBlog">
                            <img v-if="liked" src="@/assets/liked.png" alt="" class="w-[20px] h-[20px] mr-[5px] mt-[15px] ml-5">
                            <img v-else src="@/assets/like.png" alt="" class="w-[20px] h-[20px] mr-[5px] mt-[15px] ml-5">
                            <p class="text-gray-400">{{amountOfLikes}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="md:w-[700px] w-[90vw] mx-auto">
                <div class="text-gray-100" v-html="getMarked(blogInfo[0].content)"></div> 
            </div>
        </section>
        <section class="w-[100vw] mt-10 mb-10">
            <div class="md:w-[700px] mx-auto">
                <h1 class="text-gray-200">Comments</h1>
                <!-- Write a comment -->
                <div class="w-[100%] min-h-[110px] bg-[#222222] mb-5 rounded-md">
                    <textarea class="w-[95%] bg-transparent focus:outline-none ml-[10px] text-gray-100 mt-5 resize-none" placeholder="Write a comment..."></textarea>
                    <button class="w-[100px] h-[25px] bg-gray-300 font-semibold text-[#222222] rounded-md ml-[10px]">comment</button>
                </div>
                <!-- render all comments -->
                <div class="w-[100%] min-h-[100px] bg-[#222222] rounded-md">
                    <div class="flex relative">
                        <img :src="blogInfo[0].authorAvatarUrl" alt="" class="w-[40px] h-[40px] rounded-full ml-[10px] mt-[5px]">
                        <p class="text-gray-300 font-semibold ml-[10px]">{{authorName}}</p>
                        <p class="text-gray-500 absolute right-5">{{blogInfo[0].created_at}}</p>
                    </div>
                    <p class="text-gray-200 ml-[10px] mt-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut fugiat ipsa tempore amet rerum dolorum, eius consequatur necessitatibus facilis laboriosam.</p>
                </div>
            </div>
        </section>
    </section>
</template>

<script>
import {useBlogStore} from '../stores/blogs';
import {marked} from 'marked';
import {supabase} from '../includes/supabase';
import { ref } from 'vue';
import {useProfileStore} from '../stores/profile';


export default{
    props:['blogName', 'authorName'],
    setup(props){
        const profileStore = useProfileStore();
        const blogStore = useBlogStore();
        let loading = ref(true);
        function getMarked(content){
            return marked(content);
        };

        let blogTitle = ref(props.blogName.replace(/-/g, ' '));
        let authorName = ref(props.authorName.replace(/-/g, ' '));
        let blogInfo = ref([{
            imageUrl: '',
            content: '',
        }]);
        async function getBlog(){
            try{
                let { data: Blog, error } = await supabase.from('Blogs')
                .select('id,authorAvatarUrl,content,imageUrl,created_at,header').eq('title', String(props.blogName.replace(/-/g, ' '))).eq('authorName', props.authorName.replace(/-/g, ' '));
                if(error) throw error;
                else{
                    blogInfo.value= Blog; 
                    loading.value = false;
                    calcLikes();
                }
            }catch(error){
                console.log(error);
            }
        }
        //CALC AMOUNT OF LIKES FOR THIS BLOG
        let blogLikes = ref('');
        let liked = ref(false);
        let amountOfLikes= ref('');
        let isLikedID = ref('');

        async function calcLikes(){
            try{
                const { data, error } = await supabase.from('blogLikes').select('id,blogID,userid').eq('blogID', blogInfo.value[0].id);
                if(error) throw error;
                else{
                    blogLikes.value = data;
                    amountOfLikes.value = blogLikes.value.length;
                    //IS LIKED BY CURRENT USER
                    for(let i = 0; i < blogLikes.value.length;i++){        
                        if(blogLikes.value[i].blogID == blogInfo.value[0].id && blogLikes.value[i].userid == profileStore.user.id){
                            liked.value = true;
                            isLikedID.value = blogLikes.value[i].id;
                        }else{
                            liked.value = false;
                        }
                    }
                }
            }catch(error){
                console.log(error);
            }
        }
        
        //LIKE/UNLIKE THE BLOG THE BLOG 
        async function likeBlog(){
            if(!liked.value){
                try{
                    const {data,error} = await supabase.from('blogLikes').upsert({blogID:blogInfo.value[0].id, userid:profileStore.user.id}).select();
                    if(error) throw error;
                    else {
                        amountOfLikes.value++;
                        liked.value = true;
                        isLikedID.value = data[0].id;
                    }
                }catch(error){
                    alert(`Error occured: ${error}`);
                }
            }
            else{
                try{
                    const { data, error } = await supabase.from('blogLikes').delete().match({ id: isLikedID.value });
                    if(error) throw error;
                    else{
                        liked.value = false;
                        amountOfLikes.value--;
                    }
                }catch(error){
                    console.log(error);
                }
            }
        }
        getBlog();
        return{
            blogStore,
            blogTitle,
            authorName,
            blogInfo,
            getMarked,
            loading,
            likeBlog,
            amountOfLikes,
            liked
        }
    }
}
</script>