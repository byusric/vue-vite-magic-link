<template>
 
    <div class="w-full h-screen bg-slate-500 flex flex-col items-center justify-center border">
        <div class="flex flex-col w-1/4 border p-4 gap-2 rounded">
            Complete Register
            <button type="button" @click="registerComplete" class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Wallet</button>   
        </div>
    </div>
   </template>
   
<script setup lang="ts">
    import {ref,onMounted} from 'vue';
    import { useAuthStore } from '@/stores/auth';
    import { useRouter } from 'vue-router';
    import router from '@/router';
    

    const route = useRouter()

    const tempAddress = ref('')

    const { completeRegister }=useAuthStore()

    const registerComplete = () =>{
        completeRegister(tempAddress.value)
    }
    onMounted(()=>{
        tempAddress.value = route.currentRoute.value.query.temp_address
        if(!tempAddress.value){
            router.push('/')
        }
    })
</script>