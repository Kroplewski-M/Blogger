<template>
    <div v-if="deleteCommentPrompt" class="top-0 fixed w-[100vw] h-[100vh] backdrop-blur-md z-50 grid place-content-center"> 
        <div class="w-[450px] h-[200px] bg-[#222222] rounded-md">
            <p class="font-bold text-gray-200 text-center mt-5 text-[25px] w-[80%] mx-auto">Are you sure you want to delete your comment?</p>
            <div class="flex mx-auto w-[220px] mt-10">  
                <button class="w-[100px] h-[30px] rounded-md bg-gray-300 text-[#222222] hover:bg-gray-400 font-bold mr-5"
                @click.prevent="deleteCommentPrompt = false">Cancel</button>
                <button class="w-[100px] h-[30px] rounded-md bg-red-700 hover:bg-red-900 text-gray-200 font-bold">Delete</button>
            </div>
        </div>
    </div>
    <div v-if="delteBlogPrompt" class="top-0 fixed w-[100vw] h-[100vh] backdrop-blur-md z-50 grid place-content-center"> 
        <div class="w-[450px] h-[200px] bg-[#222222] rounded-md">
            <p class="font-bold text-gray-200 text-center mt-5 text-[25px] w-[80%] mx-auto">Are you sure you want to delete your blog?</p>
            <div class="flex mx-auto w-[220px] mt-10">  
                <button class="w-[100px] h-[30px] rounded-md bg-gray-300 text-[#222222] hover:bg-gray-400 font-bold mr-5"
                @click.prevent="delteBlogPrompt = false">Cancel</button>
                <button class="w-[100px] h-[30px] rounded-md bg-red-700 hover:bg-red-900 text-gray-200 font-bold">Delete</button>
            </div>
        </div>
    </div>
    <div v-if="loading" class=" w-[100vw] h-[100vh] grid grid-cols-1 place-content-center">
        <p class="text-center text-gray-100 font-bold text-[30px]">loading...</p>
    </div>
    <section v-else>
        <section class="w-[100vw]">
            <div class="md:w-[500px] w-[100vw] mx-auto mt-10">
                <button v-if="blogInfo[0].authorID == userID" class="ml-[10px] px-[10px] bg-red-700 rounded-md h-[30px] mb-[10px] hover:bg-red-800"
                    @click.prevent="delteBlogPrompt = true">Delete</button>
                <img :src="blogInfo[0].imageUrl"
                class="md:w-[500px] w-[90%] mx-auto rounded-md">
                <div class="w-[300px] mx-auto">
                    <div v-if="!canLike" class="absolute w-[300px] h-[30px] rounded-md bg-red-700 mt-[10px]">
                        <p class="text-center font-bold text-gray-200 my-0 py-0">You must be logged in to like!</p>
                    </div>
                </div>
                <h1 class="font-bold text-[30px] text-gray-200 text-center mt-10">{{blogTitle}}</h1>
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
            <div class="md:w-[800px] w-[90vw] mx-auto bg-[#222222]/50 px-5 rounded-md mt-5">
                <div class="text-gray-100" v-html="getMarked(blogInfo[0].content)"></div> 
            </div>
        </section>
        <section class="w-[100vw] mt-10 mb-10">
            <div class="md:w-[700px] mx-auto">
                <div class="flex">
                    <h1 class="text-gray-200">Comments</h1>
                    <div v-if="!canComment" class="ml-10 w-[300px] h-[30px] rounded-md bg-red-700 mt-[15px]">
                        <p class="text-center font-bold text-gray-200 my-0 py-0">You must be logged in to comment!</p>
                    </div>
                </div>
                <!-- Write a comment -->
                <div class="w-[100%] min-h-[110px] bg-[#222222] mb-5 rounded-md">
                <vee-form :validation-schema="schema" @submit="addComment">
                    <vee-field as="textarea" type="textarea" name='comment' class="w-[95%] bg-transparent focus:outline-none ml-[10px] text-gray-100 mt-5 resize-none"
                     placeholder="Write a comment..." />
                    <button class="w-[100px] h-[25px] bg-gray-300 font-semibold text-[#222222] rounded-md ml-[10px]">comment</button>
                </vee-form>
                </div>
                <!-- render all comments -->
                <div v-for="comment in allComments" class="w-[100%] min-h-[100px] bg-[#222222] rounded-md mb-5">
                    <div class="flex relative">
                        <img :src="comment.userAvatar" alt="" class="w-[40px] h-[40px] rounded-full ml-[10px] mt-[5px]">
                        <p class="text-gray-300 font-semibold ml-[10px]">{{comment.username}}</p>
                        <p class="text-gray-500 absolute right-5">{{comment.created_at}}</p>
                    </div>
                    <p class="text-gray-200 ml-[10px] mt-0">{{comment.content}}</p>
                    <button v-if="comment.user_id == userID" class="ml-[10px] px-[10px] bg-red-700 rounded-md h-[30px] mt-[5px] mb-[10px] hover:bg-red-800"
                    @click.prevent="deleteComment(comment.id)">Delete</button>
                </div>
            </div>
        </section>
    </section>
</template>

<script>
import {useBlogStore} from '../stores/blogs';
import {marked} from 'marked';
import {supabase} from '../includes/supabase';
import { ref, watch } from 'vue';
import {useProfileStore} from '../stores/profile';


export default{
    props:['blogName', 'authorName'],
    setup(props){
        const profileStore = useProfileStore();
        let userID = ref('');
        const blogStore = useBlogStore();
        let loading = ref(true);
        function getMarked(content){
            return marked(content);
        };

        //GET BLOG
        let blogTitle = ref(props.blogName.replace(/-/g, ' '));
        let authorName = ref(props.authorName.replace(/-/g, ' '));
        let blogInfo = ref([{
            imageUrl: '',
            content: '',
            authorID: '',
        }]);
        async function getBlog(){
            try{
                let { data: Blog, error } = await supabase.from('Blogs')
                .select('id,authorAvatarUrl,authorID,content,imageUrl,created_at,header').eq('title', String(props.blogName.replace(/-/g, ' '))).eq('authorName', props.authorName.replace(/-/g, ' '));
                if(error) throw error;
                else{
                    blogInfo.value= Blog; 
                    loading.value = false;
                    calcLikes();
                    getComments();
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
                    userID.value = profileStore.user.id;
                    blogLikes.value = data;
                    amountOfLikes.value = blogLikes.value.length;
                    //IS LIKED BY CURRENT USER
                    
                    for(let i = 0; i < blogLikes.value.length;i++){        
                        if((blogLikes.value[i].blogID == blogInfo.value[0].id) && (blogLikes.value[i].userid == profileStore.user.id)){
                            liked.value = true;
                            isLikedID.value = blogLikes.value[i].id;
                            return;
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
        let canLike = ref(true);
        watch(canLike, ()=>{
            if(canLike){
                setTimeout(() => {
                    canLike.value = true;
                }, "1000")
            }
        })
        async function likeBlog(){
            if(profileStore.user.id != undefined){
                canLike.value = true;
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
            else{
                canLike.value = false;
            }
        }
        getBlog();

        let schema= ref({
            comment: "required",
        });
        let canComment = ref(true);
        watch(canComment, ()=>{
            if(canComment){
                setTimeout(() => {
                    canComment.value = true;
                }, "1000")
            }
        })
        //ADD COMMENT
        async function addComment(values, { resetForm }){
            if(profileStore.user.id != undefined){
                canComment.value = true;
                let date = new Date();
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let dayOfMonth = date.getDate();

                try{
                    const {data,error} = await supabase.from('blogComments')
                        .insert({blogID: blogInfo.value[0].id, content: values.comment, user_id: profileStore.user.id});
                    if(error) throw error;
                    else {
                        allComments.value.push({content: values.comment, created_at: `${year}-${month}-${dayOfMonth}`,
                        userAvatar: profileStore.user.avatarUrl, user_id: profileStore.user.id, username: profileStore.user.name});
                        resetForm();
                    }
                }catch(error){
                    console.log(error);
                }

            }
            else{
                canComment.value = false;
            }

        };

        //GET ALL COMMENTS FOR BLOG
        let allComments = ref([]);
        async function getComments(){
            try{
                const {data,error} = await supabase.from('blogComments').select('id,user_id,content,created_at').eq('blogID', blogInfo.value[0].id);
                if(error) throw error;
                else{
                    allComments.value = data;
                    allComments.value.forEach(comment => getCommentUsers(comment));
                }
            }catch(error){
                console.log(erorr);
            }
        };
        //GET ALL COMMENT PROFILES
        async function getCommentUsers(comment){
            try{
                const {data,error} = await supabase.from('Users').select('Name,AvatarUrl').eq('id',comment.user_id);
                if(error) throw error;
                else{
                    comment.username = data[0].Name;
                    comment.userAvatar = data[0].AvatarUrl;
                }
            }catch(error){
                console.log(error);
            }
        }

        //DELETE COMMENT
        let deleteCommentPrompt = ref(false);
        function deleteComment(commentID){
            deleteCommentPrompt.value = true;
            console.log(`delete blog ${commentID}?`)
        }

        //DELETE BLOG
        let delteBlogPrompt = ref(false);
        function delteBlog(blogID){
            console.log(`delete blog ${blogID}?`)
        }
        return{
            blogStore,
            blogTitle,
            authorName,
            blogInfo,
            getMarked,
            loading,
            likeBlog,
            amountOfLikes,
            liked,
            addComment,
            schema,
            allComments,
            canComment,
            canLike,
            userID,
            deleteComment,
            deleteCommentPrompt,
            delteBlogPrompt
        }
    }
}
</script>