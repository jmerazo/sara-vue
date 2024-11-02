import { ref } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { useModalStore } from "@/stores/modal";
import { useToastStore } from "./toast";

import APIService from "@/services/APIService";

export const useConsultaStore = defineStore("consulta", () => {

  const modal = useModalStore();
  const router = useRouter();
  const toast = useToastStore()
  const specie = ref([]);
  const familia = ref({});
  const strFamilia = ref("");
  const cargando = ref(false);

  //consultar especie por familia
  async function selectFamily(name_family) {
    cargando.value = true;
    strFamilia.value = name_family
    const { data } = await APIService.lookFamily(name_family);
    familia.value = data;
    modal.handleClickModalFamily();
    cargando.value = false;
  }

  async function consultSpecie(code_specie, queryPage) {

    try {

      const { data } = await APIService.lookSpecie(code_specie);
      specie.value = data;

      let lastCreatedGBIF = null;
        
      data.geo_data.forEach((item) => {
          if (item.source === 'gbif') {
              const createdDate = new Date(item.last_created);
              if (!lastCreatedGBIF || createdDate > lastCreatedGBIF) {
                  lastCreatedGBIF = createdDate;
              }
          }
      });      

      // Si se encontró una fecha, validar si han pasado más de 30 días
      if (lastCreatedGBIF) {
        const currentDate = new Date();
        const diffTime = Math.abs(currentDate - lastCreatedGBIF);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          if (diffDays > 30) {
              // Si han pasado más de 30 días, llamar a storeGBIFData
              if (data.taxon_key) {
                  storeGBIFData(data.taxon_key);
              }

              return
          } 
      } else {
          // Si no hay registros previos de GBIF, almacenar los datos de GBIF
          if (data.taxon_key) {
              storeGBIFData(data.taxon_key);
          }
      }

    } catch (error) {
      toast.activateToast('Especie no encontrada', 'error')
      router.push({ name: 'especies' })
    }

  }

  async function storeGBIFData(taxonKey) {
    const gbifData = await fetchGBIFCoordinates([taxonKey]);
    if (gbifData.length > 0) {
      try {
        const response = await APIService.specieGBIF(gbifData);
        console.log('Datos de GBIF almacenados exitosamente:', response.data);
      } catch (error) {
        console.error('Error al almacenar los datos de GBIF:', error);
      }
    } else {
      console.log("No hay datos nuevos de GBIF para almacenar.");
    }
  }

  async function fetchGBIFCoordinates(taxonKeys) {
    const promises = taxonKeys.map(async (taxonKey) => {
      try {
        const response = await fetch(`https://api.gbif.org/v1/occurrence/search?taxonKey=${taxonKey}&limit=100`);

        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.results
          .filter(result => result.decimalLatitude !== null && result.decimalLongitude !== null)
          .map(result => ({
            gbifID: result.gbifID || result.key,
            taxonKey: result.taxonKey,
            scientificName: result.scientificName,
            vernacularName: result.vernacularName,
            decimalLatitude: result.decimalLatitude,
            decimalLongitude: result.decimalLongitude,
            basisOfRecord: result.basisOfRecord,
            institutionCode: result.institutionCode,
            collectionCode: result.collectionCode,
            catalogNumber: result.catalogNumber,
            recordedBy: result.recordedBy,
            typeStatus: result.typeStatus,
            depth: result.depth,
            elevation: result.elevation,
            mediaType: result.mediaType
          }));
      } catch (error) {
        console.error(`Error al obtener los datos de GBIF para taxonKey ${taxonKey}:`, error);
        return [];
      }
    });

    const gbifDataArrays = await Promise.all(promises);
    return gbifDataArrays.flat();
  }    

  return {
    specie,
    familia,
    strFamilia,
    cargando,
    consultSpecie,
    selectFamily,
  };
});
