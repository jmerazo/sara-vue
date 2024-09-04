import {ref, onMounted, computed} from 'vue'
import {defineStore} from 'pinia'
import APIService from '../services/APIService'


export const useNurseriesStore = defineStore('nurseries',()=>{
    const nurseriesData = ref([]);
    const nurseriesOriginalData = ref([]);
    const nursery = ref([]);

    onMounted(async ()=>{
        const { data } = await APIService.listNurseries();
        nurseriesData.value = data;
        nurseriesOriginalData.value = data;
    })

    const getNursery = async (data) => {
        try {
            nursery.value = data
        } catch (error) {
            console.log(error)
        }
    }

    const filteredData = computed(() => {
        const coords = nursery.value.ubicacion.split(',').map(coord => parseFloat(coord.trim()));
      return [{ lon: coords[1], lat: coords[0] }];
    })

    const sendEmail = async(data) => {
        try {
            const response = await APIService.sendEmail(data);
            return response;
        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    }

    return { 
        getNursery,
        nursery,
        nurseriesData,
        filteredData,
        sendEmail
    }
})
