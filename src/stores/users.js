import {ref, onMounted} from 'vue'
import {defineStore} from 'pinia'
import APIService from '../services/APIService'

export const useUsersAdmin = defineStore('usersAdmin',()=>{

    const usersAdminData = ref({})

    const fetchData = async ()=>{
        const { data } = await APIService.getUsers()
        usersAdminData.value = data
    }

    return {
        usersAdminData,
        fetchData
    }
})