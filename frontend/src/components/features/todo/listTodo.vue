<script setup lang="ts">
import {useTodoStore} from "@/stores/todo.ts";

const todoStore = useTodoStore();


function doneTodo(index: number) {
  todoStore.updateDone(index)
}

function deleteTodo(index: number) {
  todoStore.deleteTodo(index)
}

</script>

<template>
  <div class="mb-30">
    <div class="bg-white/50 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg border border-white/20"
         v-if="todoStore.totalTodos == 0">
      <div class="text-6xl mb-4">🙅</div>
      <p class="text-gray-500 text-lg font-medium">No tasks yet!</p>
      <p class="text-gray-400 text-sm mt-1">Add one above to get started</p>
    </div>

    <div class="space-y-3 my-2 mb-10" v-else>
      <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 mb-6">
        <div class="flex justify-between items-center mb-2"><span
            class="text-sm font-medium text-gray-700">Progress</span><span
            class="text-sm text-gray-600">{{ todoStore.totalProgress }}/{{ todoStore.totalTodos }} completed</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
              class="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300 ease-out"
              :style="{width: `${(todoStore.totalProgress / todoStore.totalTodos) * 100}%`}"></div>
        </div>
      </div>

      <div class="mb-4 font-bold">Todos:</div>
      <div
          class="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 transition-all duration-200 hover:shadow-xl hover:scale-[1.02] "
          v-for="(todo, index) in todoStore.todos">
        <div class="flex items-center gap-3">
          <button type="button" @click="doneTodo(index)" role="checkbox" aria-checked="false" data-state="unchecked"
                  value="on"
                  class="cursor-pointer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:text-primary-foreground data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                  id="task-1748174222805">

            <span v-if="todo.isDone" data-state="checked" class="flex items-center justify-center text-current"
                  style="pointer-events: none;"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                     viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                     stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                                                     class="lucide lucide-check h-4 w-4"><path
                d="M20 6 9 17l-5-5"></path></svg></span>
          </button>
          <div class="flex-1">
            <div :class="todo.isDone ?'line-through':''">
              <label for="task-1748174222805"
                     class="block  transition-all duration-200 text-gray-800 font-bold">{{ todo.name }}</label>
              <p class="text-sm mt-1  transition-all duration-200 text-gray-600">{{ todo.shortDescription }}</p>
            </div>
            <div class="flex items-center gap-1 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                   class="lucide lucide-calendar-days w-3 h-3 text-purple-400">
                <path d="M8 2v4"></path>
                <path d="M16 2v4"></path>
                <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                <path d="M3 10h18"></path>
                <path d="M8 14h.01"></path>
                <path d="M12 14h.01"></path>
                <path d="M16 14h.01"></path>
                <path d="M8 18h.01"></path>
                <path d="M12 18h.01"></path>
                <path d="M16 18h.01"></path>
              </svg>
              <span class="text-xs text-purple-600">Due: {{ new Date(todo.dateTime).toDateString() }}</span></div>
          </div>
          <button
              @click="deleteTodo(index)"
              class="cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-9 px-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200"
              aria-label="Remove task">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 class="lucide lucide-trash2 w-4 h-4">
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              <line x1="10" x2="10" y1="11" y2="17"></line>
              <line x1="14" x2="14" y1="11" y2="17"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div class=" text-center" v-if="todoStore.totalProgress > 0">
      <div class="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-4 shadow-lg">
        <div class="text-2xl mb-1">🎉</div>
        <p class="font-medium" v-if="todoStore.totalProgress != todoStore.totalTodos">Great job! {{ todoStore.totalProgress }} task done!</p>
        <p class="font-medium" v-else>Amazing! All tasks completed!</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>