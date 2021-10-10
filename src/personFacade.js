
const URL = 'https://www.test.juliusmadsen.dk/devops-starter/api/person';

function URLfunction(){
    fetch(URL)
        .then(handleHttpErrors)
        .then(data => console.log(data.name))
        .catch(error =>{
            if(error.status){
                error.fullError.then(e=> console.log(e.msg))
            }
            else{
                console.log("Network Error")
            }
        });
}
function getStatus() {
    return fetch(URL + "/status")
        .then(res => handleHttpErrors(res))
}

function getPerson(id){
    return fetch(URL + '/' + id).
    then(result => handleHttpErrors(result))
}

function getAll(DOMElement){
    return fetch('https://www.test.juliusmadsen.dk/devops-starter/api/person/all')
        .then(function (response){
            return response.json();
        })
        .then(function (data) {
            console.log(data.all)
            const all = data.all
            const personsListTable = document.querySelector('#personlist')
            //const tableTbody = document.querySelector('#allPersonsRows')
            for (let persons of all) {
                let tr = DOMElement.insertRow(0);
                let cell1 =tr.insertCell(0)
                    let cell2 =tr.insertCell(1)
                    let cell3 =tr.insertCell(2)
                    let cell4 =tr.insertCell(3)
                    let cell5 =tr.insertCell(4)
                    let cell6 =tr.insertCell(5)
                    let cell7 = tr.insertCell(6)
                    let cell8 =tr.insertCell(7)
                    let cell9 =tr.insertCell(8)
                    let cell10 =tr.insertCell(9)
                    let cell11 = tr.insertCell(10)
                    cell1.innerHTML = persons.id;
                    cell2.innerHTML = persons.firstName;
                    cell3.innerHTML = persons.lastName;
                    cell4.innerHTML = persons.email;
                    cell5.innerHTML = persons.hobbies[0].name;
                    cell6.innerHTML = persons.phones[0].number;
                    cell7.innerHTML = persons.phones.description;
                    cell8.innerHTML = persons.address.street;
                    cell9.innerHTML = persons.address.addInfo;
                    cell10.innerHTML = persons.address.cityInfo.city;
                    cell11.innerHTML = persons.address.cityInfo.zipCode;
            }
        })
}

function createPerson(person){
    const options = makeOptions('POST', person)
    return fetch(URL+'/create', options).then(result => handleHttpErrors(result))
}

function editPersonNames(id, person){
    const options = makeOptions('PUT', person)
    return fetch(URL + '/update/' + id, options)
        .then (result => handleHttpErrors(result))
}

function deletePerson(id){
    const options = makeOptions('DELETE', {id})
    return fetch(URL + '/delete/' + id, options).then(result => handleHttpErrors(result))
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

function picture(){
    let img = document.createElement('img')
    img.src = "CA1 Class Diagram (1).png";
    let src = document.getElementById("picture");
    src.appendChild(img)
}

const personFacade = {
    getStatus,
    getPerson,
    getAll,
    createPerson,
    editPersonNames,
    deletePerson,
    picture
}
export default personFacade;