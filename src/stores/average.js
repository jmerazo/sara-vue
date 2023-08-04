import {ref, onMounted} from 'vue'
import {defineStore} from 'pinia'
import APIService from '../services/APIService'

export const useAverageSpecie = defineStore('averageSpecie',()=>{

    const averageCandidateData = ref([])

    onMounted(async ()=>{
        const { data } = await APIService.getAverageCandidateTrees()
        averageCandidateData.value = data
        /* console.log("store: ", averageCandidateData.value) */
    })

    return {
        averageCandidateData
    }
})