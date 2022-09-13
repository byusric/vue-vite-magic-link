<template>
 
 <div class="w-full h-screen bg-slate-500 flex flex-col items-center justify-center border">
    <div class="flex flex-col w-1/4 border p-4 gap-2 rounded">
      Login
      <button type="button" @click="loginWallet" class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Login with Wallet</button>            
      <router-link to="/create-user">Create User</router-link>
    </div>
 </div>
</template>

<script setup lang="ts">
  import {onMounted, ref} from 'vue';
  import {storeToRefs} from 'pinia';
  import {useAuthStore} from '@/stores/auth';
  import { SDKError, RPCError, ExtensionError } from 'magic-sdk';
  import LoadingSpinner from '../components/loadingSpinner.vue';

  const {loginWallet}=useAuthStore()

  const email = ref('')
  const loading = ref(false)

  const tryLogin =  async () =>{
    loading.value = true
    try {
     await  useAuthStore().login(email.value)
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