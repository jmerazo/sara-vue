import {ref,onMounted} from 'vue'
import {defineStore} from 'pinia'
import APIService from '../../services/APIService'
import {useConsultaStore} from '@/stores/consulta'


export const useChartsStore = defineStore('charts',()=>{
   
    const consulta = useConsultaStore()
    //grafico 1 departamentos
    const departamentos = ref([]);
    const CantidadDepartamento = ref([]);
    const totalDepartamentos = ref(0);

    //grafico 2 municipios
    const municipios = ref([]);
    const cantidadMunicipio = ref([]);
    const totalMunicipios = ref(0);


    onMounted(async()=>{
        const { data } = await APIService.getValuesByDepartment()
        departamentos.value = Object.keys(data.departamentos)
        
        municipios.value = Object.keys(data.municipios)

       
        // se recorre la data con el fin de crear un arreglo para las cantidades de individuos de cada departamento 
        //los arreglos son un parámetro obligatorio en los componetnes de gráficos.
        for (const departamento in data.departamentos) {
            CantidadDepartamento.value.push(Number(data.departamentos[departamento]));
            totalDepartamentos.value += Number(data.departamentos[departamento])
        }
        
        totalDepartamentos.value =  separarMiles(totalDepartamentos.value)
        

        for (const municipio in data.municipios) {
            cantidadMunicipio.value.push(Number(data.municipios[municipio]));
            totalMunicipios.value += Number(data.municipios[municipio])
        }
        
       
        totalMunicipios.value =  separarMiles(totalMunicipios.value)
        consulta.cargando = false


  
    })
    // formatear los valores con separador de miles
    function separarMiles(valor) {
        return valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    return{
        departamentos,
        CantidadDepartamento,
        totalDepartamentos,

        municipios,
        cantidadMunicipio,
        totalMunicipios,
        
    }
})