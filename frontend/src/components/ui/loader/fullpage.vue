<script setup lang="ts">

</script>

<template>
  <div class="fixed h-screen w-screen top-0 z-10 dialog-bg flex flex-col place-items-center justify-center">
      <span class="loader"></span>
      <slot />
  </div>
</template>

<style scoped>
  .loader {
    width: 88px;
    height: 88px;
    border: 5px solid #FFF;
    border-radius: 50%;
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }
  .loader::after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 10px solid transparent;
    border-bottom-color: #f6339a;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>