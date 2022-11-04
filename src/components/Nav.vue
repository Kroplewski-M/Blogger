<template>
    <nav class="w-[100vw] bg-[#222222] text-purple-400 flex relative flex-col space-y-10 md:space-y-0 md:flex-row" :class="(mobileNav == 'hidden'? 'h-[70px]' : 'h-[auto]')">
        <div @click.prevent="this.$router.push('/')" class="flex md:ml-10 ml-5 hover:cursor-pointer  relative z-50 w-[100%] md:w-[auto] place-content-center md:place-content-start pr-[70px] md:pr-[0px]" :class="(mobileNav == 'hidden'? 'mt-[15px]' : 'mt-10')">
            <img src="@/assets/logo.png" alt="" class="w-[40px] h-[40px]">
            <p class="font-bold md:text-[25px] text-[35px] ml-[10px] -mt-[7px] md:mt-0">Blogger</p>
        </div>
        <div class="flex flex-col md:flex-row text-center space-y-5 md:space-y-0 mx-auto pt-[20px] relative z-50 md:inline" :class="mobileNav">
            <input type="text" name="" id="" placeholder="Search for Blogs" class="w-[300px] h-[30px] rounded-md bg-[#333333] font-semibold pl-[5px] md:mr-10" :class="(mobileNav == 'hidden'? '' : 'hidden')">
            <a href="#" @click.prevent="this.$router.push('create-blog')" class="font-bold text-purple-400 no-underline" :class="(mobileNav == 'hidden'? '' : 'text-[30px]')">Write Blog</a>
        </div>
        <div class="float-right hover:cursor-pointer md:relative md:mr-5 z-50 md:inline mx-auto md:mx-0 md:mt-0" :class="(mobileNav == 'hidden'? 'mt-[15px] hidden' : ' pt-[70px] w-[70px] md:w-[55px]')" @click.prevent="accountPopUp = !accountPopUp">
            <img v-if="profileStore.user.id == undefined" src="@/assets/user.png" alt="" class="w-[70px] h-[70px] md:h-[55px] md:w-[55px] rounded-full bg-[#333333] mr-5 mt-[7px]">
            <img v-else :src="profileStore.user.avatarUrl" alt="" class="w-[70px] h-[70px] md:h-[55px] md:w-[55px] rounded-full bg-[#333333] mr-5 mt-[7px] ">
        </div>
        <div class="md:hidden inline absolute right-5 -top-5 z-50" @click.prevent="toggleMobileNav">
            <div v-if="mobileNav == 'hidden'">
                <img  src="@/assets/mobileMenu.png" alt="" class="w-[30px]">
            </div>
            <div v-else>
                <img src="@/assets/close.png" alt="" class="w-[30px]">
            </div>
        </div>
    </nav>
    <div v-if="this.$route.path == '/'" class="w-[300px] mx-auto align-center md:hidden" :class="(mobileNav == 'hidden'? '' : 'hidden')">
        <input type="text" name="" id="" placeholder="Search for Blogs" class="w-[300px] h-[30px] rounded-md bg-[#333333] font-semibold pl-[5px] md:mr-10 mt-5 text-gray-200" >
        <div class="w-[100px] mx-auto">
            <button class="w-[100px] h-[30px] bg-gray-200 rounded-md text-[#222222] font-bold mt-5">Find Blog</button>
        </div>
    </div>

    <div class="absolute w-[300px] h-[200px] bg-[#222222] right-5  rounded-md border-2 border-[#111111] text-center text-purple-400 z-50" v-if="accountPopUp" :class="(mobileNav == 'hidden'? 'top-[60px]' : 'top-[435px]')">
            <!-- USER IS NOT LOGGED IN -->
            <div v-if="profileStore.user.id == undefined">
                <img src="@/assets/close.png" class="w-[20px] float-right mr-[10px] mt-[10px] hover:cursor-pointer" alt=""  @click.prevent="accountPopUp = !accountPopUp">
                <p class="font-semibold">You are not logged in!</p>
                <button @click.prevent="this.$router.push('login'), accountPopUp = false" class="bg-[#111111] w-[130px] h-[30px] rounded-sm text-gray-300 font-bold">Login Now!</button>
                <p>Or</p>
                <button @click.prevent="this.$router.push('register'), accountPopUp = false" class="bg-[#111111] w-[180px] h-[40px] rounded-sm text-gray-300 font-bold">Register an account!</button>
            </div>
            <!-- USER IS LOGGED IN -->
            <div v-else>
                <img src="@/assets/close.png" class="w-[20px] float-right mr-[10px] mt-[10px] hover:cursor-pointer" alt=""  @click.prevent="accountPopUp = !accountPopUp">
                <p class="mt-[30px]">Hello,</p>
                <p class="font-bold text-[20px] -mt-5">{{profileStore.user.name}}</p>
                <button class="bg-gray-200 px-5 py-[10px] rounded-md text-[#222222] font-bold"  @click.prevent="this.$router.push('profile'), accountPopUp = false">Account settings</button>

            </div>
    </div>
    <!-- MOBILE NAV -->
    <section class="w-[100vw] h-[100vh] bg-[#111111] fixed top-0 z-10" :class="mobileNav">
        
    </section>
</template>

<script>
import {useProfileStore} from '../stores/profile';
import {ref} from 'vue'

export default{
    setup(){
        const profileStore = useProfileStore();
        let accountPopUp = ref(false);
        let mobileNav = ref('hidden');
        let windowWidth = ref(window.innerWidth);
        function toggleMobileNav(){
            console.log("here")
            if(mobileNav.value == "hidden"){
                mobileNav.value = "";
            }else{
                mobileNav.value = "hidden";
            }
            if(accountPopUp.value){
                accountPopUp.value = false;
            }
        }
        window.addEventListener('resize', () =>{
            windowWidth.value = window.innerWidth;
            if(windowWidth.value > 768){
                if(mobileNav.value != 'hidden'){
                    mobileNav.value = 'hidden';
                }
            }
        });
        return{
            accountPopUp,
            mobileNav,
            toggleMobileNav,
            profileStore
        }
    }
}
</script>