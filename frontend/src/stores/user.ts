import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type userType from '@/types/user.d.ts';
import {getUser} from "@/api/user/user.ts";
import {useRouter} from "vue-router";


export const useUserStore = defineStore('user', () => {
    const activeUser = ref<userType|null>(null);


    async function setActiveUser(session: string) {
        const us = await getUser();
        if(!us || us.id == 0){
            const router = useRouter();
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
