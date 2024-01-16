import {ref} from 'vue'
import {defineStore} from 'pinia'

import algarroboImage from '@/assets/media/algarrobo.jpg';
import nogalCafeteroImage from '@/assets/media/nogal_cafetero.jpg';
import otroImage from '@/assets/media/pi3.jpg';


export const useHomeStore = defineStore('home',()=>{

    const urlImagenesHome = ref([
        {nombreEspecie:'Gualanday',img: algarroboImage},
        {nombreEspecie:'Algarrobo',img: nogalCafeteroImage},
        {nombreEspecie:'Nogal Cafetero',img: nogalCafeteroImage},
        {nombreEspecie:'NombreComun',img: otroImage},
    ])

    const colaboradores = ref([
        {enlace:'https://minciencias.gov.co/',img:'/logos/mc-vida.png'},
        {enlace:'https://www.sgr.gov.co/',img:'/logos/sgr.png'},
        {enlace:'https://www.putumayo.gov.co/',img:'/logos/gp.png'},
        {enlace:'https://itp.edu.co/ITP2022/',img:'/logos/itp.png'},
      
    ])
    return{
        urlImagenesHome,
        colaboradores
    }
})