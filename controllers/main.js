// import { getProduct } from "../services/API.js";
import { Student } from "../models/Student.js";
import { Employee } from "../models/Employee.js";
import { Customer } from "../models/Customer.js";

let personList = getLocalStorage();
renderPerson(personList);

// DOM
function getElement(id) {
    return document.getElementById(id);
}
// const person = new Student("01","a","d","c@mail.com", 1, 3,4);
// const calc = person.calcAveScore();
// console.log(person);
// console.log(calc);

getElement("btnAddStudent").onclick = () => {
    let studentId = getElement("studentId").value;
    let studentName = getElement("studentName").value;
    let studentAddress = getElement("studentAddress").value;
    let studentEmail = getElement("studentEmail").value;
    let math = getElement("math").value;
    let physics = getElement("physics").value;
    let chemistry = getElement("chemistry").value;
    const student = new Student(studentId, studentName, studentAddress, studentEmail, math, physics, chemistry);
    let index = personList.findIndex(person => person.id === studentId);
    if (index === -1) {
        personList.push(student);
    } else {
        personList[index] = student;
    }
    setLocalStorage();
    renderPerson(personList);

}

getElement("btnAddEmployee").onclick = () => {
    let employeeId = getElement("employeeId").value;
    let employeeName = getElement("employeeName").value;
    let employeeAddress = getElement("employeeAddress").value;
    let employeeEmail = getElement("employeeEmail").value;
    let days = getElement("days").value;
    let salaryUnit = getElement("salaryUnit").value;
    const employee = new Employee(employeeId, employeeName, employeeAddress, employeeEmail, days, salaryUnit);
    let index = personList.findIndex(person => person.id === employeeId)
    if (index === -1) {
        personList.push(employee);
    } else {
        personList[index] = employee;
    }
    setLocalStorage();
    renderPerson(personList);
}

getElement("btnAddCustomer").onclick = () => {
    let customerId = getElement("customerId").value;
    let customerName = getElement("customerName").value;
    let customerAddress = getElement("customerAddress").value;
    let customerEmail = getElement("customerEmail").value;
    let company = getElement("company").value;
    let billValue = getElement("billValue").value;
    let inputRate = getElement("inputRate").value;
    switch (inputRate) {
        case '1': {
            inputRate = "Good";
        }
            break;
        case '2': {
            inputRate = "Bad";
        }
            break;
        default: {
            inputRate = "Choose";
        }
    }
    const customer = new Customer(customerId, customerName, customerAddress, customerEmail, company, billValue, inputRate);
    let index = personList.findIndex(person => person.id === customerId)
    if (index === -1) {
        personList.push(customer);
    } else {
        personList[index] = customer;
    }
    setLocalStorage();
}
renderPerson(personList);



function removePerson(personID) {
    let personList = personList.findIndex(person => person.id === personID);
    personList.splice(index, 1);
    setLocalStorage();
    renderTable(personList);
}

function setLocalStorage() {
    const list = [...personList];
    list.forEach((person) => {
        person['type'] = person.constructor.name;
    })
    const json = JSON.stringify(personList);
    localStorage.setItem('personList', json);
}

function getLocalStorage() {
    const json = localStorage.getItem('personList');
    if (!json) {
        return [];
    };
    const personList = JSON.parse(json);
    for (let i = 0; i < personList.length; i++) {
        const person = personList[i];
        person[i] = new Student(person.studentId, person.studentName, person.studentAddress, person.studentEmail, person.math, person.physics, person.chemistry);
        person[i] = new Employee(person.employeeId, person.employeeName, person.employeeAddress, person.employeeEmail, person.days, person.salaryUnit);
        person[i] = new Customer(person.customerId, person.customerName, person.customerAddress, person.customerEmail, person.company, person.billValue, person.inputRate);
        personList[i] = person;
    }
    return personList;
}

function renderPerson(personList) {
    let html = personList.reduce((result, person) => {
        return (result += `
        <tr>
        <td>${person.id}</td>
        <td>${person.name}</td>
        <td>${person.address}</td>
        <td>${person.email}</td>
        <td>${person.constructor.name}</td>        
        <td>
            <button class='btn btn-primary' onclick="showDetails('${person.id}')" data-bs-toggle="modal" data-bs-target="#detailsModal">Show details</button>
            <button class='btn btn-secondary' data-bs-toggle="modal" data-bs-target="#inputPersonModal" onclick="editPerson('${person.id}')">Edit</button>
            <button class='btn btn-danger' onclick="removePerson('${person.id}')">Remove</button>
        </td>
    </tr>
        `
        );
    }, "");
    getElement('tableList').innerHTML = html;
}
