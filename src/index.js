import "./style.css"
import "bootstrap/dist/css/bootstrap.css"
import * as bootstrap from 'bootstrap';
import '@popperjs/core';
import $ from 'jquery';
import personFacade from "./personFacade";

document.getElementById("all-content").style.display = "block"

/* 
  Add your JavaScript for all exercises Below or in separate js-files, which you must the import above
*/

/* JS For Firstpage - classdiagram */


/* JS For Links */



/* JS Person */
//henter alle personer
const dmTable = document.querySelector('#allPersonsRows')
personFacade.getAll(dmTable)
//henter personen frem
document.getElementById("getPersonByIdButton").addEventListener("click", event => getPerson())
//laver en person
document.getElementById("addAPersonButton").addEventListener("click", event => createPerson())
//sletter en person
document.getElementById("deletePersonByIdButton").addEventListener("click", event =>deletePersonById())
//redigere en person
document.getElementById("editPersonButton").addEventListener("click", event => editPerson())
//billeder
//document.getElementById("ex1_html").addEventListener("mousemove", event =>personFacade.picture())




/* Finder en bestemt person */
function getPerson(){
  const personID = document.getElementById("getPersonByIdText").value
  personFacade.getPerson(personID).then(person =>{
    document.getElementById("getPersonByIdDiv").innerHTML =
    `<h5 style = "margin-top:20px">Her er personen</h5>
    <table>
      <tr><td>Id:</td><td>${person.id}</td></tr>
      <tr><td>Fornavn:</td><td>${person.firstName}</td></tr>
      <tr><td>Efternavn:</td><td>${person.lastName}</td></tr>
      <tr><td>Email:</td><td>${person.email}</td></tr>
      <tr><td>Telefon nummer:</td><td>${person.phones[0].number}</td></tr>
      <tr><td>Telefon beskrivelse:</td><td>${person.phones[0].description}</td></tr>
      <tr><td>Adresse</td>:</td><td>${person.address.street}</td></tr>
      <tr><td>Mere info:</td><td>${person.address.addInfo}</td></tr>
      <tr><td>By:</td><td>${person.address.cityInfo.city}</td></tr>
      <tr><td>Postnummer:</td><td>${person.address.cityInfo.zipCode}</td></tr>
      <tr><td>Hobby navn:</td><td>${person.hobbies[0].name}</td></tr>
      <tr><td>Hobby link:</td><td>${person.hobbies[0].wikiLink}</td></tr>
      <tr><td>Hobby kategori:</td><td>${person.hobbies[0].category}</td></tr>
      <tr><td>Hobby type:</td><td>${person.hobbies[0].type}</td></tr>
    </table>`
    console.log(person)
  })
  .catch(error => errorHandling(error))
}

/* Create person */
function createPerson() {
  const firstName = document.getElementById("personFirstName").value;
  const lastName = document.getElementById("personLastName").value;
  const email = document.getElementById("personEmail").value;
  const hobbyName = document.getElementById("personHobbyName").value;
  const hobbyWikiLink = document.getElementById("personHobbyWikilink").value;
  const hobbyCategory = document.getElementById("personHobbyCategory").value;
  const hobbyType = document.getElementById("personHobbyType").value;
  const phones = document.getElementById("personPhone").value;
  const phonesdes = document.getElementById("personPhoneDes").value;
  const street = document.getElementById("personStreet").value;
  const addInfo = document.getElementById("personAddInfo").value;
  const city = document.getElementById("personCity").value;
  const zipCode = document.getElementById("personzip").value;

  const hobby = {
    "name": hobbyName,
    "wikiLink": hobbyWikiLink,
    "category": hobbyCategory,
    "type": hobbyType,
  }
  const hobbies =[
      hobby
  ]
  const phone = {
    "number": phones,
    "description": phonesdes
  }
  const phoneList = [
    phone
  ]
  const cityInfo = {
    "zipCode": zipCode,
    "city": city,
  }
  const address = {
    "street": street,
    "addInfo": addInfo,
    "cityInfo": cityInfo,
  }
  const person = {
    "firstName": firstName,
    "lastName": lastName,
    "email": email,
    "hobby": hobbies,
    "phone": phoneList,
    "address": address

  }
  console.log(JSON.stringify(person));
  personFacade.createPerson(person)
}

/* Edit person*/
function editPerson(){
  const personID = document.getElementById("editPersonId").value
  const firstName = document.getElementById("editPersonFirstName").value;
  const lastName = document.getElementById("editPersonLastName").value;
  const person = {
    "id": personID,
    "firstName": firstName,
    "lastName":lastName
  }
  console.log(person)
  personFacade.editPersonNames(id,person)
}

/* Delete person */
function deletePersonById(){
  const personID = document.getElementById("deletePersonByIdText").value
  personFacade.deletePerson(personID).then(person =>{
    document.getElementById("getPersonByIdDiv").innerHTML = `
    <h5 style = "margin-top:20px">>Den person der er blevet slettet</h5>
      <table>
        <tr><td>Id:</td><td>${person.id}</td></tr>
        <tr><td>Fornavn:</td><td>${person.firstName}</td></tr>
        <tr><td>Efternavn:</td><td>${person.lastName}</td></tr>
        <tr><td>Email:</td><td>${person.email}</td></tr>
      </table>
    `
    console.log(person)
  })
  .catch(error => errorHandling(error))
}


function errorHandling(err){
  if (err.status){
    err.fullError.then(e => {
      $("#errorMessage").text(e.msg);
    })
  }
  else{
    $("#errorMessage").text("Network error. The user API is not responding.");
  }
}
function pictureInsert(){

}


/* 
Do NOT focus on the code below, UNLESS you want to use this code for something different than
the Period2-week2-day3 Exercises
*/

function hideAllShowOne(idToShow) {
  document.getElementById("about_html").style = "display:none"
  document.getElementById("ex1_html").style = "display:none"
  document.getElementById("ex2_html").style = "display:none"
  document.getElementById("ex3_html").style = "display:none"
  document.getElementById(idToShow).style = "display:block"
}

function menuItemClicked(evt) {
  const id = evt.target.id;
  switch (id) {
    case "ex1": hideAllShowOne("ex1_html"); break
    case "ex2": hideAllShowOne("ex2_html"); break
    case "ex3": hideAllShowOne("ex3_html"); break
    default: hideAllShowOne("about_html"); break
  }
  evt.preventDefault();
}
document.getElementById("menu").onclick = menuItemClicked;
hideAllShowOne("about_html");



