<template>
    <section class="md:min-w-[750px] md:max-w-[820px] w-[90vw] min-h-[80vh] bg-[#222222] mx-auto mt-10 rounded-lg">
        <div v-if="loggingOut" class="w-[300px] mx-auto">
            <div class="absolute w-[300px] h-[30px] rounded-md bg-green-500 -mt-[20px]">
                <p class="text-center text-[16px] font-bold my-0 mt-[3px]">Logging Out...</p>
            </div>
        </div>
        <div class="max-w-[500px] mx-auto pt-10">
            <div class="w-[100px] mx-auto">
                <img :src="profileStore.user.avatarUrl" alt="" class="w-[100px] h-[100px]  bg-gray-300 rounded-full">
            </div>
            <p class="text-gray-400 font-semibold mt-5 text-center">Account created: <span class="font-bold text-gray-300"> {{profileStore.user.createdAt}} </span></p>
            <div class="mt-10 rounded-md md:pl-5 md:text-[20px]">
                <p class=" font-semibold text-gray-100 bg-[#333333] py-[10px] px-[10px] rounded-md w-[150px]">Your details:</p>
            <div>
                <form v-if="updateForm" action="" class="mt-5 font-semibold text-purple-400 w-[200px] md:w-[320px]">
                    <label for="name" class="">Name:</label>
                    <input type="text" name="name" id="name" placeholder="Mateusz Kroplewski" class="md:ml-[5px] w-[200px] h-[30px] rounded-sm bg-[#222222] pl-[5px] mb-[25px] text-gray-200" >

                    <label for="email" class="ml-[5px]">Email:</label>
                    <input type="email" name="email" id="email" placeholder="mateusz@gmail.com" class="md:ml-[5px] w-[200px] h-[30px] rounded-sm bg-[#222222] pl-[5px] text-gray-200" >
                </form>
                <div v-else class="text-gray-500 font-semibold w-[100%] md:max-w-[auto]">
                    <p class="bg-[#333333] py-[10px] px-[10px] rounded-md">ID: <span class="font-bold text-gray-200 ml-[10px] text-[13px] md:text-[20px]">{{profileStore.user.id}}</span></p>
                    <p class="bg-[#333333] py-[10px] px-[10px] rounded-md">Name: <span class="font-bold text-gray-200 ml-[10px]">{{profileStore.user.name}}</span></p>
                    <p class="bg-[#333333] py-[10px] px-[10px] rounded-md">Email: <span class="font-bold text-gray-200 ml-[10px]">{{profileStore.user.email}}</span></p>
                </div>
                <div class="w-[170px] md:w-[auto] mx-auto md:mx-0">
                    <button class="mt-10 w-[170px] bg-gray-100 rounded-md text-[#111111] mb-10">Reset Password</button>
                    <div class="md:flex md:space-x-5 mb-5 font-semibold">
                        <button class="mt-5 w-[170px] bg-purple-500 rounded-md text-[#111111]">Update Info</button>
                        <button class="mt-5 w-[170px] bg-purple-500 rounded-md text-[#111111]" @click.prevent="logOut">Log out</button>
                    </div>
                </div>

            </div>
            </div>

        </div>
    </section>
</template>

<script>
import {useProfileStore} from '../stores/profile';
import {supabase} from '../includes/supabase';
import { ref } from 'vue';


export default{
    setup(){        
        const profileStore = useProfileStore();
        let updateForm = ref(false);
        let loggingOut = ref(false);
        async function logOut(){
            try{
                loggingOut.value = true;
                const { error } = await supabase.auth.signOut();
                if(error) throw error;
                else{
                    setTimeout(function(){window.location.href = '/';},1000)
                }
            }catch{
                alert(error);
            }

        }
        return{
            profileStore,
            updateForm,
            logOut,
            loggingOut
        }
    }
}
</script>