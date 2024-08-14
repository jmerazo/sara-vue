// stores/speciesStore.js
import { defineStore } from "pinia";
import { ref, onMounted } from "vue";
import APIService from "../services/APIService";

export const useCalendarStore = defineStore("species", () => {
  const dataCalendar = ref([]);
  const dataFlower = ref([]);
  const dataFruit = ref([]);

  onMounted(async () => {
    try {
      const { data } = await APIService.getMonitoringCalendar();
      dataCalendar.value = data;
    } catch (error) {
      console.error("Error getting data:", error);
    }
  });

 
  const calendarFlower = (cod_especie) => {
    const resultado = {};
    dataCalendar.value.forEach((item) => {
      const mes = new Date(item.fecha_monitoreo).getMonth() + 1; // Obtener el mes (0-11)
      const categoria = item.flor_abierta;

      if (item.cod_especie_id === cod_especie) {
        if (!resultado[mes]) {
          resultado[mes] = {};
        }

        if (!resultado[mes][categoria]) {
          resultado[mes][categoria] = 0;
        }

        resultado[mes][categoria]++;
      }
    });
    dataFlower.value = resultado;
   
    return resultado;
  };

  const calendarFruit = (cod_especie) => {
    const resultado = {};

    dataCalendar.value.forEach((item) => {
      const mes = new Date(item.fecha_monitoreo).getMonth() + 1; // Obtener el mes (0-11)
      const categoria = item.frutos_verdes;

      if (item.cod_especie_id === cod_especie) {
        if (!resultado[mes]) {
          resultado[mes] = {};
        }

        if (!resultado[mes][categoria]) {
          resultado[mes][categoria] = 0;
        }

        resultado[mes][categoria]++;
      }
    });
    dataFruit.value = resultado;
    return resultado;
  };

  const getCalendarSpecie = (cod_especie)=>{
    calendarFlower(cod_especie)
    calendarFruit(cod_especie)
  }

  return { getCalendarSpecie, dataFlower, dataFruit };
});
