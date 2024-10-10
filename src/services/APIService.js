import api from '../api/axios';

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
    getCsrfToken(){
        return api.get('/utils//get-csrf-token/')
    },
    // Refresca el token -- http://localhost:8000/api/auth/refresh
    refreshAuthToken(credentials){
        return api.post('/auth/token/refresh/', credentials)
    },
    socialAuth(code){
        return api.post('/auth/callback', { code: code })
    },
    loginFirebase(token, recaptchaToken) {
        return api.post('/auth/login', { token, recaptcha_token: recaptchaToken })
    },
    getRoles(){
        return api.get('/users/roles/')
    },
    verifyTokenAuth(token){
        return api.post('/auth/verify-token', {token})
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
        return api.get('/species/families/')
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
        return api.get('/candidates/trees')
    },
    addCandidate(data){
        return api.post(`/candidates/trees`, data) 
    },
    // (PROTECT) Exporta en excel los individuos evaluados totales -- http://localhost:8000/api/candidates/export/all
    candidateExportXLSX(){
        return api.get('/candidates/export/all')
    },
    /* ==================================================================================================================== */
    /* ==================================================================================================================== */
    // ENDPOINT →→ MONITORING
    // (PROTECT) Retorna la cantidad mensual de monitoreos realizados, pendientes y total por municipios -- http://localhost:8000/api/monitoring/data
    getMonitoringData(){
        return api.get('/monitoring/report/data')
    },
    
    // (PROTECT) Retorna la cantidad mensual de monitoreos realizados, pendientes y total por municipios -- http://localhost:8000/api/monitoring/report/general/total
    getValuesByDepartment(){
        return api.get('/monitoring/report/general/total')
    },
    
    // Retorna el listado de monitoreos del individuo consultado -- http://localhost:8000/api/monitoring/search/code
    lookMonitoringCandidate(id){
        return api.get(`/monitoring/candidate/search/${id}`)
    },
    // Retorna el listado de monitoreos por la especie consultada -- http://localhost:8000/api/monitoring/specie/search/code_especie
    lookMonitoringSpecie(cod_especie){
        return api.get(`/monitoring/specie/search/${cod_especie}`)
    },

    //Retorna ocurrencias de flor y frutos de cada mes
    getMonitoringCalendar(){
        return api.get('/monitoring/report/dataFlowerAndFruit')
    },

    //returns users monitoring
    getUsersMonitoring(){
        return api.get('/property/users/monitoring')
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
    pageTopSpecies(){
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
        return api.get('/samples/report/data')
    },
    
    /* ==================================================================================================================== */
    /* ==================================================================================================================== */
    // ENDPOINT →→ USERS
    getUsers(){
        return api.get('/users/')
    },
    createUsers(data, recaptcha_token){
        return api.post('/users/', data, recaptcha_token)
    },
    registerUser(data, recaptcha_token){
        return api.post('/users/register/', data, recaptcha_token)
    },
    updateUsers(uid, data){
        return api.put(`/users/${uid}`, data)
    },
    deleteUsers(uid){
        return api.delete(`/users/${uid}`)
    },
    // Retorna los permisos del usuario -- http://localhost:8000/api/users/modules
    modulesUser(email) {
        return api.get('/users/modules', { params: { email }});
    },
    usersValidate(){
        return api.get('/users/validate/')
    },
    usersValidateAccept(user_id, rol){
        return api.put(`/users/validate/${user_id}`, { rol })
    },
    usersValidateReject(user_id){
        return api.delete(`/users/validate/${user_id}`)
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
    getSisa(){
        return api.get(`/utils/sisa/`)
    },
    sendEmail(data){
        return api.post(`/utils/send-email/`, data)
    },
    sendContactEmail(data){
        return api.post(`/utils/contact/send-email/`, data)
    },
    /* ==================================================================================================================== */
    /* ==================================================================================================================== */
    // ENDPOINT →→ NURSERIES
    listNurseries(){
        return api.get('/nurseries/')
    },
    listNurseriesId(id){
        return api.get(`/nurseries/search/${id}`)
    },
    createNurseries(data){
        return api.post('/nurseries/', data)
    },
    updateNurseries(id, data){
        return api.put(`/nurseries/${id}`, data)
    },
    deleteNurseries(id){
        return api.delete(`/nurseries/${id}`)
    },
    listNurseriesAdmin(){
        return api.get('/nurseries/admin')
    },
    createNurseriesAssign(data){
        return api.post(`/nurseries/admin`, data)
    },
    updateNurseriesAssign(id, data){
        return api.put(`/nurseries/admin/${id}`, data)
    },
    deleteNurseriesAssign(id){
        return api.delete(`/nurseries/admin/${id}`)
    },
    /* ==================================================================================================================== */
    /* ==================================================================================================================== */
    // ENDPOINT →→ EMPIRICAL KNOWLEDGE
    getEmpiricalKnowledge(){
        return api.get('/empiricalknowledge')
    },
    /* ==================================================================================================================== */
    /* ==================================================================================================================== */
    // ENDPOINT →→ PROPERTY
    listProperty(){
        return api.get('/property')
    },
    listPropertyId(id){
        return api.get(`/property/search/${id}`)
    },
    createProperty(data){
        return api.post('/property/', data)
    },
    updateProperty(id, data){
        return api.put(`/property/${id}`, data)
    },
    deleteProperty(id){
        return api.delete(`/property/${id}`)
    },
    listUsersProperty(){
        return api.get('/property/users/')
    },
    listUserSpeciesId(id){
        return api.get(`/property/users/${id}`)
    },
    createUsersProperty(data){
        return api.post('/property/users', data)
    },
    updateUsersProperty(id, data){
        return api.put(`/property/users/${id}`, data)
    },
    deleteUsersProperty(id){
        return api.delete(`/property/users/${id}`)
    }
}