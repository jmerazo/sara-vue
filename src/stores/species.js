import {ref, onMounted,computed} from 'vue'
import {defineStore} from 'pinia'
import {useModalStore} from '../stores/modal'
import APIService from '../services/APIService'



export const useEspeciesStore = defineStore('especies', () => {
    const modal = useModalStore();
    const especies = ref([]);
    const especie = ref({});
    const vrBuscar = ref('');
    const noResultados = computed(() => especies.value.length === 0 );
    const especiesOriginales = ref([]);
  
    onMounted(async () => {
      const { data } = await APIService.getSpecies();
      especies.value = data;
      especiesOriginales.value = data;
    });
  
    async function seleccionarEspecie(nombre_comun) {
      const { data } = await APIService.lookSpecie(nombre_comun);
      especie.value = data;
      modal.handleClickModal();
    }
  
    function buscarTermino(termino) {
      vrBuscar.value = termino.toLowerCase();
  
      especies.value = especiesOriginales.value.filter(term => {
        const lowerTermino = vrBuscar.value;
        const lowerNomComunes = term.nom_comunes.toLowerCase();
        const lowerCientifico = term.nombre_cientifico.toLowerCase();
        const lowerFamilia = term.familia.toLowerCase();
  
        return (
          lowerNomComunes.includes(lowerTermino) ||
          lowerFamilia.includes(lowerTermino) ||
          lowerCientifico.includes(lowerTermino)
        );
      });
    }

    
    return {
      especies,
      especie,
      noResultados,
      seleccionarEspecie,
      buscarTermino,
    };
});
