<template>
    <section class="md:w-[50vw] w-[90vw] min-h-[80vh] bg-[#333333] mx-auto mt-10 rounded-lg">
        <div class="max-w-[500px] mx-auto pt-10">
            <div class="w-[80px] mx-auto">
                <img src="@/assets/user.png" alt="" class="w-[80px] bg-gray-300 rounded-full">
            </div>
            <p class="text-gray-300 font-semibold mt-5 text-center">Account created: 15/05/2022</p>
            <div class="border-solid border-2 border-gray-100 mt-10 rounded-md pl-5 text-[20px]">
                <p class="text-[20px] font-semibold text-gray-100">Your details:</p>

                <form action="" class="mt-5 font-semibold text-purple-400 w-[200px] md:w-[320px]">
                    <label for="name" class="">Name:</label>
                    <input type="text" name="name" id="name" placeholder="Mateusz Kroplewski" class="md:ml-[5px] w-[200px] h-[30px] rounded-sm bg-[#222222] pl-[5px] mb-[25px] text-gray-200" >

                    <label for="name" class="">Username:</label>
                    <input type="text" name="username" id="username" placeholder="Mat-K" class="ml-[5px] w-[200px] h-[30px] rounded-sm bg-[#222222] pl-[5px] mb-[25px] text-gray-200" >

                    <label for="email" class="ml-[5px]">Email:</label>
                    <input type="email" name="email" id="email" placeholder="mateusz@gmail.com" class="md:ml-[5px] w-[200px] h-[30px] rounded-sm bg-[#222222] pl-[5px] text-gray-200" >

                    <button class="mt-10 w-[170px] bg-gray-100 rounded-md text-[#111111] mb-10">Reset Password</button>

                    <div class="md:flex md:space-x-5 mb-5">
                        <button class="mt-5 w-[170px] bg-purple-500 rounded-md text-[#111111]">Update Info</button>
                        <button class="mt-5 w-[170px] bg-purple-500 rounded-md text-[#111111]">Log out</button>
                    </div>

                </form>
            </div>

        </div>
    </section>
</template>