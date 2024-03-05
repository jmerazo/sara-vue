import {ref, onMounted} from 'vue'
import {defineStore} from 'pinia'
import APIService from '../services/APIService'

export const usePageContent = defineStore('pageContent',()=>{

    const contenidoNosotros = ref([]);
    const informacionUsuario = ref([]);
    const pageData = ref({});
    const sectionData = ref({});

    const fetchData = async () => {
        if (contenidoNosotros.value.length === 0) {
            const { data } = await APIService.getPageContent()
            contenidoNosotros.value = data
            console.log('contenido: ', contenidoNosotros.value)
            contenidoNosotros.value.forEach(seccion =>{
                informacionUsuario.value.push({
                    titulo: seccion.title,
                    descripcion: seccion.content,
                });
            })  
        }      
    }

    const pagesData = async () => {
        if (pageData.value.length === 0) {
            const { data } = await APIService.pagesGet()
            pageData.value = data
        }      
    }

    const sectionsData = async () => {
        if (sectionData.value.length === 0) {
            const { data } = await APIService.sectionGet()
            sectionData.value = data
        }      
    }

    return {
        informacionUsuario,
        contenidoNosotros,
        fetchData,
        pagesData,
        pageData,
        sectionsData,
        sectionData
    }
})
