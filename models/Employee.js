import Person from "../models/Person.js";
export class Employee extends Person {
    constructor(id, name, address, email, days, salaryUnit){
        super(id, name, address, email);
        this.days = days;
        this.salaryUnit = salaryUnit;
    }
    calcSalary(){
        return +this.days * +this.salaryUnit;
    }
}