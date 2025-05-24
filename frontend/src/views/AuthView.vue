<script setup lang="ts">
import Auth from "../components/features/Auth/Auth.vue";
import {onMounted, ref} from "vue";
import Dialog from "../components/ui/Dialog/Dialog.vue";

import thumbsUp from "@/assets/thumbs_up.gif"
import HeaderComponent from "@/components/headerComponent.vue";
import {useRouter} from "vue-router";

const props = defineProps<{
  authType: 'login' | 'signup';
}>();


const router = useRouter();

const showTOS = ref(false);

function toggle_tos(close: boolean) {
  showTOS.value = close;
}

onMounted(()=>{
  const token = localStorage.getItem("session");
  if (token !== null) {
    router.push("/")
  }
})


</script>

<template>
  <div class="w-full max-w-md">
    <Auth :authType="authType"/>

    <div class="text-center mt-6">
      <p class="text-xs text-gray-500">By continuing, you agree to our
        <button to="/tos" class="text-purple-600 hover:text-purple-700 transition-colors underline cursor-pointer"
                @click="toggle_tos(true)"> Terms of
          Service
        </button>
      </p>
    </div>

    <Dialog title="Terms of Service" :show="showTOS" @close="toggle_tos(false)">
      <div>
        - Be Cool <b>(mandatory)</b>

        <img :src="thumbsUp" class="my-8 w-full" alt="">

        <div class="mt-10 text-right">
          <button @click="toggle_tos(false)"
                  class="inline-flex mt-2 items-center justify-center gap-2 whitespace-nowrap text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl py-2.5 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] font-medium text-white cursor-pointer cursor-pointer">
            Close
          </button>
        </div>
      </div>
    </Dialog>
  </div>
</template>
