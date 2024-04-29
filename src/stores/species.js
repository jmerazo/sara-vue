import {ref, onMounted,computed,watch} from 'vue'
import {defineStore} from 'pinia'
import {useModalStore} from '@/stores/modal'

import APIService from '@/services/APIService'


export const useEspeciesStore = defineStore('especies', () => {
    const modal = useModalStore();
    const cargando = ref(false)
    const especies = ref([]);
    const especie = ref([]);
    const specieSelected = ref([])
    const datosImport = ref([]);
    const noResultados = computed(() => especies.value.length === 0 );
    const especiesOriginales = ref([]);
    const uniqueNomComunes = ref([]);

    // variables para paginación
    const currentPage = ref(1); // Página actual
    const itemsPerPage = ref(12); // Elementos por página


    onMounted(async () => {
      cargando.value = true
      const { data } = await APIService.getSpecies();
      especies.value = data;
      especiesOriginales.value = data;
      const uniqueSpecies = [...new Map(data.map(especie => [especie.nom_comunes, especie])).values()];
      uniqueNomComunes.value = uniqueSpecies.map(especie => ({
        nom_comunes: especie.nom_comunes,
        nombre_cientifico: especie.nombre_cientifico,
        cod_especie: especie.cod_especie,
      }));
      cargando.value = false
    });

    function cargarData() {
      especies.value.forEach((dato) => {
        datosImport.value.push(dato);
      });
    }
  
    //cargar datos de importacion
    watch(
      () => especies.value,
      () => {
        datosImport.value = [];
        cargarData();
      },
      { deep: true }
    );
   
    // Calcula el número total de páginas en función de los datos
    const totalPages = computed(() => Math.ceil(especies.value.length / itemsPerPage.value));

    // Calcula las especies a mostrar en la página actual
    const displayedEspecies = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return especies.value.slice(start, end);
    });

    //función para cambiar de página
    function changePage(page) {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
      }
    }

   
    function seleccionarEspecie(cod_especie) {
      especie.value = especiesOriginales.value.filter(especie => especie.cod_especie === cod_especie)
      
      modal.handleClickModal();
    }

    //quitar los filtros del motor de busqueda
    function quitarFiltroEspecie(){
      if(especiesOriginales.value){
        especies.value = especiesOriginales.value
      }
    }
    
    //busqueda por teremino
    function buscarTermino(termino) {
      changePage(1)
      especies.value = especiesOriginales.value.filter(term => {
        const lowerTermino = termino.toLowerCase();
        const lowerNomComunes = term.nom_comunes ? term.nom_comunes.toLowerCase() : '';
        const lowerCientifico = term.nombre_cientifico ? term.nombre_cientifico.toLowerCase(): '';
        const lowerFamilia = term.familia ? term.familia.toLowerCase(): '';
  
        return (
          lowerNomComunes.includes(lowerTermino) ||
          lowerFamilia.includes(lowerTermino) ||
          lowerCientifico.includes(lowerTermino)
        );
      });
    }

    async function deleteForestSpecie(pk) {
      const indexToDelete = especies.value.findIndex(item => item.ShortcutID === pk);
    
      if (indexToDelete === -1) {
        return { message: "Especie no encontrada" };
      }
    
      especies.value.splice(indexToDelete, 1);
      await APIService.deleteSpecies(pk);
    
      return { message: "Especie eliminada con éxito" };
    }

    function selectedForestSpecieUpdate(id) {
      specieSelected.value =  especies.value.filter(especie => especie.ShortcutID === id)
      modal.handleClickModalForestSpecieUpdate(specieSelected.value); 
    }

    const updateForestSpecie = async (sid, data) => {
      const specieIndex = especies.value.findIndex((specie) => specie.ShortcutID === sid);
      if (specieIndex !== -1) {
          Object.assign(especies.value[specieIndex], data);
          await APIService.updateForestSpecies(sid, data)
      } else {
          console.error(`Especie con ID ${sid} no encontrada.`);
      }
    };

    const addForestSpecie = async (data) => {
      try {
        const response = await APIService.addForestSpecies(data);
    
        if (response.status === 200) {
          // La respuesta del APIService fue satisfactoria
          especies.value.push(data); // Agrega el nuevo objeto al array
        } else {
          console.error('Error al agregar la especie: ', response.statusText);
        }
      } catch (error) {
        console.error('Error al comunicarse con el servidor: ', error);
      }
    };  
    
    return {
      cargando,
      currentPage,
      itemsPerPage,
      totalPages,
      displayedEspecies,
      especies,
      especie,
      noResultados,
      especiesOriginales,
      uniqueNomComunes,
      specieSelected,
      datosImport,
      seleccionarEspecie,
      buscarTermino,
      quitarFiltroEspecie,
      changePage,
      deleteForestSpecie,
      selectedForestSpecieUpdate,
      updateForestSpecie,
      addForestSpecie,
     
    };
});
