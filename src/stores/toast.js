import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useToastStore = defineStore('toast', () => {

    const textToast = ref('')
    const typeToast = ref('')
    
    const activateToast = (text, type) => {
        textToast.value = text
        typeToast.value = type
        setTimeout(() => {
            textToast.value = ''
        }, 3000)
    }
    
    return {
        activateToast,
        textToast,
        typeToast
    }
})