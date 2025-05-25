import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type userType from '@/types/user.d.ts';
import {getUser} from "@/api/user/userApi.ts";
import {useRouter} from "vue-router";


export const useUserStore = defineStore('user', () => {
    const activeUser = ref<userType|null>(null);


    async function setActiveUser(session: string | null) {
        const router = useRouter();
        if(session == null) {
            await router.push('/login');
            return
        }
        const us = await getUser();
        if(!us || us.id == 0){
            await router.push('/login');
            return
        }
        activeUser.value = us;
    }

    function removeActiveUser(){
        activeUser.value = null;
    }

    return { activeUser, setActiveUser, removeActiveUser }
})
