import { ref } from 'vue'
import { defineStore } from 'pinia'
import APIService from '../services/APIService'

export const useGeoCandidateTrees = defineStore('geoCandidateTrees', () => {

    const geoCandidateData = ref([])

    let isDataLoaded = false

    const fetchData = async () => {
        if (!isDataLoaded) {
            const { data } = await APIService.getGeoCandidateTrees()
            geoCandidateData.value = data
            /* console.log('geoStore: ', geoCandidateData.value) */
            isDataLoaded = true
        }
    }

    function filterGeo(codeFilter) {
        console.log('code store filter: ', codeFilter)
        if (codeFilter) {
            console.log('estoy con codeFilter')
          return geoCandidateData.value
            .filter(item => item.codigo === codeFilter)
            .map(item => ({
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
            console.log('estoy sin codeFilter')
          // Si no hay especie seleccionada, retornar todos los datos sin filtrar
          return geoCandidateData.value.map(item => ({
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
        fetchData,
        filterGeo
    }
})