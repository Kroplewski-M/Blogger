<template>
    <div @click.prevent="this.$router.push('/')" class="flex w-[270px] mx-auto mt-16 hover:cursor-pointer">
        <img src="@/assets/logo.png" alt="" class="w-[70px] h-[70px]">
        <h1 class="font-bold text-[40px] mt-[10px] text-purple-400">Blogger</h1>
    </div>
    <div v-if="accountCreated" class="w-[100vw] h-[70px] absolute mt-10 text-center">
            <p class="text-green-500 font-bold">Account Created!.... Redirecting</p>
    </div>
    <div v-if="creatingAccount" class="w-[100vw] h-[70px] absolute mt-10">
        <div class="flex place-content-center">
            <p class="text-gray-300 font-bold">Creating Account....</p>
            <img src="@/assets/hammer.png" alt="" class="w-[40px] h-[40px] ml-5 mt-[5px]">
        </div>
    </div>
    <div class="w-[100%] md:w-[500px] h-[600px] rounded-md bg-[#222222] mx-auto mt-[100px] text-purple-300 font-semibold">
        <h1 class="text-purple-400 font-bold text-center text-[40px] mt-[5px]">Register</h1>
        <div class="w-[350px] md:w-[370px] mx-auto mt-[55px]">
            <vee-form action="" class="md:text-[20px] text-[15px]" :validation-schema="schema" @submit="registerAccount">
                <label for="avatar" class="ml-5">Avatar:</label>
                <vee-field type="file" name="avatar" id="avatar" class="text-[16px] mb-[30px] w-[250px] ml-5"/>
                <ErrorMessage name="avatar"  class="text-red-500 block text-[13px] -mt-[30px]  ml-[100px] absolute"/>

                <label for="name" class="ml-[35px]">Name:</label>
                <vee-field type="text" name="name" placeholder="John Doe" class="w-[250px] h-[40px] md:h-[30px] rounded-sm bg-[#333333] pl-[5px] ml-[7px] mb-[30px] text-gray-100" />
                <ErrorMessage name="name"  class="text-red-500 block text-[13px] -mt-[30px]  ml-[100px] absolute"/>

                <label for="email" class="ml-[35px]">Email:</label>
                <vee-field type="email" name="email" placeholder="example@mail.com" class="w-[250px] h-[40px] md:h-[30px] rounded-sm bg-[#333333] pl-[5px] ml-[10px] mb-[30px] text-gray-100" />
                <ErrorMessage name="email"  class="text-red-500 w-[100%] block text-[13px] absolute -mt-[30px]  ml-[100px]"/>

                <label for="password">Password:</label>
                <vee-field type="password" name="password" placeholder="password" class="w-[250px] h-[40px] md:h-[30px] rounded-sm bg-[#333333] pl-[5px] md:ml-[10px] ml-[17px] text-gray-100" />
                <ErrorMessage name="password"  class="text-red-500 w-[100%] block text-[13px] absolute  ml-[100px]"/>

                <div class="w-[110px] mx-auto mt-[50px]">
                    <button class="w-[100%] h-[35px] bg-gray-100 rounded-md text-[#222222] font-bold hover:bg-gray-300" :disabled="loading">Register</button>
                </div>
            </vee-form>
            <div class="mt-5 mx-auto md:w-[280px] w-[200px] text-center">
                <p class="text-gray-100">OR</p>
                <button @click.prevent="this.$router.push('login')" class="w-[100px] h-[30px] bg-purple-300 rounded-md text-[#222222] font-bold mt-5 hover:bg-purple-400">Login</button>
            </div>
        </div>
    </div>
</template>

<script>
import {ref} from 'vue';
import {supabase} from '../includes/supabase';

export default{
    setup(){
        let loading = ref(false);
        let accountCreated = ref(false);
        let creatingAccount = ref(false);
        let id = ref('');
        let schema= ref({
            name: "required|alpha_spaces",
            email: "required|email",
            password: "required|min:6",
            avatar: "required",
        });
        async function uploadAvatar(email,avatar){
            //ADD AVATAR TO BUCKET
            try{
                const { data, error } = await supabase.storage.from('avatars').upload(`${email}/${email}.png`, avatar, {cacheControl: '3600',upsert: true});
                if(error) throw error;
                else{
                    console.log("image uploaded");
                    setTimeout(function(){redirect()},2000)
                }
            }catch(error){
                console.log(error);
            }finally{
                loading.value = false;
                creatingAccount.value = false;
                accountCreated.value = true;
            }

        }

        async function addUserToTable(id,name,email,avatar){
            try{
                let avatarUrl = `https://rbvjgzheadvqlgviwvuv.supabase.co/storage/v1/object/public/avatars/${email}/${email}.png`;
                const {data,error} = await supabase.from('Users').insert({id:id, Name: name, Email: email, AvatarUrl: avatarUrl});
                if(error){throw error;}
                else{
                    console.log("Profile added to table");
                }
            }catch(error){
                console.log(error);
            }finally{
                uploadAvatar(email,avatar);
            }
        };

        async function registerAccount(values,{resetForm}){
            loading.value = true;
            creatingAccount.value = true;
            try{
                const {data, error} = await supabase.auth.signUp({
                    email: values.email,
                    password: values.password,
                })
                if(error){ JSON.stringify(error);}
                else{
                    id.value = data.user.id;
                    console.log("Auth added");
                }
            }catch(error){
                alert(error);
            }finally{
                addUserToTable(id.value,values.name,values.email,values.avatar);
                resetForm();
            }
        };
        const redirect = () =>{
            window.location.href = '/';
        }
        return{
            schema,
            loading,
            registerAccount,
            accountCreated,
            creatingAccount,
        }
    }
}

</script>