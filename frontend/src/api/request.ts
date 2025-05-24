import axios, {type AxiosResponse} from "axios";
import type {APIRoutes} from "@/api/availabeRoutes.ts";
import {useToast} from 'vue-toast-notification';
import router from '@/router';

interface ApiResponseData {
    [key: string]: any;
}

interface ApiResponse {
    data?: ApiResponseData;
    message: string;
    name: string;
    success: boolean;
}

function isApiResponse(response: any): response is ApiResponse {
    return (typeof response === 'object' || response !== null && (typeof response.data === 'object' || response.data == null || false) && typeof response.message === 'string' && typeof response.name === 'string' && typeof response.success === 'boolean');
}

export function showToast(message: string, error: boolean) {
    toast.open({
        message: message,
        duration: 3000,
        dismissible: true,
        type: error ? "error" : "success",
        queue: false,
        position: "top-right",
    });
}

async function redirectCheck(data: ApiResponse): Promise<boolean> {
    switch (data.name) {
        case 'redirect':
            await router.push(data.data?.url as string);
            return true;
    }
    return false;
}

export async function requestToServer(route: APIRoutes): Promise<ApiResponse | undefined> {
    try {
        const response: AxiosResponse<ApiResponse> = await axios.request(route);
        if (response.status >= 200 && response.status < 300) {
            console.log(response.data)
            if (await redirectCheck(response.data)) {
                return;
            }
            return response.data;
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (!error.response) {
                showToast("There was an unexpected error.", true)
                return;
            }
            if (isApiResponse(error.response.data)) {
                await redirectCheck(error.response.data as ApiResponse)
            }
            showToast(error.response.data.message, true)
        } else {
            showToast("There was an unexpected error.", true)
            console.log(error)
        }
    }

    return;
}

const toast = useToast();
