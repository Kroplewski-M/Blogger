<template>
    <div class="max-w-[1000px] h-[500px] mx-auto mt-16 text-center flex flex-col">
        <button class="w-[150px] min-h-[40px] rounded-lg bg-purple-500 font-bold mb-10 hover:bg-purple-700">Add Cover Img</button>
        <input type="text" name="title" placeholder="Title" class="bg-[#222222] focus:outline-none text-[#EEEEEE] w-[80%] h-[50px] pl-[10px] font-bold text-[30px] rounded-md">
        <hr class="mt-10 border-[1px] border-solid border-[#333333]">
        <div class="flex pt-[10px]">
            <button class="w-[70px] h-[30px] rounded-lg font-semibold text-purple-300 hover:bg-gray-200 hover:text-[#222222] text-[20px]">Write</button>
            <button class="w-[90px] h-[30px] rounded-lg font-semibold text-gray-300 hover:bg-gray-200 hover:text-[#222222] text-[20px] ml-5">Preview</button>
            
        </div>
        <hr class="mt-[15px] border-[1px] border-solid border-[#333333]">
        <textarea name="content" placeholder="Your story starts here..." 
        class="bg-[#222222] rounded-lg mt-10 min-h-[300px] focus:outline-none text-gray-200 pl-[10px] pt-[10px] font-semibold"></textarea>

    </div>
</template>
