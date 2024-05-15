import {ref, onMounted} from 'vue'
import {defineStore} from 'pinia'
import APIService from '../services/APIService'
import { useModalStore } from "@/stores/modal";

export const useNurseriesStore = defineStore('nurseries',()=>{
    const nurseriesData = ref([]);

    const nurserieData = async () => {
        const { data } = await APIService.getNurseries()
        nurseriesData.value = data     
    }

    return {
        nurserieData,
        nurseriesData
    }
})
