<script setup lang="ts">
import {useRoute} from 'vue-router';
import {onMounted} from "vue";
import {resetLink} from "@/api/user/userApi.ts";

const prop = defineProps<{
  title: string;
  desc: string;
}>()

const route = useRoute();
let email_to_send = "";

onMounted(() => {
  email_to_send = route.query.e as string | undefined || ""
})

async function resendEmail() {
  if (email_to_send == "") {
    alert("Email is not set")
    return;
  }

  await resetLink(email_to_send);
}

</script>

<template>
  <div
      class="py-4 px-6 w-full max-w-md text-center flex justify-center flex-col h-full max-h-70 rounded-lg border text-card-foreground bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
    <div class="text-xl font-bold">{{ title }}</div>
    <div class="pt-4">{{desc}}</div>


    <button @click="resendEmail"
            class="inline-flex mt-5 items-center justify-center gap-2 whitespace-nowrap text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl py-2.5 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] font-medium text-white cursor-pointer">
      Resend Email
    </button>
    <RouterLink to="/login" class="text-blue-600 underline pt-5"> back to login</RouterLink>
  </div>
</template>
