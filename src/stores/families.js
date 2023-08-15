import {ref, onMounted, reactive} from 'vue'
import {defineStore} from 'pinia'
import {useConsultaStore} from './consulta'
import APIService from '../services/APIService'

export const useFamiliasStore = defineStore('familias',()=>{
    
    const familias = ref({})
    //const familia = ref({})
    const consulta = useConsultaStore()

    onMounted(async ()=>{
        consulta.cargando = true
        const {data} = await APIService.getFamilies()
        familias.value = data
        consulta.cargando = false
    })

    return {
        familias,
        
        
    }
})