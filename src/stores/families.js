import {ref, onMounted, reactive} from 'vue'
import {defineStore} from 'pinia'

import APIService from '../services/APIService'

export const useFamiliasStore = defineStore('familias',()=>{
    
    const familias = ref({})
    //const familia = ref({})

    onMounted(async ()=>{
        const {data} = await APIService.getFamilies()
        familias.value = data
        console.log(familias)
    })


    return {
        familias,
        
        
    }
})