<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRouter} from "vue-router";
import {useUserStore} from "@/stores/user.ts";
import NewTodo from "@/components/features/todo/newTodo.vue";
import ListTodo from "@/components/features/todo/listTodo.vue";
import QueryTodo from "@/components/features/todo/queryTodo.vue";

const router = useRouter();
const userStore = useUserStore();

const showNew = ref(false);
onMounted(() => {
  const session = localStorage.getItem('session')
  userStore.setActiveUser(session);
});


</script>

<template>
  <div class="w-full max-w-lg mx-auto h-full p-2">
    <div class="text-end">
      <button @click="showNew = !showNew" class="custom-secondary-button" >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        <span class="font-bold hidden sm:inline">Create</span>
      </button>
      <RouterLink to="/logout" class="custom-secondary-button ml-2" >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
        </svg>
        <span class="font-bold hidden sm:inline">Logout</span>
      </RouterLink>
    </div>

    <NewTodo v-if="showNew" />
    <QueryTodo />
    <ListTodo />
  </div>
</template>