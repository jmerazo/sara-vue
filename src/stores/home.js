import {ref} from 'vue'
import {defineStore} from 'pinia'

import APIService from "@/services/APIService";

export const useHomeStore = defineStore('home',()=>{

    const topSpecies = ref([]);

    const colaboradores = ref([
        {enlace:'https://minciencias.gov.co/',img:'/logos/mc-vida.png'},
        {enlace:'https://www.sgr.gov.co/',img:'/logos/sgr.png'},
        {enlace:'https://www.putumayo.gov.co/index.php/mi-departamento/presentacion',img:'/logos/gp.png'},
        {enlace:'https://itp.edu.co/ITP2022/',img:'/logos/itp.png'},
        {enlace:'https://www.caqueta.gov.co/',img:'/logos/gob_caqueta.png'},
    ])

    const fetchData = async () => {
        const { data } = await APIService.pageTopSpecies()
        topSpecies.value = data  
        console.log('top especies: ', topSpecies.value)
    }

    return{
        colaboradores,
        topSpecies,
        fetchData
    }
})