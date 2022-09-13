<template>
 
    <div class="w-full h-screen bg-slate-500 flex flex-col items-center justify-center border">
       <div class="flex flex-col w-1/4 border p-4 gap-2 rounded">
         Create User
         <form @submit.prevent="tryLogin" class="flex flex-col w-full gap-2">
          <input type="email" name="email" id="email" v-model="email" class="w-full rounded h-6" required/>
          <button type="submit" class="bg-slate-700 rounded text-white flex justify-between p-1 items-center">
            <div class="flex justify-center items-center w-full">Submit</div>
          </button>
          <router-link to="/login">Login</router-link>
        </form>
       </div>
    </div>
   </template>
   
   <script setup lang="ts">
     import {onMounted, ref} from 'vue';
     import {useAuthStore} from '@/stores/auth';
     import { SDKError, RPCError, ExtensionError } from 'magic-sdk';
   
     const {createUser}=useAuthStore()
   
     const email = ref('')
     const loading = ref(false)
   
     const tryLogin =  async () =>{
        loading.value = true
        try {
            await createUser(email.value)
        } catch (err) {
            if (err instanceof SDKError) {
                console.log(err);
            }
            if (err instanceof RPCError) {
                console.log(err);
            }
            if (err instanceof ExtensionError) {
                console.log(err);
            }
        }
        loading.value = false
     }
     onMounted(()=>{
       console.log('onMounted');
     })
   </script>