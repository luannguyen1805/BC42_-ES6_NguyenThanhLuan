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

// Add Student 
window.createStudent = () => {
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
    setLocalStorage();
    renderPerson(personList);
}
getElement("#btnAddStudent").onclick = () => {
    getElement("#studentId").disabled = false;
    getElement(".label-student").innerHTML = "ADD STUDENT";
    getElement("#modal-footer-S").innerHTML = `
  <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="createStudent()">Thêm</button>
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
  `;
}

// Add Employee 
window.createEmployee = () => {
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
getElement("#btnAddEmployee").onclick = () => {
    getElement("#employeeId").disabled = false;
    getElement(".label-employee").innerHTML = "ADD EMPLOYEE";
    getElement("#modal-footer-E").innerHTML = `
  <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="createEmployee()">Thêm</button>
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
  `;
}

// Add Customer
window.createCustomer = () => {
    let id = getElement("#customerId").value;
    let name = getElement("#customerName").value;
    let address = getElement("#customerAddress").value;
    let email = getElement("#customerEmail").value;
    let company = getElement("#company").value;
    let bill = getElement("#billValue").value;
    let rate = getElement("#inputRate").value;
    switch (rate) {
        case 'Good': {
            rate = "Good";
        }
            break;
        case 'Bad': {
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
getElement("#btnAddCustomer").onclick = () => {
    getElement("#customerId").disabled = false;
    getElement(".label-customer").innerHTML = "ADD CUSTOMER";
    getElement("#modal-footer-C").innerHTML = `
  <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="createCustomer()">Thêm</button>
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
  `;
}

// Delete học viên
window.deletePerson = (personId) => {
    personList = personList.filter((person) => {
        return person.id !== personId;
    });
    setLocalStorage();
    renderPerson(personList);
}

// Edit Học viên
window.editPerson = (personId) => {
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
            getElement("#studentId").disabled = true;
            getElement(".label-student").innerHTML = "EDIT STUDENT";
            getElement("#modal-footer-S").innerHTML = `
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="updateStudent('${person.id}')">Cập nhật</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
      `;
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
            getElement("#employeeId").disabled = true;
            getElement(".label-employee").innerHTML = "EDIT EMPLOYEE";
            getElement("#modal-footer-E").innerHTML = `
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="updateEmployee('${person.id}')">Cập nhật</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
          `;
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
            getElement("#customerId").disabled = true;
            getElement(".label-customer").innerHTML = "EDIT CUSTOMER";
            getElement("#modal-footer-C").innerHTML = `
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick="updateCustomer('${person.id}')">Cập nhật</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
          `;
            $("#exampleModalCustomer").modal("show");
        }
            break;
    }
}

window.updateStudent = (personId) => {
    let id = getElement("#studentId").value;
    let name = getElement("#studentName").value;
    let address = getElement("#studentAddress").value;
    let email = getElement("#studentEmail").value;
    let math = getElement("#math").value;
    let physics = getElement("#physics").value;
    let chemistry = getElement("#chemistry").value;
    const student = new Student(id, name, address, email, math, physics, chemistry);
    let index = personList.findIndex((student) => {
        return student.id === id;
    });
    personList[index] = student;
    renderPerson(personList);
    setLocalStorage();
    resetStudent();
}

window.updateEmployee = (personId) => {
    let id = getElement("#employeeId").value;
    let name = getElement("#employeeName").value;
    let address = getElement("#employeeAddress").value;
    let email = getElement("#employeeEmail").value;
    let days = getElement("#days").value;
    let salaryUnit = getElement("#salaryUnit").value;
    const employee = new Employee(id, name, address, email, days, salaryUnit);
    let index = personList.findIndex((employee) => {
        return employee.id === id;
    });
    personList[index] = employee;
    renderPerson(personList);
    setLocalStorage();
    resetEmployee()
}

window.updateCustomer = (personId) => {
    let id = getElement("#customerId").value;
    let name = getElement("#customerName").value;
    let address = getElement("#customerAddress").value;
    let email = getElement("#customerEmail").value;
    let company = getElement("#company").value;
    let bill = getElement("#billValue").value;
    let rate = getElement("#inputRate").value;
    switch (rate) {
        case 'Good': {
            rate = "Good";
        }
            break;
        case 'Bad': {
            rate = "Bad";
        }
            break;
        default: {
            rate = "Choose";
        }
    }
    const customer = new Customer(id, name, address, email, company, bill, rate);
    let index = personList.findIndex((customer) => {
        return customer.id === id;
    });
    personList[index] = customer;
    renderPerson(personList);
    setLocalStorage();
    resetCustomer()
}

// Lọc DS Học viên theo loại
getElement("#typePerson").onchange = sortPersonList;
function sortPersonList() {
    let typePerson = getElement("#typePerson").value;
    let tempList;
    switch (typePerson) {
        case '1': {
            tempList = personList.filter(person => person.constructor.name === "Student");
        }
            break;
        case '2': {
            tempList = personList.filter(person => person.constructor.name === "Employee");
        }
            break;
        case '3': {
            tempList = personList.filter(person => person.constructor.name === "Customer");
        }
            break;
        default: {
            tempList = personList;
        }
    }
    renderPerson(tempList);
}

// Sắp xếp theo tên học viên
getElement("#arrangeName").onchange = arrangeName;
function arrangeName() {
    let tempList;
    let arrange = getElement("#arrangeName").value;
    if (arrange) {
        tempList = personList.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            } else { 
                return 1;
            }

        })
    }
    renderPerson(tempList);
}

// Show chi tiết Học viên
window.showInfo = (personId) => {
    let person = personList.find(person => person.id === personId);
    getElement("#detailsTitle").innerHTML = person.constructor.name;
    let html = `
    <label class='fw-bold'>ID: </label>
    <span>${person.id}</span><br>
    <label class='fw-bold'>Name: </label>
    <span>${person.name}</span><br>
    <label class='fw-bold'>Address: </label>
    <span>${person.address}</span><br>
    <label class='fw-bold'>Email: </label>
    <span>${person.email}</span><br>
    `;
    switch(person.constructor.name){
        case 'Student': {
            html += `
            <label class='fw-bold'>Math: </label>
            <span>${person.math}</span><br>
            <label class='fw-bold'>Physics: </label>
            <span>${person.physics}</span><br>
            <label class='fw-bold'>Chemistry: </label>
            <span>${person.chemistry}</span><br>
            <label class='fw-bold'>Average score: </label>
            <span>${person.calcAveScore()}</span>
            `
        }
        break;
        case 'Employee': {
            html += `
            <label class='fw-bold'>Working day: </label>
            <span>${person.days}</span><br>
            <label class='fw-bold'>Salary day: </label>
            <span>${new Intl.NumberFormat('vn-VN').format(person.salaryUnit)}VND</span><br>
            <label class='fw-bold'>Total salary: </label>
            <span>${new Intl.NumberFormat('vn-VN').format(person.calcSalary())}VND</span>
            `
        }
        break;
        case 'Customer': {
            html += `
            <label class='fw-bold'>Name of company: </label>
            <span>${person.company}</span><br>
            <label class='fw-bold'>Bill: </label>
            <span>${person.bill}</span><br>
            <label class='fw-bold'>Feedback: </label>
            <span>${person.rate}</span>
            `
        }
    }
    getElement('#detailsBody').innerHTML = html;
}

// Reset Học viên
function resetStudent() {
    getElement("#studentId").value = "";
    getElement("#studentName").value = "";
    getElement("#studentAddress").value = "";
    getElement("#studentEmail").value = "";
    getElement("#math").value = "";
    getElement("#physics").value = "";
    getElement("#chemistry").value = "";
}

function resetEmployee() {
    getElement("#employeeId").value = "";
    getElement("#employeeName").value = "";
    getElement("#employeeAddress").value = "";
    getElement("#employeeEmail").value = "";
    getElement("#days").value = "";
    getElement("#salaryUnit").value = "";
}

function resetCustomer() {
    getElement("#customerId").value = "";
    getElement("#customerName").value = "";
    getElement("#customerAddress").value = "";
    getElement("#customerEmail").value = "";
    getElement("#company").value = "";
    getElement("#billValue").value = "";
    getElement("#inputRate").value = "";
}

// Render
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
            <button type="button" class="btn btn-success" onclick="editPerson('${person.id}')">Edit</button>
            <button class='btn btn-danger' onclick="deletePerson('${person.id}')">Delete</button>
            <button class='btn btn-warning' onclick="showInfo('${person.id}')" data-bs-toggle="modal" data-bs-target="#detailsModal">Show Info</button>
        </td>
    </tr>
        `
        );
    }, "");
    getElement('#tableList').innerHTML = html;
}

// Validation

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
                person[i] = new Customer(person.id, person.name, person.address, person.email, person.company, person.bill, person.rate);
                break;
            default: break;
        }
        personList[i] = person[i];
    }
    return personList;
}



