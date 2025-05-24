import {requestToServer} from "@/api/request.ts";
import {getUserDataAPIRoute, loginAPIRoute, resendEmailAPIRoute, signupAPIRoute} from "@/api/availabeRoutes.ts";
import {useLoadingStore} from "@/stores/loading.ts";
import router from '@/router';
import type userType from "@/types/user";

export async function getUser(){
    const {url, method} = getUserDataAPIRoute;
    const session = localStorage.getItem("session");
    if (!session) {
        await router.push("/login");
        return
    }

    const response = await requestToServer({
        url, method, data: {}, headers: {
            "Authorization": session,
        }
    });

    if(!response) return null;
    return response.data as userType;
}

export async function signup(email: string, password: string, name: string): Promise<void> {
    const {url, method} = signupAPIRoute;
    const loading = useLoadingStore();
    loading.setLoadingText("Creating Account, Sending Mail..");
    loading.setShowLoading(true);

    const response = await requestToServer({
        url, method, data: {
            name,
            auth:{
                email,
                password,
            },
        }
    });
    loading.setShowLoading(false);
}

export async function signInRequest(email: string, password: string): Promise<void> {
    const {url, method} = loginAPIRoute;

    const loading = useLoadingStore();
    loading.setLoadingText("Signing in account...");
    loading.setShowLoading(true);

    const response = await requestToServer({
        url, method, data: {
            email, password,
        }
    });

    loading.setShowLoading(false);

    if(!response) return;

    if(response.success && response.name == "sesson_token") {
        localStorage.setItem("session", response.data?.session as string);
        await router.push("/");
    }
}


export async function resetLink(email: string): Promise<void> {
    const {url, method} = resendEmailAPIRoute;

    const loading = useLoadingStore();
    loading.setLoadingText("Sending Mail Again..");
    loading.setShowLoading(true);

    const response = await requestToServer({
        url, method, data: {
            email
        }
    });
    loading.setShowLoading(false);
}