import {ref,onMounted} from 'vue'
import {defineStore} from 'pinia'
import APIService from '../../services/APIService'
import {useConsultaStore} from '@/stores/consulta'


export const useChartsStore = defineStore('charts',()=>{
   
    const consulta = useConsultaStore()

    const departamentos = ref([]);
    const CantidadDepartamento = ref([]);
    const totalDepartamentos = ref(0);

    onMounted(async()=>{
        const { data } = await APIService.getValuesByDepartment()
        departamentos.value = Object.keys(data)
        // se recorre la data con el fin de crear un arreglo para las cantidades de individuos de cada departamento 
        //los arreglos son un parámetro obligatorio en los componetnes de gráficos.
        for (const departamento in data) {
            CantidadDepartamento.value.push(Number(data[departamento].total));
            totalDepartamentos.value += Number(data[departamento].total)
        }
        console.log(departamentos.value) 
        console.log(CantidadDepartamento.value)
        console.log(totalDepartamentos.value);
        consulta.cargando = false
  
    })
   
    return{
        departamentos,
        CantidadDepartamento,
        totalDepartamentos,
        
    }
})