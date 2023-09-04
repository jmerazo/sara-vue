import {ref, onMounted} from 'vue'
import {defineStore} from 'pinia'
import APIService from '../services/APIService'

export const usePageContent = defineStore('pageContent',()=>{

    const pageContentData = ref({})

    const fetchData = async ()=>{
        const { data } = await APIService.getPageContent()
        pageContentData.value = data
        console.log('about page: ', pageContentData.value)
    }

    return {
        pageContentData,
        fetchData
    }
})