import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { defineStore } from 'pinia'

import APIService from "@/services/APIService";

export const useHomeStore = defineStore('home', () => {

    const topSpecies = ref([]);
    const maintenance = ref(false)
    const router = useRouter()

    const colaboradores = ref([
        { enlace: 'https://minciencias.gov.co/', img: '/logos/mc-vida.png' },
        { enlace: 'https://www.sgr.gov.co/', img: '/logos/sgr.png' },
        { enlace: 'https://www.putumayo.gov.co/index.php/mi-departamento/presentacion', img: '/logos/gp.png' },
        { enlace: 'https://itp.edu.co/ITP2022/', img: '/logos/itp.png' },
        { enlace: 'https://www.caqueta.gov.co/', img: '/logos/gob_caqueta.png' },
    ])

    const fetchData = async () => {
        const { data } = await APIService.pageTopSpecies()
        topSpecies.value = data
        console.log('top especies: ', topSpecies.value)
    }

    const switchMaintenance = ()=>{
        maintenance.value = !maintenance.value
        if(maintenance.value){
            router.push('/maintenance')
        }else{
            router.push('/')
        }
        
    }

    

    return {
        colaboradores,
        topSpecies,
        fetchData,
        switchMaintenance,
        maintenance,
        
    }
})