<template>
  <div class="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 my-6">
    <div class="flex items-center gap-2 mb-3">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
           class="lucide lucide-filter w-4 h-4 text-purple-500">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
      </svg>
      <span class="text-sm font-medium text-gray-700">Filters</span></div>
    <div class="grid grid-cols-1 gap-3">
      <div class="grid grid-cols-2 gap-3">
        <div><label class="text-xs text-gray-600 mb-1 block">Status</label>
          <select v-model="selectedState" class="w-full border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-9 border-purple-200 focus:border-purple-400 rounded-lg">
            <option selected value="all">All</option>
            <option value="upcoming">Upcoming</option>
            <option value="done">Done</option>
            <option value="missed">Missed</option>
          </select>
        </div>
        <div><label class="text-xs text-gray-600 mb-1 block">Order By</label>
          <select v-model="orderByState" class="w-full border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-9 border-purple-200 focus:border-purple-400 rounded-lg">
            <option selected value="date_time">TODO Date</option>
            <option selected value="created_at">Created Date</option>
          </select>
        </div>
      </div>
      <div><label class="text-xs text-gray-600 mb-1 block">Filter by Date</label>
        <button
            @click="togglePopover"
            class="inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2 w-full h-9 justify-start border-purple-200 hover:border-purple-400 rounded-lg"
            type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-«r1»" data-state="closed">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
               class="lucide lucide-calendar-days w-4 h-4 mr-2">
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
          {{date.toLocaleDateString()}}
        </button>
      </div>
    </div>
  </div>

  <Menu v-if="show_cal" :value="context_window_position">
    <div class="rounded mt-2 flex flex-col gap-2 bg-white p-2 shadow-xl">
      <VDatePicker v-model="date" :attributes='attrs' title-position="left"/>
      <button
          class="rounded-xl px-4 border border-purple-200 hover:border-purple-400 transition-all duration-200 hover:shadow-lg cursor-pointer font-bold py-2"
          @click="close_cal">Close
      </button>
    </div>
  </Menu>


</template>

<script setup lang="ts">
import {onMounted, ref, watch} from 'vue'

import Menu from "@/components/Menu.vue";

import {useTodoStore} from "@/stores/todo.ts";

const todoStore = useTodoStore();

const selectedState = ref<string>('all');
const orderByState = ref<string>('created_at');
const now = new Date();
const tenDaysAgo = new Date(now);
tenDaysAgo.setDate(now.getDate() - 10);

const date = ref(tenDaysAgo);

watch(selectedState, (newVal)=>{
  todoStore.updateQueryFilters({
    status: newVal,
    orderBy: todoStore.queryFilters.orderBy,
    referenceDateTime: todoStore.queryFilters.referenceDateTime
  })
})

watch(orderByState, (newVal)=>{
  todoStore.updateQueryFilters({
    status: todoStore.queryFilters.status,
    orderBy: newVal,
    referenceDateTime: todoStore.queryFilters.referenceDateTime
  })
})

watch(date, (newVal)=>{
  todoStore.updateQueryFilters({
    status: todoStore.queryFilters.status,
    orderBy: todoStore.queryFilters.orderBy,
    referenceDateTime: newVal
  });
})

const context_window_position = ref({
  left: 0,
  top: 0,
  bottom: 0,
})

const attrs = ref([
  {
    key: 'today',
    dot: true,
    dates: new Date(),
  },
]);


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

onMounted(()=>{
  todoStore.updateQueryFilters({
    status: selectedState.value,
    orderBy: orderByState.value,
    referenceDateTime: date.value,
  })
})

</script>
