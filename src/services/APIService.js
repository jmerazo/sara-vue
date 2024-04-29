import api from '../api/axios';
import { useAuthTokenStore } from '../stores/auth';

export default {
    /* ==================================================================================================================== */
    /* ==================================================================================================================== */
    // ENDPOINT →→ AUTHENTICATION
    // Obtiene el token -- http://localhost:8000/api/auth/token
    getAuthToken(credentials, authType){
        const data = {
            ...credentials, 
            authType
        }
        return api.post('/auth/token/', data)
    },
    // Refresca el token -- http://localhost:8000/api/auth/refresh
    refreshAuthToken(credentials){
        return api.post('/auth/token/refresh/', credentials)
    },
    socialAuth(code){
        return api.post('/auth/callback', { code: code })
    },
    /* ==================================================================================================================== */
    /* ==================================================================================================================== */
    // ENDPOINT →→ CRUD FORREST SPECIES
    // Lista todas las especies registradas -- http://localhost:8000/api/species/
    getSpecies(){
        return api.get('/species/') 
    },
    // Crea una especie -- http://localhost:8000/api/species/ + data
    addForestSpecies(data){
        return api.post(`/species/`, data) 
    },
    // Actualiza una especie -- http://localhost:8000/api/species/params_id/ + data
    updateForestSpecies(sid, data){
        return api.put(`/species/${sid}`, data) 
    },
    // Elimina una especie -- http://localhost:8000/api/species/params_id/
    deleteSpecies(pk){
        return api.delete(`/species/${pk}`) 
    },
    // MORE FORREST SPECIES
    // Busca una especie por su código -- http://localhost:8000/api/species/code/789
    lookSpecie(code){
        return api.get(`/species/search/code/${code}`) 
    },
    // SUGGERTS OR FILTERS
    // Validar y eliminar -- http://localhost:8000/api/species/family/filter
    getFamilies(){
        return api.get('/species/family/filter')
    },
    getFamiliesData(){
        return api.get('/species/families')
    },
    // # Busca una especie por su nombre científico -- http://localhost:8000/api/species/search/scientific_name/Bauhinia%20tarapotensis%20Benth.
    lookScientificName(scientific_name){
        return api.get(`/species/search/scientific_name/${scientific_name}`) 
    },
    // Retorna las especies buscadas por su nombre de familia -- http://localhost:8000/api/species/search/family/BIGNONIACEAE
    lookFamily(n_familia){
        return api.get(`/species/search/family/${n_familia}`)
    },
    // Exporta en PDF el perfil de la especie forestal -- http://localhost:8000/api/species/perfil/export/789
    getDownloadDataSpecie(code){
        return api.get(`/species/profile/export/${code}`)
    },
    // Retorna la cantidad realizada de monitoreos, muestras y evaluaciones -- http://localhost:8000/api/species/report/general
    getSpeciesData(){
        return api.get('/species/report/general')
    },
    // Busca y retorn los individuos evaluados de cada especie en base a su nombre común -- http://localhost:8000/api/species/candidates/search/name_specie
    lookCandidateSpecie(nombre_comun){
        return api.get(`/species/candidates/search/${nombre_comun}`)
    },


    /* ==================================================================================================================== */
    /* ==================================================================================================================== */
    // ENDPOINT →→ CANDIDATES TREES
    // Retorna los individuos con sus coordenadas y datos de ubicación -- http://localhost:8000/api/candidates/geolocation
    getGeoCandidateTrees(){
        return api.get('/candidates/geolocation')
    },
    //Retorna datos de altura total, comercial, cobertura, altitud para promedios -- http://localhost:8000/api/candidates/average
    getAverageCandidateTrees(){
        return api.get('/candidates/average')
    },
    // (PROTECT) Lista los individuos evaluados totales -- http://localhost:8000/api/candidates/trees
    getAssessmentData(){
        const store = useAuthTokenStore();
        return api.get('/candidates/trees', {
            headers: {
                Authorization: `Bearer ${store.accessToken}`
            }
        })
    },
    addCandidate(data){
        return api.post(`/candidates/trees`, data) 
    },
    // (PROTECT) Exporta en excel los individuos evaluados totales -- http://localhost:8000/api/candidates/export/all
    candidateExportXLSX(){
        const store = useAuthTokenStore();
        return api.get('/candidates/export/all', {
            headers: {
                Authorization: `Bearer ${store.accessToken}`
            }
        })
    },
    /* ==================================================================================================================== */
    /* ==================================================================================================================== */
    // ENDPOINT →→ MONITORING
    // (PROTECT) Retorna la cantidad mensual de monitoreos realizados, pendientes y total -- http://localhost:8000/api/monitoring/report/month
    lookMonitoringMonth(){
        const store = useAuthTokenStore();
        return api.get(`monitoring/report/month`, {
            headers: {
                Authorization: `Bearer ${store.accessToken}`
            }
        })
    },
    // (PROTECT) Retorna la cantidad mensual de monitoreos realizados, pendientes y total por municipios -- http://localhost:8000/api/monitoring/report/month/locates
    getValuesByDepartmentLocates(){
        const store = useAuthTokenStore();
        return api.get('/monitoring/report/month/locates', {
            headers: {
                Authorization: `Bearer ${store.accessToken}`
            }
        })
    },
    // (PROTECT) Retorna la cantidad mensual de monitoreos realizados, pendientes y total por municipios -- http://localhost:8000/api/monitoring/report/general/total
    getValuesByDepartment(){
        const store = useAuthTokenStore();
        return api.get('/monitoring/report/general/total', {
            headers: {
                Authorization: `Bearer ${store.accessToken}`
            }
        })
    },
    // (PROTECT) Retorna la cantidad mensual de monitoreos realizados, pendientes y total por municipios -- http://localhost:8000/api/monitoring/data
    getMonitoringData(){
        const store = useAuthTokenStore();
        return api.get('/monitoring/report/data', {
            headers: {
                Authorization: `Bearer ${store.accessToken}`
            }
        })
    },
    // Retorna el listado de monitoreos del individuo consultado -- http://localhost:8000/api/monitoring/search/code
    lookMonitoringCandidate(id){
        return api.get(`/monitoring/candidate/search/${id}`)
    },
    // Retorna el listado de monitoreos por la especie consultada -- http://localhost:8000/api/monitoring/specie/search/code_especie
    lookMonitoringSpecie(cod_especie){
        return api.get(`/monitoring/specie/search/${cod_especie}`)
    },
    /* ==================================================================================================================== */
    /* ==================================================================================================================== */


    /* ==================================================================================================================== */
    /* ==================================================================================================================== */
    // ENDPOINT →→ GLOSSARY
    // Retorna el listado de palabras con su significado
    getGlossary(){
        return api.get(`/glossary`)
    },
    /* ==================================================================================================================== */
    /* ==================================================================================================================== */
    // ENDPOINT →→ PAGE
    // CRUD para listar el contenido de la página
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
    pagesGet(){
        return api.get(`/page`)
    },
    pagesUpdate(pid){
        return api.put(`/page/${pid}`)
    },
    pagesCreate(data){
        return api.post(`/page`, data)
    },
    pagesDelete(pid){
        return api.delete(`/page/${pid}`)
    },
    sectionGet(){
        return api.get(`/page/section`)
    },
    sectionUpdate(pid, data){
        return api.put(`/page/section/${pid}`, data)
    },
    sectionCreate(data){
        return api.post(`/page/section`, data)
    },
    sectionDelete(pid){
        return api.delete(`/page/section/${pid}`)
    },
    /* ==================================================================================================================== */
    /* ==================================================================================================================== */
    // ENDPOINT →→ SAMPLES
    // (PROTECT) Exporta todas las muestras registradas -- http://localhost:8000/api/samples/report/data
    getSamplesData(){
        const store = useAuthTokenStore();
        return api.get('/samples/report/data', {
            headers: {
                Authorization: `Bearer ${store.accessToken}`
            }
        })
    },
    // Retorna el total de muestras por municipio -- http://localhost:8000/api/samples/report/general
    getSamplesReport(){
        return api.get('/samples/report/general')
    },
    /* ==================================================================================================================== */
    /* ==================================================================================================================== */
    // ENDPOINT →→ USERS
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
    // Retorna los permisos del usuario -- http://localhost:8000/api/users/modules
    modulesUser(){ 
        const store = useAuthTokenStore();
        return api.get(`/users/modules`, {
            headers: {
                Authorization: `Bearer ${store.accessToken}`
            }
    }) 
    },
    /* ==================================================================================================================== */
    /* ==================================================================================================================== */
    // ENDPOINT →→ OTHERS
    stateUsers(uid, state){
        return api.put(`/users/state/${uid}`, state)
    },
    getDepartments(){
        return api.get('/departments/')
    },
    getCities(){
        return api.get(`/cities/`)
    },
}