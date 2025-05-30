import {type Method} from "axios";

export const backend_url = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:3000";


interface ApiRequestData {
    [key: string]: any;
}


export interface APIRoutes {
    url: string;
    method: Method;
    data?: ApiRequestData;
    headers?: ApiRequestData
}

// user routes
export const signupAPIRoute: APIRoutes = {url: `${backend_url}/user/create`, method: "POST"};
export const loginAPIRoute: APIRoutes = {url: `${backend_url}/user/login`, method: "POST"};
export const resendEmailAPIRoute: APIRoutes = {url: `${backend_url}/user/resend-link`, method: "POST"};
export const getUserDataAPIRoute: APIRoutes = {url: `${backend_url}/user/`, method: "GET"};


// todo routes
export const addTodoAPIRoute: APIRoutes = {url: `${backend_url}/todos/`, method: "POST"};
export const getTodoAPIRoute: APIRoutes = {url: `${backend_url}/todos/`, method: "GET"};
export const updateTodoAPIRoute: APIRoutes = {url: `${backend_url}/todos/`, method: "PUT"};
export const deleteTodoAPIRoute: APIRoutes = {url: `${backend_url}/todos/`, method: "DELETE"};