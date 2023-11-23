import { onMounted, ref } from "vue";
import { defineStore } from "pinia";
import APIService from "../services/APIService";

export const locatesColombia = defineStore("locatesColombia", () => {

  const departments = ref({});
  const cities = ref({});

  onMounted(async () => {
    try {
      const departmentsResponse = await APIService.getDepartments();
      departments.value = departmentsResponse.data;

      const citiesResponse = await APIService.getCities();
      cities.value = citiesResponse.data;
    } catch (error) {
      console.error("Error al obtener datos: ", error);
    }
  });

  return {
    departments,
    cities
  };
});
