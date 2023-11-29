import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
import APIService from '../../services/APIService'

export const useReportsGeneral = defineStore('ReportsGeneral', () => {

    let isDataLoaded = false
    const assessmentData = ref([])
    const monitoringData = ref([])
    const samplesData = ref([])

    const fetchAssessmentData = async () => {
        const { data } = await APIService.getAssessmentData()
        assessmentData.value = data
        console.log('cargando data assessment')
    }

    const fetchMonitoringData = async () => {
        const { data } = await APIService.getMonitoringData()
        monitoringData.value = data
        console.log('cargando data monitoring')
    }

    const fetchSamplesData = async () => {
        const { data } = await APIService.getSamplesData()
        samplesData.value = data
        console.log('cargando data samples')
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