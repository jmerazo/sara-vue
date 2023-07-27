import {ref,reactive} from 'vue'
import {defineStore} from 'pinia'
import { useRouter } from "vue-router";

import APIService from '../services/APIService'

export const useConsultaStore = defineStore('consulta',()=>{
    
    const router = useRouter();
    const especie = ref({})

    const consulta = reactive({
        categoria:'',
        vrBuscar:''
    })
    
    const mostrarConsulta = async ()=>{
        const {categoria, vrBuscar} = consulta
        
        if(categoria==='Nombre Común'){
           await seleccionarComun(vrBuscar)

           router.push('/busqueda')
           consulta.categoria = '';
           consulta.vrBuscar = '';
           return
        }
        if(categoria==='Nombre científico'){
           await seleccionarCientifico(vrBuscar)
           router.push('/busqueda')
           consulta.categoria = '';
           consulta.vrBuscar = '';
           return
        }

    }

    //Búsqueda por nombre común
    async function seleccionarComun(nombre_comun){
        const {data} = await APIService.lookSpecie(nombre_comun)
        especie.value = data
        console.log(data)
    }

    //Búsqueda por nombre científico
    async function seleccionarCientifico(nombre_cientifico){
        const {data} = await APIService.lookScientificName(nombre_cientifico)
        especie.value = data
        console.log(data)
    }

    return {
        consulta,
        especie,
        mostrarConsulta        
    }
})