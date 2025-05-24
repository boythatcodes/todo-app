import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', () => {
    const loadingText = ref("");
    const showLoading = ref(false);

    function setShowLoading(loading: boolean) {
        showLoading.value = loading;
    }

    function setLoadingText(text: string) {
        loadingText.value = text;
    }

    return { loadingText, showLoading, setLoadingText, setShowLoading }
})
