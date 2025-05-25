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
    <Auth @tos="showTOS = true" :authType="authType"/>

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
                  class="custom-button">
            Close
          </button>
        </div>
      </div>
    </Dialog>
  </div>
</template>
