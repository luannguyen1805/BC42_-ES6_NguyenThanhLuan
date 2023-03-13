// import { getProduct } from "../services/API.js";
import { Student } from "../models/Student.js";
import { Employee } from "../models/Employee.js";
import { Customer } from "../models/Customer.js";

let personList = getLocalStorage();
renderPerson(personList);
// DOM
function getElement(selector) {
    return document.querySelector(selector);
}
// const person = new Student("01","a","d","c@mail.com", 1, 3,4);
// const calc = person.calcAveScore();
// console.log(person);
// console.log(calc);

// Add Student 
getElement("#btnAddStudent").onclick = () => {
    let id = getElement("#studentId").value;
    let name = getElement("#studentName").value;
    let address = getElement("#studentAddress").value;
    let email = getElement("#studentEmail").value;
    let math = getElement("#math").value;
    let physics = getElement("#physics").value;
    let chemistry = getElement("#chemistry").value;
    const student = new Student(id, name, address, email, math, physics, chemistry);
    let index = personList.findIndex(person => person.id === id);
    if (index === -1) {
        personList.push(student);
    } else {
        personList[index] = student;
    }
    getElement("#btnEditStudent").disabled = true;
    setLocalStorage();
    renderPerson(personList);
}

// Add Employee 
getElement("#btnAddEmployee").onclick = () => {
    let id = getElement("#employeeId").value;
    let name = getElement("#employeeName").value;
    let address = getElement("#employeeAddress").value;
    let email = getElement("#employeeEmail").value;
    let days = getElement("#days").value;
    let salaryUnit = getElement("#salaryUnit").value;
    const employee = new Employee(id, name, address, email, days, salaryUnit);
    let index = personList.findIndex(person => person.id === id)
    if (index === -1) {
        personList.push(employee);
    } else {
        personList[index] = employee;
    }
    setLocalStorage();
    renderPerson(personList);
}

// Add Customer
getElement("#btnAddCustomer").onclick = () => {
    let id = getElement("#customerId").value;
    let name = getElement("#customerName").value;
    let address = getElement("#customerAddress").value;
    let email = getElement("#customerEmail").value;
    let company = getElement("#company").value;
    let bill = getElement("#billValue").value;
    let rate = getElement("#inputRate").value;
    switch (rate) {
        case '1': {
            rate = "Good";
        }
            break;
        case '2': {
            rate = "Bad";
        }
            break;
        default: {
            rate = "Choose";
        }
    }
    const customer = new Customer(id, name, address, email, company, bill, rate);
    let index = personList.findIndex(person => person.id === id)
    if (index === -1) {
        personList.push(customer);
    } else {
        personList[index] = customer;
    }
    setLocalStorage();
    renderPerson(personList);
}

// Delete học viên
window.deletePerson = (personId) => {
    personList = personList.filter((person) => {
        return person.id !== personId;
    });
    setLocalStorage();
    renderPerson(personList);
}
// function deletePerson(personId) {
//     personList = personList.filter((person) => {
//         return person.id !== personId;
//     });
//     renderPerson(personList);
//     setLocalStorage();
// }

// Edit Học viên
// window.editPerson = (personId) => {
//     let person = personList.find(person => person.id === personId);
//     switch (person.constructor.name) {
//         case 'Student': {
//             getElement("#studentId").value = person.id;
//             getElement("#studentName").value = person.name;
//             getElement("#studentAddress").value = person.address;
//             getElement("#studentEmail").value = person.email;
//             getElement("#math").value = person.math;
//             getElement("#physics").value = person.physics;
//             getElement("#chemistry").value = person.chemistry;
//             $("#exampleModalStudent").modal("show");
            
//         }
//             break;
//         case 'Employee': {
//             getElement("#employeeId").value = person.id;
//             getElement("#employeeName").value = person.name;
//             getElement("#employeeAddress").value = person.address;
//             getElement("#employeeEmail").value = person.email;
//             getElement("#days").value = person.days;
//             getElement("#salaryUnit").value = person.salaryUnit;
//             $("#exampleModalEmployee").modal("show");

//         }
//             break;
//         case 'Customer': {
//             getElement("#customerId").value = person.id;
//             getElement("#customerName").value = person.name;
//             getElement("#customerAddress").value = person.address;
//             getElement("#customerEmail").value = person.email;
//             getElement("#company").value = person.company;
//             getElement("#billValue").value = person.bill;
//             getElement("#inputRate").value = person.rate;
//             $("#exampleModalCustomer").modal("show");
//         }
//             break;
//     }
// }

function editPerson(personId){
    let person = personList.find(person => person.id === personId);
    switch (person.constructor.name) {
        case 'Student': {
            getElement("#studentId").value = person.id;
            getElement("#studentName").value = person.name;
            getElement("#studentAddress").value = person.address;
            getElement("#studentEmail").value = person.email;
            getElement("#math").value = person.math;
            getElement("#physics").value = person.physics;
            getElement("#chemistry").value = person.chemistry;
            $("#exampleModalStudent").modal("show");        
        }
            break;
        case 'Employee': {
            getElement("#employeeId").value = person.id;
            getElement("#employeeName").value = person.name;
            getElement("#employeeAddress").value = person.address;
            getElement("#employeeEmail").value = person.email;
            getElement("#days").value = person.days;
            getElement("#salaryUnit").value = person.salaryUnit;
            $("#exampleModalEmployee").modal("show");
        }
            break;
        case 'Customer': {
            getElement("#customerId").value = person.id;
            getElement("#customerName").value = person.name;
            getElement("#customerAddress").value = person.address;
            getElement("#customerEmail").value = person.email;
            getElement("#company").value = person.company;
            getElement("#billValue").value = person.bill;
            getElement("#inputRate").value = person.rate;
            $("#exampleModalCustomer").modal("show");
        }
            break;}}
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
            <button class='btn btn-primary' onclick="showInfo('${person.id}')" data-bs-toggle="modal" data-bs-target="#detailsModal">Show Info</button>
            <button type="button" class="btn btn-primary" onclick="editPerson('${person.id}')">Edit</button>
            <button class='btn btn-danger' onclick="deletePerson('${person.id}')">Delete</button>
        </td>
    </tr>
        `
        );
    }, "");
    getElement('#tableList').innerHTML = html;
}



// Set local storage
function setLocalStorage() {
    const list = [...personList];
    list.forEach((person) => {
        person['type'] = person.constructor.name;
    })
    const json = JSON.stringify(personList);
    localStorage.setItem('personList', json);
}

// Get local storage
function getLocalStorage() {
    const json = localStorage.getItem('personList');
    if (!json) {
        return [];
    };
    const personList = JSON.parse(json);
    for (let i = 0; i < personList.length; i++) {
        const person = personList[i];
        switch (person.type) {
            case "Student":
                person[i] = new Student(person.id, person.name, person.address, person.email, person.math, person.physics, person.chemistry);
                break;
            case "Employee":
                person[i] = new Employee(person.id, person.name, person.address, person.email, person.days, person.salaryUnit);
                break;
            case "Customer":
                person[i] = new Customer(person.id, person.name, person.address, person.email, person.company, person.billValue, person.inputRate);
                break;
            default: break;
        }
        personList[i] = person[i];
    }
    return personList;
}



