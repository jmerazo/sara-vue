import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
import APIService from '@/services/APIService'


export const useChartSamples = defineStore('samples', () => {
    

    // Departamentos
    const departamentos = ref([]);
    const totalDepartamentos = ref([])
    const totalMuestras = ref(0)
    // Municipios
    const municipios = ref([]);
    const CantidadMunicipio = ref([]);
   

   
    onMounted(async () => {
        const { data } = await APIService.getSamplesReport();
        
        // Llenar los departamentos
        departamentos.value = Object.keys(data);
       
        // Iterar sobre los departamentos y llenar los datos correspondientes
        departamentos.value.forEach(departamento => {
            const departamentoData = data[departamento];
           
            totalDepartamentos.value = totalDepartamentos.value.concat(departamentoData.total)
            totalMuestras.value += departamentoData.total;
            
             // Agregar los datos de municipios
            municipios.value = municipios.value.concat(Object.keys(departamentoData.municipios));
            CantidadMunicipio.value = CantidadMunicipio.value.concat(Object.values(departamentoData.municipios))

        });    
       
        
      
    });
    

    
   
    // Formatear los valores con separador de miles
    function separarMiles(valor) {
        return valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } 
    
    return {
        departamentos,
        totalDepartamentos,
        totalMuestras,
        municipios,
        CantidadMunicipio,
        separarMiles,
       
    };
});