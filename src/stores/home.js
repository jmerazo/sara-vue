import {ref} from 'vue'
import {defineStore} from 'pinia'


export const useHomeStore = defineStore('home',()=>{

    const urlImagenesHome = ref([
        {nombreEspecie:'Gualanday',url:'../../src/assets/media/gualanday.jpg'},
        {nombreEspecie:'Algarrobo',url:'../../src/assets/media/algarrobo.jpg'},
        {nombreEspecie:'Nogal Cafetero',url:'../../src/assets/media/nogal_cafetero.jpg'},
        {nombreEspecie:'NombreComun',url:'../../src/assets/media/pi3.jpg'},
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