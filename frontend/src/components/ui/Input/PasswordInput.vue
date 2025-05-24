<script setup lang="ts">
import {ref} from 'vue';

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string],
  'error': [message: string | null]
}>();

const passwordInput = ref<HTMLInputElement>();
const showingPassword = ref(false);

const togglePasswordTest = () => {
  if (!passwordInput.value) return;
  showingPassword.value = !showingPassword.value;
  passwordInput.value.type = showingPassword.value ? "text" : "password";
};

const handleInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value;
  emit('update:modelValue', value);
  validatePassword(value);
};

const validatePassword = (value: string) => {
  const errors = [];
  if (!value) {
    emit('error', null);
    return;
  }

  if (value.length < 8 || value.length > 20) {
    errors.push('Password must be 8-20 characters');
  }
  if (!/[A-Z]/.test(value)) {
    errors.push('At least one uppercase letter');
  }
  if (!/[a-z]/.test(value)) {
    errors.push('At least one lowercase letter');
  }
  if (!/[0-9]/.test(value)) {
    errors.push('At least one number');
  }
  if (!/[^A-Za-z0-9]/.test(value)) {
    errors.push('At least one symbol');
  }

  emit('error', errors.length ? errors.join(', ') : null);
};
</script>
<template>
  <div class="relative">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg
    >
    <input
        ref="passwordInput"
        :value="modelValue"
        @input="handleInput"
        class="flex h-10 w-full border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 pr-10 border-purple-200 focus:border-purple-400 focus:ring-purple-400 rounded-xl"
        id="password"
        placeholder="Enter your password"
        :type="showingPassword ? 'text' : 'password'"
        autocomplete="new-password"
    />
    <button
        type="button"
        class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
        @click="togglePasswordTest"
    >
      <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-eye w-4 h-4"

      >
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
    </button>
  </div>
</template>
