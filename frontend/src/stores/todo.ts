import { ref, computed } from 'vue'
import {defineStore, storeToRefs} from 'pinia'
import {type todoType, type queryTodos} from "@/types/todo.ts";
import {addTodoAPI, deleteTodoAPI, getTodosApi, updateTodosApi} from "@/api/todo/todoApi.ts";

function formatDate(dateObj: Date) {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}


export const useTodoStore = defineStore('todo', () => {
    const todos = ref<Record<number, todoType>>({})
    const totalProgress = ref(0);
    const totalTodos = ref(0);

    const queryFilters = ref<queryTodos>({});

    function setTodos(newTodos: todoType[]) {
        todos.value = {};
        for (const newTodo of newTodos) {
            todos.value[newTodo.id] = newTodo;
        }

        progressAndTotal()
    }

    function progressAndTotal(){
        totalTodos.value =0;
        totalProgress.value = 0;
        Object.keys(todos.value).forEach(key => {
            const numericKey = parseInt(key, 10);
            if(todos.value[numericKey].isDone) {
               totalProgress.value += 1;
            }
            totalTodos.value += 1;
        });
    }

    async function addTodo(title: string, short_description: string, date: Date) {
        const formated_date = formatDate(date);

        const resp = await addTodoAPI(title, short_description, formated_date);

        if(!resp) return

        await getTodos();
    }



    function getQueryString(): string {
        const params = new URLSearchParams();
        if (queryFilters.value.status) {
            params.append('status', queryFilters.value.status);
        }
        if (queryFilters.value.referenceDateTime) {
            params.append('referenceDateTime', formatDate(queryFilters.value.referenceDateTime));
        }
        if (queryFilters.value.orderBy) {
            params.append('orderBy', queryFilters.value.orderBy);
        }
        return params.toString();
    }

    async function updateQueryFilters(filter: queryTodos) {
        queryFilters.value = filter;
        await getTodos()
    }

    async function getTodos() {
        setTodos(await getTodosApi(getQueryString()));
    }

    async function updateDone(id: number){
        if(!todos.value[id]) return;

        todos.value[id].isDone = !todos.value[id].isDone;

        const resp = await updateTodosApi(todos.value[id].id, todos.value[id].isDone)

        if (!resp) {
            if(!todos.value[id]) return
            todos.value[id].isDone = !todos.value[id].isDone;
        }

        progressAndTotal()
    }

    async function deleteTodo(id: number){
        if(!todos.value[id]) return;

        const separate_val: todoType = { ...todos.value[id] };

        delete todos.value[id];

        const resp = await deleteTodoAPI(separate_val.id)

        if (!resp) {
            todos.value[id] = separate_val
        }

        progressAndTotal()
    }

    return { todos, totalProgress,totalTodos, queryFilters, setTodos, addTodo, getTodos, updateQueryFilters, updateDone, deleteTodo }
})
