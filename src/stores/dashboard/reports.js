import { ref} from 'vue'
import { defineStore } from 'pinia'
import APIService from '@/services/APIService'

export const useReportsGeneral = defineStore('ReportsGeneral', () => {

    let isDataLoaded = false
    const assessmentData = ref([])
    const monitoringData = ref([])
   
    const fetchAssessmentData = async () => {
        const { data } = await APIService.getAssessmentData()
        assessmentData.value = data
        
    }

    const fetchMonitoringData = async () => {
        const { data } = await APIService.getMonitoringData()
        monitoringData.value = data
        
    }

   

    return {
        assessmentData,
        monitoringData,
        isDataLoaded,
        fetchAssessmentData,
        fetchMonitoringData,
     
    }
})