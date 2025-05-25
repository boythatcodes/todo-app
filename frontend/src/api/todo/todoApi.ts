import {addTodoAPIRoute, getTodoAPIRoute, updateTodoAPIRoute, deleteTodoAPIRoute} from "@/api/availabeRoutes.ts";
import router from "@/router";
import {requestToServer} from "@/api/request.ts";
import {type addNewTodo, type todoType} from "@/types/todo.ts";
import {useToast} from 'vue-toast-notification';


export async function addTodoAPI(title: string, short_description: string, date: string) {
    const {url, method} = addTodoAPIRoute;

    const session = localStorage.getItem("session");
    if (!session) {
        await router.push("/login");
        return
    }

    const response = await requestToServer({
        url, method, data: {
            name: title,
            shortDescription: short_description,
            dateTime: date,
        }, headers: {
            "Authorization": session,
        }
    });

    if(!response) return;
    const toast = useToast();

    toast.open({
        message: "Todo created Successfully for Date: "+date,
        duration: 3000,
        dismissible: true,
        type: "success",
        queue: false,
        position: "top-right",
    });

    return response.data as addNewTodo;
}

export async  function getTodosApi(query: string): Promise<todoType[]> {
    const {url, method} = getTodoAPIRoute;

    const session = localStorage.getItem("session");
    if (!session) {
        await router.push("/login");
        return []
    }


    const response = await requestToServer({
        url: `${url}?${query}`, method, data: {}, headers: {
            "Authorization": session,
        }
    });

    if(!response) return [];

    return response.data as todoType[];
}

export async  function updateTodosApi(id: number, isDone: boolean) {
    const {url, method} = updateTodoAPIRoute;

    const session = localStorage.getItem("session");
    if (!session) {
        await router.push("/login");
        return false
    }


    const response = await requestToServer({
        url, method, data: {
            id,
            isDone,
        }, headers: {
            "Authorization": session,
        }
    });

    const toast = useToast();

    toast.open({
        message: `Todo with id: ${id} is marked as ${isDone? 'done':'not done'}.`,
        duration: 3000,
        dismissible: true,
        type: "success",
        queue: false,
        position: "top-right",
    });

    return response != undefined;
}

export async  function deleteTodoAPI(id: number) {
    const {url, method} = deleteTodoAPIRoute;

    const session = localStorage.getItem("session");
    if (!session) {
        await router.push("/login");
        return false
    }


    const response = await requestToServer({
        url, method, data: {
            id,
        }, headers: {
            "Authorization": session,
        }
    });

    if(!response){
        return false
    }
    const toast = useToast();

    toast.open({
        message: `Todo with id: ${id} was deleted successfully.`,
        duration: 3000,
        dismissible: true,
        type: "success",
        queue: false,
        position: "top-right",
    });

    return true;
}