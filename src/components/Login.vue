<template>
    <div @click.prevent="this.$router.push('/')" class="flex w-[270px] mx-auto mt-16 hover:cursor-pointer">
        <img src="@/assets/logo.png" alt="" class="w-[70px] h-[70px]">
        <h1 class="font-bold text-[40px] mt-[10px] text-purple-400">Blogger</h1>
    </div>
    <div class="w-[100%] md:w-[500px] h-[450px] rounded-md bg-[#222222] mx-auto mt-[100px] text-purple-300 font-semibold">
        <div v-if="loggingIn" class="w-[300px] mx-auto">
            <div class="absolute w-[300px] h-[30px] rounded-md bg-green-500 -mt-[20px]">
                <p class="text-center text-[16px] font-bold my-0 mt-[3px] text-[#222222]">Logging In...</p>
            </div>
        </div>

        <h1 class="text-purple-400 font-bold text-center text-[40px] mt-[5px]">Login</h1>
        <div class="w-[350px] md:w-[250px] md:w-[370px] mx-auto mt-[55px]">
            <vee-form class="md:text-[20px] text-[15px]" :validation-schema="schema" @submit="login">
                <label for="email" class="ml-[35px]">Email:</label>
                <vee-field type="email" name="email" placeholder="example@mail.com" class="text-gray-100 w-[250px] h-[40px] md:h-[30px] rounded-sm bg-[#333333] pl-[5px] ml-[10px] mb-[30px]" />
                <ErrorMessage name="email"  class="text-red-500 w-[100%] block text-[13px] absolute -mt-[30px]  ml-[100px]"/>

                <label for="password">Password:</label>
                <vee-field  type="password" name="password" placeholder="password" class="text-gray-100 w-[250px] h-[40px] md:h-[30px] rounded-sm bg-[#333333] pl-[5px] md:ml-[10px] ml-[17px]" />
                <ErrorMessage name="password"  class="text-red-500 w-[100%] block text-[13px] absolute   ml-[100px]"/>

                <div class="w-[110px] mx-auto mt-[50px]">
                    <button :disabled="loading" class="w-[100%] h-[35px] bg-gray-100 rounded-md text-[#222222] font-bold hover:bg-gray-300">Login</button>
                </div>
            </vee-form>
            <div class="mt-5 mx-auto md:w-[280px] w-[200px] text-center">
                <p class="text-gray-100">OR</p>
                <button @click.prevent="this.$router.push('register')" class="w-[100px] h-[30px] bg-purple-300 rounded-md text-[#222222] font-bold mt-5 hover:bg-purple-400">Register</button>
            </div>
        </div>
    </div>
    <div v-if="showError" class="w-[300px] h-[30px] bg-red-700 mx-auto rounded-md mt-5">
        <p class="my-0 font-bold text-center">Error Logging In</p>
    </div>
</template>

<script>
import { ref } from 'vue';
import {supabase} from '../includes/supabase';

export default{
    setup(){
        let loading = ref(false);
        let loggingIn = ref(false);
        let showError = ref(false);

        let schema= ref({
            email: "required",
            password: "required",
        });

        async function login(values){
            try{
                showError.value=false;
                loggingIn.value = true;
                loading.value = true;
                const {data, error} = await supabase.auth.signInWithPassword({email: values.email, password: values.password});
                if(error) throw error;
                else {
                    showError.value=false;
                    loading.value = false;
                    window.location.href = '/';
                }
            }catch(error){
                loggingIn.value = false;
                showError.value=true;
                loading.value = false;
            }
        }

        return{
            schema,
            loading,
            login,
            loggingIn,
            showError,
        }
    }
}
</script>