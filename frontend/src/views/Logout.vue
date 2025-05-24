<script setup lang="ts">
import {onMounted} from "vue";
import {useRouter} from "vue-router";
import {useUserStore} from "@/stores/user.ts";

const router = useRouter();
const userStore = useUserStore();

onMounted(()=>{
  localStorage.removeItem("session");
  userStore.removeActiveUser();
  router.push("/login");
})
</script>

<template>

</template>

<style scoped>

</style>