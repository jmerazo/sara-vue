import {ref, onMounted, reactive} from 'vue'
import {defineStore} from 'pinia'
import APIService from '../services/APIService'

export const useGeoCandidateTrees = defineStore('geoCandidateTrees',()=>{
    
    const geoCandidateData = ref([])

    onMounted(async ()=>{
        const {data} = await APIService.getGeoCandidateTrees()
        geoCandidateData.value = data
        /* console.log("Datos cargados en el store:", geoCandidateData.value); */
    })

    return {
        geoCandidateData
    }
})