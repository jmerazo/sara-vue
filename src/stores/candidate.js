import { ref } from 'vue'
import { defineStore } from 'pinia'
import APIService from '../services/APIService'

export const useGeoCandidateTrees = defineStore('geoCandidateTrees', () => {
    const geoCandidateData = ref([])
    const geoDataNew = ref([])
    let isDataLoaded = false
    const coordinatesPolygon = ref([])

    const fetchData = async () => {
        if (!isDataLoaded) {
            const { data } = await APIService.getGeoCandidateTrees()
            geoCandidateData.value = data
            geoDataNew.value = data
            isDataLoaded = true
        }
    }

    // Función para calcular las coordenadas del perímetro
    const calculatePerimeterCoordinates = (code) => {
        if(code){
            const filteredPoints = geoDataNew.value.filter((point) => point.codigo === code);
      
            const lonArray = filteredPoints.map((point) => point.lon);
            const latArray = filteredPoints.map((point) => point.lat);
        
            if (lonArray.length === 0 || latArray.length === 0) {
            // No hay puntos para el código de especie proporcionado
            return [];
            }
        
            const minLon = Math.min(...lonArray);
            const maxLon = Math.max(...lonArray);
            const minLat = Math.min(...latArray);
            const maxLat = Math.max(...latArray);
        
            coordinatesPolygon.value = [
            [minLon, minLat],
            [minLon, maxLat],
            [maxLon, maxLat],
            [maxLon, minLat],
            [minLon, minLat], // Cerrar el polígono
            ];
        }else{
            const lonArray = geoDataNew.value.map((point) => point.lon);
            const latArray = geoDataNew.value.map((point) => point.lat);
            
            const minLon = Math.min(...lonArray);
            const maxLon = Math.max(...lonArray);
            const minLat = Math.min(...latArray);
            const maxLat = Math.max(...latArray);
            
            coordinatesPolygon.value = [
                [minLon, minLat],
                [minLon, maxLat],
                [maxLon, maxLat],
                [maxLon, minLat],
                [minLon, minLat], // Cerrar el polígono
            ];
            
        }
        
    };      

    function filterGeo(codeFilter) {
  
      if (codeFilter) {
          geoDataNew.value = geoCandidateData.value
              .filter((item) => item.codigo === codeFilter)
              .map((item) => ({
                  lon: item.lon,
                  lat: item.lat,
                  nombre_comun: item.nombre_comun,
                  codigo: item.codigo,
                  numero_placa: item.numero_placa,
                  nombre_cientifico: item.nombre_cientifico,
                  vereda: item.vereda,
                  coordenadas: item.coordenadas,
                  nombre_del_predio: item.nombre_del_predio,
                  resultado: item.resultado
              }));
      } else {
          // Si no hay especie seleccionada, retornar todos los datos sin filtrar
          geoDataNew.value = geoCandidateData.value.map((item) => ({
              lon: item.lon,
              lat: item.lat,
              nombre_comun: item.nombre_comun,
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
    
    function deleteFilterGeo() {
      geoDataNew.value = geoCandidateData.value.map((item) => ({
          lon: item.lon,
          lat: item.lat,
          nombre_comun: item.nombre_comun,
          codigo: item.codigo,
          numero_placa: item.numero_placa,
          nombre_cientifico: item.nombre_cientifico,
          vereda: item.vereda,
          coordenadas: item.coordenadas,
          nombre_del_predio: item.nombre_del_predio,
          resultado: item.resultado
      }));
    }

    return {
        geoCandidateData,
        geoDataNew,
        coordinatesPolygon,
        fetchData,
        filterGeo,
        calculatePerimeterCoordinates,
        deleteFilterGeo
    }
})