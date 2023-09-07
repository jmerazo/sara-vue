import { approximatelyEquals } from 'ol/extent';
import api from '../api/axios';

export default {
    getAuthToken(credentials){
        return api.post('/auth/token/', credentials)
    },
    getSpecies(){
        return api.get('/especie_forestal')
    },
    getFamilies(){
        return api.get('/especie_forestal/familia')
    },
    lookSpecie(nombre_comun){
        return api.get(`/especie_forestal/search/nombre_comun/${nombre_comun}`)
    },
    lookScientificName(scientific_name){
        return api.get(`/especie_forestal/search/scientificname/${scientific_name}`)
    },
    lookFamily(n_familia){
        return api.get(`/especie_forestal/search/familia/${n_familia}`)
    },
    getGlossary(){
        return api.get(`/glossary`)
    },
    getGeoCandidateTrees(){
        return api.get('/candidate/geolocation')
    },
    getAverageCandidateTrees(){
        return api.get('/candidate/average')
    },
    getValuesByDepartment(){
        return api.get('/monitoring/report/general/total')
    },
    getPageContent(){
        return api.get('/page/content')
    },
    pageContentGet(pid){
        return api.get(`/page/content/${pid}`)
    },
    pageContentCreate(data){
        return api.post(`/page/content`, data)
    },
    pageContentUpdate(pid){
        return api.put(`/page/content/${pid}`)
    },
    pageContentDelete(pid){
        return api.delete(`/page/content/${pid}`)
    },
    getDownloadDataSpecie(code){
        return api.get(`especie_forestal/export/${code}`)
    },
    getUsers(){
        return api.get('/users/')
    },
    createUsers(data){
        return api.post('/users/', data)
    }
}