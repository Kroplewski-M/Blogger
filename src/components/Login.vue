<template>
    <div @click.prevent="this.$router.push('/')" class="flex w-[270px] mx-auto mt-16 hover:cursor-pointer">
        <img src="@/assets/logo.png" alt="" class="w-[70px] h-[70px]">
        <h1 class="font-bold text-[40px] mt-[10px] text-purple-400">Blogger</h1>
    </div>
    <div class="w-[300px] md:w-[500px] h-[450px] rounded-md bg-[#222222] mx-auto mt-[100px] text-purple-300 font-semibold">
        <h1 class="text-purple-400 font-bold text-center text-[40px] mt-[5px]">Login</h1>
        <div class="w-[250px] md:w-[370px] mx-auto mt-[55px]">
            <form action="" class="md:text-[20px] text-[15px]">

                <label for="email" class="ml-[35px]">Email:</label>
                <input type="email" name="email" placeholder="example@mail.com" class="w-[150px] md:w-[250px] h-[30px] rounded-sm bg-[#333333] pl-[5px] ml-[10px] mb-5">

                <label for="password">Password:</label>
                <input type="email" name="password" placeholder="password" class="w-[150px] md:w-[250px] h-[30px] rounded-sm bg-[#333333] pl-[5px] md:ml-[10px] ml-[17px]">
                <div class="w-[110px] mx-auto mt-[50px]">
                    <button class="w-[100%] h-[35px] bg-gray-100 rounded-md text-[#222222] font-bold hover:bg-gray-300">Login</button>
                </div>
            </form>
            <div class="mt-5 mx-auto md:w-[280px] w-[200px] text-center">
                <p class="text-gray-100">OR</p>
                <button @click.prevent="this.$router.push('register')" class="w-[100px] h-[30px] bg-purple-300 rounded-md text-[#222222] font-bold mt-5 hover:bg-purple-400">Register</button>
            </div>
        </div>
    </div>
</template>