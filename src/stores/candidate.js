import { ref } from 'vue'
import { defineStore } from 'pinia'
import APIService from '../services/APIService'

export const useGeoCandidateTrees = defineStore('geoCandidateTrees', () => {
    const geoCandidateData = ref([])
    let isDataLoaded = false

    const fetchData = async () => {
        if (!isDataLoaded) {
            const { data } = await APIService.getGeoCandidateTrees()
            geoCandidateData.value = data
            isDataLoaded = true
        }
    }

    return {
        geoCandidateData,
        fetchData
    }
})