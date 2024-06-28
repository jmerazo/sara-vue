import { ref } from "vue";
import { defineStore } from "pinia";
import APIService from "../services/APIService";

export const useAverageSpecie = defineStore("averageSpecie", () => {
  const cod_especie = ref("");
  const etiquetas = ref([]);
  const valores = ref([]);
  const cantIndividuos = ref(0);
  
  const fetchData = async () => {
    try {
      etiquetas.value = [];
      valores.value = [];
      const { data } = await APIService.getAverageCandidateTrees();

      // Llamar a la función para graficar después de obtener los datos
      graph(data, cod_especie.value);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Función para calcular las alturas promedio y graficar en la librería chart.js
  const graph = (data, cod_especie) => {
    // Función para calcular las alturas promedio
    const dataEspecie = data.filter(
      (individuo) => individuo.codigo === cod_especie
    );

    // Obtener alturas promedio
    const { alturaPromedioTotal, alturaPromedioComercial } =
      calcularValores(dataEspecie);

    etiquetas.value = ["Altura Promedio", "Altura Fuste"];
    valores.value = [alturaPromedioTotal, alturaPromedioComercial];
  };

  const calcularValores = (data) => {
    const sumaAlturaTotal = data.reduce((total, objeto) => {
      return total + objeto.altura_total;
    }, 0);
    const alturaPromedioTotal = Math.round(sumaAlturaTotal / data.length);

    const sumaAlturaComercial = data.reduce((total, objeto) => {
      return total + objeto.altura_comercial;
    }, 0);

   

    const alturaPromedioComercial = Math.round(
      sumaAlturaComercial / data.length
    );
    cantIndividuos.value = data.length;
    return { alturaPromedioTotal, alturaPromedioComercial };
  };

  return {
    cod_especie,
    etiquetas,
    valores,
    cantIndividuos,
    fetchData,
  };
});
