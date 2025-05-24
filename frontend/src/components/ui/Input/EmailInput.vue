<script setup lang="ts">
import {ref} from 'vue';

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string],
  'error': [message: string | null]
}>();

const handleInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value;
  emit('update:modelValue', value);
  validateEmail(value);
};

const validateEmail = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!value) {
    emit('error', null);
  } else if (!emailRegex.test(value)) {
    emit('error', 'Please enter a valid email address');
  } else {
    emit('error', null);
  }
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
        class="lucide lucide-mail absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
    >
      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </svg
    >
    <input
        ref="emailInput"
        class="flex h-10 w-full border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 border-purple-200 focus:border-purple-400 focus:ring-purple-400 rounded-xl"
        :value="modelValue"
        @input="handleInput"
        id="email"
        placeholder="Enter your email"
        type="email"
        autocomplete="email"
    />
  </div>
</template>
