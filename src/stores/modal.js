import {ref} from 'vue'
import {defineStore} from 'pinia'


export const useModalStore = defineStore('modal',()=>{
  
    const modalSpecie = ref(false)
    const modalComponent = ref(false)
    const componentsTree = ref([])

    const modalFamily = ref(false)
    const modalUserAdd = ref(false)
    const modalUserUpdate = ref(false)
    const modalCandidates = ref(false)
    const modalCandidatesAdd = ref(false)
    const modalForestSpecieUpdate = ref(false)
    const modalForestSpecieAdd = ref(false)
    const modalInfoCandidate = ref(false)    
    const modalPageAdd = ref(false)  
    const modalPageUpdate = ref(false)  
    const modalSectionAdd = ref(false)  
    const modalSectionUpdate = ref(false)  
    const modalSectionView = ref(false) 
    const modalFormMonitoring = ref(false)  
    const modalProperty = ref(false)
    const modalAssignUserSpecies = ref(false)
    const modalListUserSpecies = ref(false)
    const modalNurseryAdd = ref(false)
    const modalNurseryUpdate = ref(false)
    const modalNurseryAssignSpecie = ref(false)
    const modalNurserySpecieList = ref(false)
    const modalSpecieInventory = ref(false)

    const isEdit = ref(false)
    
    //modal especie
    function handleClickModalSpecie(){
        modalSpecie.value = !modalSpecie.value
    }
    function handleClickModalComponent(array){
        componentsTree.value = array
        console.log(componentsTree.value);
        modalComponent.value = !modalComponent.value
    }

    //modal Familia
    function handleClickModalFamily(){
        modalFamily.value = !modalFamily.value
    }
    
    //modal user dashboard
    function handleClickModalUserAdd(){
        modalUserAdd.value = !modalUserAdd.value
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
    //modal for create or update moniroting 
    function handleClickModalFormMonitoring(){
        modalFormMonitoring.value = !modalFormMonitoring.value
    }

    //modal especie page dashboard
    function handleClickModalPageUpdate(){
        modalPageUpdate.value = !modalPageUpdate.value
    }
    //modal agregar page forestal
    function handleClickModalPageAdd(){
        modalPageAdd.value = !modalPageAdd.value
    }

    //modal especie section dashboard
    function handleClickModalSectionUpdate(){
        modalSectionUpdate.value = !modalSectionUpdate.value
    }
    //modal agregar section forestal
    function handleClickModalSectionAdd(){
        modalSectionAdd.value = !modalSectionAdd.value
    }

    function handleClickModalSectionView(){
        modalSectionView.value = !modalSectionView.value
    }

    function handleClickModalProperty(mode){
        isEdit.value = mode
        modalProperty.value = !modalProperty.value
    }



    function handleClickModalAssignUserSpecies(){
        modalAssignUserSpecies.value = !modalAssignUserSpecies.value
    }

    function handleClickModalListUserSpecies(){
        modalListUserSpecies.value = !modalListUserSpecies.value
    }

    function handleClickModalNurseryAdd(){
        modalNurseryAdd.value = !modalNurseryAdd.value
    }

    function handleClickModalNurseryUpdate(){
        modalNurseryUpdate.value = !modalNurseryUpdate.value
    }

    function handleClickModalNurseryAssignSpecie(){
        modalNurseryAssignSpecie.value = !modalNurseryAssignSpecie.value
    }

    function handleClickModalNurserySpecieList(){
        modalNurserySpecieList.value = !modalNurserySpecieList.value
    }

    function handleClickModalSpecieInventory() {
        modalSpecieInventory.value = !modalSpecieInventory.value
    }

    return {
        modalSpecie,
        modalUserAdd,
        handleClickModalUserAdd,
        modalUserUpdate,
        handleClickModalUserUpdate,  
        modalFamily,
        handleClickModalFamily,      
        modalCandidates,
        handleClickModalSpecie,
        handleClickModalFamily,
        handleClickModalCandidate,
        handleClickModalInfoCandidate,
        modalInfoCandidate,
        handleClickModalForestSpecieUpdate,
        modalForestSpecieUpdate,
        handleClickModalForestSpecieAdd,
        modalForestSpecieAdd,
        handleClickModalCandidateAdd,
        modalCandidatesAdd,
        handleClickModalPageUpdate,
        modalPageUpdate,
        handleClickModalPageAdd,
        modalPageAdd,
        handleClickModalSectionUpdate,
        modalSectionUpdate,
        handleClickModalSectionAdd,
        modalSectionAdd,
        handleClickModalFormMonitoring,
        modalFormMonitoring,
        handleClickModalSectionView,
        modalSectionView,
        handleClickModalComponent,
        modalComponent,
        componentsTree,
        handleClickModalProperty,
        modalProperty,
        handleClickModalAssignUserSpecies,
        modalAssignUserSpecies,
        handleClickModalListUserSpecies,
        modalListUserSpecies,
        handleClickModalNurseryAdd,
        modalNurseryAdd,
        handleClickModalNurseryUpdate,
        modalNurseryUpdate,
        handleClickModalNurseryAssignSpecie,
        modalNurseryAssignSpecie,
        handleClickModalNurserySpecieList,
        modalNurserySpecieList,
        isEdit,
        handleClickModalSpecieInventory,
        modalSpecieInventory
    }
})