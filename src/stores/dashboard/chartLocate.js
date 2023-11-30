import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
import APIService from '../../services/APIService'
import { useConsultaStore } from '@/stores/consulta'

export const useChartLocateStore = defineStore('chartLocate', () => {
    const consulta = useConsultaStore()

    // Departamentos
    const departamentos = ref([]);
    const departamentoRealizados = ref([]);
    const departamentoPendientes = ref([]);
    const departamentoTotal = ref([]);
    const totalDepartamentos = ref(0)
    

    // Municipios
    const municipios = ref([]);
    const todosMunicipios = ref([])
    const realizados = ref([]);
    const todosRealizados = ref([]);
    const pendientes = ref([]);
    const todosPendientes = ref([]);
    const totales = ref([]);
    const todosTotales = ref([]);

    //DATA grafico
    const chartMunicipios = ref([]);
    const chartRealizados = ref([]);
    const chartPendientes = ref([]);
    const chartTotales = ref([]);

    onMounted(async () => {
        const { data } = await APIService.getValuesByDepartmentLocates();

        // Llenar los departamentos
        departamentos.value = Object.keys(data.departamentos);
       
        // Iterar sobre los departamentos y llenar los datos correspondientes
        departamentos.value.forEach(departamento => {
            const departamentoData = data.departamentos[departamento];

            departamentoRealizados.value.push(departamentoData.monitoreos_realizados_mes)
            departamentoPendientes.value.push(departamentoData.monitoreos_pendientes_mes)
            departamentoTotal.value.push(departamentoData.total_monitoreos_mes)
            totalDepartamentos.value += departamentoData.total_monitoreos_mes
            // Agregar los datos de municipios, realizados, pendientes y totales
            municipios.value.push(Object.keys(departamentoData.municipios));
            realizados.value.push(Object.values(departamentoData.municipios).map(municipio => municipio.monitoreos_realizados_mes));
            pendientes.value.push(Object.values(departamentoData.municipios).map(municipio => municipio.monitoreos_pendientes_mes));
            totales.value.push(Object.values(departamentoData.municipios).map(municipio => municipio.total_monitoreos_mes));
            

        });    
        
        municipios.value.forEach(municipio => {
            todosMunicipios.value = todosMunicipios.value.concat(municipio);
        });

        realizados.value.forEach(realizado => {
            todosRealizados.value = todosRealizados.value.concat(realizado)
        })

        pendientes.value.forEach(pendiente => {
            todosPendientes.value = todosPendientes.value.concat(pendiente)
        })

        totales.value.forEach(total => {
            todosTotales.value = todosTotales.value.concat(total)
        })
        
        chartMunicipios.value = todosMunicipios.value
        chartRealizados.value = todosRealizados.value
        chartPendientes.value = todosPendientes.value
        chartTotales.value = todosTotales.value 

        consulta.cargando = false;
    });
    

    
   
    // Formatear los valores con separador de miles
    function separarMiles(valor) {
        return valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

  
   
    function listar(index) {
       
        if (index >= 0) {
            chartMunicipios.value = municipios.value[index];
            chartRealizados.value = realizados.value[index];
            chartPendientes.value = pendientes.value[index];
            chartTotales.value = totales.value[index];
            return 
        }
        if(index ==='Todos'){
            chartMunicipios.value = todosMunicipios.value;
            chartRealizados.value = todosRealizados.value;
            chartPendientes.value = todosPendientes.value;
            chartTotales.value = todosTotales.value;
            return 
        }
       
  
    }
    
    return {
        //departamento
        departamentos,
        departamentoRealizados,
        departamentoPendientes,
        departamentoTotal,
        totalDepartamentos,
        //municipio
        todosMunicipios,
        todosRealizados,
        todosPendientes,
        todosTotales,
        //grafico
        chartMunicipios,
        chartRealizados,
        chartPendientes,
        chartTotales,
        listar
    };
});
