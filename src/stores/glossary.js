import {ref, onMounted, reactive} from 'vue'
import {defineStore} from 'pinia'
import {useModalStore} from './modal'
import APIService from '../services/APIService'

export const useGlossaryStore = defineStore('glossary',()=>{
    
    const modal = useModalStore()
    const glossary = ref([])

    onMounted(async ()=>{
        const {data} = await APIService.getGlossary()
        glossary.value = data
    })

    return {
        glossary
    }
})