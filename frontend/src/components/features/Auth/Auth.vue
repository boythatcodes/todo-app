<script setup lang="ts">
import {RouterLink} from 'vue-router'
import PasswordInput from "@/components/ui/Input/PasswordInput.vue";
import EmailInput from "@/components/ui/Input/EmailInput.vue";
import {onMounted, onUnmounted, ref} from "vue";
import axios from "axios";
import {signInRequest, signup} from "@/api/user/user.ts";


const prop = defineProps<{
  authType: 'login' | 'signup';
}>();


// toast.open({
//   message: 'Operation completed successfully!',
//   duration: 25000,
//   dismissible: true,
//   type: "success",
//   queue: false,
//   position: "top-right",
// });
// toast.open({
//   message: 'Operation completed successfully!',
//   duration: 25000,
//   dismissible: true,
//   type: "error",
//   queue: false,
//   position: "top-right",
// });

const name = ref('');
const email = ref('');
const password = ref('');
const nameError = ref<string | null>(null);
const emailError = ref<string | null>(null);
const passwordError = ref<string | null>(null);
const formElement = ref<HTMLFormElement | null>(null);

const handleInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value;
  if(value == ""){
    nameError.value = "Name is required";
  }else {
    nameError.value = "";
  }
  name.value = value;
};
async function signIn() {
  if(emailError.value || passwordError.value){
    return
  }

  await signInRequest(email.value, password.value)
}

async function signUP(){
  if(nameError.value || emailError.value || passwordError.value){
    return
  }

  await signup(email.value, password.value, name.value);
}


onMounted(()=>{
  formElement.value?.addEventListener('submit', async (event: Event) => {
    event.preventDefault();
    if(email.value.trim() === '' && !emailError.value){
      emailError.value = "Email is required";
    }
    if(password.value.trim() === '' && !passwordError.value){
      passwordError.value = "Password is required";
    }

    if(prop.authType === 'login'){
      return await signIn()
    }

    if(name.value.trim() === '' && !nameError.value){
      nameError.value = "Name is required";
    }

    return await signUP()
  })
})

onUnmounted(()=>{
  formElement.value?.removeEventListener('submit', ()=>{});
})
</script>

<template>
  <div
      class="rounded-lg border text-card-foreground bg-white/70 backdrop-blur-sm border-white/20 shadow-xl"
  >
    <div class="flex flex-col space-y-1.5 p-6 text-center pb-4">
      <h3 class="tracking-tight text-2xl font-bold text-gray-800" v-if="authType=='login'">Sign In</h3>
      <h3 class="tracking-tight text-2xl font-bold text-gray-800" v-else>Create Account</h3>
      <p class="text-sm text-gray-600" v-if="authType == 'login'">
        Enter your credentials to access your account
      </p>
      <p class="text-sm text-gray-600" v-else>
        Fill in your details to get started
      </p>
    </div>
    <div class="p-6 pt-4">
      <form class="space-y-4" ref="formElement">
        <div class="" v-if="authType=='signup'"><label
            class="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium text-gray-700"
            for="name">Full Name</label>
          <div class="relative mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="lucide lucide-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <input
                :value="name"
                @input="handleInput"
                class="flex h-10 w-full border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 border-purple-200 focus:border-purple-400 focus:ring-purple-400 rounded-xl"
                id="name" placeholder="Enter your full name" type="text">
          </div>
          <div v-if="nameError" class="text-red-500 text-sm mt-1">{{ nameError }}</div>
        </div>
        <div class="">
          <label
              class="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium text-gray-700"
              for="email"
          >Email Address</label
          >
          <EmailInput class="mt-2" v-model="email"
                      @error="(msg) => emailError = msg"
          />
          <div v-if="emailError" class="text-red-500 text-sm mt-1">{{ emailError }}</div>
        </div>
        <div class="">
          <label
              class="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium text-gray-700"
              for="password"
          >Password</label
          >
          <PasswordInput class="mt-2" v-model="password"
                         @error="(msg) => passwordError = msg"
          />
          <div v-if="passwordError" class="text-red-500 text-sm mt-1">{{ passwordError }}</div>
        </div>
        <button
            class="inline-flex mt-2 items-center justify-center gap-2 whitespace-nowrap text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl py-2.5 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-[1.02] font-medium text-white cursor-pointer"
            type="submit"
        >
          {{ authType == 'signup'?"Sign Up" : "Sign In"}}
        </button>
      </form>
      <div class="text-center mt-4">
        <RouterLink to="/forgot-pass"
                    class="text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors mt-1">
          Forgot your password?
        </RouterLink>
      </div>
      <div class="text-center mt-6 pt-4 border-t border-gray-200">
        <p class="text-sm text-gray-600">Don't have an account?</p>
        <RouterLink v-if="authType == 'login'" to="/signup"
                    class="text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors mt-1">Sign up
          here
        </RouterLink>
        <RouterLink v-else to="/login"
                    class="text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors mt-1">Sign in
          here
        </RouterLink>
      </div>
    </div>
  </div>
</template>
