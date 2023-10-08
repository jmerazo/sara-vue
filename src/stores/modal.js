import {ref} from 'vue'
import {defineStore} from 'pinia'


export const useModalStore = defineStore('modal',()=>{
  
    const modal = ref(false)
    const modalFamily = ref(false)
    const modalUser = ref(false)
    
    //modal especie
    function handleClickModal(){
        modal.value = !modal.value
    }

    //modal Familia
    function handleClickModalFamily(){
        modalFamily.value = !modalFamily.value
    }
    
    //modal user dashboard
    function handleClickModalUser(){
        modalUser.value = !modalUser.value
    }

    return {
        modal,
        modalFamily,
        modalUser,
        handleClickModal,
        handleClickModalFamily,
        handleClickModalUser
        
    }
})