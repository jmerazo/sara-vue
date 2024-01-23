import api from '../api/axios';
import { useAuthTokenStore } from '../stores/auth';


export default {
    getAuthToken(credentials){
        return api.post('/auth/token/', credentials)
    },
    refreshAuthToken(credentials){
        return api.post('/auth/token/refresh/', credentials)
    },
    getSpecies(){
        return api.get('/especie_forestal')
    },
    addForestSpecies(data){
        return api.post(`/especie_forestal/`, data)
    },
    updateForestSpecies(sid, data){
        return api.put(`/especie_forestal/${sid}`, data)
    },
    deleteSpecies(pk){
        return api.delete(`/especie_forestal/${pk}`)
    },
    getFamilies(){
        return api.get('especie_forestal/familia/filter')
    },
    getSpeciesData(){
        return api.get('/specie/report/data')
    },
    lookSpecie(nombre_comun){
        return api.get(`/especie_forestal/search/nombre_comun/${nombre_comun}`)
    },
    lookScientificName(scientific_name){
        return api.get(`/especie_forestal/search/scientificname/${scientific_name}`)
    },
    lookMonitoringSpecie(cod_especie){
        return api.get(`monitoring/search/specie/${cod_especie}`)
    },
    lookCandidateSpecie(nombre_comun){
        return api.get(`specie/search/candidates/${nombre_comun}`)
    },
    lookMonitoringCandidate(id){
        return api.get(`candidates/search/monitorings/${id}`)
    },
    lookFamily(n_familia){
        return api.get(`/especie_forestal/search/familia/${n_familia}`)
    },
    getGlossary(){
        return api.get(`/glossary`)
    },
    getGeoCandidateTrees(){
        const store = useAuthTokenStore();
        return api.get('/candidate/geolocation', {
            headers: {
                Authorization: `Bearer ${store.accessToken}`
            }
        })
    },
    getAverageCandidateTrees(){
        return api.get('/candidate/average')
    },
    getValuesByDepartment(){
        return api.get('/monitoring/report/general/total')
    },
    getValuesByDepartmentLocates(){
        return api.get('/monitoring/report/month/locates')
    },
    getSamplesReport(){
        return api.get('/samples/report/general')
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
    pageCountVisit(code){
        return api.get(`/page/count/${code}`)
    },
    pageTopSpecies(code){
        return api.get(`/page/top_species`)
    },
    getDownloadDataSpecie(code){
        return api.get(`especie_forestal/export/${code}`)
    },
    getUsers(){
        return api.get('/users/')
    },
    createUsers(data){
        return api.post('/users/', data)
    },
    updateUsers(uid, data){
        return api.put(`/users/${uid}`, data)
    },
    deleteUsers(uid){
        return api.delete(`/users/${uid}`)
    },
    stateUsers(uid, state){
        return api.put(`/users/state/${uid}`, state)
    },
    getDepartments(){
        return api.get('/departments/')
    },
    getCities(){
        return api.get(`/cities/`)
    },
    getAssessmentData(){
        return api.get('/candidates/trees')
    },
    getMonitoringData(){
        const store = useAuthTokenStore();
        return api.get('/monitoring/report/data', {
            headers: {
                Authorization: `Bearer ${store.accessToken}`
            }
        })
    },
    getSamplesData(){
        return api.get('/samples/report/data')
    },

}