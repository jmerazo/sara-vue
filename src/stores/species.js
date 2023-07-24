import {ref, onMounted} from 'vue'
import {defineStore} from 'pinia'
import {useModalStore} from '../stores/modal'
import APIService from '../services/APIService'

export const useEspeciesStore = defineStore('especies',()=>{
    
    const modal = useModalStore()
    const especies = ref([])
    const especie = ref({})

    onMounted(async ()=>{
        const {data} = await APIService.getSpecies()
        especies.value = data
    })

    async function seleccionarEspecie(nombre_comun){
        const {data} = await APIService.lookSpecie(nombre_comun)
        especie.value = data
        modal.handleClickModal()
    }

    return {
        especies,
        especie,
        seleccionarEspecie
    }
})