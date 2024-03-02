import {ref} from 'vue'
import {defineStore} from 'pinia'


export const useModalStore = defineStore('modal',()=>{
  
    const modal = ref(false)
    const modalFamily = ref(false)
    const modalUserUpdate = ref(false)
    const modalCandidates = ref(false)
    const modalCandidatesAdd = ref(false)
    const modalForestSpecieUpdate = ref(false)
    const modalForestSpecieAdd = ref(false)
    const modalInfoCandidate = ref(false)    
    
    //modal especie
    function handleClickModal(){
        modal.value = !modal.value
    }

    //modal Familia
    function handleClickModalFamily(){
        modalFamily.value = !modalFamily.value
    }
    
   

    //modal user dashboard
    function handleClickModalUserUpdate(){
        modalUserUpdate.value = !modalUserUpdate.value
    }

    //modal monitoreo candidato especie dashboard
    function handleClickModalCandidate(){
        modalCandidates.value = !modalCandidates.value
    }

    //modal monitoreo candidato especie dashboard
    function handleClickModalCandidateAdd(){
        modalCandidatesAdd.value = !modalCandidatesAdd.value
    }

    //modal informacion candidato especie dashboard
    function handleClickModalInfoCandidate(){
        modalInfoCandidate.value = !modalInfoCandidate.value
    }

    //modal especie forestal dashboard
    function handleClickModalForestSpecieUpdate(){
        modalForestSpecieUpdate.value = !modalForestSpecieUpdate.value
    }
    //modal agregar especie forestal
    function handleClickModalForestSpecieAdd(){
        modalForestSpecieAdd.value = !modalForestSpecieAdd.value
    }

    return {
        modal,
        modalFamily,
        modalUserUpdate,
        handleClickModal,
        handleClickModalFamily,
        handleClickModalUserUpdate,        
        modalCandidates,
        handleClickModal,
        handleClickModalFamily,
        handleClickModalCandidate,
        handleClickModalInfoCandidate,
        modalInfoCandidate,
        handleClickModalForestSpecieUpdate,
        modalForestSpecieUpdate,
        handleClickModalForestSpecieAdd,
        modalForestSpecieAdd,
        handleClickModalCandidateAdd,
        modalCandidatesAdd
    }
})