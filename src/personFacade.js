const URL = 'https://www.test.juliusmadsen.dk/devops-starter/api/person';



function getPerson(id){
    return fetch(URL + '/' + id).then(result => handleHttpErrors(result))
}

function getAll(){
    return fetch(URL + '/all').then(result => handleHttpErrors(result) )
}

function createPerson(){

}

function editPersonNames(){

}

const personFacade = {
    getPerson,
    getAll,
}

function makeOptions(method, body) {
    var opts = {
        method: method,
        headers: {
            "Content-type": "application/json",
            "Accept": "application/json"
        }
    }
    if (body) {
        opts.body = JSON.stringify(body);
    }
    return opts;
}

function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({ status: res.status, fullError: res.json() })
    }
    return res.json();
}

export default personFacade;