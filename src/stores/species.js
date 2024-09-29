import {ref, onMounted,computed,watch} from 'vue'
import {defineStore} from 'pinia'
import {useModalStore} from '@/stores/modal'

import APIService from '@/services/APIService'


export const useEspeciesStore = defineStore('especies', () => {
  
    const modal = useModalStore();
    const cargando = ref(false)
    const species = ref([]);
    const specie = ref([]);
    const specieSelected = ref([])
    const datosImport = ref([]);
    const noResultados = computed(() => species.value.length === 0 );
    const speciesOriginals = ref([]);
    const uniqueNomComunes = ref([]);
    const sisaList = ref([]);

    // variables para paginación
    const currentPage = ref(1); // Página actual
    const itemsPerPage = ref(12); // Elementos por página


    onMounted(async () => {
      cargando.value = true
      const { data } = await APIService.getSpecies();
      species.value = data;
      speciesOriginals.value = data;
      const uniqueSpecies = [...new Map(data.map(specie => [specie.vernacularName, specie])).values()];
      uniqueNomComunes.value = uniqueSpecies.map(specie => ({
        vernacularName: specie.vernacularName,
        nombre_cientifico: specie.nombre_cientifico,
        code_specie: specie.code_specie,
      }));
      cargando.value = false
    });

    function cargarData() {
      species.value.forEach((dato) => {
        datosImport.value.push(dato);
      });
    }
  
    //cargar datos de importacion
    watch(
      () => species.value,
      () => {
        datosImport.value = [];
        cargarData();
      },
      { deep: true }
    );
   
    // Calcula el número total de páginas en función de los datos
    const totalPages = computed(() => Math.ceil(species.value.length / itemsPerPage.value));

    // Calcula las especies a mostrar en la página actual
    const displayedEspecies = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return species.value.slice(start, end);
    });

    // Función para cambiar de página
    function changePage(page) {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Mueve la página al inicio
      }
    }

    // Función para ir a la primera página
    function goToFirstPage() {
      currentPage.value = 1;
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Mueve la página al inicio
    }

    // Función para ir a la última página
    function goToLastPage() {
      currentPage.value = totalPages.value;
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Mueve la página al inicio
    }
  
    function selectSpecie(code_specie) {      
      specie.value = speciesOriginals.value.filter(specie => specie.code_specie === code_specie)
      modal.handleClickModalSpecie();
    }

    //quitar los filtros del motor de busqueda
    function quitarFiltroEspecie(){
      if(speciesOriginals.value){
        species.value = speciesOriginals.value
      }
    }
    
    //busqueda por teremino
    function buscarTermino(termino) {
      changePage(1)
      species.value = speciesOriginals.value.filter(term => {
        const lowerTermino = termino.toLowerCase();
        const lowervernacularName = term.vernacularName ? term.vernacularName.toLowerCase() : '';
        const lowerScientific = term.nombre_cientifico ? term.nombre_cientifico.toLowerCase(): '';
        const lowerFamily = term.family ? term.family.toLowerCase(): '';
  
        return (
          lowervernacularName.includes(lowerTermino) ||
          lowerFamily.includes(lowerTermino) ||
          lowerScientific.includes(lowerTermino)
        );
      });
    }

    async function deleteForestSpecie(pk) {
      const indexToDelete = species.value.findIndex(item => item.ShortcutID === pk);
    
      if (indexToDelete === -1) {
        return { message: "Especie no encontrada" };
      }
    
      species.value.splice(indexToDelete, 1);
      await APIService.deleteSpecies(pk);
    
      return { message: "Especie eliminada con éxito" };
    }

    function selectedForestSpecieUpdate(id) {
      specieSelected.value =  species.value.filter(especie => especie.id === id)
      modal.handleClickModalForestSpecieUpdate(specieSelected.value); 
    }

    const updateForestSpecie = async (sid, data) => {
      const specieIndex = species.value.findIndex((specie) => specie.id === sid);
      if (specieIndex !== -1) {
          Object.assign(species.value[specieIndex], data);
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
          species.value.push(data); // Agrega el nuevo objeto al array
        } else {
          console.error('Error al agregar la especie: ', response.statusText);
        }
      } catch (error) {
        console.error('Error al comunicarse con el servidor: ', error);
      }
    };  

    async function loadSpeciesSisa(){
      const responseSisa = await APIService.getSisa()
      sisaList.value = responseSisa.data;
    }
    
    return {
      cargando,
      currentPage,
      itemsPerPage,
      totalPages,
      displayedEspecies,
      species,
      specie,
      noResultados,
      speciesOriginals,
      uniqueNomComunes,
      specieSelected,
      datosImport,
      selectSpecie,
      buscarTermino,
      quitarFiltroEspecie,
      changePage,
      deleteForestSpecie,
      selectedForestSpecieUpdate,
      updateForestSpecie,
      addForestSpecie,
      loadSpeciesSisa,
      sisaList,
      goToFirstPage,
      goToLastPage
    };
});
