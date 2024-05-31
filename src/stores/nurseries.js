import {ref, onMounted, computed} from 'vue'
import {defineStore} from 'pinia'
import APIService from '../services/APIService'


export const useNurseriesStore = defineStore('nurseries',()=>{
    const nurseriesData = ref([]);
    const nursery = ref([]);

    onMounted(async ()=>{
        const { data } = await APIService.getNurseries()
        nurseriesData.value = data
        console.log(nurseriesData.value);
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


    return { 
        getNursery,
        nursery,
        nurseriesData,
        filteredData
        
    }
})
