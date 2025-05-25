<script setup lang="ts">
import {ref} from "vue";
import Menu from "@/components/Menu.vue";
import {useTodoStore} from "@/stores/todo.ts";
import {useToast} from 'vue-toast-notification';

const todoStore = useTodoStore();
const toast = useToast();
const date = ref(new Date());



const disabledDates = ref([{start: null, end: new Date().setDate(new Date().getDate() - 1)}]);
const attrs = ref([
  {
    key: 'today',
    dot: true,
    dates: new Date(),
  },
]);


const title = ref("");
const short_desc = ref("");
const text_in_short_desc = ref(0);

const handleInput = (e: Event) => {
  const value = (e.target as HTMLTextAreaElement).value;
  if(value.length <= 150){
    short_desc.value = value;
    text_in_short_desc.value = value.length;
  }
};


const context_window_position = ref({
  left: 0,
  top: 0,
  bottom: 0,
})

const show_cal = ref(false);

function togglePopover(e: MouseEvent) {
  const button = e.target as HTMLElement;
  const rect = button.getBoundingClientRect();
  context_window_position.value = {
    left: rect.left,
    top: rect.top,
    bottom: rect.bottom
  }

  show_cal.value = true;
}

function close_cal() {
  show_cal.value = false;
}

function storeTodo(){
  if(short_desc.value.length == 0 || title.value.length == 0){
    toast.open({
      message: "Title and Description can't be empty.",
      duration: 3000,
      dismissible: true,
      type: "error",
      queue: false,
      position: "top-right",
    });

    return
  }
  todoStore.addTodo(title.value, short_desc.value, date.value);
}
</script>

<template>
  <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-6 mt-5">
    <div class="flex gap-3">
      <input
        class="flex h-10 w-full border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1 border-purple-200 focus:border-purple-400 focus:ring-purple-400 rounded-xl"
        placeholder="What needs to be done? 🤔" type="text" v-model="title" />
      <button
          class="rounded-xl px-4 border border-purple-200 hover:border-purple-400 transition-all duration-200 hover:shadow-lg hover:scale-105 cursor-pointer"
          @click="togglePopover"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
             class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"/>
        </svg>

      </button>
      <button
          @click="storeTodo"
          class="custom-button" >
        <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="20" height="24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
        </svg>
      </button>
    </div>
    <div class="mt-3"><textarea @input="handleInput" :value="short_desc" placeholder="Add a short description... 💭"
                   class="w-full p-3 border border-purple-200 focus:border-purple-400 focus:ring-purple-400 focus:ring-1 focus:outline-none rounded-xl resize-none bg-white/50 backdrop-blur-sm text-sm placeholder:text-gray-400 transition-all duration-200"
                   rows="2" maxlength="150"></textarea>
      <div class="flex justify-between items-center mt-1"><span class="text-xs text-gray-400">Press Enter in title to add task</span><span
          class="text-xs text-gray-400">{{ text_in_short_desc }}/150</span></div>
    </div>
    <div class="mt-3 flex items-center gap-2 text-sm text-purple-600">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
           class="lucide lucide-calendar-days w-4 h-4">
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
      <span>Due date: {{ date.toLocaleDateString() }}</span>
    </div>
  </div>

  <Menu v-if="show_cal" :value="context_window_position">
    <div class="rounded mt-2 flex flex-col gap-2 bg-white p-2 shadow-xl">
      <VDatePicker v-model="date" :disabled-dates="disabledDates" :attributes='attrs' title-position="left"/>
      <button
          class="rounded-xl px-4 border border-purple-200 hover:border-purple-400 transition-all duration-200 hover:shadow-lg cursor-pointer font-bold py-2"
          @click="close_cal">Close
      </button>
    </div>
  </Menu>
</template>
