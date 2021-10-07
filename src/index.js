import "./style.css"
import "bootstrap/dist/css/bootstrap.css"
import "./jokeFacade"
import jokeFacade from "./jokeFacade"
import personFacade from ".personFacade"

document.getElementById("all-content").style.display = "block"

/* 
  Add your JavaScript for all exercises Below or in separate js-files, which you must the import above
*/

/* JS For Firstpage - classdiagram */


/* JS For Links */



/* JS Person */
getAllPersons()
document.getElementById("getPersonByIdButton").addEventListener("click", event => getPerson())

/* Finder alle personer*/
function getAllPersons(){
  personFacade.getAll().then(persons =>showPersons(persons))
}

function showPersons(persons){
  const personsToHTML = persons.map(persons =>
    `<tr>
    <td>{person.id}</td>
    <td>{person.firstname}</td>
    <td>{person.lastname}</td>
    <td>{person.email}</td>
  </tr>`
    )
    document.getElementById("allPersonsRows").innerHTML = personsToHTML.join("")
}

/* Finder en bestemt person */
function getPerson(){
  const userID = document.getElementById("getPersonByIdtext").value
  personFacade.getPerson(userID).then(person =>{
    document.getElementById("getPersonByIdDiv").innerHTML =
    `<h5 style = "margin-top:20px">Her er personen</h5>
    <table>
      <tr><td>Id:</td><td>${person.id}</td></tr>
      <tr><td>Fornavn:</td><td>${person.firstname}</td></tr>
      <tr><td>Efternavn:</td><td>${person.lastname}</td></tr>
      <tr><td>Email:</td><td>${person.email}</td></tr>
    </table>`
  })
  .catch(error => errorHandling)
}

function errorHandling(err){
  if (err.status){
    err.fullError.then(e => {
      $("#errorMessage").text(e.msg);
      $("#errorModal").modal();
    })
  }
  else{
    $("#errorMessage").text("Network error. The user API is not responding.");
    $("#errorModal").modal();
  }
}

/* 
Do NOT focus on the code below, UNLESS you want to use this code for something different than
the Period2-week2-day3 Exercises
*/

function hideAllShowOne(idToShow) {
  document.getElementById("about_html").style = "display:none"
  document.getElementById("classdiagram").style = "display:none"
  document.getElementById("ex2_html").style = "display:none"
  document.getElementById("persons").style = "display:none"
  document.getElementById(idToShow).style = "display:block"
}

function menuItemClicked(evt) {
  const id = evt.target.id;
  switch (id) {
    case "classdiagram": hideAllShowOne("classdiagram"); break
    case "ex2": hideAllShowOne("ex2_html"); break
    case "persons": hideAllShowOne("persons"); break
    default: hideAllShowOne("about_html"); break
  }
  evt.preventDefault();
}
document.getElementById("menu").onclick = menuItemClicked;
hideAllShowOne("about_html");



