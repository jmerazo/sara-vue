import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
import APIService from '../../services/APIService'

export const useReportsGeneral = defineStore('ReportsGeneral', () => {

    let isDataLoaded = false
    const assessmentData = ref([])
    const monitoringData = ref([])
    const samplesData = ref([])

    const fetchAssessmentData = async () => {
        if (!isDataLoaded) {
            const { data } = await APIService.getAssessmentData()
            assessmentData.value = data
            console.log('cargando data assessment')
            isDataLoaded = true
        }
    }

    const fetchMonitoringData = async () => {
        if (!isDataLoaded) {
            const { data } = await APIService.getMonitoringData()
            monitoringData.value = data
            console.log('cargando data monitoring')
            isDataLoaded = true
        }
    }

    const fetchSamplesData = async () => {
        if (!isDataLoaded) {
            const { data } = await APIService.getSampleData()
            samplesData.value = data
            console.log('cargando data samples')
            isDataLoaded = true
        }
    }
    
    return {
        assessmentData,
        monitoringData,
        samplesData,
        isDataLoaded,
        fetchAssessmentData,
        fetchMonitoringData,
        fetchSamplesData
    }
})