<template>
    <nav class="w-[100vw] h-[70px] bg-[#222222] text-purple-400 flex relative">
        <div class="flex md:ml-10 ml-5 hover:cursor-pointer mt-[15px]">
            <img src="@/assets/logo.png" alt="" class="w-[40px] h-[40px]">
            <p class="font-bold text-[20px] ml-[10px] mt-[3px]">Blogger</p>
        </div>
        <div class="flex mx-auto mt-[20px] hidden md:inline">
            <input type="text" name="" id="" placeholder="Search for Blogs" class="w-[300px] h-[30px] rounded-md bg-[#333333] font-semibold pl-[5px] mr-10">
            <a href="#" class="font-bold text-purple-400 no-underline">Write Blog</a>
        </div>
        <div class="float-right hover:cursor-pointer hidden md:inline">
            <img src="@/assets/user.png" alt="" class="w-[50px] h-[50px] rounded-full bg-[#333333] mr-5 mt-[7px]">
        </div>
        <div class="md:hidden inline absolute right-5 mt-[15px]">
            <img src="@/assets/mobileMenu.png" alt="" class="w-[30px]">
        </div>
    </nav>
</template>
