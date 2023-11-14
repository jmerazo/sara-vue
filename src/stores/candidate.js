import { ref } from 'vue'
import { defineStore } from 'pinia'
import APIService from '../services/APIService'

export const useGeoCandidateTrees = defineStore('geoCandidateTrees', () => {
    const geoCandidateData = ref([])
    const geoDataNew = ref([])
    let isDataLoaded = false

    const fetchData = async () => {
        if (!isDataLoaded) {
            const { data } = await APIService.getGeoCandidateTrees()
            geoCandidateData.value = data
            geoDataNew.value = data
            /* console.log('geoStore: ', geoCandidateData.value) */
            isDataLoaded = true
        }
    }

    // Función para calcular las coordenadas del perímetro
    const calculatePerimeterCoordinates = () => {
      // Lógica para calcular las coordenadas del perímetro según tus datos
      // Supongamos que cada elemento en geoCandidateData tiene propiedades lon y lat
      const minLon = Math.min(...geoDataNew.value.map(item => item.lon));
      const minLat = Math.min(...geoDataNew.value.map(item => item.lat));
      const maxLon = Math.max(...geoDataNew.value.map(item => item.lon));
      const maxLat = Math.max(...geoDataNew.value.map(item => item.lat));

      return [minLon, minLat, maxLon, maxLat];
    };

    function filterGeo(codeFilter) {
      console.log('code store filter: ', codeFilter);
  
      if (codeFilter) {
          console.log('estoy con codeFilter');
          geoDataNew.value = geoCandidateData.value
              .filter((item) => item.codigo === codeFilter)
              .map((item) => ({
                  lon: item.lon,
                  lat: item.lat,
                  nombre_comun: item.nom_comunes,
                  codigo: item.codigo,
                  numero_placa: item.numero_placa,
                  nombre_cientifico: item.nombre_cientifico,
                  vereda: item.vereda,
                  coordenadas: item.coordenadas,
                  nombre_del_predio: item.nombre_del_predio,
                  resultado: item.resultado
              }));
      } else {
          console.log('estoy sin codeFilter');
          // Si no hay especie seleccionada, retornar todos los datos sin filtrar
          geoDataNew.value = geoCandidateData.value.map((item) => ({
              lon: item.lon,
              lat: item.lat,
              nombre_comun: item.nom_comunes,
              codigo: item.codigo,
              numero_placa: item.numero_placa,
              nombre_cientifico: item.nombre_cientifico,
              vereda: item.vereda,
              coordenadas: item.coordenadas,
              nombre_del_predio: item.nombre_del_predio,
              resultado: item.resultado
          }));
      }
    }
  

    return {
        geoCandidateData,
        geoDataNew,
        fetchData,
        filterGeo,
        calculatePerimeterCoordinates
    }
})