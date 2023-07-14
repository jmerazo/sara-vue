import api from '../api/axios';

export default {
    getSpecies(){
        return api.get('/especie_forestal')
    },
    lookSpecie(nombre_comun){
        return api.get(`/especie_forestal/search/nombre_comun/${nombre_comun}`)
    },
}