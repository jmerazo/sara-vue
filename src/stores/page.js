import {ref, onMounted} from 'vue'
import {defineStore} from 'pinia'
import APIService from '../services/APIService'

export const usePageContent = defineStore('pageContent',()=>{

    const contenidoNosotros = ref({})

    const informacionUsuario = ref([])

    onMounted(async ()=>{
        const { data } = await APIService.getPageContent()
        contenidoNosotros.value = data
        contenidoNosotros.value.forEach(seccion =>{
            informacionUsuario.value.push({
                titulo: seccion.title,
                descripcion: seccion.content,
            });
        })
    })


    return {
        informacionUsuario, 
    }
})