import { onMounted, ref } from "vue";
import { defineStore } from "pinia";
import APIService from "../services/APIService";

export const locatesColombia = defineStore("locatesColombia", () => {
  const departments = ref([]);
  const cities = ref({});

  onMounted(async () => {
    try {
      const departmentsResponse = await APIService.getDepartments();
      // Filtrar solo los departamentos que deseas mantener (Putumayo y Caquetá)
      const filteredDepartments = departmentsResponse.data.filter(
        (department) => department.name === "Putumayo" || department.name === "Caquetá"
      );
      departments.value = filteredDepartments;

      // Obtener ciudades, podrías obtener las ciudades nuevamente basadas en los departamentos filtrados si es necesario

      const citiesResponse = await APIService.getCities();
      cities.value = citiesResponse.data;
      console.log(cities.value);
      
      console.log('cities: ', cities.value)
    } catch (error) {
      console.error("Error al obtener datos: ", error);
    }
  });

  return {
    departments,
    cities
  };
});
