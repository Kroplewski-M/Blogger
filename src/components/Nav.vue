<template>
    <nav class="w-[100vw] h-[70px] bg-[#222222] text-purple-400 flex relative">
        <div @click.prevent="this.$router.push('/')" class="flex md:ml-10 ml-5 hover:cursor-pointer mt-[15px]">
            <img src="@/assets/logo.png" alt="" class="w-[40px] h-[40px]">
            <p class="font-bold text-[20px] ml-[10px] mt-[3px]">Blogger</p>
        </div>
        <div class="flex mx-auto mt-[20px] hidden md:inline">
            <input type="text" name="" id="" placeholder="Search for Blogs" class="w-[300px] h-[30px] rounded-md bg-[#333333] font-semibold pl-[5px] mr-10">
            <a href="#" @click.prevent="this.$router.push('create-blog')" class="font-bold text-purple-400 no-underline">Write Blog</a>
        </div>
        <div class="float-right hover:cursor-pointer hidden md:inline" @click.prevent="accountPopUp = !accountPopUp">
            <img src="@/assets/user.png" alt="" class="w-[50px] h-[50px] rounded-full bg-[#333333] mr-5 mt-[7px]">
        </div>
        <div class="md:hidden inline absolute right-5 mt-[15px]">
            <img src="@/assets/mobileMenu.png" alt="" class="w-[30px]">
        </div>
    </nav>
    <div class="absolute w-[300px] h-[200px] bg-[#222222] right-5 top-[60px] rounded-md border-2 border-[#111111] text-center text-purple-400" v-if="accountPopUp">
            <!-- USER IS NOT LOGGED IN -->
            <div>
                <p class="font-semibold">You are not logged in!</p>
                <button @click.prevent="this.$router.push('login'), accountPopUp = false" class="bg-[#111111] w-[130px] h-[30px] rounded-sm text-gray-300 font-bold">Login Now!</button>
                <p>Or</p>
                <button @click.prevent="this.$router.push('register'), accountPopUp = false" class="bg-[#111111] w-[180px] h-[40px] rounded-sm text-gray-300 font-bold">Register an account!</button>
            </div>
            <!-- USER IS LOGGED IN -->

        </div>
</template>

<script>
import {ref} from 'vue'

export default{
    setup(){
        let accountPopUp = ref(false);

        return{
            accountPopUp,
        }
    }
}
</script>