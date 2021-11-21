
import http from './http.js'

export const VersionService = {
    GetVersionList(param) {
       return http('get', '/Version/GetVersionList', param);
    },

    GetProjetList(param) {
        return http('get', '/Version/GetProjetList', param);
     },
     GetEnvironmentList(){
        return http('get', '/Version/GetEnvironmentList', null);
     },
    CreateProjet(param) {
        return http('post', '/Version/CreateProjet', param);
    },
    CreateVersion(param) {
        return http('post', '/Version/CreateVersion', param);
    },
    CreateProjetEnvironment(param) {
        return http('post', '/Version/CreateProjetEnvironment', param);
    }
}

export default VersionService;