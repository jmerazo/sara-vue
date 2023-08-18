import {ref, onMounted, reactive} from 'vue'
import {defineStore} from 'pinia'
import {useConsultaStore} from './consulta'
import APIService from '../services/APIService'

export const useFamiliasStore = defineStore('familias',()=>{
    
    const familias = ref([])
    const familiasOriginal= ref([])
    //const familia = ref({})
    const consulta = useConsultaStore()

    onMounted(async ()=>{
        consulta.cargando = true
        const {data} = await APIService.getFamilies()
        familias.value = data
        familiasOriginal.value = data
        consulta.cargando = false
    })

    //quitar los filtros del motor de busqueda
    function quitarFiltroFamilia(){
      if(familiasOriginal !==[]){
          familias.value = familiasOriginal.value
      }
    }

    function buscarTermino(termino) {
      
        familias.value = familiasOriginal.value.filter(term => {
          const lowerTermino = termino.toLowerCase();
          const lowerFamilia = term.familia ? term.familia.toLowerCase(): '';
    
          return (
            lowerFamilia.includes(lowerTermino)
          );
        });
      }

    return {
        familias,
        buscarTermino,
        quitarFiltroFamilia
        
        
    }
})