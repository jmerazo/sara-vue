import { ref } from 'vue'
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
            isDataLoaded = true
        }
    }

    const fetchMonitoringData = async () => {
        if (!isDataLoaded) {
            const { data } = await APIService.getMonitoringData()
            monitoringData.value = data
            isDataLoaded = true
        }
    }

    const fetchSamplesData = async () => {
        if (!isDataLoaded) {
            const { data } = await APIService.getSampleData()
            samplesData.value = data
            isDataLoaded = true
        }
    }

    // Función para marcar como no cargados los datos al iniciar fetchSamplesData
    const resetDataLoaded = () => {
        isDataLoaded = false
    }

    return {
        assessmentData,
        monitoringData,
        samplesData,
        fetchAssessmentData,
        fetchMonitoringData,
        fetchSamplesData,
        resetDataLoaded
    }
})