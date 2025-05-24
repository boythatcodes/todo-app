<script setup lang="ts">
import {onMounted} from 'vue';
import {useRouter} from "vue-router";
import {useUserStore} from "@/stores/user.ts";

const router = useRouter();
const userStore = useUserStore();
onMounted(()=>{
  const session = localStorage.getItem('session')
  if(!session) {
    router.push('/login');
    return
  }
  userStore.setActiveUser(session);
});


</script>

<template>
  {{userStore.activeUser}}
  <RouterLink to="/login" >Login</RouterLink>
  <RouterLink to="/logout" >Logout</RouterLink>
</template>