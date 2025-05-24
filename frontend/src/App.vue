<script setup lang="ts">
import {RouterView} from "vue-router";
import HeaderComponent from "@/components/headerComponent.vue";
import Fullpage from "@/components/ui/loader/fullpage.vue";
import {useLoadingStore} from "@/stores/loading.ts";


const loading = useLoadingStore();
</script>

<template>
  <main  class="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex flex-col Inter-regular">
  <header-component class="w-full" />
    <div
        class="flex-1 grid place-items-center"
    >

      <RouterView/>
    </div>
  </main>
  <Fullpage v-if="loading.showLoading">
    <div class="cursor-default mt-5 gap-2 whitespace-nowrap text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl py-2.5 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] font-medium text-white">{{loading.loadingText}}</div>
  </Fullpage>
</template>
