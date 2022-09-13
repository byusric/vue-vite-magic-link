<template>
  <nav class="bg-gray-800">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="hidden sm:ml-6 sm:block">
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <div class="flex space-x-4">
            <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
            <button @click="logout" class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Logout</button>            
          </div>
        </div>
      </div>
    </div>
  </nav>
  <div class="flex flex-col w-full h-screen bg-slate-500 p-4">
    <div class="text-4xl mt-4 flex flex-col items-center justify-center">
      <div>
        Count: {{count}}
      </div>
      <div>
        <button @click="increment" class="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium flex justify-center" aria-current="page" :disabled="loading"><LoadingSpinner v-if="loading"/> <div >increment</div> </button>
      </div>
    </div>

  </div>
</template>
  
<script setup lang="ts">
  import {onMounted} from 'vue';
  import { useAuthStore } from '@/stores/auth';
  import { storeToRefs } from 'pinia';
  import LoadingSpinner from '../components/LoadingSpinner.vue';

  const {logout,wallet,getCount,increment}=useAuthStore()
  const {count,loading}=storeToRefs(useAuthStore())

  onMounted(()=>{
    getCount()
  })
</script>