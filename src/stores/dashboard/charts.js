import {ref,onMounted} from 'vue'
import {defineStore} from 'pinia'
import APIService from '../../services/APIService'
import {useConsultaStore} from '@/stores/consulta'


export const useChartsStore = defineStore('charts',()=>{
   
    const consulta = useConsultaStore()

    const departamentos = ref([]);
    const CantidadDepartamento = ref([]);
    const totalDepartamentos = ref(0);
    const chartOneReady = ref(false)

    async function chartDepartment(){
        const { data } = await APIService.getValuesByDepartment()
        departamentos.value = Object.keys(data)
        for (const departamento in data) {
            CantidadDepartamento.value.push(Number(data[departamento].total));
            totalDepartamentos.value += Number(data[departamento].total)

        }
        console.log(departamentos.value) 
        console.log(CantidadDepartamento.value)
        console.log(totalDepartamentos.value);
        chartOneReady.value = true
        consulta.cargando = false
    }
    
   
    return{
        chartOneReady,
        departamentos,
        CantidadDepartamento,
        totalDepartamentos,
        chartDepartment
    }
})