import {ref, computed} from 'vue'
import {defineStore} from 'pinia'


export const useModalStore = defineStore('modal',()=>{
  
    const modal = ref(false)
    
    function handleClickModal(){
        modal.value = !modal.value
        
    }
    
    return {
        modal,
        handleClickModal,
        
    }
})