<template>
    <div class="w-[500px] h-[400px] rounded-md bg-[#222222] mx-auto mt-[100px] text-purple-300 font-semibold">
        <h1 class="text-purple-400 font-bold text-center text-[40px]">Login</h1>
        <div class="w-[370px] mx-auto mt-[55px]">
            <form action="" class="text-[20px]">
                <label for="email" class="ml-[35px]">Email:</label>
                <input type="email" name="email" placeholder="example@mail.com" class="w-[250px] h-[30px] rounded-sm bg-[#333333] pl-[5px] ml-[10px] mb-5">

                <label for="password">Password:</label>
                <input type="email" name="password" placeholder="password" class="w-[250px] h-[30px] rounded-sm bg-[#333333] pl-[5px] ml-[10px]">
                <div class="w-[110px] mx-auto mt-[50px]">
                    <button class="w-[100%] h-[35px] bg-gray-100 rounded-md text-[#222222] font-bold hover:bg-gray-300">Login</button>
                </div>
            </form>
            <div class="mt-5 mx-auto w-[280px] text-center">
                <p class="text-gray-100">OR</p>
                <button class="w-[100px] h-[30px] bg-purple-300 rounded-md text-[#222222] font-bold mt-5 hover:bg-purple-400">Register</button>
            </div>
        </div>
    </div>
</template>