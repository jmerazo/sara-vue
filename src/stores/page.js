import {ref } from 'vue'
import {defineStore} from 'pinia'
import APIService from '../services/APIService'
import { useModalStore } from "@/stores/modal";

export const usePageContent = defineStore('pageContent',()=>{
    const modal = useModalStore();
    const contenidoNosotros = ref([]);
    const informacionUsuario = ref([]);
    const pageData = ref([]);
    const sectionData = ref([]);
    const sectionSelected = ref([]);
    const sectionSelectedView = ref([])
    const loading = ref(false)

    const fetchData = async () => {
        if (contenidoNosotros.value.length === 0) {
            const { data } = await APIService.getPageContent()
            contenidoNosotros.value = data
                    
            contenidoNosotros.value.forEach(seccion =>{
                if( seccion.title === 'Misión' || 
                    seccion.title === 'Visión' || 
                    seccion.title === 'Valores'||
                    seccion.title === 'Objetivo'
                ){
                    informacionUsuario.value.push({
                        titulo: seccion.title,
                        descripcion: seccion.content,
                    });
                }
            })
              
        }      
    }

    const pagesData = async () => {
        const { data } = await APIService.pagesGet()
        pageData.value = data     
    }
  
    const addPage = async (data) => {
        try {
            const response = await APIService.pagesCreate(data);
        
            if (response.status === 200) {
            // La respuesta del APIService fue satisfactoria
            pageData.value.push(data); // Agrega el nuevo objeto al array
            } else {
            console.error('Error al agregar la página: ', response.statusText);
            }
        } catch (error) {
            console.error('Error al comunicarse con el servidor: ', error);
        }
    };
    
    const updatePage = async (pid, data) => {
        const pageIndex = pageData.value.findIndex((pag) => pag.id === pid);
        if (pageIndex !== -1) {
            Object.assign(pageData.value[pageIndex], data);
            await APIService.pagesUpdate(pid, data)
        } else {
            console.error(`Página con ID ${pid} no encontrada.`);
        }
    };

    async function deletePage(pk) {
        const indexToDelete = pageData.value.findIndex(item => item.id === pk);
        
        if (indexToDelete === -1) {
            return { message: "Página no encontrada" };
        }
        
        pageData.value.splice(indexToDelete, 1);
        await APIService.pagesDelete(pk);
        
        return { message: "Página eliminada con éxito" };
    }

    const sectionsData = async () => {
        const { data } = await APIService.sectionGet()
        sectionData.value = data   
    }

    const addSection = async (data) => {
        try {
            const response = await APIService.sectionCreate(data);
        
            if (response.status === 200) {
            // La respuesta del APIService fue satisfactoria
            sectionData.value.push(data); // Agrega el nuevo objeto al array
            } else {
            console.error('Error al agregar la sección: ', response.statusText);
            }
        } catch (error) {
            console.error('Error al comunicarse con el servidor: ', error);
        }
    };

    function selectedSectionUpdate(id) {
        sectionSelected.value =  sectionData.value.filter(section => section.id === id)
        modal.handleClickModalSectionUpdate(sectionSelected.value); 
    }
    
    function selectedSectionView(id) {
        sectionSelectedView.value =  sectionData.value.filter(section => section.id === id)
        modal.handleClickModalSectionView(sectionSelectedView.value); 
    }

    const updateSection = async (sid, data) => {
        console.log('id sectio: ', sid, data)
        const sectionIndex = sectionData.value.findIndex((sc) => sc.id === sid);
        if (sectionIndex !== -1) {
            Object.assign(sectionData.value[sectionIndex], data);
            await APIService.sectionUpdate(sid, data)
        } else {
            console.error(`Sección con ID ${sid} no encontrada.`);
        }
    };

    async function deleteSection(pk) {
        const indexToDelete = sectionData.value.findIndex(item => item.id === pk);
        
        if (indexToDelete === -1) {
            return { message: "Sección no encontrada" };
        }
        
        sectionData.value.splice(indexToDelete, 1);
        await APIService.sectionDelete(pk);
        
        return { message: "Sección eliminada con éxito" };
    }

    const sendContactEmail = async (data) => {
        try {
            loading.value = true
            const response = await APIService.sendContactEmail(data);
            loading.value = false
            return response.data;  // Retorna la data tal como viene del backend
        } catch (error) {
            // Captura y retorna el error en caso de fallo
            loading.value = false
            if (error.response) {
                return error.response.data;  // Maneja errores con respuesta del servidor
            } else {
                throw new Error('Error en la conexión');  // Error sin respuesta
            }
        }
    };            

    return {
        informacionUsuario,
        contenidoNosotros,
        fetchData,
        pagesData,
        pageData,
        sectionData,
        sectionsData,
        updatePage,
        addPage,
        deletePage,
        addSection,
        updateSection,
        deleteSection,
        selectedSectionUpdate,
        sectionSelected,
        selectedSectionView,
        sectionSelectedView,
        sendContactEmail,
        loading
    }
})
